import createStore from "unistore";
import { InfoStore } from "./types";

export const infoStore = createStore<InfoStore>({
  consumed: 0,
  capacity: 60 * 12,
  capacityInAh: 60,
  voltage: 0,
  current: 0,
  load: 0,
});
