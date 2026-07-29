import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, RefreshCw, LogOut, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth, sendEmailVerification, reload, signOut } from '../../lib/firebase';

interface VerifyEmailPageProps {
  email: string;
  onVerified: () => void;
}

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ email, onVerified }) => {
  const { addToast } = useApp();
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleCheckVerification = async () => {
    setChecking(true);
    try {
      if (auth.currentUser) {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          addToast({
            title: 'Email Verified! 🎉',
            message: 'Your email address has been successfully verified.',
            type: 'success'
          });
          onVerified();
        } else {
          addToast({
            title: 'Not Verified Yet',
            message: 'Your email is not verified yet. Please click the link sent to your inbox and try again.',
            type: 'warning'
          });
        }
      }
    } catch (err: any) {
      console.error('Error checking email verification:', err);
      addToast({
        title: 'Check Failed',
        message: 'Could not verify status. Please try again.',
        type: 'error'
      });
    } finally {
      setChecking(false);
    }
  };

  const handleResendLink = async () => {
    setResending(true);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setResent(true);
        addToast({
          title: 'Verification Link Sent! ✉️',
          message: `A new verification email was sent to ${email}. Please check your inbox and spam folder.`,
          type: 'success'
        });
      }
    } catch (err: any) {
      console.error('Error resending verification email:', err);
      let msg = 'Failed to resend email. Please try again in a few moments.';
      if (err?.code === 'auth/too-many-requests') {
        msg = 'Too many requests. Please wait a minute before requesting another email.';
      }
      addToast({
        title: 'Error Resending Email',
        message: msg,
        type: 'error'
      });
    } finally {
      setResending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center"
      >
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-rose-500/20">
          <Mail className="w-8 h-8 text-white" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            A verification link has been sent to:
          </p>
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 font-extrabold text-xs">
            {email}
          </div>
          
          {/* Prominent Spam Warning Banner */}
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 font-bold text-xs flex items-center justify-center gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Please check your inbox &amp; spam folder if you do not see the email.</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleCheckVerification}
            disabled={checking}
            className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {checking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Verification...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>I've Verified My Email</span>
              </>
            )}
          </button>

          <button
            onClick={handleResendLink}
            disabled={resending}
            className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
          >
            {resending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            <span>{resent ? 'Link Resent! Send Again' : 'Resend Verification Email'}</span>
          </button>

          <button
            onClick={handleSignOut}
            className="w-full py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Use Different Account / Sign Out</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
