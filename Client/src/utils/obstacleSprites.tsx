import { Rect, Sprite } from "react-konva";
import { ILevelConfig, IObstacle } from "../interfaces";
import getTexture from "./getTexture";
import { StageConfig } from "./constants";

const obstacleSprites = (levelConfig: ILevelConfig | null) => {
  if (!levelConfig) return;

  let spritesArray: IObstacle[] = [];
  levelConfig.points.forEach((row, rowIndex) => {
    row.forEach((item, itemIndex) => {
      if (item === 0) return;

      let image = document.createElement("img");
      image.src = getTexture(item);
      let sprite = (
        <Sprite
          key={`${rowIndex}-${itemIndex}`}
          width={StageConfig.BG_ITEM_SIZE}
          height={StageConfig.BG_ITEM_SIZE}
          x={itemIndex * StageConfig.BG_ITEM_SIZE}
          y={rowIndex * StageConfig.BG_ITEM_SIZE}
          animation={"idle"}
          animations={{idle: [0, 0, StageConfig.BG_ITEM_SIZE, StageConfig.BG_ITEM_SIZE]}}
          image={image}
        />
      );

      spritesArray.push(sprite);
    });
  });

  return spritesArray;
};

export default obstacleSprites;
