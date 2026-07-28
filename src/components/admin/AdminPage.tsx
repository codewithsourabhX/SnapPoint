import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  ShieldCheck,
  RefreshCw,
  Award,
  DollarSign,
  AlertTriangle,
  Mail,
  Coins
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WithdrawalTransaction, UserProfile } from '../../types';
import { db, collection, getDocs, doc, setDoc } from '../../lib/firebase';

export const AdminPage: React.FC = () => {
  const { withdrawalTransactions, user, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'payouts' | 'users' | 'analytics'>('payouts');
  const [payoutList, setPayoutList] = useState<WithdrawalTransaction[]>(withdrawalTransactions);
  const [userList, setUserList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Strict Admin Guard
  if (user.email !== 'yadavsourabh8585@gmail.com' && !user.isAdmin) {
    return (
      <div className="p-8 max-w-md mx-auto my-12 text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          This control panel is strictly restricted to administrator <strong className="text-amber-500">yadavsourabh8585@gmail.com</strong>.
        </p>
      </div>
    );
  }

  // Fetch users & payout requests from Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch payouts from Firestore
      const payoutsSnap = await getDocs(collection(db, 'payouts'));
      if (!payoutsSnap.empty) {
        const fetchedPayouts: WithdrawalTransaction[] = [];
        payoutsSnap.forEach(d => {
          fetchedPayouts.push({ id: d.id, ...d.data() } as WithdrawalTransaction);
        });
        setPayoutList(fetchedPayouts);
      } else {
        setPayoutList(withdrawalTransactions);
      }

      // Fetch users from Firestore
      const usersSnap = await getDocs(collection(db, 'users'));
      if (!usersSnap.empty) {
        const fetchedUsers: UserProfile[] = [];
        usersSnap.forEach(d => {
          fetchedUsers.push(d.data() as UserProfile);
        });
        setUserList(fetchedUsers);
      } else {
        // Fallback user list
        setUserList([
          user,
          {
            name: 'Rahul Sharma',
            email: 'rahul.s@example.com',
            points: 12500,
            balanceInRupees: 1250,
            completedSurveysCount: 22,
            pendingRewardsInRupees: 500,
            referralEarningsInRupees: 320,
            referralCode: 'BEE881',
            referralLink: 'https://pollbee.com/ref/BEE881',
            totalReferrals: 5,
            activeReferrals: 3,
            currentStreak: 7
          },
          {
            name: 'Priya Verma',
            email: 'priya.v@example.com',
            points: 8400,
            balanceInRupees: 840,
            completedSurveysCount: 15,
            pendingRewardsInRupees: 750,
            referralEarningsInRupees: 150,
            referralCode: 'BEE402',
            referralLink: 'https://pollbee.com/ref/BEE402',
            totalReferrals: 2,
            activeReferrals: 2,
            currentStreak: 12
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [withdrawalTransactions]);

  const handleUpdatePayoutStatus = async (id: string, newStatus: 'Pending' | 'Completed' | 'Approved' | 'Rejected') => {
    try {
      // Merge status update into Firestore payouts collection
      const payoutRef = doc(db, 'payouts', id);
      await setDoc(payoutRef, { status: newStatus }, { merge: true });
    } catch (e) {
      console.error('Firestore payout status update error:', e);
    }

    setPayoutList(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );

    addToast({
      title: `Payout Status Updated`,
      message: `Request ${id} status set to ${newStatus}.`,
      type: newStatus === 'Completed' || newStatus === 'Approved' ? 'success' : newStatus === 'Pending' ? 'info' : 'warning'
    });
  };

  // Calculate analytics
  const totalUsersCount = userList.length || 1;
  const totalSurveysDone = userList.reduce((acc, u) => acc + (u.completedSurveysCount || 0), 0);
  const totalPayoutRequested = payoutList.reduce((acc, p) => acc + (p.amountInRupees || 0), 0);
  const totalCompletedRupees = payoutList
    .filter(p => p.status === 'Completed' || p.status === 'Approved')
    .reduce((acc, p) => acc + (p.amountInRupees || 0), 0);

  const filteredPayouts = payoutList.filter(
    p =>
      p.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.method?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.accountDetail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = userList.filter(
    u =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.referralCode && u.referralCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Admin Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-amber-400 tracking-tight">
                PollBee Admin Control Panel
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                MASTER ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Logged in as: <strong className="text-amber-400 font-semibold">{user.email}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-all active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('payouts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'payouts'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payout Requests ({payoutList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Management ({userList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Overall Analytics</span>
        </button>
      </div>

      {/* Search Input */}
      {activeTab !== 'analytics' && (
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab === 'payouts' ? 'payouts by email, method, ID...' : 'users by name, email, code...'}`}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      )}

      {/* TAB 1: Payout Requests */}
      {activeTab === 'payouts' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>Withdrawal & Payment Requests</span>
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                Total Requests: {filteredPayouts.length}
              </span>
            </div>

            {filteredPayouts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No payout requests found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">User Details</th>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">Withdrawal Info</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Current Status</th>
                      <th className="p-3.5 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {filteredPayouts.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 dark:text-white">{tx.userName || 'PollBee Member'}</div>
                          <div className="text-[11px] text-slate-500">{tx.userEmail || tx.accountDetail}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{tx.date} • ID: #{tx.id}</div>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-[11px]">
                            {tx.method}
                          </span>
                        </td>

                        <td className="p-3.5 max-w-xs space-y-1">
                          {tx.method === 'UPI' && (
                            <div className="text-[11px] space-y-1">
                              <div><span className="text-slate-400">UPI ID:</span> <strong className="text-amber-500 font-extrabold">{tx.upiId || tx.accountDetail}</strong></div>
                              {(tx.realFirstName || tx.realLastName) && (
                                <div><span className="text-slate-400">Holder:</span> <strong className="text-slate-900 dark:text-white">{tx.realFirstName} {tx.realLastName}</strong></div>
                              )}
                              {tx.bankName && <div><span className="text-slate-400">Bank:</span> {tx.bankName}</div>}
                              {tx.accountNo && <div><span className="text-slate-400">A/C No:</span> {tx.accountNo}</div>}
                              {tx.ifscCode && <div><span className="text-slate-400">IFSC:</span> {tx.ifscCode}</div>}
                              {!tx.bankName && tx.bankDetails && (
                                <div className="text-[10px] text-slate-400 border-t border-slate-200/50 dark:border-slate-800 pt-0.5 mt-0.5">{tx.bankDetails}</div>
                              )}
                            </div>
                          )}

                          {tx.method === 'PayPal' && (
                            <div className="text-[11px] space-y-1">
                              <div><span className="text-slate-400">PayPal Email:</span> <strong className="text-amber-500 font-extrabold">{tx.paypalEmail || tx.accountDetail}</strong></div>
                              {tx.paypalName && <div><span className="text-slate-400">Account Name:</span> <strong className="text-slate-900 dark:text-white">{tx.paypalName}</strong></div>}
                            </div>
                          )}

                          {(tx.method === 'Amazon' || tx.method === 'Flipkart') && (
                            <div className="text-[11px]">
                              <div><span className="text-slate-400">Email:</span> <strong>{tx.giftCardEmail || tx.accountDetail}</strong></div>
                            </div>
                          )}
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-amber-600 dark:text-amber-400">₹{tx.amountInRupees}</div>
                          <div className="text-[11px] text-slate-400">{tx.amountInPoints.toLocaleString()} Pts</div>
                        </td>

                        <td className="p-3.5">
                          {(tx.status === 'Completed' || tx.status === 'Approved') && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                            </span>
                          )}
                          {tx.status === 'Pending' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold border border-amber-500/20">
                              <Clock className="w-3.5 h-3.5 animate-pulse" /> Pending
                            </span>
                          )}
                          {tx.status === 'Rejected' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold border border-rose-500/20">
                              <XCircle className="w-3.5 h-3.5" /> Rejected
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleUpdatePayoutStatus(tx.id, 'Pending')}
                              disabled={tx.status === 'Pending'}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all active:scale-95 ${
                                tx.status === 'Pending'
                                  ? 'bg-amber-500/20 text-amber-500 cursor-default opacity-80'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-500'
                              }`}
                            >
                              Pending
                            </button>
                            <button
                              onClick={() => handleUpdatePayoutStatus(tx.id, 'Completed')}
                              disabled={tx.status === 'Completed' || tx.status === 'Approved'}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all active:scale-95 ${
                                tx.status === 'Completed' || tx.status === 'Approved'
                                  ? 'bg-emerald-600 text-white cursor-default opacity-80'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white'
                              }`}
                            >
                              Completed
                            </button>
                            <button
                              onClick={() => handleUpdatePayoutStatus(tx.id, 'Rejected')}
                              disabled={tx.status === 'Rejected'}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all active:scale-95 ${
                                tx.status === 'Rejected'
                                  ? 'bg-rose-600 text-white cursor-default opacity-80'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-600 hover:text-white'
                              }`}
                            >
                              Rejected
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: User Management */}
      {activeTab === 'users' && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>Registered PollBee Users & Stats</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Total Users: {filteredUsers.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">User Profile</th>
                  <th className="p-3.5">Surveys Completed</th>
                  <th className="p-3.5">Current Points</th>
                  <th className="p-3.5">Balance (₹)</th>
                  <th className="p-3.5">Referral Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {filteredUsers.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs flex items-center justify-center border border-amber-300 shrink-0">
                        {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {u.email === 'yadavsourabh8585@gmail.com' && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 text-[9px] font-extrabold">ADMIN</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </div>
                    </td>

                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{u.completedSurveysCount || 0} Surveys</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">
                      <div className="flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-amber-500" />
                        <span>{(u.points || 0).toLocaleString()} Pts</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{u.balanceInRupees || Math.floor((u.points || 0) / 10)}
                    </td>

                    <td className="p-3.5 text-[11px]">
                      <div>Code: <strong className="text-amber-500">{u.referralCode || 'N/A'}</strong></div>
                      <div className="text-slate-400">{u.totalReferrals || 0} Referred | ₹{u.referralEarningsInRupees || 0} earned</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Overall Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Total Platform Users</span>
              <Users className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalUsersCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Registered members in Firestore</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Total Surveys Completed</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalSurveysDone}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Total user survey completions</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Payouts Requested</span>
              <CreditCard className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              ₹{totalPayoutRequested}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{payoutList.length} total withdrawal submissions</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Completed Rewards Paid</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{totalCompletedRupees}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Successfully disbursed</p>
          </div>
        </div>
      )}
    </div>
  );
};
