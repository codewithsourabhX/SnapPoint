import { ActivityLog } from '../types';

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    title: 'Completed TechInsight AI Survey',
    amountPoints: 850,
    type: 'survey',
    timestamp: 'Today, 02:15 PM'
  },
  {
    id: 'act-2',
    title: 'Claimed Day 4 Streak Bonus',
    amountPoints: 110,
    type: 'bonus',
    timestamp: 'Today, 09:30 AM'
  },
  {
    id: 'act-3',
    title: 'Instagram Social Media Task Completed',
    amountPoints: 300,
    type: 'task',
    timestamp: 'Yesterday, 06:20 PM'
  },
  {
    id: 'act-4',
    title: 'Referral Bonus: Rahul joined',
    amountPoints: 200,
    type: 'referral',
    timestamp: '2 days ago'
  },
  {
    id: 'act-5',
    title: 'Daily Spin & Win Wheel',
    amountPoints: 150,
    type: 'game',
    timestamp: '3 days ago'
  }
];
