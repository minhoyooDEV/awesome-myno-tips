
const padStarted = (unit: number, adjust = 0) => String(unit + adjust).padStart(2, '0');

export const padStartedRemainingTime = (diffTime: number | Date) => {
  const remainingDate = new Date(diffTime);
  const dday = Math.floor((+remainingDate - Date.now()) / 86400000);

  return {
    years: remainingDate.getUTCFullYear().toString(),
    months: padStarted(remainingDate.getUTCMonth(), 1),
    days: padStarted(remainingDate.getUTCDate()),
    hours: padStarted(remainingDate.getHours()),
    minutes: padStarted(remainingDate.getUTCMinutes()),
    seconds: padStarted(remainingDate.getUTCSeconds()),
    dday,
  };
};