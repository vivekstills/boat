import React, { useState, useEffect } from 'react';
import { LEADERBOARD_DATA, JUICE_PLAYERS, REFERRAL_CODE, REFERRAL_LINK, JUICE_LINK, DISCORD_LINK, KICK_LINK } from './constants';
import CountdownTimer from './components/CountdownTimer';
import Podium from './components/Podium';
import LeaderboardTable from './components/LeaderboardTable';
import BonusCards from './components/BonusCards';
import { Copy, ExternalLink, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 14.156 14.156 0 0 0-3.35 6.897 14.173 14.173 0 0 0-3.356-6.897.072.072 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const KickIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 0h19A2.5 2.5 0 0 1 24 2.5v19A2.5 2.5 0 0 1 21.5 24h-19A2.5 2.5 0 0 1 0 21.5v-19A2.5 2.5 0 0 1 2.5 0zm6.2 6.5v11h3.3v-4.1l3.5 4.1h4.4l-4.8-5.6 4.6-5.4h-4.3l-3.4 4v-4H8.7z" />
  </svg>
);

// Theme Configuration
const THEMES = {
  BETSTRIKE: {
    accent: '#7c3aed',
    accentTw: 'text-[#7c3aed]',
    accentBg: 'bg-[#7c3aed]',
    accentBorder: 'border-[#7c3aed]',
    glow: 'shadow-[0_0_10px_#7c3aed]',
    badge: 'Live Competition',
    titleLine1: '$1,000',
    titleLine2: 'MONTHLY RACE',
    desc: (
      <>
        Every bet under code{' '}
        <span className="font-bold text-[#8b5cf6] drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          "BOAT"
        </span>{' '}
        counts towards your score.
      </>
    ),
    codeLabel: 'Entry Code:',
    code: REFERRAL_CODE,
    data: LEADERBOARD_DATA['GLOBAL'],
    link: REFERRAL_LINK,
    siteName: 'BETSTRIKE'
  },
  JUICE: {
    accent: '#c9a84c',
    accentTw: 'text-[#c9a84c]',
    accentBg: 'bg-[#c9a84c]',
    accentBorder: 'border-[#c9a84c]',
    glow: 'shadow-[0_0_10px_#c9a84c]',
    badge: 'GANG × JUICE.GG',
    titleLine1: '500 COINS',
    titleLine2: 'WEEKLY RACE',
    desc: "Who's eating this week? Prize distribution for the community.",
    codeLabel: 'Use Code:',
    code: 'GANG',
    data: JUICE_PLAYERS,
    link: JUICE_LINK,
    siteName: 'JUICE.GG'
  }
};

const App: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'BETSTRIKE' | 'JUICE'>('BETSTRIKE');

  // Entrance animations observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(THEMES[activeTab].code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const theme = THEMES[activeTab];

  // Animation Variants for smooth tab switching
  const contentVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -15, scale: 0.98, filter: 'blur(8px)' }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-[#e8eaf0] font-sans selection:bg-[#7c3aed]/30 selection:text-[#e8eaf0] overflow-x-hidden relative">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] animate-blob transition-colors duration-1000 ${activeTab === 'BETSTRIKE' ? 'bg-[#7c3aed]/10' : 'bg-[#c9a84c]/10'}`}></div>
        <div className={`absolute top-[40%] right-[-10%] w-[40%] h-[60%] rounded-full blur-[150px] animate-blob animation-delay-2000 transition-colors duration-1000 ${activeTab === 'BETSTRIKE' ? 'bg-[#7c3aed]/5' : 'bg-[#c9a84c]/5'}`}></div>
        <div className={`absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full blur-[120px] animate-blob animation-delay-4000 transition-colors duration-1000 ${activeTab === 'BETSTRIKE' ? 'bg-[#7c3aed]/10' : 'bg-[#c9a84c]/10'}`}></div>
        
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,234,240,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(232,234,240,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-[100] bg-[#020205]/60 backdrop-blur-xl border-b border-[#1e2433]">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between md:justify-end">
          
          {/* Mobile Logo / Title */}
          <div className="md:hidden flex items-center gap-2">
            <span className="font-display font-bold text-lg tracking-wider text-[#e8eaf0]">BETSTRIKE</span>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-4">
             <div className="bg-[#e8eaf0]/5 border border-[#1e2433] rounded-lg p-1.5 flex items-center pr-4 gap-4 transition-all hover:border-[#1e2433]/80 hover:bg-[#e8eaf0]/10">
                 <div className={`px-3 py-1.5 bg-gradient-to-r rounded text-[10px] text-white font-bold tracking-wider font-display shadow-lg transition-colors duration-500 ${activeTab === 'BETSTRIKE' ? 'from-[#7c3aed] to-[#7c3aed] shadow-[#7c3aed]/20' : 'from-[#c9a84c] to-[#c9a84c] shadow-[#c9a84c]/20'}`}>
                    CODE
                 </div>
                 <span className="font-mono font-bold text-lg text-[#e8eaf0] tracking-[0.2em]">{theme.code}</span>
                 <button 
                  onClick={handleCopy}
                  className={`hover:${theme.accentTw} transition-colors relative`}
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
               href={theme.link}
               target="_blank"
               rel="noreferrer"
               className="group relative px-6 py-2.5 bg-[#e8eaf0] text-black font-bold text-sm rounded-lg overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(232,234,240,0.4)]"
             >
                <div className={`absolute inset-0 bg-gradient-to-r bg-[length:200%_100%] animate-shine opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === 'BETSTRIKE' ? 'from-[#7c3aed] via-[#c9a84c] to-[#7c3aed]' : 'from-[#c9a84c] via-[#ffeebb] to-[#c9a84c]'}`}></div>
                <span className="relative flex items-center gap-2 font-display z-10 text-black group-hover:text-white transition-colors">
                  CLAIM OFFER <ExternalLink size={14} />
                </span>
             </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#8892aa] md:text-[#5a6178] p-2 border border-[#1e2433] rounded-lg bg-[#e8eaf0]/5"
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
            className="fixed inset-x-0 top-20 bg-[#020205] border-b border-[#1e2433] z-40 px-6 py-8 md:hidden flex flex-col items-center gap-6 shadow-2xl overflow-hidden font-mono"
          >
             <div className="flex flex-col gap-2 items-center w-full py-6">
                <span className="text-xs text-[#8892aa] md:text-[#5a6178] uppercase font-bold tracking-widest font-mono text-center">Referral Code</span>
                <div className="flex items-center justify-between bg-[#e8eaf0]/5 p-4 rounded-xl border border-[#1e2433] gap-4">
                   <span className="font-mono text-xl font-bold text-[#e8eaf0] tracking-widest">{theme.code}</span>
                   <button onClick={handleCopy} className="text-[#8892aa] md:text-[#5a6178]">
                     {isCopied ? <span className="text-emerald-400 font-bold text-sm">COPIED</span> : <Copy size={18} />}
                   </button>
                </div>
             </div>

             <a 
               href={theme.link}
               onClick={closeMenu}
               target="_blank"
               rel="noreferrer"
               className={`w-full max-w-xs py-6 bg-gradient-to-r text-white font-bold text-center rounded-xl font-display shadow-lg ${activeTab === 'BETSTRIKE' ? 'from-[#7c3aed] to-[#7c3aed] shadow-[#7c3aed]/30' : 'from-[#c9a84c] to-[#c9a84c] shadow-[#c9a84c]/30'}`}
             >
                VISIT {theme.siteName}
             </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative pt-32 pb-20 px-5 md:px-4 z-[1] leading-[1.6] md:leading-normal">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-16 animate-on-scroll relative z-20">
          <div className="inline-flex items-center justify-center border border-[#1e2433] p-[4px] backdrop-blur-md bg-[#020205]/50">
             <button 
               onClick={() => setActiveTab('BETSTRIKE')}
               className={`px-8 py-2.5 font-mono text-[11px] tracking-[0.14em] transition-all duration-200 ${activeTab === 'BETSTRIKE' ? 'bg-[#1e2433] text-[#e8eaf0]' : 'bg-transparent text-[#5a6178] hover:text-[#e8eaf0]'}`}
             >
               BETSTRIKE
             </button>
             <button 
               onClick={() => setActiveTab('JUICE')}
               className={`px-8 py-2.5 font-mono text-[11px] tracking-[0.14em] transition-all duration-200 ${activeTab === 'JUICE' ? 'bg-[#1e2433] text-[#e8eaf0]' : 'bg-transparent text-[#5a6178] hover:text-[#e8eaf0]'}`}
             >
               JUICE.GG
             </button>
          </div>
        </div>

        {/* Dynamic Hero Section */}
        <div className="text-center mb-16 relative hero-section">
           {/* Dynamic Hero Bloom */}
           <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-[30%] w-[900px] h-[500px] pointer-events-none z-[-1]" 
                style={{ 
                  background: `radial-gradient(ellipse at center, ${activeTab === 'BETSTRIKE' ? 'rgba(124,58,237,0.06)' : 'rgba(201,168,76,0.06)'} 0%, transparent 70%)`,
                  transition: 'background 0.5s ease-in-out'
                }}>
           </div>

           <AnimatePresence mode='wait'>
             <motion.div
               key={activeTab}
               initial="hidden"
               animate="visible"
               exit="exit"
               variants={contentVariants}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="relative z-10"
             >
               <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.accentBorder}/20 ${theme.accentBg}/10 ${theme.accentTw} border text-xs font-bold mb-8 tracking-[0.2em] font-mono uppercase backdrop-blur-md`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.accentBg} animate-pulse ${theme.glow}`}></span>
                  {theme.badge}
               </div>
               
               <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#e8eaf0] mb-8 tracking-tighter drop-shadow-2xl leading-[0.9] px-5 md:px-0">
                 <span className={`text-transparent bg-clip-text bg-gradient-to-b from-[#e8eaf0] via-[#e8eaf0] ${activeTab === 'BETSTRIKE' ? 'to-[#8892aa] md:to-[#5a6178]' : 'to-[#c9a84c]/50'}`}>
                   {theme.titleLine1}
                 </span>
                 <br />
                 <span className={`text-transparent bg-clip-text bg-gradient-to-b from-[#e8eaf0] ${activeTab === 'BETSTRIKE' ? 'via-[#8892aa] md:via-[#5a6178] to-[#1e2433]' : 'via-[#c9a84c] to-[#1e2433]'} text-4xl md:text-6xl lg:text-7xl`}>
                   {theme.titleLine2}
                 </span>
               </h1>

               <p className="text-[#8892aa] md:text-[#e8eaf0] text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-sans leading-relaxed px-5 md:px-0">
                 {theme.desc}
                 <span className="text-[#8892aa] md:text-[#8892aa] text-sm mt-4 block font-mono tracking-normal font-bold uppercase opacity-80">
                   {theme.codeLabel} <span className="text-white font-bold bg-[#e8eaf0]/10 px-3 py-1 rounded border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">{theme.code}</span>
                 </span>
               </p>

               <CountdownTimer />
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Main Content Area */}
        <div className="relative min-h-[800px]">
            <AnimatePresence mode='wait'>
                {activeTab === 'BETSTRIKE' ? (
                  <motion.div
                    key="BETSTRIKE"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                      {/* Bonuses included in flow for smooth transition */}
                      <BonusCards />

                      {/* Region Indicator */}
                      <div className="flex justify-center mb-16">
                        <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#e8eaf0]/5 border border-[#1e2433] backdrop-blur-md shadow-2xl">
                          <Globe size={14} className="text-[#7c3aed]" />
                          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e8eaf0] uppercase">Global Ranking</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                        </div>
                      </div>

                      {/* BetStrike Leaderboard */}
                      <div className="race-section">
                          <Podium players={theme.data} />
                          <LeaderboardTable players={theme.data} />
                      </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="JUICE"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Juice Indicator */}
                    <div className="flex justify-center mb-16">
                      <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#e8eaf0]/5 border border-[#1e2433] backdrop-blur-md shadow-2xl">
                         <img src="https://juice.gg/favicon.ico" alt="Juice" className="w-4 h-4 grayscale opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                         <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#e8eaf0] uppercase">GANG × JUICE.GG</span>
                         <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shadow-[0_0_8px_#c9a84c]"></div>
                      </div>
                    </div>

                    <div className="race-section">
                      <Podium players={theme.data} variant="JUICE" />
                      <LeaderboardTable players={theme.data} variant="JUICE" />
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
        </div>

      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
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
      <footer className="border-t border-[#1e2433] bg-[#010103] pt-16 pb-8 relative overflow-hidden z-10">
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <h3 className="text-2xl font-bold font-display tracking-tight text-[#7c3aed]">
                leaderboat.xyz
              </h3>
              <p className="text-[#8892aa] text-sm leading-relaxed max-w-sm">
                Track your progress in the $1,000 monthly race.
              </p>
            </div>

            {/* Legal Section */}
            <div className="md:col-span-3 flex flex-col gap-6">
              <h4 className="text-xs font-bold text-[#e8eaf0] uppercase tracking-widest font-mono">
                LEGAL
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <span className="text-[#8892aa] text-sm hover:text-[#e8eaf0] transition-colors cursor-not-allowed">
                    Terms of Service (Coming Soon)
                  </span>
                </li>
                <li>
                  <span className="text-[#8892aa] text-sm hover:text-[#e8eaf0] transition-colors cursor-not-allowed">
                    Privacy Policy (Coming Soon)
                  </span>
                </li>
              </ul>
            </div>

            {/* Responsible Gaming Section */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <h4 className="text-xs font-bold text-[#e8eaf0] uppercase tracking-widest font-mono">
                RESPONSIBLE GAMING
              </h4>
              <a 
                href="https://www.begambleaware.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-[#1e2433]/50 border border-[#1e2433] rounded-lg text-[#8892aa] hover:text-[#e8eaf0] hover:border-[#5a6178] transition-all text-xs font-bold font-mono w-fit"
              >
                18+ BeGambleAware.org
              </a>
              <p className="text-[#5a6178] text-xs leading-relaxed">
                Please gamble responsibly. If you need help, visit <a href="https://www.begambleaware.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#8892aa]">BeGambleAware.org</a>
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#1e2433] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#5a6178] text-xs">
              © 2026 leaderboat.xyz. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[#5a6178] text-xs">
              <span>Made with</span>
              <span className="text-[#7c3aed] animate-pulse">💜</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;