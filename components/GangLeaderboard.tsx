import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

// Types for this specific component
interface GangPlayer {
  rank: number;
  name: string;
  coins: number;
}

const GangLeaderboard: React.FC = () => {
  // Hardcoded demo data
  const initialData: GangPlayer[] = [
    { rank: 1, name: 'smila', coins: 250 },
    { rank: 2, name: 'boat', coins: 150 },
    { rank: 3, name: 'angel_of_death', coins: 50 },
    { rank: 4, name: 'player_04', coins: 25 },
    { rank: 5, name: 'player_05', coins: 15 },
    { rank: 6, name: 'player_06', coins: 10 },
  ];

  const [players, setPlayers] = useState<GangPlayer[]>(initialData);

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight data updates for aliveness
      console.log('Refreshing GANG x JUICE.GG data...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center py-24 px-5 md:px-4 isolate">
      {/* Fix 3: Radial Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none z-[-1]"
           style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)' }}>
      </div>

      {/* 1. Header Block */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="flex flex-col items-center text-center mb-12 w-full max-w-3xl"
      >
        {/* Logo */}
        <motion.div variants={fadeUpVariants} className="mb-6">
          <img 
            src="https://juice.gg/favicon.ico" 
            alt="juice.gg" 
            className="h-9 md:h-12 max-h-[36px] md:max-h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden font-luxury italic text-[#c9a84c] text-4xl">juice.gg</span>
        </motion.div>

        {/* Subheader */}
        <motion.h3 variants={fadeUpVariants} className="font-mono text-[11px] max-[480px]:text-[9px] tracking-[0.4em] uppercase text-[#8892aa] md:text-[#5a6178] mb-2 px-5 md:px-0">
          GANG × JUICE.GG
        </motion.h3>

        {/* Main Title */}
        <motion.h1 
          variants={fadeUpVariants} 
          className="font-luxury font-bold text-7xl md:text-[88px] max-[480px]:text-[64px] leading-none text-[#e8eaf0] tracking-tight mb-4 px-5 md:px-0"
          style={{ textShadow: '0 0 60px rgba(201,168,76,0.2)' }}
        >
          500 COINS
        </motion.h1>

        {/* Info Line */}
        <motion.p variants={fadeUpVariants} className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8892aa] md:text-[#5a6178] px-5 md:px-0">
          PRIZE DISTRIBUTION · USE CODE: <span className="text-[#c9a84c] font-bold">GANG</span>
        </motion.p>
      </motion.div>

      {/* 2. Separator + Hype Line */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-[680px] flex flex-col items-center mb-16"
      >
        {/* Gradient Line with Diamonds */}
        <div className="relative w-[80%] md:w-full max-[480px]:w-[70%] h-[1px] mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12">
             <span className="font-mono text-[#c9a84c] text-[10px] relative z-10">◆</span>
             <span className="font-mono text-[#c9a84c] text-[10px] relative z-10">◆</span>
          </div>
        </div>

        {/* Hype Text */}
        <div className="text-center px-6 md:px-0">
          <h2 
            className="font-luxury italic text-[15px] md:text-[22px] max-[480px]:text-[16px] max-[480px]:px-[24px] text-[#e8eaf0] mb-3"
            style={{ textShadow: '0 0 30px rgba(201,168,76,0.3)' }}
          >
            WHO'S EATING THIS WEEK?
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#8892aa] md:text-[#5a6178]">
            SMILA × BOAT COLLAB DROP · JUICE.GG PARTNERSHIP
          </p>
        </div>
      </motion.div>

      {/* 3. Leaderboard Rows */}
      <div className="w-full max-w-[680px]">
        {players.map((player, index) => {
          const isTop3 = player.rank <= 3;
          
          return (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (index * 0.08), duration: 0.5 }}
              className={`
                group relative flex items-center justify-between py-3 md:py-5 px-4 md:px-6 
                max-[480px]:py-[14px] max-[480px]:px-[12px]
                border-b border-[#1e2433] transition-colors duration-300 overflow-hidden
                ${isTop3 ? 'bg-[rgba(201,168,76,0.02)] border-l-[4px] border-l-[#c9a84c]' : 'bg-transparent border-l-[4px] border-l-transparent'}
              `}
            >
              {/* Fix 4: Hover Sweep Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.04)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out pointer-events-none"></div>

              {/* Rank */}
              <div className="w-20 flex-shrink-0 relative z-10">
                <span className={`
                  font-luxury font-bold italic
                  ${isTop3 ? 'text-[#c9a84c] text-[28px] md:text-5xl max-[480px]:text-[26px]' : 'text-[#4a5268] text-[28px] md:text-3xl max-[480px]:text-[26px] not-italic font-normal'}
                `}>
                  {player.rank < 10 ? `0${player.rank}` : player.rank}
                </span>
              </div>

              {/* Name */}
              <div className="flex-1 text-center relative z-10">
                <span className="font-mono text-[12px] md:text-base max-[480px]:text-[11px] uppercase tracking-widest text-[#e8eaf0] transition-colors">
                  {player.name}
                </span>
              </div>

              {/* Coins */}
              <div className="w-24 text-right relative z-10">
                <span className="font-mono font-bold text-[14px] md:text-lg max-[480px]:text-[13px] text-[#e8eaf0] group-hover:text-[#c9a84c] transition-colors">
                  {player.coins}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Footer Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="w-full max-w-[680px] flex flex-col items-center mt-12 text-center"
      >
        {/* Bottom Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-30 mb-12"></div>

        {/* Logo Small */}
        <img 
          src="https://juice.gg/favicon.ico" 
          alt="juice.gg" 
          className="h-8 w-auto object-contain mb-6 opacity-70 grayscale hover:grayscale-0 transition-all"
        />

        {/* Referral Block */}
        <div className="flex flex-col items-center gap-6 mb-10 w-full">
            {/* Line 1 */}
            <p 
                className="font-luxury italic text-[15px] md:text-[18px] text-[#e8eaf0] text-center px-6 md:px-0"
                style={{ textShadow: '0 0 40px rgba(201,168,76,0.25)' }}
            >
                "The only casino where the house actually wants you to win."
            </p>

            {/* Line 2 */}
            <a 
                href="https://juice.gg/r/gang" 
                target="_blank" 
                rel="noreferrer"
                className="shimmer-btn w-full md:w-auto px-0 md:px-8 py-[14px] md:py-3 border border-[#c9a84c] text-[#c9a84c] font-mono text-[11px] tracking-[0.16em] hover:bg-[rgba(201,168,76,0.08)] transition-colors duration-200 rounded-none no-underline text-center max-[480px]:w-[90%] max-[480px]:mx-auto max-[480px]:block"
            >
                PLAY ON JUICE.GG →
            </a>

            {/* Line 3 */}
            <p className="font-mono text-[10px] text-[#5a6178] md:text-[#3a4055] text-center">
                Use code GANG · 18+ · Please gamble responsibly
            </p>
        </div>

        {/* Powered By */}
        <a 
          href="https://api.juice.gg" 
          target="_blank" 
          rel="noreferrer" 
          className="font-mono text-[10px] text-[#4a5268] md:text-[#3a4055] hover:text-[#5a6178] transition-colors"
        >
          POWERED BY api.juice.gg
        </a>
      </motion.div>

    </div>
  );
};

export default GangLeaderboard;