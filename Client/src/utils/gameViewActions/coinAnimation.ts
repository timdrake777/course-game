import Konva from "konva";
import { IPositionResponse } from "../../interfaces";

const coinAnimation = (sprite: Konva.Sprite, response: IPositionResponse) => {
  let spritePosition = sprite.getPosition();

  switch (response.direction) {
    case "<":
      sprite.to({
        duration: 0.2,
        x: spritePosition.x + 16,
      });
      break;
    case ">":
      sprite.to({
        duration: 0.2,
        x: spritePosition.x - 16,
      });
      break;
    case "^":
      sprite.to({
        duration: 0.2,
        y: spritePosition.y + 16,
      });
      break;
    case "v":
      sprite.to({
        duration: 0.2,
        y: spritePosition.y - 16,
      });
      break;
    default:
      break;
  }

  setTimeout(() => sprite.destroy(), 250);
};

export default coinAnimation