export interface ChargeProps {
  consumed: number;
  capacity: number;
  capacityInAh: number;
  voltage: number;
  current: number;
}

export interface ChargeState {
  chargePercent: number;
  chargeValue: number;
  timeToChargeBattery: number;
  chargeCurrent: number;
}
