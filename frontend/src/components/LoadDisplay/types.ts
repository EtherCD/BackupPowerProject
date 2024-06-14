export interface LoadDisplayProps {
  load: number;
  maxLoad: number;
  capacity: number;
  consumed: number;
}

export interface LoadDisplayState {
  percent: number;
  time: number;
}
