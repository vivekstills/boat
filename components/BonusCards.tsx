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
            className="group relative overflow-hidden rounded-2xl bg-[#0A0A12]/60 backdrop-blur-md border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-[#0A0A12]/80 hover:-translate-y-1"
          >
            {/* Top Border Accent */}
            <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${isZap ? 'via-purple-500' : 'via-blue-500'} to-transparent opacity-50`}></div>
            
            {/* Background Gradient Blob */}
            <div className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${bonus.color} opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity duration-500`}></div>
            
            <div className="relative p-6 md:p-8 flex items-center justify-between z-10">
              <div className="flex flex-col">
                <h3 className={`font-display font-bold text-xs tracking-[0.2em] uppercase mb-2 ${isZap ? 'text-purple-400' : 'text-blue-400'}`}>
                  {bonus.title}
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-lg">
                  {bonus.value}
                </p>
              </div>
              
              <div className={`
                p-4 rounded-2xl border transition-all duration-500 group-hover:rotate-12 group-hover:scale-110
                ${isZap 
                  ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                }
              `}>
                <Icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            {/* Decorative Tech Lines */}
            <div className="absolute bottom-4 left-4 flex gap-1">
                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                <div className="w-8 h-1 rounded-full bg-white/10"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BonusCards;