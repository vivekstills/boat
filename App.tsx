import React, { useState } from 'react';
import { LEADERBOARD_DATA, REFERRAL_CODE, REFERRAL_LINK, DISCORD_LINK, KICK_LINK } from './constants';
import CountdownTimer from './components/CountdownTimer';
import Podium from './components/Podium';
import LeaderboardTable from './components/LeaderboardTable';
import BonusCards from './components/BonusCards';
import { Copy, ExternalLink, Menu, X, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 14.156 14.156 0 0 0-3.35 6.897 14.173 14.173 0 0 0-3.356-6.897.072.072 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const KickIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 3H3C1.895 3 1 3.895 1 5V19C1 20.105 1.895 21 3 21H21C22.105 21 23 20.105 23 19V5C23 3.895 22.105 3 21 3ZM9.5 16H8V11.5H7V16H5.5V8H7V10H8V8H9.5V11L11.5 8H13.5L11 11.5L14 16H12L9.5 12.5V16Z" />
  </svg>
);

const App: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px] animate-blob"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-blue-900/10 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
        
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#020205]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between md:justify-end">
          
          {/* Mobile Logo / Title */}
          <div className="md:hidden flex items-center gap-2">
            <span className="font-display font-bold text-lg tracking-wider">BETSTRIKE</span>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-4">
             <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center pr-4 gap-4 transition-all hover:border-white/20 hover:bg-white/10">
                 <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded text-[10px] text-white font-bold tracking-wider font-display shadow-lg shadow-purple-500/20">
                    CODE
                 </div>
                 <span className="font-mono font-bold text-lg text-white tracking-[0.2em]">{REFERRAL_CODE}</span>
                 <button 
                  onClick={handleCopy}
                  className="hover:text-purple-400 transition-colors relative"
                  title="Copy Code"
                 >
                   <AnimatePresence mode='wait'>
                    {isCopied ? (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-emerald-400 text-xs font-bold font-display"
                      >
                        COPIED
                      </motion.span>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Copy size={16} />
                      </motion.div>
                    )}
                   </AnimatePresence>
                 </button>
             </div>

             <a 
               href={REFERRAL_LINK}
               target="_blank"
               rel="noreferrer"
               className="group relative px-6 py-2.5 bg-white text-black font-bold text-sm rounded-lg overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-shine opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-2 font-display z-10 text-black group-hover:text-white transition-colors">
                  CLAIM OFFER <ExternalLink size={14} />
                </span>
             </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300 p-2 border border-white/10 rounded-lg bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-20 bg-[#020205] border-b border-white/10 z-40 px-6 py-8 md:hidden flex flex-col gap-6 shadow-2xl overflow-hidden"
          >
             <div className="flex flex-col gap-2">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest font-display">Referral Code</span>
                <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                   <span className="font-mono text-xl font-bold text-white tracking-widest">{REFERRAL_CODE}</span>
                   <button onClick={handleCopy} className="text-slate-400">
                     {isCopied ? <span className="text-emerald-400 font-bold text-sm">COPIED</span> : <Copy size={18} />}
                   </button>
                </div>
             </div>

             <a 
               href={REFERRAL_LINK}
               className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-center rounded-xl font-display shadow-lg shadow-purple-900/30"
             >
                VISIT BETSTRIKE
             </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative pt-32 pb-20 px-4 z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-8 tracking-[0.2em] font-display uppercase backdrop-blur-md"
           >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_currentColor]"></span>
              Live Competition
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tighter drop-shadow-2xl leading-[0.9]"
           >
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400">$1,000</span>
             <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 text-4xl md:text-6xl lg:text-7xl">MONTHLY RACE</span>
           </motion.h1>

           <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
           >
             Wager to ascend the ranks. The top 5 elite share the prize pool.
             <br />
             <span className="text-slate-500 text-sm mt-2 block">Entry Code: <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded border border-white/10">{REFERRAL_CODE}</span></span>
           </motion.p>

           <CountdownTimer />
        </div>

        {/* Bonus Section */}
        <BonusCards />

        {/* Region Indicator */}
        <div className="flex justify-center mb-16">
           <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
             <Globe size={14} className="text-purple-400" />
             <span className="text-xs font-display font-bold tracking-[0.2em] text-white uppercase">Global Ranking</span>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
           </div>
        </div>

        {/* Podium */}
        <Podium players={LEADERBOARD_DATA['GLOBAL']} />

        {/* Table */}
        <LeaderboardTable players={LEADERBOARD_DATA['GLOBAL']} />

      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <a 
          href={DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          className="group relative w-14 h-14 flex items-center justify-center rounded-2xl bg-[#5865F2] text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-[0_8px_20px_rgba(88,101,242,0.3)] border border-[#fff]/10"
          title="Join Discord"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <DiscordIcon className="w-7 h-7 relative z-10" />
        </a>
        <a 
          href={KICK_LINK}
          target="_blank"
          rel="noreferrer"
          className="group relative w-14 h-14 flex items-center justify-center rounded-2xl bg-[#53FC18] text-black transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-[0_8px_20px_rgba(83,252,24,0.3)] border border-[#000]/10"
          title="Watch on Kick"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <KickIcon className="w-6 h-6 relative z-10" />
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#010103] py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </footer>

    </div>
  );
};

export default App;