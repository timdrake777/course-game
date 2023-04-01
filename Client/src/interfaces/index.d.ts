export type StateDispatch<T = any> = React.Dispatch<React.SetStateAction<T>>;
export type IDirectionSign = -1 | 1;
export type IDirection = "x" | "y";
export type IAnimationType = "idle" | "down" | "up" | "right" | "left"

export interface ICodeBlocks {
    instanceName: string,
    instanceMethod: string,
    instanceValue: string,
}