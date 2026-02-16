import React from 'react';
import { BONUSES } from '../constants';
import { Zap, Shield } from 'lucide-react';

const BonusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-4 mb-16">
      {BONUSES.map((bonus, index) => {
        const Icon = bonus.icon === 'Zap' ? Zap : Shield;
        const isZap = bonus.icon === 'Zap';
        
        return (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-[#0A0A12]/60 backdrop-blur-md border border-[#1e2433] transition-all duration-300 hover:border-[#1e2433]/80 hover:bg-[#0A0A12]/80 hover:-translate-y-1"
          >
            {/* Top Border Accent */}
            <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${isZap ? 'via-[#7c3aed]' : 'via-[#3b82f6]'} to-transparent opacity-50`}></div>
            
            {/* Background Gradient Blob */}
            <div className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${bonus.color} opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity duration-500`}></div>
            
            <div className="relative p-6 md:p-8 flex items-center justify-between z-10">
              <div className="flex flex-col">
                <h3 className={`font-mono font-bold text-xs tracking-[0.2em] uppercase mb-2 ${isZap ? 'text-[#7c3aed]' : 'text-[#3b82f6]'}`}>
                  {bonus.title}
                </h3>
                <p className="text-4xl md:text-5xl font-bold font-display text-[#e8eaf0] tracking-tighter drop-shadow-lg">
                  {bonus.value}
                </p>
              </div>
              
              <div className={`
                p-4 rounded-2xl border transition-all duration-500 group-hover:rotate-12 group-hover:scale-110
                ${isZap 
                  ? 'bg-[#7c3aed]/10 border-[#7c3aed]/20 text-[#7c3aed] shadow-[0_0_20px_rgba(124,58,237,0.15)]' 
                  : 'bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                }
              `}>
                <Icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            {/* Decorative Tech Lines */}
            <div className="absolute bottom-4 left-4 flex gap-1">
                <div className="w-1 h-1 rounded-full bg-[#5a6178]/20"></div>
                <div className="w-1 h-1 rounded-full bg-[#5a6178]/20"></div>
                <div className="w-8 h-1 rounded-full bg-[#5a6178]/10"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BonusCards;