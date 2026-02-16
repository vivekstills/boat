import React, { useState } from 'react';
import { Player } from '../types';
import { MASK_USERNAME, FORMAT_CURRENCY } from '../constants';
import { ChevronDown, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardTableProps {
  players: Player[];
  variant?: 'BETSTRIKE' | 'JUICE';
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ players, variant = 'BETSTRIKE' }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Filter out top 3, they are in the podium
  const remainingPlayers = players.filter(p => p.rank > 3);
  const visiblePlayers = showAll ? remainingPlayers : remainingPlayers.slice(0, 7);

  const getChangeIcon = (change?: string) => {
    if (change === 'up') return <TrendingUp size={14} className="text-emerald-400" />;
    if (change === 'down') return <TrendingDown size={14} className="text-rose-400" />;
    return <Minus size={14} className="text-[#5a6178]" />;
  };

  const formatValue = (val: number) => variant === 'JUICE' ? val.toString() : FORMAT_CURRENCY(val);
  const prizeHeader = variant === 'JUICE' ? 'Coins' : 'Prize';
  const showWagered = variant === 'BETSTRIKE';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-24">
      
      {/* Header Label */}
      <div className="flex items-center justify-between mb-8 px-2 opacity-60">
         <h2 className="text-[10px] font-mono font-bold text-[#e8eaf0] tracking-[0.2em] uppercase">
            Leaderboard Standing
         </h2>
         <div className="h-[1px] flex-1 bg-gradient-to-r from-[#e8eaf0]/20 to-transparent ml-6"></div>
      </div>

      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold font-mono text-[#5a6178] uppercase tracking-widest">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5 pl-2">Player</div>
          {showWagered && <div className="hidden md:block col-span-3 text-right">Wagered</div>}
          <div className={`${showWagered ? 'col-span-4 md:col-span-3' : 'col-span-4 md:col-span-6'} text-right pr-4`}>{prizeHeader}</div>
        </div>

        {/* Rows */}
        <AnimatePresence>
            {visiblePlayers.map((player, index) => {
              const hasName = player.username && player.username.length > 0;
              
              return (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group relative"
              >
                {/* Background & Border */}
                <div className="absolute inset-0 bg-[#0e0e12]/40 backdrop-blur-md border border-[#ffffff]/5 rounded-xl transition-all duration-300 group-hover:bg-[#0e0e12]/70 group-hover:border-[#ffffff]/10 group-hover:translate-x-1 group-hover:shadow-lg"></div>

                <div className="relative grid grid-cols-12 gap-4 p-4 items-center">
                  
                  {/* Rank */}
                  <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center gap-1">
                    <span className="font-mono font-bold text-[#5a6178] group-hover:text-[#e8eaf0] transition-colors text-sm">
                      {player.rank < 10 ? `0${player.rank}` : player.rank}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75">
                        {getChangeIcon(player.change)}
                    </div>
                  </div>

                  {/* Username */}
                  <div className="col-span-6 md:col-span-5 pl-2 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#1e2433]/30 border border-[#ffffff]/5 hidden sm:flex items-center justify-center text-[10px] text-[#5a6178] font-bold font-mono group-hover:text-[#e8eaf0] group-hover:border-[#ffffff]/20 transition-all">
                       {hasName ? player.username.charAt(0) : '-'}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-[#e8eaf0] group-hover:text-white transition-colors tracking-wide text-sm">
                            {hasName ? MASK_USERNAME(player.username) : <span className="opacity-20">---</span>}
                        </span>
                    </div>
                  </div>

                  {/* Wagered - HIDDEN ON MOBILE & JUICE */}
                  {showWagered && (
                    <div className="hidden md:block col-span-3 text-right font-mono text-[#5a6178] text-sm group-hover:text-[#e8eaf0] transition-colors">
                      {formatValue(player.wagered)}
                    </div>
                  )}

                  {/* Prize / Coins */}
                  <div className={`${showWagered ? 'col-span-4 md:col-span-3' : 'col-span-4 md:col-span-6'} text-right pr-4`}>
                    {player.prize > 0 ? (
                      <span className="inline-flex items-center gap-2 text-emerald-400 font-display font-bold text-sm bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.05)] group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all justify-end">
                        {variant === 'BETSTRIKE' && <Trophy size={12} className="hidden md:block" />}
                        {formatValue(player.prize)}
                      </span>
                    ) : (
                      <span className="text-[#5a6178]">-</span>
                    )}
                  </div>

                </div>
              </motion.div>
            )})}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {remainingPlayers.length > 7 && (
        <div className="mt-8 flex justify-center">
            <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-3 px-8 py-3 rounded-full bg-[#0e0e12]/50 border border-[#ffffff]/5 text-[10px] font-bold text-[#8892aa] uppercase tracking-widest hover:bg-[#0e0e12] hover:text-[#e8eaf0] transition-all hover:scale-105 font-mono"
            >
                {showAll ? 'Show Less' : 'Load More'}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;