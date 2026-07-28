import { TaskItem } from '../types';

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-001',
    title: 'Install & Try InvestX Stocks App',
    category: 'App installs',
    rewardPoints: 1200,
    estimatedMinutes: 5,
    badge: 'Popular',
    requirements: [
      'Download and install InvestX App from Google Play / App Store',
      'Open the app and complete basic registration',
      'Keep app installed for at least 48 hours'
    ],
    description: 'Get rewarded for exploring InvestX, a zero-brokerage trading and mutual fund investment platform.',
    status: 'Available'
  },
  {
    id: 'tsk-002',
    title: 'Visit & Explore TechPulse Pro Review',
    category: 'Website visits',
    rewardPoints: 250,
    estimatedMinutes: 2,
    badge: 'Fast & Easy',
    requirements: [
      'Click the task link to visit TechPulse Pro website',
      'Stay on page for at least 60 seconds',
      'Scroll down to the review section and read 2 articles'
    ],
    description: 'Read the latest smartphone reviews and hardware comparisons on TechPulse Pro.',
    status: 'Available'
  },
  {
    id: 'tsk-003',
    title: 'Create Account on CloudDrive 50GB Free',
    category: 'Signups',
    rewardPoints: 800,
    estimatedMinutes: 4,
    badge: 'High Payout',
    requirements: [
      'Click link to open CloudDrive registration page',
      'Sign up using a valid email address',
      'Verify your email address via confirmation email link'
    ],
    description: 'Claim 50GB secure cloud storage while earning points for creating a free account.',
    status: 'Available'
  },
  {
    id: 'tsk-004',
    title: 'Follow EarnPulse Official on Instagram',
    category: 'Social media',
    rewardPoints: 300,
    estimatedMinutes: 1,
    badge: 'Instant',
    requirements: [
      'Follow @EarnPulseOfficial on Instagram',
      'Like the latest pinned post',
      'Enter your Instagram handle for verification'
    ],
    description: 'Stay updated on exclusive promo codes, weekly giveaways, and flash bonus events!',
    status: 'Available'
  },
  {
    id: 'tsk-005',
    title: 'Watch Product Launch Keynote Video (3 mins)',
    category: 'Video watching',
    rewardPoints: 400,
    estimatedMinutes: 3,
    badge: 'Easy',
    requirements: [
      'Watch full 3-minute video without skipping',
      'Answer a 1-question verification quiz at the end'
    ],
    description: 'Watch the highlights of the new flagship tablet launch and learn its top features.',
    status: 'Available'
  },
  {
    id: 'tsk-006',
    title: 'Complete Free Credit Score Check',
    category: 'Offers',
    rewardPoints: 1500,
    estimatedMinutes: 5,
    badge: 'Top Offer',
    requirements: [
      'Enter basic details on partner site',
      'Check your free credit score report without affecting score',
      'Take a screenshot of verification page'
    ],
    description: 'Check your official credit score report for 100% free and earn massive reward points!',
    status: 'Available'
  },
  {
    id: 'tsk-007',
    title: 'Join EarnPulse Telegram Community',
    category: 'Social media',
    rewardPoints: 350,
    estimatedMinutes: 1,
    badge: 'Instant',
    requirements: [
      'Join EarnPulse Official Telegram Channel',
      'Stay subscribed to receive instant survey alerts'
    ],
    description: 'Get real-time alerts whenever high-paying surveys and daily promo codes drop.',
    status: 'Available'
  }
];
