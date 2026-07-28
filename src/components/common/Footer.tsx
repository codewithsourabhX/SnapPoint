import React from 'react';
import { Zap, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-yellow-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 font-black text-sm">
                🐝
              </div>
              <span className="text-lg font-bold text-neutral-900 dark:text-white">PollBee</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Earn real rewards and instant cash payouts by completing high-paying surveys on PollBee.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified & Secure Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => setCurrentPage('surveys')} className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  PollBee Surveys
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('referrals')} className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Refer & Earn (10%)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('profile')} className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  My Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => setCurrentPage('help')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('help')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-500 gap-4">
          <p>© 2026 EarnPulse Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for reward lovers worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
