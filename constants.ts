import { Player, Bonus, Region } from './types';

export const TARGET_DATE = '2026-03-10T00:00:00';
export const REFERRAL_CODE = 'BOAT';
export const REFERRAL_LINK = 'https://betstrike.com/ref/boat';
export const DISCORD_LINK = 'https://discord.gg/zDWv3Ba9b';
export const KICK_LINK = 'https://kick.com/imboat';

export const BONUSES: Bonus[] = [
  {
    title: 'DEPOSIT BONUS',
    value: '5%',
    icon: 'Zap',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    title: 'LOSSBACK',
    value: '5%',
    icon: 'Shield',
    color: 'from-blue-500 to-cyan-500'
  }
];

// Raw data provided
const RAW_PLAYERS = [
  { username: 'niggaboy', wagered: 3660 },
  { username: 'angelofdeath', wagered: 1803 },
  { username: 'Boatmom', wagered: 1670 },
  { username: 'Omixboat', wagered: 1157 },
  { username: 'Optimnob', wagered: 731 },
];

const generateRealData = (region: string): Player[] => {
  // Sort by wagered descending just in case
  const sortedPlayers = [...RAW_PLAYERS].sort((a, b) => b.wagered - a.wagered);

  return sortedPlayers.map((p, index) => {
    const rank = index + 1;
    let prize = 0;
    if (rank === 1) prize = 500;
    else if (rank === 2) prize = 250;
    else if (rank === 3) prize = 125;
    else if (rank === 4) prize = 75;
    else if (rank === 5) prize = 50;

    return {
      rank,
      username: p.username,
      wagered: p.wagered,
      prize,
      change: 'neutral'
    };
  });
};

export const LEADERBOARD_DATA: Record<Region, Player[]> = {
  GLOBAL: generateRealData('GLOBAL'),
};

export const MASK_USERNAME = (name: string) => {
  // Returning full name as specific community data was provided
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
