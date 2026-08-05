import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Loader2, 
  Clock, 
  Star, 
  AlertCircle,
  HelpCircle
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

    const theoremReachSurveys: CPXSurvey[] = [
      {
        id: 'tr-1',
        loi: '10-20',
        payout: 5000,
        conversion_rate: '100',
        score: '5',
        statistics_rating_count: '2430',
        statistics_rating_avg: '4.9',
        type: 'theoremreach',
        top: 1,
        href: `https://theoremreach.com/respondent_entry/direct?api_key=facfb79858816d6774d8b3de51a1&user_id=${uid}`
      },
      {
        id: 'tr-2',
        loi: '5-15',
        payout: 2500,
        conversion_rate: '100',
        score: '4',
        statistics_rating_count: '1120',
        statistics_rating_avg: '4.6',
        type: 'theoremreach',
        top: 0,
        href: `https://theoremreach.com/respondent_entry/direct?api_key=facfb79858816d6774d8b3de51a1&user_id=${uid}`
      }
    ];

    try {
      // 1. Proactively try to get user's public IP client-side to ensure accurate geo-targeted surveys
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
      let cpxSurveys: CPXSurvey[] = [];
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' || data.surveys) {
          cpxSurveys = data.surveys || [];
        }
      } else {
        console.warn('Backend proxy responded with error, falling back to TheoremReach');
      }

      setSurveys([...theoremReachSurveys, ...cpxSurveys]);
    } catch (err: any) {
      console.error('Error fetching CPX surveys, displaying TheoremReach surveys:', err);
      // Fallback: only show TheoremReach surveys
      setSurveys(theoremReachSurveys);
      // We don't display a blocking error since we successfully loaded TheoremReach surveys fallback!
    } finally {
      setLoading(false);
    }
  };

  // Helper to format payout to SnapPoints
  const getDisplayPoints = (survey: CPXSurvey) => {
    if (survey.type === 'theoremreach') {
      return survey.payout;
    }
    const payout = survey.payout;
    // If payout is small (like 0.40), it represents the local currency amount (Rupees).
    // Multiply by 1000 to get points if it's < 10, else display as is.
    if (payout < 10) {
      return Math.round(payout * 1000);
    }
    return Math.round(payout);
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3 bg-slate-950 text-slate-200">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
        <p className="text-xs font-bold text-slate-500">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-6 bg-slate-950 min-h-screen pb-24 text-slate-200">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Featured Surveys</h2>
        </div>
        
        <button 
          onClick={() => auth.currentUser && fetchSurveys(auth.currentUser.uid)}
          className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-[10px] font-extrabold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          Refresh List
        </button>
      </div>

      {/* Loading view */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 space-y-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
          <p className="text-xs font-bold text-slate-400">Scanning for paid survey offers...</p>
        </div>
      )}

      {/* Error View */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 space-y-3 text-center max-w-xl mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold">Failed to Load Surveys</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            We ran into an error connecting to survey network. Please check your internet, disable any aggressive adblockers, and click refresh.
          </p>
          <button 
            onClick={() => auth.currentUser && fetchSurveys(auth.currentUser.uid)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold rounded-lg shadow-md transition-colors cursor-pointer"
          >
            Retry Now
          </button>
        </div>
      )}

      {/* No surveys available */}
      {!loading && !error && surveys.length === 0 && (
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center shadow-xs space-y-3.5">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">No Surveys Available Right Now</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              We couldn't find matches for your profile at this moment. Survey providers refresh their inventories constantly—please check back later!
            </p>
          </div>
        </div>
      )}

      {/* Surveys grid */}
      {!loading && !error && surveys.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {surveys.map((survey) => {
            const points = getDisplayPoints(survey);
            const ratingAvg = parseFloat(survey.statistics_rating_avg) || 0;
            const ratingCount = parseInt(survey.statistics_rating_count) || 0;
            const isTheoremReach = survey.type === 'theoremreach';

            return (
              <motion.a 
                key={survey.id}
                href={survey.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-5 bg-slate-900 hover:bg-slate-800/80 rounded-2xl border border-slate-800 hover:border-emerald-500/40 shadow-xs flex flex-col items-center justify-center space-y-3 text-center transition-all relative group cursor-pointer"
              >
                {/* Provider Tag */}
                <div className="absolute top-2 right-2 bg-slate-800 border border-slate-700/60 text-slate-300 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                  {isTheoremReach ? 'TheoremReach' : 'CPX Research'}
                </div>

                {/* Length of Interview */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{survey.loi} min</span>
                </div>

                {/* Survey Points Reward */}
                <div className="text-xl font-black text-emerald-500 tracking-tight">
                  +{isTheoremReach ? 'Up to ' : ''}{points.toLocaleString()} SP
                </div>

                {/* Rating details */}
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                  <Star className={`w-4 h-4 ${ratingAvg > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-600'}`} />
                  <span>
                    {ratingAvg > 0 
                      ? `${ratingAvg.toFixed(0)} (${ratingCount})` 
                      : 'New'}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      )}

      {/* Earning Tip Box */}
      <div className="p-4 rounded-2xl bg-sky-500/5 border border-dashed border-sky-500/30 text-[10px] sm:text-xs text-sky-300 space-y-2 leading-relaxed">
        <div className="flex items-center gap-1.5 font-bold text-sky-400 uppercase tracking-wider">
          <span>💡</span>
          <span>Survey Completion Guidelines</span>
        </div>
        <p className="font-medium text-slate-300">
          Answer honestly, don't rush, and avoid inconsistent answers. Our verification systems filter out bots and fraud; honest answers ensure you always qualify and get successfully credited!
        </p>
      </div>
    </div>
  );
};
