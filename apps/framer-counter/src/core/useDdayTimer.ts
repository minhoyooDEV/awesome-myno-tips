import { useRef } from "react";
import { useCoreTimer } from "./useCoreTimer";
import { padStartedRemainingTime } from "./utils";

export const useDdayTimer = (targetDate: Date | number) => {
  const { currentTime } = useCoreTimer();

  const targetTime = useRef(
    targetDate instanceof Date
      ? targetDate.getTime()
      : new Date(Date.now() + 1000 * 60 * 60 * 24 * (targetDate + 1)).getTime()
  );

  const diffTime = targetTime.current - currentTime.getTime();

  if (diffTime <= 0) {
    // 목표 시간이 지나면 모두 0으로 설정
    return {
      years: "00",
      months: "00",
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isOverTime: true,
    };
  }

  const { years, months, days, hours, minutes, seconds, dday } =
    padStartedRemainingTime(diffTime);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    isOverTime: false,
    dday,
  };
};
