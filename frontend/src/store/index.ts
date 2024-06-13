import createStore from "unistore";
import { InfoStore } from "./types";

export const infoStore = createStore<InfoStore>({
  consumed: 1280,
  capacity: 220 * 12.8,
  voltage: 12.8,
  current: 18.3,
  load: 220,
});
