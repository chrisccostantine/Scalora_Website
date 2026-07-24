import { useEffect, useState } from 'react';

const ACTIVITY_EVENTS = ['mousemove', 'touchstart', 'keydown', 'wheel'];

export function useIdle(timeoutMs = 4000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setIdle(true), timeoutMs);
    const onActivity = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), timeoutMs);
    };
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, onActivity, { passive: true }));
    return () => {
      clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, onActivity));
    };
  }, [timeoutMs]);

  return idle;
}
