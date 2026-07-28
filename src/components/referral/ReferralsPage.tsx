import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  Award,
  Sparkles,
  Trophy,
  Share2,
  TrendingUp,
  Gift
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { REFERRAL_LEADERBOARD, REFERRAL_MILESTONES } from '../../data/referralData';

export const ReferralsPage: React.FC = () => {
  const { user, addToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    setCopiedLink(true);
    addToast({
      title: 'Referral Link Copied! 📋',
      message: 'Share this link with friends on WhatsApp or social media.',
      type: 'success'
    });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedCode(true);
    addToast({
      title: 'Referral Code Copied!',
      message: `Code ${user.referralCode} copied to clipboard.`,
      type: 'success'
    });
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 border-l-4 border-l-pink-500 text-white shadow-xs">
        <div className="max-w-2xl">
          <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider">
            Earn 10% Lifetime Commission
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
            Invite Friends & Earn Together
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Get instant starter bonus points when your friends sign up, plus a 10% lifetime commission on all survey earnings!
          </p>
        </div>
      </div>

      {/* Referral Code Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Your Unique Referral Code
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Friends can enter this code during sign up to get 500 Welcome Points.
            </p>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shrink-0 transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
          >
            {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'Code Copied!' : 'Copy Referral Code'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="font-mono font-extrabold text-xl sm:text-2xl tracking-widest text-amber-600 dark:text-amber-400 select-all">
            {user.referralCode}
          </span>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full">
            Active Code
          </span>
        </div>
      </div>

      {/* Referral Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-500 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Referrals</span>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user.totalReferrals} Friends
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Joined via referral code</p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Earner Friends</span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {user.activeReferrals} Active
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Generating 10% comm.</p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-pink-500 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Lifetime Referral Income</span>
            <Gift className="w-5 h-5 text-pink-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            ₹{user.referralEarningsInRupees}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">{user.referralEarningsInRupees * 10} Points Earned</p>
        </div>
      </div>

      {/* How Referral Program Works & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Explainer & Milestones */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Referral Milestone Unlocks
          </h2>

          <div className="space-y-3">
            {REFERRAL_MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{m.title}</h4>
                    <p className="text-[11px] text-slate-400">Reach {m.count} Active Referrals</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-amber-500 block">+{m.rewardPoints} Pts</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">₹{m.rewardRupees} Bonus</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Leaderboard */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Top Referral Leaderboard
            </h2>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>

          <div className="space-y-3">
            {REFERRAL_LEADERBOARD.map(leader => (
              <div
                key={leader.rank}
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full font-extrabold flex items-center justify-center text-[10px] ${
                      leader.rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : leader.rank === 2
                        ? 'bg-slate-300 text-slate-950'
                        : leader.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {leader.rank}
                  </span>

                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {leader.name ? leader.name.charAt(0).toUpperCase() : 'U'}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{leader.name}</h4>
                    <p className="text-[10px] text-slate-400">{leader.totalReferrals} referrals</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">
                    ₹{leader.earningsRupees.toLocaleString()}
                  </span>
                  {leader.badge && (
                    <span className="text-[9px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                      {leader.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
