import { FAQItem } from '../types';

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do points translate into real currency?',
    answer: 'Every 10 SnapPoints equals ₹1 (or equivalent local currency). For example, 1,000 SnapPoints can be instantly redeemed for ₹100 via UPI, Amazon Gift Cards, Flipkart Vouchers, or PayPal Cash.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'What is the minimum withdrawal limit?',
    answer: 'The minimum threshold for redemption is only 1,000 SnapPoints (₹100), offering a low withdrawal limit for faster withdrawals. Once you reach 1,000 SnapPoints, you can submit a withdrawal request anytime.',
    category: 'Payouts'
  },
  {
    id: 'faq-3',
    question: 'How long does payout processing take?',
    answer: 'UPI and Amazon/Flipkart Digital Gift Cards are usually processed within 1 to 24 hours. PayPal transfers may take up to 48 hours for international clearing.',
    category: 'Payouts'
  },
  {
    id: 'faq-4',
    question: 'Why was I disqualified from a survey mid-way?',
    answer: 'Surveys seek specific target demographics (e.g. age, region, device type). If your answers do not match the researcher’s target criteria, the survey terminates early to save your time.',
    category: 'Surveys'
  },
  {
    id: 'faq-5',
    question: 'How does the Referral Program work?',
    answer: 'Share your unique referral code or link. You get a 250 SnapPoints (₹25) starter bonus on your first referral, plus a 10% lifetime commission on all SnapPoints earned by every friend you refer!',
    category: 'Referrals'
  },
  {
    id: 'faq-6',
    question: 'What happens if I miss my daily bonus streak?',
    answer: 'If you miss a day without logging in, your streak resets to Day 1. Log in daily to protect your progress towards the 30-day jackpot rewards!',
    category: 'General'
  }
];
