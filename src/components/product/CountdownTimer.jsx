import { useEffect, useState } from 'react';

function getRemaining(endTime) {
  const diff = Math.max(0, endTime - Date.now());
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer({ endTime }) {
  const [remaining, setRemaining] = useState(() => getRemaining(endTime));

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining(endTime)), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 font-mono" dir="ltr">
      {[remaining.hours, remaining.minutes, remaining.seconds].map((unit, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="bg-[var(--color-ink)] text-white dark:bg-white dark:text-[var(--color-ink)] rounded-md px-2 py-1 text-sm font-bold min-w-[2.2rem] text-center">
            {pad(unit)}
          </span>
          {i < 2 && <span className="text-secondary font-bold">:</span>}
        </span>
      ))}
    </div>
  );
}
