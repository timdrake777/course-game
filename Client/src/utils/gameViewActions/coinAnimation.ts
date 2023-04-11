import Konva from "konva";
import { IPositionResponse } from "../../interfaces";

const coinAnimation = (sprite: Konva.Sprite, response: IPositionResponse) => {
  let spritePosition = sprite.getPosition();

  switch (response.direction) {
    case "<":
      sprite.to({
        x: spritePosition.x + 16,
      });
      break;
    case ">":
      sprite.to({
        x: spritePosition.x - 16,
      });
      break;
    case "^":
      sprite.to({
        y: spritePosition.y + 16,
      });
      break;
    case "v":
      sprite.to({
        y: spritePosition.y - 16,
      });
      break;
    default:
      break;
  }

  setTimeout(() => sprite.destroy(), 250);
};

export default coinAnimation