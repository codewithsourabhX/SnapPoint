import { ReferralLeader } from '../types';

export const REFERRAL_LEADERBOARD: ReferralLeader[] = [
  {
    rank: 1,
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    totalReferrals: 342,
    earningsRupees: 17100,
    badge: 'Legend'
  },
  {
    rank: 2,
    name: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    totalReferrals: 289,
    earningsRupees: 14450,
    badge: 'Master'
  },
  {
    rank: 3,
    name: 'Rohan Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    totalReferrals: 215,
    earningsRupees: 10750,
    badge: 'Diamond'
  },
  {
    rank: 4,
    name: 'Neha Kapoor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    totalReferrals: 178,
    earningsRupees: 8900,
    badge: 'Gold'
  },
  {
    rank: 5,
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    totalReferrals: 142,
    earningsRupees: 7100,
    badge: 'Silver'
  }
];

export const REFERRAL_MILESTONES = [
  { count: 5, rewardPoints: 1000, rewardRupees: 100, title: 'Starter Booster' },
  { count: 20, rewardPoints: 5000, rewardRupees: 500, title: 'Pro Ambassador' },
  { count: 50, rewardPoints: 15000, rewardRupees: 1500, title: 'Referral Master' },
  { count: 100, rewardPoints: 35000, rewardRupees: 3500, title: 'EarnPulse Partner' }
];
