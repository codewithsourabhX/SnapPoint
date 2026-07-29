import React, { useState, useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth } from '../../lib/firebase';

export const SurveysPage: React.FC = () => {
  const { user, authLoading, setCurrentPage } = useApp();
  const [loading, setLoading] = useState(true);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

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
          text_color: "#1e293b",
          survey_box: {
            topbar_background_color: "#e11d48",
            box_background_color: "#ffffff",
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

      // 6-second timeout fallback to clear loading spinner if script gets silently blocked
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 6000);

      script.onload = () => {
        clearTimeout(timeoutId);
        setLoading(false);
      };

      script.onerror = () => {
        clearTimeout(timeoutId);
        setLoading(false);
        setAdBlockDetected(true);
      };

      document.body.appendChild(script);

      return () => {
        clearTimeout(timeoutId);
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
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 bg-slate-50 min-h-screen pb-24">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Hot Surveys</h2>
      </div>

      {/* PRO TIP box */}
      <div className="p-5 rounded-2xl bg-sky-500/5 border border-dashed border-sky-400/50 text-xs text-sky-800 space-y-2.5">
        <div className="flex items-center gap-2 font-extrabold text-sky-600 uppercase tracking-wider">
          <span className="text-base">💡</span>
          <span>PRO TIP</span>
        </div>
        <p className="leading-relaxed font-medium">
          To earn more from PollBee paid surveys, stay honest, don't rush your responses, and avoid giving fake information. If you don't qualify for one survey, keep trying—your genuine participation pays off!
        </p>
      </div>

      {/* Loading Indicator for CPX Survey Wall */}
      {loading && !adBlockDetected && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <Loader2 className="w-9 h-9 text-rose-500 animate-spin" />
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Loading CPX Research Survey Wall...</h3>
            <p className="text-xs text-slate-500">Fetching available surveys for your profile...</p>
          </div>
        </div>
      )}

      {/* Ad Blocker Detection Warning */}
      {adBlockDetected && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 space-y-3 text-center max-w-xl mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold">Ad Blocker Detected</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We noticed that your browser is blocking our survey provider. To load surveys and earn reward points, please disable your ad blocker (e.g. AdBlock, uBlock, or Brave Shield) for PollBee.
          </p>
        </div>
      )}

      {/* CPX Survey Wall Container */}
      {!adBlockDetected && (
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-1.5 shadow-xs">
          <div id="fullscreen" style={{ maxWidth: '100%', margin: 'auto' }}></div>
        </div>
      )}
    </div>
  );
};



