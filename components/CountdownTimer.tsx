import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';
import { TimeLeft } from '../types';
import { Timer } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(TARGET_DATE) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setTick(true);
      setTimeout(() => setTick(false), 150);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative group perspective-500">
        <div className="relative bg-[#0A0A12]/80 backdrop-blur-xl border border-[#1e2433] rounded-xl p-4 min-w-[70px] md:min-w-[90px] flex items-center justify-center shadow-2xl transition-colors hover:border-[#5a6178]/50">
          {/* Inner highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#5a6178]/20 to-transparent"></div>
          
          <span className={`text-[36px] md:text-4xl font-bold text-[#e8eaf0] font-display tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(232,234,240,0.3)] ${tick ? 'tick' : ''}`}>
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-[9px] md:text-[10px] text-[#5a6178] uppercase mt-3 font-bold tracking-[0.2em] font-mono">{label}</span>
    </div>
  );

  const Separator = () => (
    <div className="h-[70px] flex items-center pb-6">
       <div className="flex flex-col gap-3 opacity-50">
         <div className="w-1 h-1 rounded-full bg-[#5a6178]"></div>
         <div className="w-1 h-1 rounded-full bg-[#5a6178]"></div>
       </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="flex items-center gap-2 mb-6 text-[#8892aa]">
        <Timer size={14} className="" />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase font-mono">Competition Ends In</span>
      </div>
      <div className="flex items-center gap-1 md:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default CountdownTimer;
