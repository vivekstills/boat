import { Player } from '../types';

// Environment configuration with fallback values
const JUICE_API_URL = import.meta.env.VITE_JUICE_API_URL || 'https://api.juice.gg';
const JUICE_API_KEY = import.meta.env.VITE_JUICE_API_KEY || 'ddd3a1eb-7e91-41f0-bb9b-7105bf25145d';
const JUICE_CODE = import.meta.env.VITE_JUICE_CODE || 'GANG';

// Try multiple possible endpoints
const API_ENDPOINTS = [
  `/leaderboard/${JUICE_CODE}`,
  `/leaderboard?code=${JUICE_CODE}`,
  `/api/leaderboard/${JUICE_CODE}`,
  `/v1/leaderboard/${JUICE_CODE}`,
];

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
 * Tries to fetch from an endpoint with different auth methods
 */
async function tryFetchEndpoint(endpoint: string): Promise<Response | null> {
  const authMethods = [
    { 'x-api-key': JUICE_API_KEY },
    { 'Authorization': `Bearer ${JUICE_API_KEY}` },
    { 'Authorization': JUICE_API_KEY },
    {},
  ];

  for (const headers of authMethods) {
    try {
      const response = await fetch(`${JUICE_API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (response.ok) {
        return response;
      }
    } catch (error) {
      // Try next auth method
      continue;
    }
  }

  return null;
}

/**
 * Fetches leaderboard data from juice.gg API
 * Supports multiple potential API response formats
 * @returns Promise with Player array
 */
export async function fetchJuiceLeaderboard(): Promise<Player[]> {
  console.log('[Juice API] Fetching leaderboard data...');
  
  // Try different endpoints
  for (const endpoint of API_ENDPOINTS) {
    try {
      const response = await tryFetchEndpoint(endpoint);

      if (!response) continue;

      const result = await response.json();
      console.log('[Juice API] Response received from', endpoint, ':', result);

      // Handle different possible response formats
      let data: JuiceLeaderboardEntry[] = [];
      
      if (result.success && Array.isArray(result.data)) {
        // Format 1: { success: true, data: [...] }
        data = result.data;
      } else if (Array.isArray(result)) {
        // Format 2: Direct array response
        data = result;
      } else if (result.leaderboard && Array.isArray(result.leaderboard)) {
        // Format 3: { leaderboard: [...] }
        data = result.leaderboard;
      } else {
        console.warn('[Juice API] Unexpected response format from', endpoint, ':', result);
        continue;
      }

      // Transform API data to Player format
      const players: Player[] = data.map((entry) => ({
        rank: entry.rank,
        username: entry.username || '',
        wagered: entry.wagered || 0,
        prize: getPrizeForRank(entry.rank),
        change: 'neutral' as const,
      }));

      console.log(`[Juice API] Successfully loaded ${players.length} players from ${endpoint}`);
      return players;
    } catch (error) {
      console.warn(`[Juice API] Failed to fetch from ${endpoint}:`, error);
      continue;
    }
  }

  console.error('[Juice API] All endpoints failed, using default data');
  return getDefaultJuicePlayers();
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
