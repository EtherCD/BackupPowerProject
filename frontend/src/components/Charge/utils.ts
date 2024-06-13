export const shortWatts = (value: number): string => {
  if (value > 1000) return Math.round(value / 100) / 10 + "kWh";
  else return value + "Wh";
};
