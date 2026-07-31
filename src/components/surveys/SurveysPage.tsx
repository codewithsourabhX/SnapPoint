import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  Compass, 
  TrendingUp, 
  Gift, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SurveysPage: React.FC = () => {
  const { user, setCurrentPage } = useApp();

  const benefits = [
    "Higher reward rates per opinion survey",
    "Tailored surveys matching your profile",
    "Optimized mobile-friendly response screens",
    "Instantly credited rewards upon completion",
  ];

  return (
    <div className="p-4 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-200">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Paid Surveys</h2>
        <p className="text-xs text-slate-500 mt-1">Share your opinions to earn real cash rewards.</p>
      </div>

      {/* Main Coming Soon / Upgrading Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6 relative overflow-hidden"
      >
        {/* Decorative subtle background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Icon & Badge Header */}
        <div className="flex flex-col items-center text-center space-y-3.5 pt-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 relative animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-wider">
            Upgrading Platforms
          </span>
          <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
            New Survey Panels Arriving Soon!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium">
            We are currently partnering with major global market research panels to bring you higher-paying surveys and more daily opportunities!
          </p>
        </div>

        {/* Benefits List */}
        <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 space-y-3 max-w-sm mx-auto text-xs font-semibold">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-extrabold pb-1 border-b border-slate-200/40 dark:border-slate-800/40">
            What to expect:
          </div>
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-tight">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action / Next steps info */}
        <div className="text-center pt-2 pb-2">
          <button
            onClick={() => setCurrentPage('profile')}
            className="w-full max-w-xs py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs transition-all active:scale-98 shadow-xs flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Complete Your Profile Info</span>
          </button>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">
            Update your profile to ensure you get qualified instantly when panels launch!
          </p>
        </div>
      </motion.div>

      {/* Alternate Earning Options Promo Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-rose-500" />
          <span>Other ways to earn points</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
          {/* Option 1: Daily Streak */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 flex gap-3.5 items-center">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-950 dark:text-white font-bold text-xs">Daily Login Streaks</div>
              <div className="text-[10px] text-slate-400 font-medium">Check in daily for multipliers & jackpots.</div>
            </div>
          </div>

          {/* Option 2: Refer & Earn */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 flex gap-3.5 items-center">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="text-slate-950 dark:text-white font-bold text-xs">Referral Program</div>
              <div className="text-[10px] text-slate-400 font-medium">Earn ₹25 first refer + 10% commission.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
