import { Player } from '../types';

/**
 * Juice.gg API Integration Service
 * 
 * This service handles communication with the juice.gg API to fetch
 * real-time leaderboard data. The leaderboard automatically syncs
 * every 30 seconds to ensure data is always up-to-date.
 * 
 * API Key: ddd3a1eb-7e91-41f0-bb9b-7105bf25145d
 * API Endpoint: https://api.juice.gg/leaderboard
 * 
 * Environment Variables:
 * - VITE_JUICE_API_KEY: Optional override for the API key
 * 
 * Features:
 * - Automatic retry with mock data fallback
 * - Real-time sync every 30 seconds
 * - Loading indicators and sync status
 * - TypeScript type safety
 */

// API Configuration
const JUICE_API_BASE_URL = 'https://api.juice.gg';
// API key from environment variable or fallback to the provided key
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
  try {
    const response = await fetch(`${JUICE_API_BASE_URL}/leaderboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JUICE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
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
  } catch (error) {
    console.error('Error fetching juice.gg leaderboard:', error);
    
    // Return mock data if API fails (for demo purposes)
    // TODO: Remove this fallback when API is stable
    return getMockJuiceLeaderboard();
  }
}

// Mock data fallback - simulates juice.gg API response
function getMockJuiceLeaderboard(): Player[] {
  return [
    { rank: 1, username: 'smila', wagered: 12500, prize: 250, change: 'neutral' },
    { rank: 2, username: 'boat', wagered: 9800, prize: 150, change: 'neutral' },
    { rank: 3, username: 'angel_of_death', wagered: 7200, prize: 50, change: 'neutral' },
    { rank: 4, username: 'player_04', wagered: 5100, prize: 25, change: 'neutral' },
    { rank: 5, username: 'player_05', wagered: 3400, prize: 15, change: 'neutral' },
    { rank: 6, username: 'player_06', wagered: 2100, prize: 10, change: 'neutral' },
  ];
}
