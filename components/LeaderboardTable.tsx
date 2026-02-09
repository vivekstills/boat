import React, { useState } from 'react';
import { Player } from '../types';
import { MASK_USERNAME, FORMAT_CURRENCY } from '../constants';
import { ChevronDown, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardTableProps {
  players: Player[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ players }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Filter out top 3, they are in the podium
  const remainingPlayers = players.filter(p => p.rank > 3);
  const visiblePlayers = showAll ? remainingPlayers : remainingPlayers.slice(0, 7);

  const getChangeIcon = (change?: string) => {
    if (change === 'up') return <TrendingUp size={14} className="text-emerald-400" />;
    if (change === 'down') return <TrendingDown size={14} className="text-rose-400" />;
    return <Minus size={14} className="text-slate-600" />;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-20">
      
      {/* Header Label */}
      <div className="flex items-center justify-between mb-6 px-2">
         <h2 className="text-sm font-display font-bold text-slate-400 tracking-[0.2em] uppercase">
            Runner Ups
         </h2>
         <div className="h-[1px] flex-1 bg-white/10 ml-6"></div>
      </div>

      <div className="flex flex-col gap-3">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5 pl-2">Player</div>
          <div className="col-span-4 md:col-span-3 text-right">Wagered</div>
          <div className="hidden md:block md:col-span-3 text-right pr-4">Prize</div>
        </div>

        {/* Rows */}
        <AnimatePresence>
            {visiblePlayers.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
              >
                {/* Background & Border */}
                <div className="absolute inset-0 bg-[#0A0A12]/40 border border-white/5 rounded-xl transition-all duration-300 group-hover:bg-[#0A0A12]/80 group-hover:border-white/10 group-hover:scale-[1.01] group-hover:shadow-lg"></div>

                <div className="relative grid grid-cols-12 gap-4 p-4 items-center">
                  
                  {/* Rank */}
                  <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center gap-1">
                    <span className="font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                      {player.rank}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {getChangeIcon(player.change)}
                    </div>
                  </div>

                  {/* Username */}
                  <div className="col-span-6 md:col-span-5 pl-2 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hidden sm:flex items-center justify-center text-xs text-slate-400 font-bold shadow-inner">
                       {player.username.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-200 group-hover:text-white transition-colors tracking-wide">
                            {MASK_USERNAME(player.username)}
                        </span>
                        {/* Mobile Prize Display */}
                        {player.prize > 0 && (
                            <div className="md:hidden mt-1 text-[10px] font-mono font-bold text-emerald-400">
                                {FORMAT_CURRENCY(player.prize)}
                            </div>
                        )}
                    </div>
                  </div>

                  {/* Wagered */}
                  <div className="col-span-4 md:col-span-3 text-right font-mono text-slate-300 group-hover:text-white transition-colors">
                    {FORMAT_CURRENCY(player.wagered)}
                  </div>

                  {/* Desktop Prize */}
                  <div className="hidden md:block md:col-span-3 text-right pr-4">
                    {player.prize > 0 ? (
                      <span className="inline-flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm bg-emerald-500/5 px-4 py-1.5 rounded-full border border-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:bg-emerald-500/10 transition-colors">
                        <Trophy size={12} />
                        {FORMAT_CURRENCY(player.prize)}
                      </span>
                    ) : (
                      <span className="text-slate-700">-</span>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {remainingPlayers.length > 7 && (
        <div className="mt-6 flex justify-center">
            <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all hover:scale-105"
            >
                {showAll ? 'Collapse' : 'View All Competitors'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;