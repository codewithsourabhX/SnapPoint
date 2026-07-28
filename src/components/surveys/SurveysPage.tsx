import React, { useState, useEffect } from 'react';
import { Loader2, Coins, Wallet } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth } from '../../lib/firebase';

export const SurveysPage: React.FC = () => {
  const { user, authLoading, setCurrentPage } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth state is resolved, check login status
    if (!authLoading) {
      const currentUser = auth.currentUser;
      if (!currentUser || user.uid === 'guest-123') {
        setCurrentPage('login');
        return;
      }

      const script1 = {
        div_id: "fullscreen",
        theme_style: 1,
        order_by: 2,
        limit_surveys: 12
      };

      const config = {
        general_config: {
          app_id: 34860,
          ext_user_id: currentUser.uid,
          email: currentUser.email || "",
          username: currentUser.displayName || user.name || "",
          secure_hash: ""
        },
        style_config: {
          text_color: "#ffffff",
          survey_box: {
            topbar_background_color: "#6366F1",
            box_background_color: "#1F2937",
            rounded_borders: true,
            stars_filled: "#FBBF24"
          }
        },
        script_config: [script1],
        debug: false,
        useIFrame: true,
        iFramePosition: 1
      };

      (window as any).config = config;

      // Load CPX script dynamically
      const script = document.createElement("script");
      script.src = "https://cdn.cpx-research.com/assets/js/script_tag_v2.0.js";
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        setLoading(false);
      };

      script.onerror = () => {
        setLoading(false);
      };

      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        delete (window as any).config;
      };
    }
  }, [authLoading, user, setCurrentPage]);

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Points Bar at the Top */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 border-l-4 border-l-amber-500 shadow-md text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">Available Reward Balance</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                10 Pts = ₹1
              </span>
            </div>
            <div className="flex items-baseline gap-2.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {(user.points || 0).toLocaleString()} <span className="text-amber-400 text-lg sm:text-xl font-bold">Pts</span>
              </span>
              <span className="text-sm font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                ≈ ₹{user.balanceInRupees || Math.floor((user.points || 0) / 10)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('withdraw')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-md hover:shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          <Wallet className="w-4 h-4" />
          <span>Withdraw Balance</span>
        </button>
      </div>

      {/* Loading Indicator for CPX Survey Wall */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <Loader2 className="w-9 h-9 text-amber-500 animate-spin" />
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Loading CPX Research Survey Wall...</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fetching available surveys for your profile...</p>
          </div>
        </div>
      )}

      {/* CPX Survey Wall Container */}
      <div className="w-full">
        <div id="fullscreen" style={{ maxWidth: '950px', margin: 'auto' }}></div>
      </div>
    </div>
  );
};


