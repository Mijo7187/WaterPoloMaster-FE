import { useEffect, useState } from "react";

export interface IUseStopwatch {
  elapsedSeconds: number;
  isRunning: boolean;
  hasStarted: boolean;
  minute: number;
  formatted: string;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

// A live match stopwatch (count-up). No timer utility exists in the repo, so this
// is built from scratch: a single interval driven by `isRunning`. It can be seeded
// from a saved segment's duration so reopening continues from the stored minute.
export const useStopwatch = (initialMinutes?: number | null): IUseStopwatch => {
  const seededSeconds = Math.max(0, initialMinutes ?? 0) * 60;
  const [elapsedSeconds, setElapsedSeconds] = useState(seededSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(seededSeconds > 0);

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const start = () => {
    setHasStarted(true);
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setHasStarted(false);
  };

  return {
    elapsedSeconds,
    isRunning,
    hasStarted,
    minute: Math.floor(elapsedSeconds / 60),
    formatted: formatTime(elapsedSeconds),
    start,
    pause,
    resume,
    reset,
  };
};
