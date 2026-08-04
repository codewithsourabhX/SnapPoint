import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Tag, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { db, doc, setDoc, getDocs, collection, query, where, updateDoc } from '../../lib/firebase';
import { UserProfile } from '../../types';
import { useApp } from '../../context/AppContext';

interface GoogleDetailsModalProps {
  isOpen: boolean;
  authUser: { uid: string; email: string | null; displayName: string | null };
  onComplete: (userProfile: UserProfile) => void;
}

export const GoogleDetailsModal: React.FC<GoogleDetailsModalProps> = ({
  isOpen,
  authUser,
  onComplete
}) => {
  const { setCurrentPage } = useApp();
  const [name, setName] = useState(authUser.displayName || '');
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg('Please agree to the Privacy Policy and Terms of Service to continue.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Generate unique referral code for new user
      let uniqueCode = '';
      let codeExists = true;
      let attempts = 0;
      while (codeExists && attempts < 10) {
        attempts++;
        uniqueCode = 'SNAP' + Math.floor(100000 + Math.random() * 900000);
        const qCode = query(collection(db, 'users'), where('referralCode', '==', uniqueCode));
        const snapCode = await getDocs(qCode);
        if (snapCode.empty) {
          codeExists = false;
        }
      }

      // 2. Check optional referral code
      let referrerUid: string | undefined = undefined;
      let referredByCode: string | undefined = undefined;
      const cleanRefInput = referralCodeInput.trim().toUpperCase();

      if (cleanRefInput) {
        const qReferrer = query(collection(db, 'users'), where('referralCode', '==', cleanRefInput));
        const snapReferrer = await getDocs(qReferrer);

        if (!snapReferrer.empty) {
          const referrerDoc = snapReferrer.docs[0];
          referrerUid = referrerDoc.id;
          referredByCode = cleanRefInput;

          // Increment stats and award 250 points starter bonus ONLY for their first referral
          const refData = referrerDoc.data() as UserProfile;
          const isFirstReferral = (refData.totalReferrals || 0) === 0;
          
          const updatePayload: any = {
            totalReferrals: (refData.totalReferrals || 0) + 1,
            activeReferrals: (refData.activeReferrals || 0) + 1
          };

          if (isFirstReferral) {
            const newPoints = (refData.points || 0) + 250;
            updatePayload.points = newPoints;
            updatePayload.balanceInRupees = Math.floor(newPoints / 10);
            updatePayload.referralEarningsInRupees = (refData.referralEarningsInRupees || 0) + 25;
          }

          await updateDoc(doc(db, 'users', referrerUid), updatePayload)
            .catch(err => console.log('Error updating referrer doc:', err));
        } else {
          // Warning if invalid code entered
          console.log('Referral code not found:', cleanRefInput);
        }
      }

      const isAdminUser = authUser.email === 'yadavsourabh8585@gmail.com';

      // 3. Construct user profile
      const newUserDoc: UserProfile = {
        uid: authUser.uid,
        name: name.trim(),
        email: authUser.email || '',
        points: 500, // Welcome bonus
        balanceInRupees: 50,
        completedSurveysCount: 0,
        pendingRewardsInRupees: 0,
        referralEarningsInRupees: 0,
        referralCode: uniqueCode,
        referralLink: `https://snappoint.online/ref/${uniqueCode}`,
        totalReferrals: 0,
        activeReferrals: 0,
        currentStreak: 1,
        isAdmin: isAdminUser,
        referredBy: referrerUid || null,
        referredByCode: referredByCode || null,
        createdAt: new Date().toISOString()
      };

      // 4. Save to Firestore
      await setDoc(doc(db, 'users', authUser.uid), newUserDoc);

      onComplete(newUserDoc);
    } catch (err: any) {
      console.error('Error completing Google setup:', err);
      setErrorMsg('Could not save details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 mb-3">
            <span className="text-2xl">🐝</span>
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Almost Done! Complete Account
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Fill in these quick details to finalize your Google registration and claim your <strong className="text-amber-500 font-bold">500 Welcome Points</strong>!
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* 1. Name Input */}
          <div>
            <label className="block font-bold text-neutral-800 dark:text-neutral-200 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>
          </div>

          {/* 2. Referral Code Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-neutral-800 dark:text-neutral-200">
                Referral Code
              </label>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Optional
              </span>
            </div>
            <div className="relative">
              <Tag className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={referralCodeInput}
                onChange={e => setReferralCodeInput(e.target.value.toUpperCase())}
                placeholder="e.g. SNAP881234"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase font-semibold tracking-wider"
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Enter a friend's code if you were invited by them.
            </p>
          </div>

          {/* Terms & Privacy Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms-google-modal"
              required
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500"
            />
            <label htmlFor="terms-google-modal" className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-tight cursor-pointer select-none">
              I agree to the{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentPage('privacy');
                }}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer inline"
              >
                Privacy Policy
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentPage('terms');
                }}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer inline"
              >
                Terms of Service
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Details...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Complete Registration & Claim 500 Pts</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
