import React from 'react';
import { Player } from '../types';
import { MASK_USERNAME, FORMAT_CURRENCY } from '../constants';
import { Trophy, Medal, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PodiumProps {
  players: Player[];
  variant?: 'BETSTRIKE' | 'JUICE';
}

const PodiumCard: React.FC<{ player: Player; position: number; variant: 'BETSTRIKE' | 'JUICE' }> = ({ player, position, variant }) => {
  const isFirst = position === 1;
  const isSecond = position === 2;
  const isThird = position === 3;

  let config = {
    gradient: '',
    border: '',
    shadow: '',
    iconColor: '',
    height: '',
    order: '',
    Icon: Medal,
    delay: 0,
    crownColor: '',
    glowColor: ''
  };

  if (isFirst) {
    config = {
      gradient: 'from-[#c9a84c]/40 to-[#c9a84c]/10',
      border: 'border-[#c9a84c]/50',
      shadow: 'shadow-[0_0_50px_-10px_rgba(201,168,76,0.3)]',
      iconColor: 'text-[#c9a84c]',
      height: 'md:-mt-12 scale-105 z-20',
      order: 'order-1 md:order-2 col-span-2',
      Icon: Crown,
      delay: 0.2,
      crownColor: 'text-[#c9a84c]',
      glowColor: 'bg-[#c9a84c]'
    };
  } else if (isSecond) {
    config = {
      gradient: 'from-[#5a6178]/40 to-[#5a6178]/10',
      border: 'border-[#1e2433]',
      shadow: 'shadow-[0_0_30px_-10px_rgba(90,97,120,0.2)]',
      iconColor: 'text-[#5a6178]',
      height: 'md:mt-4 z-10',
      order: 'order-2 md:order-1 col-span-1',
      Icon: Trophy,
      delay: 0,
      crownColor: 'text-[#5a6178]',
      glowColor: 'bg-[#5a6178]'
    };
  } else if (isThird) {
    config = {
      gradient: 'from-orange-900/40 to-orange-800/10',
      border: 'border-[#1e2433]',
      shadow: 'shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]',
      iconColor: 'text-orange-400',
      height: 'md:mt-12 z-10',
      order: 'order-3 md:order-3 col-span-1',
      Icon: Medal,
      delay: 0.4,
      crownColor: 'text-orange-400',
      glowColor: 'bg-orange-500'
    };
  }

  const formatValue = (val: number) => variant === 'JUICE' ? val.toString() : FORMAT_CURRENCY(val);
  const wagerLabel = variant === 'JUICE' ? 'WAGERED' : 'Total Wagered';
  
  const hasName = player.username && player.username.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: config.delay, duration: 0.6, type: "spring", stiffness: 100 }}
      className={`relative flex flex-col items-center w-full max-w-[320px] mx-auto ${config.order} ${config.height}`}
    >
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[100px] opacity-20 ${config.glowColor}`}></div>

      <div className={`
        relative w-full overflow-hidden
        bg-[#0A0A10]/60 backdrop-blur-xl
        border ${config.border} rounded-2xl
        ${config.shadow}
        flex flex-col items-center
        group transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-[#0A0A10]/80
      `}>
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#e8eaf0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Rank Badge */}
        <div className={`
          absolute -top-[1px] -right-[1px] w-20 h-20 overflow-hidden rounded-tr-2xl
        `}>
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${config.gradient} opacity-50`}></div>
          <div className={`absolute top-4 right-4 text-4xl font-bold font-luxury italic opacity-20 ${config.iconColor} select-none`}>
            {position}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8 flex flex-col items-center w-full text-center relative z-10">
          
          {/* Avatar / Icon Circle */}
          <div className={`
            relative p-1 rounded-full mb-6 
            bg-gradient-to-b from-[#e8eaf0]/10 to-transparent border border-[#1e2433]
          `}>
             <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md shadow-inner`}>
                <config.Icon className={`w-8 h-8 ${config.iconColor} drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
             </div>
             {isFirst && hasName && (
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#c9a84c]/30 rounded-full border-dashed"
               ></motion.div>
             )}
          </div>

          <h3 className="text-[#e8eaf0] font-bold font-display text-xl mb-1 tracking-wide truncate max-w-full min-h-[1.75rem]">
            {hasName ? MASK_USERNAME(player.username) : <span className="opacity-20">---</span>}
          </h3>
          
          <div className="text-[#5a6178] text-[10px] uppercase tracking-[0.2em] mb-6 font-bold font-mono">
            {wagerLabel}
            <div className="text-[#8892aa] md:text-[#5a6178] text-sm font-mono mt-1 font-normal tracking-normal">
              {formatValue(player.wagered)}
            </div>
          </div>

          <div className={`
            w-full py-4 rounded-xl font-bold text-xl font-mono relative overflow-hidden
            bg-[#e8eaf0]/5 border border-[#1e2433] flex items-center justify-center gap-2
            ${config.iconColor}
          `}>
             <div className="absolute inset-0 bg-[#e8eaf0]/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
             {isFirst && <Sparkles size={16} className="animate-pulse" />}
             {formatValue(player.prize)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Podium: React.FC<PodiumProps> = ({ players, variant = 'BETSTRIKE' }) => {
  if (players.length < 3) return null;

  return (
    <div className="grid grid-cols-2 md:flex md:flex-row items-center md:items-end justify-center gap-4 md:gap-6 lg:gap-10 px-4 py-8 mb-16 min-h-[450px]">
      <PodiumCard player={players[1]} position={2} variant={variant} />
      <PodiumCard player={players[0]} position={1} variant={variant} />
      <PodiumCard player={players[2]} position={3} variant={variant} />
    </div>
  );
};

export default Podium;