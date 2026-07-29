import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Coins,
  ChevronDown,
  QrCode,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_FAQS } from '../../data/faqData';

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-slate-50/50 dark:bg-slate-950">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-400/5 via-sky-300/5 to-rose-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <img
              src="/logo.png"
              alt="SnapPoint Logo"
              className="w-24 h-24 mx-auto object-contain rounded-3xl shadow-md border border-slate-100 bg-white"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] text-slate-900 dark:text-white"
          >
            Earn Rewards for{' '}
            <span className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 bg-clip-text text-transparent">
              Sharing Your Opinions.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Complete surveys to collect points and redeem exciting rewards. Sign up today to get 500 welcome bonus points instantly!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setCurrentPage('signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-base shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
            >
              <span>Sign Up for 500 Bonus Points</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentPage('login')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-base transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              Log In to Account
            </button>
          </motion.div>

          {/* Feature Highlight Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-500" />
              <span>Minimum Payout: 5000 Pts (₹500)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-500" />
              <span>UPI, PayPal & Gift Cards</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-500" />
              <span>10% Lifetime Referral Bonus</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 text-xs font-bold uppercase tracking-wider">
              3-Step Easy Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-slate-900 dark:text-white">
              How SnapPoint Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-extrabold flex items-center justify-center text-lg mb-6 shadow-md shadow-rose-600/20">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Create Account</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sign up in seconds with your email or Google Auth. Receive starter bonus points immediately.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-extrabold flex items-center justify-center text-lg mb-6 shadow-md shadow-rose-600/20">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Complete Surveys</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Answer high-paying opinion surveys from top market research partners. Earn points automatically credited to your balance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-extrabold flex items-center justify-center text-lg mb-6 shadow-md shadow-rose-600/20">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cash Out Rewards</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Redeem 5,000 Points for ₹500 via UPI (GPay/PhonePe), PayPal, Amazon or Flipkart gift cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Options */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Supported Payout Options
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              Minimum threshold: 5,000 Points = ₹500
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center hover:scale-105 transition-transform shadow-xs">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">UPI Transfer</h4>
              <p className="text-xs text-slate-500 mt-1">GPay, PhonePe, Paytm</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center hover:scale-105 transition-transform shadow-xs">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">PayPal Cash</h4>
              <p className="text-xs text-slate-500 mt-1">Direct Email Payout</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center hover:scale-105 transition-transform shadow-xs">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Amazon Gift Card</h4>
              <p className="text-xs text-slate-500 mt-1">E-Voucher Code</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center hover:scale-105 transition-transform shadow-xs">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Flipkart Gift Card</h4>
              <p className="text-xs text-slate-500 mt-1">E-Voucher Code</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm mt-2">Everything you need to know about SnapPoint</p>
          </div>

          <div className="space-y-4">
            {INITIAL_FAQS.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-rose-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-850 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Join <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">SnapPoint</span> Today!
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Start completing surveys and redeem rewards directly to your UPI ID or PayPal.
          </p>
          <button
            onClick={() => setCurrentPage('signup')}
            className="mt-8 px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-base shadow-xl shadow-rose-600/20 transition-all active:scale-95 cursor-pointer"
          >
            Create Free Account Now
          </button>
        </div>
      </section>
    </div>
  );
};

