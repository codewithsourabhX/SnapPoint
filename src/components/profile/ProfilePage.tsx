import React, { useState } from 'react';
import { User, Mail, Phone, Globe, Lock, Bell, Shield, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth } from '../../lib/firebase';
import { updatePassword } from 'firebase/auth';

export const ProfilePage: React.FC = () => {
  const { user, setUser, addToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [country, setCountry] = useState(user.country || 'India');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const isGoogleUser = auth.currentUser?.providerData.some(p => p.providerId === 'google.com');

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGoogleUser) return;
    if (!newPassword) {
      addToast({ title: 'Validation Error', message: 'Please enter a new password.', type: 'warning' });
      return;
    }
    if (newPassword.length < 6) {
      addToast({ title: 'Validation Error', message: 'Password must be at least 6 characters long.', type: 'warning' });
      return;
    }
    if (!auth.currentUser) return;

    setPasswordLoading(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      addToast({
        title: 'Password Changed Successfully! 🔒',
        message: 'Your account security credentials have been updated.',
        type: 'success'
      });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      console.error('Password change error:', err);
      let errMsg = err.message || 'Failed to update password.';
      if (err.code === 'auth/requires-recent-login') {
        errMsg = 'This operation is sensitive and requires recent authentication. Please log out and log back in to change your password.';
      }
      addToast({
        title: 'Password Update Failed',
        message: errMsg,
        type: 'error'
      });
    } finally {
      setPasswordLoading(false);
    }
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
                Email Address (Cannot be changed)
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/30 text-slate-500 cursor-not-allowed focus:outline-none"
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

            {isGoogleUser ? (
              <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-slate-800 border border-amber-500/20 text-xs font-bold text-amber-800 dark:text-amber-400 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>You are signed in with Google. Password management and security are handled directly through your Google Account.</span>
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
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
                  disabled={passwordLoading}
                  className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {passwordLoading ? 'Updating Password...' : 'Update Password'}
                </button>
              </form>
            )}
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
