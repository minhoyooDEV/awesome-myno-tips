import { useCoreTimer } from "./useCoreTimer";
import { padStartedRemainingTime } from './utils';

export const useTimer = () => {
  const { currentTime } = useCoreTimer();


  const { years, months, days, hours, minutes, seconds } =
    padStartedRemainingTime(currentTime);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};