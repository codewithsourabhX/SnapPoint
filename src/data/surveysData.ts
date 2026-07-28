import { Survey } from '../types';

export const INITIAL_SURVEYS: Survey[] = [
  {
    id: 's-101',
    title: 'Premium Consumer Opinion Survey #1',
    provider: 'Market Research',
    points: 1250,
    estimatedMinutes: 10,
    rating: 4.9,
    reviewsCount: 3200,
    status: 'Available',
    description: 'High payout opinion research survey powered by top global research partners.',
    category: 'Lifestyle',
    difficulty: 'Easy'
  },
  {
    id: 's-102',
    title: 'Consumer Habits & Brand Feedback',
    provider: 'Brand Insights',
    points: 850,
    estimatedMinutes: 7,
    rating: 4.8,
    reviewsCount: 1890,
    status: 'Available',
    description: 'Share your brand preferences and shopping choices with verified market research partners.',
    category: 'Shopping',
    difficulty: 'Medium'
  },
  {
    id: 's-103',
    title: 'Digital Lifestyle & Media Study',
    provider: 'Tech Pulse Research',
    points: 1500,
    estimatedMinutes: 12,
    rating: 4.95,
    reviewsCount: 4120,
    status: 'Available',
    description: 'Provide quick feedback on digital media subscriptions and app usage.',
    category: 'Technology',
    difficulty: 'Easy'
  },
  {
    id: 's-104',
    title: 'Financial Services & Mobile Banking Survey',
    provider: 'FinTech Pulse',
    points: 2000,
    estimatedMinutes: 15,
    rating: 4.85,
    reviewsCount: 2450,
    status: 'Available',
    description: 'Share your thoughts on digital wallets, UPI apps, and mobile banking experiences.',
    category: 'Finance',
    difficulty: 'Medium'
  }
];

