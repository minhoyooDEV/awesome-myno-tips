export const formatRemainingTime = (diffTime: number) => {
  const remainingDate = new Date(diffTime);
  const [years, months, days, hours, minutes, seconds] = remainingDate
    .toISOString()
    .slice(0, 19)
    .split(/[-T:]/)
    .map((unit, index) =>
      index === 1 ? String(+unit).padStart(2, "0") : unit
    );

  const dday = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return { years, months, days, hours, minutes, seconds, dday };
};
