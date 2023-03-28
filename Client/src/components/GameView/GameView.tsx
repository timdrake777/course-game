import Konva from "konva";
import { CircleConfig } from "konva/lib/shapes/Circle";
import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, KonvaNodeComponent, Layer, Stage, Text } from "react-konva";
import changePosition from "../../utils/changePosition";
import { CircleCustom } from "../../utils/constants";

export const GameView = () => {
  const viewRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<Konva.Circle>(null);

  const [posX, setPosX] = useState<number>(CircleCustom.START_POSITION_X);
  const [posY, setPosY] = useState<number>(CircleCustom.START_POSITION_Y);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      switch (key) {
        case "ArrowUp":
          event.preventDefault();
          changePosition(circleRef, posY, setPosY, "y", -1);
          break;
        case "ArrowDown":
          event.preventDefault();
          changePosition(circleRef, posY, setPosY, "y", 1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          changePosition(circleRef, posX, setPosX, "x", -1);
          break;
        case "ArrowRight":
          event.preventDefault();
          changePosition(circleRef, posX, setPosX, "x", 1);
          break;

        default:
          break;
      }
    },
    [posX, posY]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div ref={viewRef}>
      <Stage height={window.innerHeight} width={window.innerWidth}>
        <Layer height={window.innerHeight} width={window.innerWidth}>
          <Circle
            ref={circleRef}
            width={CircleCustom.CIRCLE_SIZE}
            height={CircleCustom.CIRCLE_SIZE}
            fill="#000"
            x={CircleCustom.START_POSITION_X}
            y={CircleCustom.START_POSITION_Y}
          />
        </Layer>
      </Stage>
    </div>
  );
};
