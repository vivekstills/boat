import { useState, useEffect } from 'react';
import { Player } from '../types';
import { fetchJuiceLeaderboard } from '../services/juiceApi';

const REFRESH_INTERVAL = 30000; // 30 seconds

interface UseJuiceLeaderboardResult {
  players: Player[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

/**
 * Hook to fetch and auto-refresh juice.gg leaderboard data
 */
export function useJuiceLeaderboard(): UseJuiceLeaderboardResult {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = async () => {
    try {
      setError(null);
      const data = await fetchJuiceLeaderboard();
      setPlayers(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    refresh();

    // Set up auto-refresh interval
    const interval = setInterval(() => {
      refresh();
    }, REFRESH_INTERVAL);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    players,
    loading,
    error,
    lastUpdated,
    refresh,
  };
}
