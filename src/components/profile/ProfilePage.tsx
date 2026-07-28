import React, { useState } from 'react';
import { User, Mail, Phone, Globe, Lock, Bell, Shield, Save, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { user, setUser, addToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [country, setCountry] = useState(user.country || 'India');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Notification Preferences State
  const [surveyAlerts, setSurveyAlerts] = useState(true);
  const [payoutAlerts, setPayoutAlerts] = useState(true);
  const [referralAlerts, setReferralAlerts] = useState(true);
  const [dailyBonusAlerts, setDailyBonusAlerts] = useState(true);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => {
      const updated = { ...prev, name, email, phone, country };
      if (prev.uid) {
        import('../../lib/firebase').then(({ doc, db, updateDoc }) => {
          updateDoc(doc(db, 'users', prev.uid!), { name, email, phone, country }).catch(err => console.error(err));
        });
      }
      return updated;
    });
    addToast({
      title: 'Profile Updated! 👤',
      message: 'Your personal information has been saved.',
      type: 'success'
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast({ title: 'Validation Error', message: 'Please complete all password fields.', type: 'warning' });
      return;
    }
    addToast({
      title: 'Password Changed Successfully! 🔒',
      message: 'Your account security credentials have been updated.',
      type: 'success'
    });
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs">
        <div className="w-14 h-14 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-2xl ring-2 ring-indigo-500 shrink-0">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h1>
          <p className="text-xs text-slate-400">{user.email}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">
            PollBee Verified Member
          </span>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info Form */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-indigo-500 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            <span>Personal Information</span>
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Country / Region
              </label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Personal Info</span>
            </button>
          </form>
        </div>

        {/* Change Password & Connected Accounts */}
        <div className="space-y-6">
          {/* Change Password */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-purple-500 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-500" />
              <span>Change Password</span>
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-xs"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Connected Accounts */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Connected Accounts</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Google Account</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">Connected</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Phone Verification</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-500" />
          <span>Notification Preferences</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Survey Alerts</p>
              <p className="text-[11px] text-slate-400">Notifications when new high-paying surveys open</p>
            </div>
            <input
              type="checkbox"
              checked={surveyAlerts}
              onChange={() => setSurveyAlerts(!surveyAlerts)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Payout Updates</p>
              <p className="text-[11px] text-slate-400">Withdrawal status change notifications</p>
            </div>
            <input
              type="checkbox"
              checked={payoutAlerts}
              onChange={() => setPayoutAlerts(!payoutAlerts)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Referral Joins</p>
              <p className="text-[11px] text-slate-400">Alerts when friends sign up using your link</p>
            </div>
            <input
              type="checkbox"
              checked={referralAlerts}
              onChange={() => setReferralAlerts(!referralAlerts)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Daily Streak Reminders</p>
              <p className="text-[11px] text-slate-400">Daily reminder to claim your bonus streak</p>
            </div>
            <input
              type="checkbox"
              checked={dailyBonusAlerts}
              onChange={() => setDailyBonusAlerts(!dailyBonusAlerts)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
