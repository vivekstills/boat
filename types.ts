export type Region = 'GLOBAL';

export interface Player {
  rank: number;
  username: string;
  wagered: number;
  prize: number;
  avatar?: string;
  change?: 'up' | 'down' | 'neutral';
}

export interface Bonus {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}