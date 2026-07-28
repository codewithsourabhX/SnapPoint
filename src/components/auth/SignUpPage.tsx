import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Mail, Lock, User, Tag, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, db, doc, setDoc, collection, query, where, getDocs, updateDoc } from '../../lib/firebase';
import { UserProfile } from '../../types';

export const SignUpPage: React.FC = () => {
  const { setCurrentPage, addToast, triggerConfetti } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      addToast({ title: 'Validation Error', message: 'Please fill in all required fields.', type: 'warning' });
      return;
    }
    if (password !== confirmPassword) {
      addToast({ title: 'Password Mismatch', message: 'Passwords do not match.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await updateProfile(res.user, { displayName: fullName });

        // 1. Generate Unique Referral Code
        let uniqueCode = '';
        let codeExists = true;
        let attempts = 0;
        while (codeExists && attempts < 10) {
          attempts++;
          uniqueCode = 'BEE' + Math.floor(100000 + Math.random() * 900000);
          const qCode = query(collection(db, 'users'), where('referralCode', '==', uniqueCode));
          const snapCode = await getDocs(qCode);
          if (snapCode.empty) {
            codeExists = false;
          }
        }

        // 2. Check and Link Referral Code
        let referrerUid: string | undefined = undefined;
        let referredByCode: string | undefined = undefined;
        const cleanRefCode = referralCode.trim().toUpperCase();

        if (cleanRefCode) {
          const qReferrer = query(collection(db, 'users'), where('referralCode', '==', cleanRefCode));
          const snapReferrer = await getDocs(qReferrer);

          if (!snapReferrer.empty) {
            const referrerDoc = snapReferrer.docs[0];
            referrerUid = referrerDoc.id;
            referredByCode = cleanRefCode;

            // Increment referrer's referral counts
            const refData = referrerDoc.data() as UserProfile;
            await updateDoc(doc(db, 'users', referrerUid), {
              totalReferrals: (refData.totalReferrals || 0) + 1,
              activeReferrals: (refData.activeReferrals || 0) + 1
            }).catch(err => console.log('Error updating referrer count:', err));
          } else {
            addToast({
              title: 'Invalid Referral Code',
              message: `Code ${cleanRefCode} was not found, but proceeding with account setup.`,
              type: 'warning'
            });
          }
        }

        const isAdminUser = email === 'yadavsourabh8585@gmail.com';

        // 3. Save User Document to Firestore
        const newUserDoc: UserProfile = {
          uid: res.user.uid,
          name: fullName,
          email: email,
          points: 500, // 500 Welcome bonus points
          balanceInRupees: 50,
          completedSurveysCount: 0,
          pendingRewardsInRupees: 0,
          referralEarningsInRupees: 0,
          referralCode: uniqueCode,
          referralLink: `https://pollbee.com/ref/${uniqueCode}`,
          totalReferrals: 0,
          activeReferrals: 0,
          currentStreak: 1,
          isAdmin: isAdminUser,
          referredBy: referrerUid,
          referredByCode: referredByCode,
          createdAt: new Date().toISOString()
        };

        await setDoc(doc(db, 'users', res.user.uid), newUserDoc);

        // Send email verification link
        await sendEmailVerification(res.user).catch(err => console.log('Verification email send error:', err));
      }

      addToast({
        title: 'Account Created! ✉️',
        message: 'A verification link has been sent to your email address. Please check your inbox.',
        type: 'success'
      });
      triggerConfetti();
      setCurrentPage('dashboard');
    } catch (err: any) {
      console.error('Firebase SignUp Error:', err);
      let errMsg = err?.message || 'Could not create account.';
      if (err?.code === 'auth/email-already-in-use') {
        errMsg = 'This email address is already registered. Please log in instead.';
      } else if (err?.code === 'auth/weak-password') {
        errMsg = 'Password is too weak. Please use at least 6 characters.';
      }
      addToast({
        title: 'Registration Failed',
        message: errMsg,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // AppContext onAuthStateChanged will handle prompting for Name and Referral Code if new user!
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err?.code !== 'auth/popup-closed-by-user') {
        addToast({
          title: 'Google Sign Up Failed',
          message: err?.message || 'Could not complete Google registration.',
          type: 'error'
        });
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-6 bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xl"
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 mb-4">
            <span className="text-2xl">🐝</span>
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Create Free PollBee Account
          </h2>
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
            🎁 Get 500 Bonus Points (₹50) on sign up!
          </p>
        </div>

        {/* Google Signup Button */}
        <button
          type="button"
          disabled={googleLoading || loading}
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors shadow-xs disabled:opacity-60"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.74-2.09-6.68-4.91H1.28v3.13C3.25 21.32 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.4l4.04-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.68 1.28 6.6l4.04 3.13c.94-2.82 3.58-4.98 6.68-4.98z"
              />
            </svg>
          )}
          <span>{googleLoading ? 'Connecting Google Account...' : 'Continue with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
          <span className="bg-white dark:bg-neutral-900 px-3 text-[11px] text-neutral-400 uppercase font-semibold shrink-0">
            Or Register with Email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Referral Code (Optional)
            </label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={referralCode}
                onChange={e => setReferralCode(e.target.value.toUpperCase())}
                placeholder="e.g. BEE99"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-wider"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account & Claim Bonus</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-neutral-500">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Log In
          </button>
        </div>
      </motion.div>
    </div>
  );
};
