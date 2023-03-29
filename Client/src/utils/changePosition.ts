import { Sprite } from "konva/lib/shapes/Sprite";
import { StateDispatch, IDirection, IDirectionSign } from "../interfaces";
import { CharacterConfig, StageConfig } from "./constants";

const changePosition = (
  ref: React.RefObject<Sprite>,
  position: number,
  setPosition: StateDispatch<number>,
  direction: IDirection,
  directionSign: IDirectionSign
) => {
  let changePos;

  if (
    direction === "x" &&
    position + CharacterConfig.STEP * directionSign < StageConfig.STAGE_WIDTH &&
    position + CharacterConfig.STEP * directionSign >= 0
  ) {
    changePos = { x: position + CharacterConfig.STEP * directionSign };
  }

  if (
    direction === "y" &&
    position + CharacterConfig.STEP * directionSign < StageConfig.STAGE_HEIGHT &&
    position + CharacterConfig.STEP * directionSign >= 0
  ) {
    changePos = { y: position + CharacterConfig.STEP * directionSign };
  }

  if (!changePos) return;

  ref.current?.to({
    duration: 0.5,
    ...changePos,
  });

  setPosition(position + CharacterConfig.STEP * directionSign);
};

export default changePosition;
