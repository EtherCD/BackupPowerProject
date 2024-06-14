export interface InfoStore {
  consumed: number;
  capacity: number;
  capacityInAh: number;
  voltage: number;
  current: number;
  load: number;
  maxLoad: number;
  startTimestamp: number;
}
