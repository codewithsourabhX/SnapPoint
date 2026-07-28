import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'High-Paying Survey Available! 🎯',
    message: 'A new tech survey worth 850 Points (₹85) matches your profile. Complete it before slots fill up!',
    timestamp: '10 minutes ago',
    type: 'survey',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Daily Streak Bonus Ready! 🔥',
    message: 'Your Day 5 daily bonus of 125 Points is ready to claim in your Daily Bonus dashboard.',
    timestamp: '1 hour ago',
    type: 'daily',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Payout Approved! 💸',
    message: 'Your UPI withdrawal request of ₹500 (5,000 Points) has been successfully approved and sent.',
    timestamp: 'Yesterday at 14:22',
    type: 'reward',
    read: true
  },
  {
    id: 'notif-4',
    title: 'New Referral Joined! 🎉',
    message: 'Your friend Rahul signed up using your link BEE99. You earned 200 referral bonus points!',
    timestamp: '2 days ago',
    type: 'referral',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Welcome to PollBee Platform! 🌟',
    message: 'Explore surveys, tasks, and daily bonus streaks to start earning real cash rewards.',
    timestamp: '3 days ago',
    type: 'system',
    read: true
  }
];
