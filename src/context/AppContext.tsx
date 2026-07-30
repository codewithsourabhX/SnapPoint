import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  PageView,
  UserProfile,
  Survey,
  WithdrawalTransaction,
  NotificationItem,
  ToastMessage,
  ActivityLog
} from '../types';
import { INITIAL_SURVEYS } from '../data/surveysData';
import { INITIAL_NOTIFICATIONS } from '../data/notificationsData';
import { INITIAL_ACTIVITIES } from '../data/activityData';
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  reload,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  collection, 
  query,
  where,
  getDocs,
  onSnapshot,
  signOut as firebaseSignOut 
} from '../lib/firebase';
import { GoogleDetailsModal } from '../components/auth/GoogleDetailsModal';

interface DetailedWithdrawalPayload {
  method: 'UPI' | 'PayPal' | 'Amazon' | 'Flipkart';
  amountPoints: number;
  upiId?: string;
  realFirstName?: string;
  realLastName?: string;
  bankDetails?: string;
  bankName?: string;
  ifscCode?: string;
  accountNo?: string;
  paypalEmail?: string;
  paypalName?: string;
  giftCardEmail?: string;
}

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
  surveys: Survey[];
  withdrawalTransactions: WithdrawalTransaction[];
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  activities: ActivityLog[];
  toasts: ToastMessage[];
  activeModal: { type: string; payload?: any } | null;
  openModal: (type: string, payload?: any) => void;
  closeModal: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  addPoints: (points: number, sourceTitle: string, type?: ActivityLog['type']) => void;
  completeSurvey: (surveyId: string, pointsEarned: number) => void;
  requestDetailedWithdrawal: (payload: DetailedWithdrawalPayload) => boolean;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  triggerConfetti: () => void;
  signOutUser: () => Promise<void>;
  authLoading: boolean;
  unverifiedEmail: string | null;
  reloadAndCheckVerification: () => Promise<boolean>;
  refreshUserPayouts: () => Promise<void>;
  openGoogleDetailsModal: (authUser: { uid: string; email: string | null; displayName: string | null }) => void;
}

const GUEST_USER: UserProfile = {
  uid: '',
  name: 'Guest User',
  email: '',
  points: 0,
  balanceInRupees: 0,
  completedSurveysCount: 0,
  pendingRewardsInRupees: 0,
  referralEarningsInRupees: 0,
  referralCode: '',
  referralLink: '',
  totalReferrals: 0,
  activeReferrals: 0,
  currentStreak: 0,
  isAdmin: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const currentPageRef = useRef(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const [user, setUser] = useState<UserProfile>(GUEST_USER);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [surveys, setSurveys] = useState<Survey[]>(INITIAL_SURVEYS);
  const [withdrawalTransactions, setWithdrawalTransactions] = useState<WithdrawalTransaction[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeModal, setActiveModal] = useState<{ type: string; payload?: any } | null>(null);
  const [googleAuthPending, setGoogleAuthPending] = useState<{ uid: string; email: string | null; displayName: string | null } | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  // Apply dark mode class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setAuthLoading(true);
      if (authUser) {
        const isGoogleUser = authUser.providerData.some(p => p.providerId === 'google.com');
        if (!authUser.emailVerified && !isGoogleUser) {
          // Email not verified yet
          setUnverifiedEmail(authUser.email || 'your email');
          setUser(GUEST_USER);
          setGoogleAuthPending(null);
          setAuthLoading(false);
          return;
        }

        setUnverifiedEmail(null);
        const isAdminUser = authUser.email === 'yadavsourabh8585@gmail.com';
        
        try {
          const userDocRef = doc(db, 'users', authUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            setUser({
              ...data,
              uid: authUser.uid,
              name: data.name || authUser.displayName || 'SnapPoint Member',
              email: authUser.email || data.email,
              isAdmin: isAdminUser
            });
            setGoogleAuthPending(null);
            if (currentPageRef.current === 'login' || currentPageRef.current === 'signup' || currentPageRef.current === 'landing') {
              setCurrentPage('surveys');
            }
          } else {
            // New user detected without completed profile in Firestore (e.g. Google Sign In)
            // Show details modal to fill in Name & optional Referral Code
            setGoogleAuthPending({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName
            });
          }

          // Fetch user's payouts from Firestore
          loadUserPayouts(authUser.uid, authUser.email || undefined, isAdminUser);
        } catch (e) {
          console.error('Error reading user in firestore:', e);
        }
      } else {
        setUser(GUEST_USER);
        setGoogleAuthPending(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time Firestore Listener for Payouts
  useEffect(() => {
    if (!user.email || user.uid === 'guest-123') return;

    const isAdmin = user.email === 'yadavsourabh8585@gmail.com' || user.isAdmin;
    const payoutsCol = collection(db, 'payouts');

    let q = query(payoutsCol);
    if (!isAdmin) {
      q = query(payoutsCol, where('userEmail', '==', user.email));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const txns: WithdrawalTransaction[] = [];
        snapshot.forEach((docSnap) => {
          txns.push({ id: docSnap.id, ...docSnap.data() } as WithdrawalTransaction);
        });
        txns.sort((a, b) => (b.id > a.id ? 1 : -1));
        setWithdrawalTransactions(txns);
      },
      (err) => {
        console.error('Realtime payouts listener error:', err);
      }
    );

    return () => unsubscribe();
  }, [user.email, user.uid, user.isAdmin]);

  const loadUserPayouts = async (uid: string, userEmail?: string, isAdmin = false) => {
    try {
      const userTxns: WithdrawalTransaction[] = [];
      if (isAdmin) {
        const snap = await getDocs(collection(db, 'payouts'));
        snap.forEach(d => {
          userTxns.push({ id: d.id, ...d.data() } as WithdrawalTransaction);
        });
      } else {
        if (uid) {
          const qUid = query(collection(db, 'payouts'), where('uid', '==', uid));
          const uidSnap = await getDocs(qUid);
          uidSnap.forEach(d => {
            userTxns.push({ id: d.id, ...d.data() } as WithdrawalTransaction);
          });
        }

        if (userTxns.length === 0 && userEmail) {
          const qEmail = query(collection(db, 'payouts'), where('userEmail', '==', userEmail));
          const emailSnap = await getDocs(qEmail);
          emailSnap.forEach(d => {
            userTxns.push({ id: d.id, ...d.data() } as WithdrawalTransaction);
          });
        }
      }

      if (userTxns.length > 0) {
        setWithdrawalTransactions(userTxns);
      }
    } catch (err) {
      console.log('Error loading user payouts from firestore:', err);
    }
  };

  const refreshUserPayouts = async () => {
    if (auth.currentUser) {
      const isAdminUser = auth.currentUser.email === 'yadavsourabh8585@gmail.com';
      await loadUserPayouts(auth.currentUser.uid, auth.currentUser.email || undefined, isAdminUser);
    }
  };

  const openGoogleDetailsModal = (authUser: { uid: string; email: string | null; displayName: string | null }) => {
    setGoogleAuthPending(authUser);
  };

  const handleGoogleDetailsComplete = (completedUser: UserProfile) => {
    setUser(completedUser);
    setGoogleAuthPending(null);
    addToast({
      title: 'Registration Complete! 🎉',
      message: 'Welcome to SnapPoint! 500 Welcome SnapPoints credited to your account.',
      type: 'success'
    });
    triggerConfetti();
    setCurrentPage('surveys');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openModal = (type: string, payload?: any) => {
    setActiveModal({ type, payload });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const reloadAndCheckVerification = async (): Promise<boolean> => {
    if (auth.currentUser) {
      try {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          setUnverifiedEmail(null);
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            setUser({
              ...data,
              uid: auth.currentUser.uid,
              name: data.name || auth.currentUser.displayName || 'SnapPoint Member',
              email: auth.currentUser.email || data.email,
              isAdmin: auth.currentUser.email === 'yadavsourabh8585@gmail.com'
            });
          }
          setCurrentPage('surveys');
          return true;
        }
      } catch (e) {
        console.error('Error reloading user:', e);
      }
    }
    return false;
  };

  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(GUEST_USER);
      setGoogleAuthPending(null);
      setUnverifiedEmail(null);
      setCurrentPage('landing');
      addToast({
        title: 'Signed Out',
        message: 'You have been signed out successfully.',
        type: 'info'
      });
    } catch (err) {
      console.log('Signout error:', err);
    }
  };

  const addPoints = async (pointsToAdd: number, sourceTitle: string, type: ActivityLog['type'] = 'survey') => {
    setUser(prev => {
      const newPoints = prev.points + pointsToAdd;
      const newBalance = Math.floor(newPoints / 10);
      const updated = {
        ...prev,
        points: newPoints,
        balanceInRupees: newBalance
      };

      if (prev.uid) {
        updateDoc(doc(db, 'users', prev.uid), {
          points: newPoints,
          balanceInRupees: newBalance
        }).catch(err => console.log('Firestore points update error:', err));
      }

      // 10% Lifetime Commission for Referrer
      if (pointsToAdd > 0 && prev.referredBy) {
        const commissionPoints = Math.floor(pointsToAdd * 0.10);
        if (commissionPoints > 0) {
          const referrerDocRef = doc(db, 'users', prev.referredBy);
          getDoc(referrerDocRef).then(rSnap => {
            if (rSnap.exists()) {
              const rData = rSnap.data() as UserProfile;
              const newRefPoints = (rData.points || 0) + commissionPoints;
              const newRefBalance = Math.floor(newRefPoints / 10);
              const newRefEarnings = (rData.referralEarningsInRupees || 0) + Math.floor(commissionPoints / 10);

              updateDoc(referrerDocRef, {
                points: newRefPoints,
                balanceInRupees: newRefBalance,
                referralEarningsInRupees: newRefEarnings
              }).catch(e => console.log('Error updating referrer commission:', e));
            }
          }).catch(e => console.log('Error fetching referrer for commission:', e));
        }
      }

      return updated;
    });

    const newActivity: ActivityLog = {
      id: 'act-' + Date.now(),
      title: sourceTitle,
      amountPoints: pointsToAdd,
      type,
      timestamp: 'Just now'
    };
    setActivities(prev => [newActivity, ...prev]);

    addToast({
      title: `+${pointsToAdd} SnapPoints Credited!`,
      message: `${sourceTitle} - ₹${(pointsToAdd / 10).toFixed(0)} added to balance.`,
      type: 'success'
    });
    triggerConfetti();
  };

  const completeSurvey = (surveyId: string, pointsEarned: number) => {
    setSurveys(prev =>
      prev.map(s => (s.id === surveyId ? { ...s, status: 'Completed' } : s))
    );
    setUser(prev => {
      const count = (prev.completedSurveysCount || 0) + 1;
      const updated = { ...prev, completedSurveysCount: count };
      if (prev.uid) {
        updateDoc(doc(db, 'users', prev.uid), {
          completedSurveysCount: count
        }).catch(e => console.log(e));
      }
      return updated;
    });
    
    const surveyObj = surveys.find(s => s.id === surveyId);
    const title = surveyObj ? surveyObj.title : 'CPX Survey';
    addPoints(pointsEarned, `Completed Survey: ${title}`, 'survey');
  };

  const requestDetailedWithdrawal = (payload: DetailedWithdrawalPayload) => {
    const { method, amountPoints, upiId, realFirstName, realLastName, bankDetails, bankName, ifscCode, accountNo, paypalEmail, paypalName, giftCardEmail } = payload;

    if (amountPoints < 5000) {
      addToast({
        title: 'Minimum Limit Requirement',
        message: 'Minimum withdrawal amount is 5,000 SnapPoints (₹500).',
        type: 'warning'
      });
      return false;
    }

    if (user.points < amountPoints) {
      addToast({
        title: 'Insufficient Balance',
        message: 'You do not have enough SnapPoints for this withdrawal amount.',
        type: 'error'
      });
      return false;
    }

    const rupeesAmount = Math.floor(amountPoints / 10);
    const accountSummary = upiId || paypalEmail || giftCardEmail || 'Account Detail';

    // Deduct points
    setUser(prev => {
      const newPoints = prev.points - amountPoints;
      const updated = {
        ...prev,
        points: newPoints,
        balanceInRupees: Math.floor(newPoints / 10),
        pendingRewardsInRupees: (prev.pendingRewardsInRupees || 0) + rupeesAmount
      };
      if (prev.uid) {
        updateDoc(doc(db, 'users', prev.uid), {
          points: newPoints,
          balanceInRupees: Math.floor(newPoints / 10),
          pendingRewardsInRupees: updated.pendingRewardsInRupees
        }).catch(e => console.log(e));
      }
      return updated;
    });

    const paymentDetails = {
      upiId,
      realFirstName,
      realLastName,
      bankDetails,
      bankName,
      ifscCode,
      accountNo,
      paypalEmail,
      paypalName,
      giftCardEmail
    };

    const newTxn: WithdrawalTransaction = {
      id: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      method,
      accountDetail: accountSummary,
      amountInPoints: amountPoints,
      amountInRupees: rupeesAmount,
      status: 'Pending',
      userEmail: user.email,
      userName: user.name,
      uid: user.uid,
      paymentDetails,
      // Retain root-level fields for backward compatibility
      upiId,
      realFirstName,
      realLastName,
      bankDetails,
      bankName,
      ifscCode,
      accountNo,
      paypalEmail,
      paypalName,
      giftCardEmail
    };

    setWithdrawalTransactions(prev => [newTxn, ...prev]);

    // Store in firestore payouts with newTxn.id as doc ID
    setDoc(doc(db, 'payouts', newTxn.id), newTxn).catch(e => console.log('Firestore payout save:', e));

    // Add activity log
    setActivities(prev => [
      {
        id: 'act-' + Date.now(),
        title: `Withdrawal Request (${method})`,
        amountPoints: -amountPoints,
        type: 'withdrawal',
        timestamp: 'Just now'
      },
      ...prev
    ]);

    // Success Toast Notification
    addToast({
      title: 'Withdrawal Submitted! 🎉',
      message: 'Your request is submitted and you will get your reward in 48 working hours.',
      type: 'success'
    });

    // Open confirmation popup
    openModal('payout-success', {
      method,
      amountRupees: rupeesAmount,
      accountDetail: accountSummary
    });

    triggerConfetti();
    return true;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast({
      title: 'Notifications Updated',
      message: 'All notifications marked as read.',
      type: 'info'
    });
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        user,
        setUser,
        darkMode,
        toggleDarkMode,
        surveys,
        withdrawalTransactions,
        notifications,
        unreadNotificationsCount,
        activities,
        toasts,
        activeModal,
        openModal,
        closeModal,
        addToast,
        removeToast,
        addPoints,
        completeSurvey,
        requestDetailedWithdrawal,
        markNotificationRead,
        markAllNotificationsRead,
        triggerConfetti,
        signOutUser,
        authLoading,
        unverifiedEmail,
        reloadAndCheckVerification,
        refreshUserPayouts,
        openGoogleDetailsModal
      }}
    >
      {children}

      {googleAuthPending && (
        <GoogleDetailsModal
          isOpen={!!googleAuthPending}
          authUser={googleAuthPending}
          onComplete={handleGoogleDetailsComplete}
        />
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
