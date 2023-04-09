import { Sprite } from "konva/lib/shapes/Sprite";
import { StateDispatch, IDirection, IDirectionSign, ILevelConfig, IPosition } from "../interfaces";
import { CharacterConfig, StageConfig } from "./constants";

const changePosition = (
  ref: React.RefObject<Sprite>,
  position: IPosition,
  setPosition: StateDispatch<number>,
  direction: IDirection,
  directionSign: IDirectionSign,
  levelConfig: ILevelConfig
) => {
  let changePos;

  let nextPosition = direction === "x" ? position.x : position.y;
  nextPosition += CharacterConfig.STEP * directionSign;

  let nextArrayPosition: IPosition = {
    x: Math.ceil(
      (position.x + (direction === "x" ? CharacterConfig.STEP * directionSign : 0)) /
        StageConfig.BG_ITEM_SIZE
    ),
    y: Math.ceil(
      (position.y + (direction === "y" ? CharacterConfig.STEP * directionSign : 0)) /
        StageConfig.BG_ITEM_SIZE
    ),
  };

  const moveCondition = (direction4Condition: IDirection) =>
    direction === direction4Condition &&
    nextPosition < levelConfig.width() &&
    nextPosition >= 0 &&
    levelConfig.points[nextArrayPosition.y][nextArrayPosition.x] === 0;

  if (moveCondition("x")) {
    changePos = { x: nextPosition };
  }

  if (moveCondition("y")) {
    changePos = { y: nextPosition };
  }

  if (!changePos) return;

  ref.current?.to({
    duration: 0.5,
    ...changePos,
  });

  setPosition(nextPosition);
};

export default changePosition;
