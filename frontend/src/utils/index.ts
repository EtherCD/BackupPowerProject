export const shortWatts = (value: number): string => {
  if (value > 1000) return Math.round(value / 100) / 10 + "kW";
  else return Math.round(value) + "W";
};

export const hoursToFormattedString = (dHours: number): string => {
  const hours = Math.floor(dHours);
  return `${hours}h ${Math.round((dHours - hours) * 60)}m`;
};
