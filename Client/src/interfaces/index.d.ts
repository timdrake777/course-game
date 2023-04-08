export type StateDispatch<T = any> = React.Dispatch<React.SetStateAction<T>>;
export type IDirectionSign = -1 | 1;
export type IDirection = "x" | "y";
export type IAnimationType = "idle" | "down" | "up" | "right" | "left"

export interface IConfigHandler {
  key: number;
  position: [number, number];
}

export interface ILevelConfig {
  points: number[][];
  width: () => number;
  height: () => number;
}

export interface IAreaSize {
  width: number;
  height: number;
}