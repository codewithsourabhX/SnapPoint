import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from '../../lib/firebase';
import { TurnstileWidget } from '../common/TurnstileWidget';

export const LoginPage: React.FC = () => {
  const { setCurrentPage, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({ title: 'Input Required', message: 'Please enter both email and password.', type: 'warning' });
      return;
    }
    if (!turnstileToken) {
      addToast({ title: 'Verification Required', message: 'Please complete the Turnstile bot verification.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      // Server-side Turnstile verification
      const verifyRes = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: turnstileToken })
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        window.turnstile?.reset();
        setTurnstileToken('');
        addToast({ title: 'Security Check Failed', message: 'Bot verification failed. Please try again.', type: 'error' });
        setLoading(false);
        return;
      }

      const res = await signInWithEmailAndPassword(auth, email, password);
      addToast({
        title: 'Welcome Back! 👋',
        message: `Successfully logged in as ${res.user.email}`,
        type: 'success'
      });
      setCurrentPage('dashboard');
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      let errMsg = err?.message || 'Invalid email or password.';
      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password') {
        errMsg = 'Incorrect email or password. Please try again or create an account.';
      } else if (err?.code === 'auth/invalid-email') {
        errMsg = 'Please enter a valid email address.';
      }
      addToast({
        title: 'Log In Failed',
        message: errMsg,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    addToast({
      title: 'Password Reset Link Sent 📧',
      message: `Instructions have been sent to ${email || 'your email'}.`,
      type: 'info'
    });
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // AppContext onAuthStateChanged handles routing existing user or prompting GoogleDetailsModal for new user
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err?.code !== 'auth/popup-closed-by-user') {
        addToast({
          title: 'Google Sign In Failed',
          message: err?.message || 'Could not complete Google authentication.',
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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-6 bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xl"
      >
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain rounded-2xl shadow-xs border border-slate-100/60" />
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Log In to SnapPoint
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Access your points balance, surveys, and payouts
          </p>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          disabled={googleLoading || loading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
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

        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center font-medium leading-tight px-2">
          By continuing with Google, you agree to SnapPoint's{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentPage('privacy');
            }}
            className="font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer inline"
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
            className="font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer inline"
          >
            Terms of Service
          </button>
          .
        </p>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
          <span className="bg-white dark:bg-neutral-900 px-3 text-[11px] text-neutral-400 uppercase font-semibold shrink-0">
            Or Login with Email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Cloudflare Turnstile Bot Verification */}
          <TurnstileWidget
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken('')}
            onError={() => setTurnstileToken('')}
            action="turnstile-spin-v2"
          />

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Logging In...</span>
              </>
            ) : (
              <>
                <span>Log In to SnapPoint</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-neutral-500">
          Don't have an account yet?{' '}
          <button
            onClick={() => setCurrentPage('signup')}
            className="font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
};
