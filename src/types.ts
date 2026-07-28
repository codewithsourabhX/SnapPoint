export type PageView = 
  | 'landing'
  | 'signup'
  | 'login'
  | 'dashboard'
  | 'surveys'
  | 'referrals'
  | 'profile'
  | 'notifications'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'admin'
  | 'withdraw';

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  country?: string;
  points: number;
  balanceInRupees: number;
  completedSurveysCount: number;
  pendingRewardsInRupees: number;
  referralEarningsInRupees: number;
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  activeReferrals: number;
  currentStreak: number;
  lastClaimedDate?: string;
  isAdmin?: boolean;
  referredBy?: string;
  referredByCode?: string;
  createdAt?: string;
}

export interface SurveyQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface Survey {
  id: string;
  title: string;
  provider: string;
  points: number;
  estimatedMinutes: number;
  rating: number;
  reviewsCount: number;
  status: 'Available' | 'In Progress' | 'Completed';
  description: string;
  category?: string;
  difficulty?: string;
  surveyUrl?: string;
  questions?: SurveyQuestion[];
}

export interface WithdrawalOption {
  id: string;
  name: string;
  type: 'UPI' | 'PayPal' | 'Amazon' | 'Flipkart';
  minPoints: number;
  equivalentRupees: number;
  iconName: string;
  accentColor: string;
  description: string;
}

export interface WithdrawalTransaction {
  id: string;
  date: string;
  method: 'UPI' | 'PayPal' | 'Amazon' | 'Flipkart';
  accountDetail: string;
  amountInPoints: number;
  amountInRupees: number;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Completed';
  userEmail: string;
  userName: string;
  uid?: string;
  // Specific details
  upiId?: string;
  realFirstName?: string;
  realLastName?: string;
  bankDetails?: string;
  bankName?: string;
  ifscCode?: string;
  accountNo?: string;
  paypalEmail?: string;
  paypalName?: string;
  giftCardEmail?: string;
}

export interface DetailedWithdrawalPayload {
  method: 'UPI' | 'PayPal' | 'Amazon' | 'Flipkart';
  amountPoints: number;
  upiId?: string;
  realFirstName?: string;
  realLastName?: string;
  bankDetails?: string;
  bankName?: string;
  ifscCode?: string;
  accountNo?: string;
  paypalEmail?: string;
  paypalName?: string;
  giftCardEmail?: string;
}

export interface ReferralLeader {
  rank: number;
  name: string;
  avatar: string;
  totalReferrals: number;
  earningsRupees: number;
  badge?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'survey' | 'reward' | 'referral' | 'daily' | 'system';
  read: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Surveys' | 'Payouts' | 'Account' | 'Referrals';
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface ActivityLog {
  id: string;
  title: string;
  amountPoints: number;
  type: 'survey' | 'bonus' | 'referral' | 'withdrawal' | 'task' | 'game';
  timestamp: string;
}

export type TaskCategory =
  | 'All'
  | 'App installs'
  | 'Website visits'
  | 'Signups'
  | 'Social media'
  | 'Video watching'
  | 'Offers';

export interface TaskItem {
  id: string;
  title: string;
  category: TaskCategory;
  rewardPoints: number;
  estimatedMinutes: number;
  badge?: string;
  requirements: string[];
  description: string;
  status: 'Available' | 'Pending' | 'Completed';
  externalUrl?: string;
}

