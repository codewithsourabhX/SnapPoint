import React, { useState } from 'react';
import {
  User,
  Users,
  Clock,
  Lock,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Save,
  Copy,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { auth } from '../../lib/firebase';
import { signOut, updatePassword } from 'firebase/auth';

export const ProfilePage: React.FC = () => {
  const { user, setUser, addToast, setCurrentPage, withdrawalTransactions } = useApp();

  const [activeSection, setActiveSection] = useState<'menu' | 'about' | 'referrals' | 'history' | 'password'>('menu');

  // About Me Form State
  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country || 'India');

  // Password Form State
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Referrals State
  const [copiedCode, setCopiedCode] = useState(false);

  const isGoogleUser = auth.currentUser?.providerData.some(p => p.providerId === 'google.com');

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => {
      const updated = { ...prev, name, country };
      if (prev.uid) {
        import('../../lib/firebase').then(({ doc, db, updateDoc }) => {
          updateDoc(doc(db, 'users', prev.uid!), { name, country }).catch(err => console.error(err));
        });
      }
      return updated;
    });
    addToast({
      title: 'Profile Updated! 👤',
      message: 'Your personal information has been saved.',
      type: 'success'
    });
    setActiveSection('menu');
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
      setNewPassword('');
      setActiveSection('menu');
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage('landing');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  // 1. Menu List View (Main)
  if (activeSection === 'menu') {
    return (
      <div className="p-4 space-y-6 bg-slate-50 min-h-screen pb-24 text-slate-800">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4 relative">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl border border-slate-200 shrink-0 select-none">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="space-y-0.5">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Hi, {user.name}!</h2>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              USER ID: {user.uid ? user.uid.substring(0, 8).toUpperCase() : 'N/A'}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
            My Account
          </h3>
          <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs divide-y divide-slate-100">
            <button
              onClick={() => setActiveSection('about')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-slate-700" />
                <span className="text-xs font-bold text-slate-800">About Me</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveSection('referrals')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-slate-700" />
                <span className="text-xs font-bold text-slate-800">Referrals</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveSection('history')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-700" />
                <span className="text-xs font-bold text-slate-800">History</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {!isGoogleUser && (
              <button
                onClick={() => setActiveSection('password')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-slate-700" />
                  <span className="text-xs font-bold text-slate-800">Change Password</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
            Others
          </h3>
          <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs divide-y divide-slate-100">
            {(user.isAdmin || user.email === 'yadavsourabh8585@gmail.com') && (
              <button
                onClick={() => setCurrentPage('admin')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-500 font-extrabold" />
                  <span className="text-xs font-extrabold text-slate-800">Admin Control Panel</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-rose-50/50 transition-colors text-rose-600"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold">Log Out</span>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. About Me Section
  if (activeSection === 'about') {
    return (
      <div className="p-4 space-y-5 bg-slate-50 min-h-screen pb-24 text-slate-800">
        <button
          onClick={() => setActiveSection('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">About Me</h2>

        <form onSubmit={handleSaveProfile} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Email Address (Cannot be changed)</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Country / Region</label>
            <input
              type="text"
              required
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </form>
      </div>
    );
  }

  // 3. Referrals Section
  if (activeSection === 'referrals') {
    return (
      <div className="p-4 space-y-5 bg-slate-50 min-h-screen pb-24 text-slate-800">
        <button
          onClick={() => setActiveSection('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Referrals</h2>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[9px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-extrabold uppercase tracking-wider">
            First Refer Bonus + 10% Commission
          </span>
          <h3 className="text-sm font-extrabold text-slate-900">Invite Friends & Earn SnapPoints</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            Get 250 SnapPoints (₹25) starter bonus on your first referral, plus a 10% lifetime commission on all survey earnings from every friend you refer!
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Your Referral Code
              </label>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Friends enter this code during sign up to get 500 welcome SnapPoints.
              </p>
            </div>
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between font-mono font-extrabold text-lg tracking-widest text-slate-900">
              <span>{user.referralCode}</span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Total</span>
            <span className="text-base font-extrabold text-slate-900 block mt-0.5">{user.totalReferrals || 0}</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Friends</span>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Active</span>
            <span className="text-base font-extrabold text-emerald-600 block mt-0.5">{user.activeReferrals || 0}</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Earners</span>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Income</span>
            <span className="text-base font-extrabold text-rose-500 block mt-0.5">₹{user.referralEarningsInRupees || 0}</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Earned</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. History Section
  if (activeSection === 'history') {
    return (
      <div className="p-4 space-y-5 bg-slate-50 min-h-screen pb-24 text-slate-800">
        <button
          onClick={() => setActiveSection('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Withdrawal History</h2>

        {withdrawalTransactions.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500">
            You haven't requested any payouts yet.
          </div>
        ) : (
          <div className="space-y-3">
            {withdrawalTransactions.map(tx => (
              <div key={tx.id} className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900">#{tx.id}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[9px] font-extrabold uppercase">{tx.method}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">{tx.date}</div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[180px] font-medium">{tx.accountDetail}</div>
                </div>

                <div className="text-right space-y-1.5 shrink-0">
                  <div className="font-extrabold text-xs text-slate-900">₹{tx.amountInRupees}</div>
                  <div>
                    {(tx.status === 'Completed' || tx.status === 'Approved') && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-bold border border-emerald-500/20">
                        Completed
                      </span>
                    )}
                    {tx.status === 'Pending' && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 text-[10px] font-bold border border-amber-500/20">
                        Pending
                      </span>
                    )}
                    {tx.status === 'Rejected' && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 text-[10px] font-bold border border-rose-500/20">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 5. Password Update Section
  if (activeSection === 'password') {
    return (
      <div className="p-4 space-y-5 bg-slate-50 min-h-screen pb-24 text-slate-800">
        <button
          onClick={() => setActiveSection('menu')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Change Password</h2>

        <form onSubmit={handleChangePassword} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-600 mb-1">New Password</label>
            <input
              type="password"
              required
              placeholder="Min. 6 characters"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>{passwordLoading ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </form>
      </div>
    );
  }

  return null;
};
