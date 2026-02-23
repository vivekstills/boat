import React from 'react';
import { Player } from '../types';
import { MASK_USERNAME, FORMAT_CURRENCY } from '../constants';
import { Trophy, Medal, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PodiumProps {
  players: Player[];
  variant?: 'BETSTRIKE' | 'DUEL' | ;
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
      gradient: 'from-[#c9a84c]/20 to-[#c9a84c]/5',
      border: 'border-[#c9a84c]/40',
      shadow: 'shadow-[0_0_60px_-10px_rgba(201,168,76,0.25)]',
      iconColor: 'text-[#c9a84c]',
      height: 'md:-mt-16 scale-110 z-20',
      order: 'order-1 md:order-2 col-span-2',
      Icon: Crown,
      delay: 0.2,
      crownColor: 'text-[#c9a84c]',
      glowColor: 'bg-[#c9a84c]'
    };
  } else if (isSecond) {
    config = {
      gradient: 'from-[#5a6178]/20 to-[#5a6178]/5',
      border: 'border-[#5a6178]/30',
      shadow: 'shadow-[0_0_30px_-10px_rgba(90,97,120,0.2)]',
      iconColor: 'text-[#8892aa]',
      height: 'md:mt-4 z-10',
      order: 'order-2 md:order-1 col-span-1',
      Icon: Trophy,
      delay: 0,
      crownColor: 'text-[#5a6178]',
      glowColor: 'bg-[#5a6178]'
    };
  } else if (isThird) {
    config = {
      gradient: 'from-[#cd7f32]/20 to-[#cd7f32]/5',
      border: 'border-[#cd7f32]/30',
      shadow: 'shadow-[0_0_30px_-10px_rgba(205,127,50,0.2)]',
      iconColor: 'text-[#cd7f32]',
      height: 'md:mt-12 z-10',
      order: 'order-3 md:order-3 col-span-1',
      Icon: Medal,
      delay: 0.4,
      crownColor: 'text-[#cd7f32]',
      glowColor: 'bg-[#cd7f32]'
    };
  }

  const formatValue = (val: number) => variant === 'JUICE' ? val.toString() : FORMAT_CURRENCY(val);
  const wagerLabel = variant === 'JUICE' ? 'WAGERED' : 'WAGERED';
  
  const hasName = player.username && player.username.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: config.delay, duration: 0.6, type: "spring", stiffness: 100 }}
      className={`relative flex flex-col items-center w-full max-w-[320px] mx-auto ${config.order} ${config.height}`}
    >
      {/* Background Vertical Light Beam for #1 */}
      {isFirst && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[120%] bg-gradient-to-t from-[#c9a84c]/10 via-transparent to-transparent blur-[40px] pointer-events-none -z-10"></div>
      )}

      {/* Glass Card */}
      <div className={`
        relative w-full overflow-hidden
        bg-[#0e0e12]/40 backdrop-blur-xl
        border ${config.border} rounded-[2rem]
        ${config.shadow}
        flex flex-col items-center justify-between
        group transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-[#0e0e12]/60
        min-h-[280px] md:min-h-[340px]
      `}>
        {/* Top Highlight Line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Corner Rank Badge */}
        <div className={`
          absolute top-4 right-4 
          w-12 h-12
          flex items-center justify-center
          rounded-full
          border ${config.border}
          bg-[#ffffff]/[0.03]
          backdrop-blur-sm
          z-10
        `}>
          <span className={`text-xl font-bold font-display ${config.iconColor}`}>
            {position}
          </span>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center w-full text-center relative z-20 flex-1 justify-center pt-12">
          
          {/* Avatar / Icon Circle */}
          <div className={`
            relative p-1.5 rounded-full mb-6 
            bg-gradient-to-b from-white/10 to-transparent border border-white/5
            ${isFirst ? 'shadow-[0_0_30px_-5px_rgba(201,168,76,0.3)]' : ''}
          `}>
             <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md shadow-inner`}>
                <config.Icon className={`w-8 h-8 ${config.iconColor} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
             </div>
             {isFirst && (
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#c9a84c]/40 rounded-full border-dashed"
               ></motion.div>
             )}
          </div>

          <h3 className="text-[#e8eaf0] font-bold font-display text-2xl mb-2 tracking-tight truncate max-w-full min-h-[2rem]">
            {hasName ? MASK_USERNAME(player.username) : <span className="opacity-20">---</span>}
          </h3>
          
          <div className="flex flex-col items-center gap-1 mb-6">
            <span className="text-[#5a6178] text-[9px] uppercase tracking-[0.2em] font-bold font-mono">
              {wagerLabel}
            </span>
            <span className="text-[#8892aa] text-sm font-mono tracking-tight">
              {formatValue(player.wagered)}
            </span>
          </div>

          <div className={`
            px-6 py-2.5 rounded-full font-bold text-sm font-display relative overflow-hidden
            bg-white/5 border border-white/10 flex items-center justify-center gap-2
            shadow-lg backdrop-blur-sm
            ${config.iconColor}
          `}>
             {isFirst && <Sparkles size={14} className="animate-pulse" />}
             {formatValue(player.prize)}
             {variant === 'JUICE' && ' COINS'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Podium: React.FC<PodiumProps> = ({ players, variant = 'BETSTRIKE' }) => {
  if (players.length < 3) return null;

  return (
    <div className="grid grid-cols-2 md:flex md:flex-row items-center md:items-end justify-center gap-4 md:gap-8 lg:gap-10 px-4 py-8 mb-16 min-h-[450px]">
      <PodiumCard player={players[1]} position={2} variant={variant} />
      <PodiumCard player={players[0]} position={1} variant={variant} />
      <PodiumCard player={players[2]} position={3} variant={variant} />
    </div>
  );
};

export default Podium;
