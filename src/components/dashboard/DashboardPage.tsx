import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Coins,
  Wallet,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  ClipboardList,
  CheckSquare,
  Gamepad2,
  UserPlus,
  Gift,
  ArrowRight,
  ChevronRight,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardPage: React.FC = () => {
  const { user, setCurrentPage, surveys, activities, openModal, withdrawalTransactions, refreshUserPayouts } = useApp();

  useEffect(() => {
    refreshUserPayouts();
  }, []);

  const availableSurveys = surveys.filter(s => s.status === 'Available');
  const targetPts = 5000;
  const progressPercent = Math.min(100, Math.round((user.points / targetPts) * 100));

  return (
    <div className="space-y-6">
      {/* Top Points Progress Bar & Withdraw Money Option */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 font-bold">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Cashout Progress Goal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reach 5,000 points to cash out ₹500 directly via UPI or PayPal
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 self-start sm:self-auto">
            {user.points.toLocaleString()} / 5,000 Pts ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Withdraw Money Option Just Below Bar */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <Wallet className="w-4 h-4 text-emerald-500" />
            <span>Available Balance: <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹{user.balanceInRupees}</strong></span>
          </div>

          <button
            onClick={() => setCurrentPage('withdraw')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Withdraw Money</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-xl sm:text-2xl ring-2 ring-amber-500 shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Ready to earn reward points today? Check out available surveys below.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('surveys')}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start High Payout Surveys</span>
        </button>
      </div>

      {/* 5 Dashboard Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Card 1: Current Points */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Points
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {user.points.toLocaleString()}
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">10 pts = ₹1</p>
        </div>

        {/* Card 2: Available Balance */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Balance
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
            ₹{user.balanceInRupees}
          </h3>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Ready to withdraw</p>
        </div>

        {/* Card 3: Completed Surveys */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Surveys
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {user.completedSurveysCount}
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Completed</p>
        </div>

        {/* Card 4: Pending Rewards */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-purple-500 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pending
            </span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            ₹{user.pendingRewardsInRupees}
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">In verification</p>
        </div>

        {/* Card 5: Referral Earnings */}
        <div className="col-span-2 sm:col-span-1 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-pink-500 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Referrals
            </span>
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            ₹{user.referralEarningsInRupees}
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">{user.totalReferrals} friends</p>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => setCurrentPage('surveys')}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-center transition-all group active:scale-95 shadow-xs"
          >
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white mb-2 group-hover:scale-105 transition-transform">
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">Start Survey</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Earn up to 2000 Pts</span>
          </button>

          <button
            onClick={() => setCurrentPage('referrals')}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-center transition-all group active:scale-95 shadow-xs"
          >
            <div className="p-2.5 rounded-xl bg-pink-600 text-white mb-2 group-hover:scale-105 transition-transform">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">Invite Friends</span>
            <span className="text-[10px] text-slate-400 mt-0.5">10% Lifetime Comm.</span>
          </button>
        </div>
      </div>

      {/* Recommended Surveys & Recent Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Surveys */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Recommended Surveys
            </h2>
            <button
              onClick={() => setCurrentPage('surveys')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({availableSurveys.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {availableSurveys.slice(0, 3).map(survey => (
              <div
                key={survey.id}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                      {survey.category}
                    </span>
                    <span className="text-xs text-slate-400">• {survey.estimatedMinutes} mins</span>
                    <span className="text-xs text-slate-400">• {survey.difficulty}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {survey.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {survey.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <div className="text-sm font-extrabold text-amber-500 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5" />
                      <span>+{survey.points} Pts</span>
                    </div>
                    <p className="text-[10px] text-slate-400">₹{survey.points / 10}</p>
                  </div>

                  <button
                    onClick={() => openModal('survey', survey)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-xs active:scale-95"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Withdrawal Requests & Activity */}
        <div className="space-y-6">
          {/* Withdrawal Requests Status Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>My Withdrawal Requests</span>
              </h3>
              <button
                onClick={() => setCurrentPage('withdraw')}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Cashout
              </button>
            </div>

            {withdrawalTransactions.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">No withdrawal requests submitted yet.</p>
                <button
                  onClick={() => setCurrentPage('withdraw')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs"
                >
                  Withdraw Earnings
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {withdrawalTransactions.slice(0, 4).map(tx => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{tx.method}</span>
                        <span className="text-[10px] text-slate-400 font-normal">• {tx.accountDetail}</span>
                      </div>
                      <span className="font-extrabold text-amber-600 dark:text-amber-400">₹{tx.amountInRupees}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{tx.date}</span>
                      <div>
                        {(tx.status === 'Completed' || tx.status === 'Approved') && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        )}
                        {tx.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                            <Clock className="w-3 h-3 animate-pulse" /> Pending
                          </span>
                        )}
                        {tx.status === 'Rejected' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px]">
                            <XCircle className="w-3 h-3" /> Rejected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Earnings Activity
            </h3>

            <div className="space-y-3">
              {activities.slice(0, 5).map(act => (
                <div
                  key={act.id}
                  className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                      {act.title}
                    </p>
                    <p className="text-[10px] text-slate-400">{act.timestamp}</p>
                  </div>
                  <span
                    className={`font-extrabold shrink-0 ${
                      act.amountPoints > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-500'
                    }`}
                  >
                    {act.amountPoints > 0 ? `+${act.amountPoints}` : act.amountPoints} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
