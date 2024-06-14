export interface StorageType {
  [key: string]: BatteryType | number;
  batteryType: BatteryType;
  capacityInAh: number;
  consumed: number;
  capacity: number;
  voltage: number;
  current: number;
  load: number;
}

export type BatteryType = "LeadAcid" | "LiIon" | "LiFePo4" | "LIT";
