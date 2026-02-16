import { Player } from '../types';

/**
 * Juice.gg API Integration Service
 * 
 * This service handles communication with the juice.gg API to fetch
 * real-time leaderboard data. The leaderboard automatically syncs
 * every 30 seconds to ensure data is always up-to-date.
 * 
 * Environment Variables:
 * - VITE_JUICE_API_KEY: Required API key for juice.gg authentication
 * 
 * Features:
 * - Real-time sync every 30 seconds
 * - Loading indicators and sync status
 * - TypeScript type safety
 * - Proper error handling and reporting
 */

// API Configuration
const JUICE_API_BASE_URL = 'https://api.juice.gg';
// API key should be provided via environment variable
// For the current deployment, the key has been provided: ddd3a1eb-7e91-41f0-bb9b-7105bf25145d
const JUICE_API_KEY = import.meta.env.VITE_JUICE_API_KEY || 'ddd3a1eb-7e91-41f0-bb9b-7105bf25145d';

// Response type from juice.gg API
interface JuiceLeaderboardResponse {
  players: {
    rank: number;
    username: string;
    wagered: number;
    prize: number;
  }[];
  lastUpdate: string;
}

// Prize distribution for juice.gg leaderboard (500 coins total)
const JUICE_PRIZE_DISTRIBUTION: Record<number, number> = {
  1: 250,
  2: 150,
  3: 50,
  4: 25,
  5: 15,
  6: 10,
};

// Fetch leaderboard data from juice.gg API
export async function fetchJuiceLeaderboard(): Promise<Player[]> {
  try {
    const response = await fetch(`${JUICE_API_BASE_URL}/leaderboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JUICE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request to ${JUICE_API_BASE_URL}/leaderboard failed with status ${response.status}: ${response.statusText}`);
    }

    const data: JuiceLeaderboardResponse = await response.json();
    
    // Transform API response to Player format with correct prize distribution
    return data.players.map(player => ({
      rank: player.rank,
      username: player.username,
      wagered: player.wagered,
      prize: JUICE_PRIZE_DISTRIBUTION[player.rank] || 0,
      change: 'neutral' as const,
    }));
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching juice.gg leaderboard:', error);
    
    // Re-throw the error so calling code can handle it appropriately
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch leaderboard data from juice.gg API');
  }
}
