import { Circle } from "konva/lib/shapes/Circle";
import { StateDispatch, IDirection, IDirectionSign } from "../interfaces";
import { CircleCustom } from "./constants";

const changePosition = (
  ref: React.RefObject<Circle>,
  position: number,
  setPosition: StateDispatch<number>,
  direction: IDirection,
  directionSign: IDirectionSign,
) => {
  let changePos;

  if (
    direction === "x" &&
    position + CircleCustom.CIRCLE_SIZE * directionSign < window.innerWidth &&
    position + CircleCustom.CIRCLE_SIZE * directionSign > 0
  ) {
    changePos = { x: position + CircleCustom.CIRCLE_SIZE * directionSign };
  }

  if (
    direction === "y" &&
    position + CircleCustom.CIRCLE_SIZE * directionSign < window.innerHeight &&
    position + CircleCustom.CIRCLE_SIZE * directionSign > 0
  ) {
    changePos = { y: position + CircleCustom.CIRCLE_SIZE * directionSign };
  }

  if (!changePos) return;

  ref.current?.to({
    duration: 0.2,
    ...changePos,
  });

  setPosition(position + CircleCustom.CIRCLE_SIZE * directionSign);
};

export default changePosition