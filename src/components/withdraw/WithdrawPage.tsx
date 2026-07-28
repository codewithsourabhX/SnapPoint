import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  Building2,
  Send,
  CheckCircle2,
  XCircle,
  Coins,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Clock,
  Sparkles,
  Lock,
  X,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WithdrawPage: React.FC = () => {
  const { user, requestDetailedWithdrawal, setCurrentPage, withdrawalTransactions, refreshUserPayouts } = useApp();

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

  // Success Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formError, setFormError] = useState('');

  const targetGoal = 5000;
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
        setShowSuccessModal(true);
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
        setShowSuccessModal(true);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('surveys')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Surveys</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Encrypted Cashout</span>
        </div>
      </div>

      {/* Progress & Balance Overview */}
      <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Withdraw Money</h1>
            <p className="text-xs text-slate-400 mt-1">
              Transfer your earned PollBee points directly to your UPI bank account or PayPal wallet.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
            <Coins className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Your Balance</p>
              <p className="text-sm font-extrabold text-amber-400">
                {user.points.toLocaleString()} Pts (₹{user.balanceInRupees})
              </p>
            </div>
          </div>
        </div>

        {/* 5000 Pts Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Cashout Goal Progress</span>
            <span className="font-bold text-amber-400">
              {user.points.toLocaleString()} / 5,000 Points ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Method Selection & Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Select Payout Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* UPI Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedMethod('UPI');
                setFormError('');
              }}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 relative overflow-hidden ${
                selectedMethod === 'UPI'
                  ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              <div
                className={`p-3 rounded-xl ${
                  selectedMethod === 'UPI'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">UPI / Bank Transfer</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Instant
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Direct payout to GPay, PhonePe, Paytm or any Indian Bank Account.
                </p>
              </div>
            </button>

            {/* PayPal Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedMethod('PayPal');
                setFormError('');
              }}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 relative overflow-hidden ${
                selectedMethod === 'PayPal'
                  ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              <div
                className={`p-3 rounded-xl ${
                  selectedMethod === 'PayPal'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Send className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">PayPal Cash</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    Global
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  International cash payout directly to your verified PayPal email.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Withdrawal Amount Selection */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Select Points to Redeem
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[5000, 10000, 20000].map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => setPointsToWithdraw(amt)}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                  pointsToWithdraw === amt
                    ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-xs'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {amt.toLocaleString()} Pts = ₹{amt / 10}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Form depending on method */}
        <form onSubmit={handleWithdrawSubmit} className="space-y-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Enter {selectedMethod} Receiving Details</span>
            </h3>

            {selectedMethod === 'UPI' ? (
              <div className="space-y-4">
                {/* First and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={upiFirstName}
                      onChange={e => setUpiFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharma"
                      value={upiLastName}
                      onChange={e => setUpiLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* UPI ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    UPI ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9876543210@ybl or name@okaxis"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Bank Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Bank of India / HDFC Bank"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* IFSC Code & Account No */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SBIN0001234"
                      value={ifscCode}
                      onChange={e => setIfscCode(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Account No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 123456789012"
                      value={accountNo}
                      onChange={e => setAccountNo(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* PayPal Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={paypalName}
                    onChange={e => setPaypalName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    PayPal Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. user@paypal.com"
                    value={paypalEmail}
                    onChange={e => setPaypalEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {formError && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Submit Withdraw Button */}
          <button
            type="submit"
            disabled={user.points < pointsToWithdraw}
            className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
              user.points >= pointsToWithdraw
                ? selectedMethod === 'UPI'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-98'
                  : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-98'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>
              {user.points >= pointsToWithdraw
                ? `Withdraw ${pointsToWithdraw.toLocaleString()} Points (₹${pointsToWithdraw / 10})`
                : `Need ${(pointsToWithdraw - user.points).toLocaleString()} More Points to Cashout`}
            </span>
          </button>
        </form>
      </div>

      {/* Withdrawal History & Live Status */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-500" />
            <span>Withdrawal History & Live Status</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Total Requests: {withdrawalTransactions.length}
          </span>
        </div>

        {withdrawalTransactions.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            You haven't submitted any withdrawal requests yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Request ID & Date</th>
                  <th className="p-3">Method & Details</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {withdrawalTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-semibold">
                      <div className="text-slate-900 dark:text-white">#{tx.id}</div>
                      <div className="text-[10px] text-slate-400">{tx.date}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-amber-600 dark:text-amber-400">{tx.method}</div>
                      <div className="text-[11px] text-slate-500">{tx.accountDetail}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-extrabold text-slate-900 dark:text-white">₹{tx.amountInRupees}</div>
                      <div className="text-[10px] text-slate-400">{tx.amountInPoints.toLocaleString()} Pts</div>
                    </td>
                    <td className="p-3 text-right">
                      {(tx.status === 'Completed' || tx.status === 'Approved') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                      {tx.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                          <Clock className="w-3.5 h-3.5 animate-pulse" /> Pending
                        </span>
                      )}
                      {tx.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[11px]">
                          <XCircle className="w-3.5 h-3.5" /> Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SUCCESS POPUP MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4 relative"
            >
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setCurrentPage('surveys');
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-amber-500 dark:text-amber-400">
                  Congratulations, your time pays off! 🎉
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-2 leading-relaxed">
                  Your withdrawal request was submitted successfully! You will receive your reward in the next 48 hours.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Processing Team Notified • Payout inside 48 Hours</span>
              </div>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setCurrentPage('surveys');
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs hover:bg-slate-800 dark:hover:bg-white transition-all"
              >
                Return to Surveys
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
