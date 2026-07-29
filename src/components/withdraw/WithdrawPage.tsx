import React, { useState, useEffect } from 'react';
import {
  Building2,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Lock,
  CreditCard,
  ShoppingCart,
  SlidersHorizontal,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WithdrawPage: React.FC = () => {
  const { user, requestDetailedWithdrawal, withdrawalTransactions, refreshUserPayouts } = useApp();

  useEffect(() => {
    refreshUserPayouts();
  }, []);

  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'PayPal'>('UPI');
  
  // UPI Form state
  const [upiFirstName, setUpiFirstName] = useState('');
  const [upiLastName, setUpiLastName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountNo, setAccountNo] = useState('');

  // PayPal Form state
  const [paypalName, setPaypalName] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  // Amount state
  const [pointsToWithdraw, setPointsToWithdraw] = useState<number>(5000);
  const [formError, setFormError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const targetGoal = 5000;
  const pointsNeeded = Math.max(0, targetGoal - user.points);
  const progressPercent = Math.min(100, Math.round((user.points / targetGoal) * 100));

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (user.points < pointsToWithdraw) {
      setFormError(`Insufficient points! You need at least ${pointsToWithdraw.toLocaleString()} pts.`);
      return;
    }

    if (selectedMethod === 'UPI') {
      if (!upiFirstName.trim() || !upiLastName.trim() || !upiId.trim() || !bankName.trim() || !ifscCode.trim() || !accountNo.trim()) {
        setFormError('Please fill in all UPI and Bank details.');
        return;
      }

      const success = requestDetailedWithdrawal({
        method: 'UPI',
        amountPoints: pointsToWithdraw,
        realFirstName: upiFirstName.trim(),
        realLastName: upiLastName.trim(),
        upiId: upiId.trim(),
        bankDetails: `Bank: ${bankName.trim()} | A/C: ${accountNo.trim()} | IFSC: ${ifscCode.trim()}`
      });

      if (success !== false) {
        setUpiFirstName('');
        setUpiLastName('');
        setUpiId('');
        setBankName('');
        setIfscCode('');
        setAccountNo('');
      }
    } else if (selectedMethod === 'PayPal') {
      if (!paypalName.trim() || !paypalEmail.trim()) {
        setFormError('Please fill in both PayPal name and email.');
        return;
      }

      const success = requestDetailedWithdrawal({
        method: 'PayPal',
        amountPoints: pointsToWithdraw,
        paypalName: paypalName.trim(),
        paypalEmail: paypalEmail.trim()
      });

      if (success !== false) {
        setPaypalName('');
        setPaypalEmail('');
      }
    }
  };

  // Filter withdrawal transactions by search query
  const filteredTxns = withdrawalTransactions.filter(tx => 
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-5 bg-slate-50 min-h-screen pb-24">
      {/* Progress & Balance Overview Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="text-center font-bold text-slate-800 text-xs">
          {pointsNeeded > 0 ? (
            <span>You need <strong className="text-rose-600 font-extrabold">{pointsNeeded.toLocaleString()}</strong> gp to redeem your first reward!</span>
          ) : (
            <span className="text-emerald-600 font-extrabold">You have enough points to redeem your reward! 🎉</span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {/* Progress track */}
          <div className="flex-1 relative h-6 bg-slate-100 rounded-full p-1 overflow-hidden">
            <div 
              className="h-full rounded-full bg-slate-900 transition-all duration-500 flex items-center pl-3"
              style={{ width: `${Math.max(12, progressPercent)}%` }}
            >
              <span className="text-[10px] font-black text-white leading-none">{user.points}</span>
            </div>
          </div>
          <div className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* PRO TIP box */}
      <div className="p-5 rounded-2xl bg-sky-500/5 border border-dashed border-sky-400/50 text-xs text-sky-800 space-y-2.5">
        <div className="flex items-center gap-2 font-extrabold text-sky-600 uppercase tracking-wider">
          <span className="text-base">💡</span>
          <span>PRO TIP</span>
        </div>
        <p className="leading-relaxed font-medium">
          SnapPoint offers quick and secure payouts via UPI and PayPal. Once you reach 5,000 points (equivalent to ₹500), you can request a withdrawal and start enjoying your earnings!
        </p>
      </div>

      {/* Reward Section Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-950 tracking-tight">Rewards</h2>
          <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search a reward"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200/80 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* PayPal & UPI Large Visual Selection Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* PayPal Reward Card */}
        <button
          onClick={() => setSelectedMethod('PayPal')}
          className={`p-5 rounded-2xl border text-center transition-all bg-white shadow-xs flex flex-col items-center justify-center gap-3 relative ${
            selectedMethod === 'PayPal' ? 'ring-2 ring-rose-500 border-rose-500' : 'border-slate-200/80'
          }`}
        >
          <div className="h-10 flex items-center justify-center">
            <span className="text-blue-600 font-black text-xl italic tracking-tighter">Pay<span className="text-cyan-500">Pal</span></span>
          </div>
          <span className="text-xs font-bold text-slate-800">PayPal Cashout</span>
          <span className="text-[10px] text-slate-400">Min: 5,000 Pts (₹500)</span>
        </button>

        {/* UPI Reward Card */}
        <button
          onClick={() => setSelectedMethod('UPI')}
          className={`p-5 rounded-2xl border text-center transition-all bg-white shadow-xs flex flex-col items-center justify-center gap-3 relative ${
            selectedMethod === 'UPI' ? 'ring-2 ring-rose-500 border-rose-500' : 'border-slate-200/80'
          }`}
        >
          <div className="h-10 flex items-center justify-center">
            <span className="text-emerald-600 font-black text-2xl tracking-wider">UPI</span>
          </div>
          <span className="text-xs font-bold text-slate-800">UPI Bank Payout</span>
          <span className="text-[10px] text-slate-400">Min: 5,000 Pts (₹500)</span>
        </button>
      </div>

      {/* Payout Details Forms */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
        {/* Amount Slider / Presets */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
            Select Points to Redeem
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[5000, 10000, 20000].map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => setPointsToWithdraw(amt)}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  pointsToWithdraw === amt
                    ? 'border-rose-500 bg-rose-500 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {amt.toLocaleString()} Pts = ₹{amt / 10}
              </button>
            ))}
          </div>
        </div>

        {/* Details Form fields */}
        <form onSubmit={handleWithdrawSubmit} className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-rose-500" />
              <span>Enter {selectedMethod} Receiving Details</span>
            </h3>

            {selectedMethod === 'UPI' ? (
              <div className="space-y-3.5 text-xs">
                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={upiFirstName}
                      onChange={e => setUpiFirstName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharma"
                      value={upiLastName}
                      onChange={e => setUpiLastName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                {/* UPI ID */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9876543210@ybl or name@okaxis"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                {/* Bank Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Bank of India"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                {/* Account Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SBIN0001234"
                      value={ifscCode}
                      onChange={e => setIfscCode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase tracking-wider"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      Account No *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12345678901"
                      value={accountNo}
                      onChange={e => setAccountNo(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* PayPal Form */
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={paypalName}
                    onChange={e => setPaypalName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">
                    PayPal Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. user@paypal.com"
                    value={paypalEmail}
                    onChange={e => setPaypalEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            )}
          </div>

          {formError && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Submit Withdraw Button */}
          <button
            type="submit"
            disabled={user.points < pointsToWithdraw}
            className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-2 ${
              user.points >= pointsToWithdraw
                ? selectedMethod === 'UPI'
                  ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-98'
                  : 'bg-rose-600 hover:bg-rose-500 text-white active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>
              {user.points >= pointsToWithdraw
                ? `Redeem ${pointsToWithdraw.toLocaleString()} gp (INR ${pointsToWithdraw / 10})`
                : `Need ${(pointsToWithdraw - user.points).toLocaleString()} gp to Cashout`}
            </span>
          </button>
        </form>
      </div>

      {/* Withdrawal History List */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-rose-500" />
            <span>Withdrawal History</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Total: {filteredTxns.length}
          </span>
        </div>

        {filteredTxns.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No withdrawal records found.
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredTxns.map(tx => (
              <div key={tx.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900">#{tx.id}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[9px] font-bold uppercase">{tx.method}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">{tx.date}</div>
                  <div className="text-[11px] text-slate-500 leading-tight truncate max-w-[200px]">{tx.accountDetail}</div>
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
    </div>
  );
};
