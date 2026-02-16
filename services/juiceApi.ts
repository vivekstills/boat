import { Player } from '../types';

// API Configuration
const JUICE_API_BASE_URL = 'https://api.juice.gg';
const JUICE_API_KEY = import.meta.env.VITE_JUICE_API_KEY || 'ddd3a1eb-7e91-41f0-bb9b-7105bf25145d';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Warn if using fallback API key
if (!import.meta.env.VITE_JUICE_API_KEY) {
  console.warn('VITE_JUICE_API_KEY not set in environment, using fallback key');
}

// Types from API
interface JuiceRaceParticipant {
  id: string;
  username: string;
  avatar: string;
  position: number;
  adjusted_play_amount: number;
  play_amount_without_rules: number;
}

interface JuiceRace {
  eventId: string;
  startTime: string;
  endTime: string;
  active: boolean;
  participants: JuiceRaceParticipant[];
  rewards: number[];
}

interface JuiceRacesResponse {
  code: number;
  data: JuiceRace[];
}

interface CachedData {
  data: Player[];
  timestamp: number;
}

// Cache storage
let cachedLeaderboard: CachedData | null = null;

/**
 * Fetches active private races from juice.gg API
 */
export const fetchJuiceRaces = async (): Promise<JuiceRacesResponse> => {
  const response = await fetch(`${JUICE_API_BASE_URL}/affiliates/races`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${JUICE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Transforms juice.gg API data to our Player format
 */
const transformToPlayers = (participants: JuiceRaceParticipant[], rewards: number[]): Player[] => {
  return participants.map((participant, index) => ({
    rank: participant.position,
    username: participant.username || '',
    avatar: participant.avatar,
    wagered: Math.round(participant.adjusted_play_amount || 0),
    prize: rewards[index] || 0,
    change: 'neutral' as const,
  }));
};

/**
 * Fetches and caches juice.gg leaderboard data
 * Implements 10-minute caching as recommended by API docs
 */
export const getJuiceLeaderboard = async (): Promise<Player[]> => {
  const now = Date.now();

  // Return cached data if still valid
  if (cachedLeaderboard && (now - cachedLeaderboard.timestamp) < CACHE_DURATION) {
    console.log('Returning cached juice.gg leaderboard data');
    return cachedLeaderboard.data;
  }

  try {
    console.log('Fetching fresh juice.gg leaderboard data...');
    const response = await fetchJuiceRaces();

    if (response.code === 0 && response.data && response.data.length > 0) {
      // Find the first active race
      const activeRace = response.data.find(race => race.active);

      if (activeRace && activeRace.participants && activeRace.participants.length > 0) {
        const players = transformToPlayers(activeRace.participants, activeRace.rewards);

        // Update cache
        cachedLeaderboard = {
          data: players,
          timestamp: now,
        };

        console.log(`Successfully fetched ${players.length} players from juice.gg`);
        return players;
      }
    }

    // If no active race or no participants, return default empty data
    console.warn('No active races or participants found in juice.gg API');
    return getDefaultJuicePlayers();
  } catch (error) {
    console.error('Error fetching juice.gg leaderboard:', error);
    // Return cached data if available, even if expired
    if (cachedLeaderboard) {
      console.log('Returning expired cached data due to API error');
      return cachedLeaderboard.data;
    }
    // Otherwise return default data
    return getDefaultJuicePlayers();
  }
};

/**
 * Returns default/fallback juice.gg player data
 */
const getDefaultJuicePlayers = (): Player[] => {
  return [
    { rank: 1, username: '', wagered: 0, prize: 250, change: 'neutral' },
    { rank: 2, username: '', wagered: 0, prize: 150, change: 'neutral' },
    { rank: 3, username: '', wagered: 0, prize: 50, change: 'neutral' },
    { rank: 4, username: '', wagered: 0, prize: 25, change: 'neutral' },
    { rank: 5, username: '', wagered: 0, prize: 15, change: 'neutral' },
    { rank: 6, username: '', wagered: 0, prize: 10, change: 'neutral' },
  ];
};

/**
 * Forces cache refresh on next API call
 */
export const clearJuiceCache = (): void => {
  cachedLeaderboard = null;
  console.log('Juice.gg cache cleared');
};
