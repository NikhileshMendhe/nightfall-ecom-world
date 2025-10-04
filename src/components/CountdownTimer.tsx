import { useEffect, useState } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-3 md:p-4 shadow-glow border-2 border-primary/50 min-w-[60px] md:min-w-[80px]">
          <span className="text-2xl md:text-4xl font-bold text-white tabular-nums flip-animation">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-xs md:text-sm mt-2 text-muted-foreground font-medium uppercase">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center">
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl md:text-4xl font-bold text-primary animate-pulse">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl md:text-4xl font-bold text-primary animate-pulse">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
