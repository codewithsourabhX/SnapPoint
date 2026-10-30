import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Gift,
  IndianRupee,
  LockKeyhole,
  Menu,
  QrCode,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_FAQS } from '../../data/faqData';

const steps = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Sign up with your email or Google account. Your welcome bonus is added to your SnapPoint balance.',
    icon: LockKeyhole,
  },
  {
    number: '02',
    title: 'Share your opinion',
    description: 'Find available surveys, answer a few questions and earn SnapPoints for your time.',
    icon: Zap,
  },
  {
    number: '03',
    title: 'Redeem your points',
    description: 'Once you reach the minimum balance, request a payout through a supported reward option.',
    icon: Wallet,
  },
];

const payoutOptions = [
  { title: 'UPI transfer', detail: 'GPay · PhonePe · Paytm', icon: QrCode },
  { title: 'PayPal', detail: 'Direct email payout', icon: IndianRupee },
  { title: 'Amazon gift card', detail: 'Digital voucher', icon: Gift },
  { title: 'Flipkart gift card', detail: 'Digital voucher', icon: Gift },
];

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (page: 'signup' | 'login') => {
    setMenuOpen(false);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => setCurrentPage('landing')} className="flex items-center gap-2.5" aria-label="SnapPoint home">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-xl object-contain" />
            <span className="text-[19px] font-bold tracking-tight">Snap<span className="text-indigo-600">Point</span></span>
          </button>

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-slate-600 md:flex">
            <a href="#how-it-works" className="transition hover:text-indigo-600">How it works</a>
            <a href="#rewards" className="transition hover:text-indigo-600">Rewards</a>
            <a href="#faq" className="transition hover:text-indigo-600">FAQs</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => goTo('login')} className="px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-indigo-600">Log in</button>
            <button onClick={() => goTo('signup')} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700">Create account</button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium text-slate-700">
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
              <a href="#rewards" onClick={() => setMenuOpen(false)}>Rewards</a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
              <div className="flex gap-3 border-t border-slate-100 pt-4">
                <button onClick={() => goTo('login')} className="flex-1 rounded-lg border border-slate-200 py-2.5">Log in</button>
                <button onClick={() => goTo('signup')} className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-white">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="overflow-hidden bg-[#f7f8fc]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Your opinion has value
              </div>
              <h1 className="max-w-xl text-[2.65rem] font-bold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.65rem]">
                Turn your opinions into <span className="text-indigo-600">real rewards.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-[17px]">
                Take surveys, collect SnapPoints and redeem rewards. Get <strong className="font-semibold text-slate-900">500 bonus SnapPoints</strong> when you create your account.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => goTo('signup')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/15 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                  Get started for free <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => goTo('login')} className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">I already have an account</button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Free to join</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> 500 welcome points</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Multiple payout options</span>
              </div>
            </motion.div>

            {/* Simple product preview — illustrative, not a live balance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }} className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute -left-8 top-12 h-36 w-36 rounded-full bg-indigo-200/60 blur-3xl" />
              <div className="absolute -right-5 bottom-4 h-40 w-40 rounded-full bg-sky-200/70 blur-3xl" />
              <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.28)] sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg object-contain" />
                    <div><p className="text-sm font-bold text-slate-900">Your rewards</p><p className="text-[11px] text-slate-500">A little progress adds up</p></div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">Example</span>
                </div>
                <div className="mt-5 rounded-xl bg-[#f4f6ff] p-5">
                  <p className="text-xs font-medium text-slate-500">SnapPoint balance</p>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-3xl font-bold tracking-tight text-slate-950">1,250 <span className="text-sm font-semibold text-indigo-600">SP</span></p>
                    <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">≈ ₹125</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-100"><div className="h-full w-[78%] rounded-full bg-indigo-600" /></div>
                  <p className="mt-2 text-[11px] text-slate-500">Illustrative balance for design preview</p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">Ways to earn</p><span className="text-[11px] font-medium text-slate-400">Explore opportunities</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600"><Zap className="h-4 w-4" /></span><div className="flex-1"><p className="text-xs font-semibold text-slate-800">Opinion surveys</p><p className="mt-0.5 text-[10px] text-slate-500">Share feedback on everyday topics</p></div><ArrowRight className="h-4 w-4 text-slate-400" /></div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600"><Gift className="h-4 w-4" /></span><div className="flex-1"><p className="text-xs font-semibold text-slate-800">Rewards</p><p className="mt-0.5 text-[10px] text-slate-500">Choose from available payout options</p></div><ArrowRight className="h-4 w-4 text-slate-400" /></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust / key details */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-slate-100 px-5 py-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            <div className="py-3 text-center sm:py-1"><p className="text-lg font-bold text-slate-900">1,000 SP</p><p className="mt-1 text-xs text-slate-500">Minimum redemption</p></div>
            <div className="py-3 text-center sm:py-1"><p className="text-lg font-bold text-slate-900">₹100</p><p className="mt-1 text-xs text-slate-500">Equivalent value</p></div>
            <div className="py-3 text-center sm:py-1"><p className="text-lg font-bold text-slate-900">₹25 + 10%</p><p className="mt-1 text-xs text-slate-500">Referral rewards</p></div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto mb-11 max-w-xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Simple from start to finish</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">How SnapPoint works</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">Three simple steps to get started.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map(({ number, title, description, icon: Icon }) => (
                <div key={number} className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/5">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-widest text-indigo-600">{number}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon className="h-5 w-5" /></span></div>
                  <h3 className="mt-6 text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payouts */}
        <section id="rewards" className="scroll-mt-24 border-y border-slate-100 bg-[#f7f8fc] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Redeem your points</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Rewards that work for you</h2><p className="mt-3 text-sm text-slate-500">Choose from the payout methods available on SnapPoint.</p></div>
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"><span className="text-slate-500">Minimum payout </span><strong className="text-slate-900">1,000 SP = ₹100</strong></div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {payoutOptions.map(({ title, detail, icon: Icon }) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3><p className="mt-1 text-[11px] text-slate-500">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="mb-9 text-center"><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><CircleHelp className="h-5 w-5" /></span><h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Frequently asked questions</h2><p className="mt-2 text-sm text-slate-500">A few things you might want to know.</p></div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {INITIAL_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return <div key={faq.id}>
                  <button onClick={() => setOpenFaqId(isOpen ? null : faq.id)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-slate-800"><span>{faq.question}</span><ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} /></button>
                  {isOpen && <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-slate-500">{faq.answer}</p>}
                </div>;
              })}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="mx-auto max-w-6xl rounded-2xl bg-indigo-600 px-6 py-12 text-center sm:px-12 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-100">Your next step starts here</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Make your opinions count.</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-indigo-100">Create your free account and get 500 SnapPoints to start with.</p>
            <button onClick={() => goTo('signup')} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50">Create free account <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="" className="h-7 w-7 rounded-lg object-contain" /><span className="font-semibold text-slate-700">SnapPoint</span><span>© {new Date().getFullYear()}</span></div>
          <p>Share your opinion. Earn rewards.</p>
          <div className="flex gap-5"><button onClick={() => setCurrentPage('help')} className="hover:text-indigo-600">Help centre</button><button onClick={() => setCurrentPage('terms')} className="hover:text-indigo-600">Terms</button><button onClick={() => setCurrentPage('privacy')} className="hover:text-indigo-600">Privacy</button></div>
        </div>
      </footer>
    </div>
  );
};
