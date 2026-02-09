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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative group perspective-500">
        <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-[#0A0A12]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[70px] md:min-w-[90px] flex items-center justify-center shadow-2xl">
          {/* Inner highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-[10px] text-slate-500 uppercase mt-3 font-bold tracking-[0.2em]">{label}</span>
    </div>
  );

  const Separator = () => (
    <div className="h-[70px] flex items-center pb-6">
       <div className="flex flex-col gap-3 opacity-50">
         <div className="w-1 h-1 rounded-full bg-slate-500"></div>
         <div className="w-1 h-1 rounded-full bg-slate-500"></div>
       </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="flex items-center gap-2 mb-6 text-purple-300/80">
        <Timer size={14} className="animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Competition Ends In</span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
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