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

// Fetch leaderboard data from juice.gg API
export async function fetchJuiceLeaderboard(): Promise<Player[]> {
  const response = await fetch(`${JUICE_API_BASE_URL}/leaderboard`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${JUICE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
  }

  const data: JuiceLeaderboardResponse = await response.json();
  
  // Transform API response to Player format
  return data.players.map(player => ({
    rank: player.rank,
    username: player.username,
    wagered: player.wagered,
    prize: player.prize,
    change: 'neutral' as const,
  }));
}
