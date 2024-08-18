import { useCoreTimer } from "./useCoreTimer";
import { formatRemainingTime } from './utils';

export const useTimer = () => {
  const { currentTime } = useCoreTimer();


  const { years, months, days, hours, minutes, seconds } =
    formatRemainingTime(currentTime);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    isOverTime: false, // 현재 시간만 증가하므로 항상 false
  };
};