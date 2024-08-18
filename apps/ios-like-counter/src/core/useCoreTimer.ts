import { useEffect, useRef, useState } from "react";

export const useCoreTimer = () => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState(() =>
    typeof window !== "undefined" ? Date.now() : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR에서는 실행하지 않음

    const intervalId = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now); // 매초 현재 시간을 갱신
    }, 1000);

    timeout.current = intervalId;

    return () => {
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    };
  }, []);

  return { currentTime };
};