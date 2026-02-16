import { Player } from '../types';

const JUICE_API_URL = 'https://api.juice.gg';
const JUICE_API_KEY = 'ddd3a1eb-7e91-41f0-bb9b-7105bf25145d';
const JUICE_CODE = 'GANG';

interface JuiceLeaderboardEntry {
  rank: number;
  username: string;
  wagered: number;
  coins: number;
}

interface JuiceLeaderboardResponse {
  success: boolean;
  data: JuiceLeaderboardEntry[];
  lastUpdated?: string;
}

/**
 * Fetches leaderboard data from juice.gg API
 * @returns Promise with Player array
 */
export async function fetchJuiceLeaderboard(): Promise<Player[]> {
  try {
    const response = await fetch(`${JUICE_API_URL}/leaderboard/${JUICE_CODE}`, {
      method: 'GET',
      headers: {
        'x-api-key': JUICE_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const result: JuiceLeaderboardResponse = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error('Invalid API response format');
    }

    // Transform API data to Player format
    const players: Player[] = result.data.map((entry) => ({
      rank: entry.rank,
      username: entry.username || '',
      wagered: entry.wagered || 0,
      prize: getPrizeForRank(entry.rank),
      change: 'neutral' as const,
    }));

    return players;
  } catch (error) {
    console.error('Failed to fetch juice.gg leaderboard:', error);
    // Return default data structure on error
    return getDefaultJuicePlayers();
  }
}

/**
 * Gets prize amount for a specific rank
 */
function getPrizeForRank(rank: number): number {
  const prizeMap: Record<number, number> = {
    1: 250,
    2: 150,
    3: 50,
    4: 25,
    5: 15,
    6: 10,
  };
  return prizeMap[rank] || 0;
}

/**
 * Returns default/fallback player data
 */
function getDefaultJuicePlayers(): Player[] {
  return [
    { rank: 1, username: '', wagered: 0, prize: 250, change: 'neutral' },
    { rank: 2, username: '', wagered: 0, prize: 150, change: 'neutral' },
    { rank: 3, username: '', wagered: 0, prize: 50, change: 'neutral' },
    { rank: 4, username: '', wagered: 0, prize: 25, change: 'neutral' },
    { rank: 5, username: '', wagered: 0, prize: 15, change: 'neutral' },
    { rank: 6, username: '', wagered: 0, prize: 10, change: 'neutral' },
  ];
}
