import { Player, Bonus, Region } from './types';

export const TARGET_DATE = '2026-03-05T00:00:00';
export const REFERRAL_CODE = 'BOAT';
export const REFERRAL_LINK = 'https://betstrike.com/ref/boat';
export const JUICE_LINK = 'https://juice.gg/r/gang';
export const DISCORD_LINK = 'https://discord.gg/meMNuXha';
export const KICK_LINK = 'https://kick.com/imboat';

export const BONUSES: Bonus[] = [
  {
    title: 'DEPOSIT BONUS',
    value: '10%',
    icon: 'Zap',
    color: 'from-[#7c3aed] to-[#7c3aed]'
  },
  {
    title: 'LOSSBACK',
    value: '5%',
    icon: 'Shield',
    color: 'from-[#3b82f6] to-[#1d4ed8]'
  }
];

// Specific data from screenshot
const BETSTRIKE_REAL_DATA: Player[] = [
  { rank: 1, username: 'niggaboy', wagered: 3660, prize: 500, change: 'neutral' },
  { rank: 2, username: 'angelofdeath', wagered: 1803, prize: 250, change: 'neutral' },
  { rank: 3, username: 'Boatmom', wagered: 1670, prize: 125, change: 'neutral' },
  { rank: 4, username: 'Omixboat', wagered: 1157, prize: 75, change: 'neutral' },
  { rank: 5, username: 'Optimnob', wagered: 731, prize: 50, change: 'neutral' },
];

export const LEADERBOARD_DATA: Record<Region, Player[]> = {
  GLOBAL: BETSTRIKE_REAL_DATA,
};

// Empty names, 0 wagered, but keep prizes and positions
export const JUICE_PLAYERS: Player[] = [
  { rank: 1, username: '', wagered: 0, prize: 250, change: 'neutral' },
  { rank: 2, username: '', wagered: 0, prize: 150, change: 'neutral' },
  { rank: 3, username: '', wagered: 0, prize: 50, change: 'neutral' },
  { rank: 4, username: '', wagered: 0, prize: 25, change: 'neutral' },
  { rank: 5, username: '', wagered: 0, prize: 15, change: 'neutral' },
  { rank: 6, username: '', wagered: 0, prize: 10, change: 'neutral' },
];

export const MASK_USERNAME = (name: string) => {
  return name;
};

export const FORMAT_CURRENCY = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};