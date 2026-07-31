import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Loader2, 
  Clock, 
  Star, 
  ExternalLink, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth } from '../../lib/firebase';

interface CPXSurvey {
  id: string;
  loi: string; // Length of interview in minutes
  payout: number; // Payout value (points or decimal local currency)
  conversion_rate: string;
  score: string;
  statistics_rating_count: string;
  statistics_rating_avg: string;
  type: string;
  top: number; // 1 = top survey, 0 = regular
  href: string; // Link to start survey
}

export const SurveysPage: React.FC = () => {
  const { user, authLoading, setCurrentPage, addToast } = useApp();
  const [surveys, setSurveys] = useState<CPXSurvey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      const currentUser = auth.currentUser;
      if (!currentUser || user.uid === 'guest-123') {
        setCurrentPage('login');
        return;
      }
      fetchSurveys(currentUser.uid);
    }
  }, [authLoading, user, setCurrentPage]);

  const fetchSurveys = async (uid: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Proactively try to get user's public IP client-side to ensure accurate geo-targeted surveys from CPX
      let userIp = '127.0.0.1';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json', { timeout: 3000 } as any);
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (ipData.ip) userIp = ipData.ip;
        }
      } catch (ipErr) {
        console.log('Using default headers for IP lookup:', ipErr);
      }

      // 2. Query our secure backend proxy
      const response = await fetch(`/api/surveys?userId=${uid}&ip_user=${userIp}`);
      if (!response.ok) {
        throw new Error('Failed to retrieve surveys from backend proxy');
      }

      const data = await response.json();
      if (data.status === 'success' || data.surveys) {
        setSurveys(data.surveys || []);
      } else {
        throw new Error(data.error || 'Failed to fetch surveys');
      }
    } catch (err: any) {
      console.error('Error fetching surveys:', err);
      setError(err.message || 'Something went wrong while fetching surveys.');
      addToast({
        title: 'Connection Error',
        message: 'Could not load the latest surveys. Please check your network.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to format payout to SnapPoints
  const getDisplayPoints = (payout: number) => {
    // If payout is small (like 0.40), it represents the local currency amount (Rupees).
    // Multiply by 1000 to get points if it's < 10, else display as is.
    if (payout < 10) {
      return Math.round(payout * 1000);
    }
    return Math.round(payout);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3 bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
        <p className="text-xs font-bold text-slate-500">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 text-slate-800 dark:text-slate-200">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Earning Surveys</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Powered by CPX Research</p>
        </div>
        
        <button 
          onClick={() => auth.currentUser && fetchSurveys(auth.currentUser.uid)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[10px] font-extrabold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Refresh List
        </button>
      </div>

      {/* Loading view */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
          <p className="text-xs font-bold text-slate-500">Scanning for paid survey offers...</p>
        </div>
      )}

      {/* Error View */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 space-y-3 text-center max-w-xl mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold">Failed to Load Surveys</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            We ran into an error connecting to CPX Research. Please check your internet, disable any aggressive adblockers, and click refresh.
          </p>
          <button 
            onClick={() => auth.currentUser && fetchSurveys(auth.currentUser.uid)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold rounded-lg shadow-md transition-colors"
          >
            Retry Now
          </button>
        </div>
      )}

      {/* No surveys available */}
      {!loading && !error && surveys.length === 0 && (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center shadow-xs space-y-3.5">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Surveys Available Right Now</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              We couldn't find matches for your profile at this moment. Survey providers refresh their inventories constantly—please check back later!
            </p>
          </div>
        </div>
      )}

      {/* Surveys grid */}
      {!loading && !error && surveys.length > 0 && (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {surveys.map((survey) => {
            const points = getDisplayPoints(survey.payout);
            const rupees = points / 10;
            const ratingAvg = parseFloat(survey.statistics_rating_avg) || 0;
            const ratingCount = parseInt(survey.statistics_rating_count) || 0;

            return (
              <motion.div 
                key={survey.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -2 }}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all relative overflow-hidden group"
              >
                {/* Top/Hot Survey Badge */}
                {survey.top === 1 && (
                  <div className="absolute top-0 right-0 bg-rose-600 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-xs z-10">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Hot Offer</span>
                  </div>
                )}

                {/* Card Header & Publisher Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      CPX Research
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">
                      ID: #{survey.id}
                    </span>
                  </div>

                  {/* Survey Points Reward Details */}
                  <div className="space-y-0.5">
                    <div className="text-lg font-black text-rose-600 dark:text-rose-400 tracking-tight">
                      +{points.toLocaleString()} <span className="text-xs font-bold text-slate-700 dark:text-slate-300">sp</span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                      Equivalent to ₹{rupees.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Metadata block (Time & Rating) */}
                <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  {/* Length of Interview */}
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{survey.loi} mins</span>
                  </div>

                  {/* Rating Average & Reviews */}
                  <div className="flex items-center gap-1.5 justify-end">
                    <Star className={`w-3.5 h-3.5 ${ratingAvg > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-300'} shrink-0`} />
                    <span>
                      {ratingAvg > 0 
                        ? `${ratingAvg.toFixed(1)} (${ratingCount})` 
                        : 'No ratings'}
                    </span>
                  </div>
                </div>

                {/* Start Survey Button */}
                <a 
                  href={survey.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Award className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Start Earning</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                </a>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Earning Tip Box */}
      <div className="p-4 rounded-2xl bg-sky-500/5 border border-dashed border-sky-400/50 text-[10px] sm:text-xs text-sky-800 dark:text-sky-300 space-y-2 leading-relaxed">
        <div className="flex items-center gap-1.5 font-bold text-sky-600 uppercase tracking-wider">
          <span>💡</span>
          <span>Survey Completion Guidelines</span>
        </div>
        <p className="font-medium">
          Answer honestly, don't rush, and avoid inconsistent answers. CPX Research filters out bots and fraud; honest answers ensure you always qualify and get successfully credited!
        </p>
      </div>
    </div>
  );
};
