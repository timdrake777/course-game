export type StateDispatch<T = any> = React.Dispatch<React.SetStateAction<T>>;
export type IDirectionSign = -1 | 1;
export type IDirection = "x" | "y";
export type IAnimationType = "idle" | "down" | "up" | "right" | "left" | "dead";

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

export interface IPosition {
  x: number;
  y: number;
}

export interface IPositionResponse {
  code: number;
  id: string;
  direction?: ICoinDirection;
}

export type ICoinDirection = "<" | ">" | "^" | "v";

export interface IObstacles {
  elements: JSX.Element[];
  coins: number;
}
export interface ICodeBlocks {
  instanceName: string;
  instanceMethod: string;
  instanceValue: string;
}
