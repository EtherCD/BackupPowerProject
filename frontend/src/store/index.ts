import createStore from "unistore";
import { InfoStore } from "./types";

export const infoStore = createStore<InfoStore>({
  consumed: 100,
  capacity: 60 * 12,
  capacityInAh: 60,
  voltage: 0,
  current: 0,
  load: 100,
  maxLoad: 500,
  startTimestamp: Date.now(),
});
