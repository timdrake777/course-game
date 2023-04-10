import Konva from "konva";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Layer, Rect, Sprite, Stage } from "react-konva";
import useImage from "use-image";
import changePosition from "../../utils/changePosition";
import {
  AnimationType,
  CharacterConfig,
  CHARACTER_SPRITE_ANIMATIONS,
  StageConfig,
} from "../../utils/constants";

import BgImagePNG from "../../assets/Background/Floor.png";
import characterPNG from "../../assets/Character/character.png";
import { IAnimationType, ILevelConfig, IObstacle, IPosition } from "../../interfaces";
import storageActions from "../../utils/storageActions";
import obstacleSprites from "../../utils/obstacleSprites";
import GameButton from "../Templates/GameButton";
import { useNavigate } from "react-router";

export const GameView = () => {
  const navigate = useNavigate();

  const viewRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<Konva.Sprite>(null);
  const keyUpRef = useRef<boolean>(false);
  const keyDownTimeoutRef = useRef<number>();

  const [posX, setPosX] = useState<number>(CharacterConfig.START_POSITION_X);
  const [posY, setPosY] = useState<number>(CharacterConfig.START_POSITION_Y);
  const [animationType, setAnimationType] = useState<IAnimationType>(AnimationType.IDLE);
  const [levelConfig, setLevelConfig] = useState<ILevelConfig | null>(
    storageActions.getLevelConfig()
  );
  const obstacles = useMemo(() => obstacleSprites(levelConfig), [levelConfig]);

  const [bgImage] = useImage(BgImagePNG);
  const [characterImage] = useImage(characterPNG);

  const arrowTimeout = () =>
    setTimeout(() => {
      keyDownTimeoutRef.current = undefined;
      if (keyUpRef.current) {
        setAnimationType(AnimationType.IDLE);
        keyUpRef.current = false;
      }
    }, 500);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (keyDownTimeoutRef.current || !levelConfig) {
        return;
      }

      let absolutePosition: IPosition = {
        x: posX,
        y: posY,
      };

      switch (key) {
        case "ArrowUp":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, absolutePosition, setPosY, "y", -1, levelConfig);
          setAnimationType(AnimationType.UP);
          break;
        case "ArrowDown":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, absolutePosition, setPosY, "y", 1, levelConfig);
          setAnimationType(AnimationType.DOWN);
          break;
        case "ArrowLeft":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, absolutePosition, setPosX, "x", -1, levelConfig);
          setAnimationType(AnimationType.LEFT);
          break;
        case "ArrowRight":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, absolutePosition, setPosX, "x", 1, levelConfig);
          setAnimationType(AnimationType.RIGHT);
          break;

        default:
          break;
      }
    },
    [posX, posY]
  );

  const handleUserKeyUp = () => {
    keyUpRef.current = true;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("keyup", handleUserKeyUp);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      window.removeEventListener("keyup", handleUserKeyUp);
    };
  }, [handleUserKeyPress]);

  useLayoutEffect(() => {
    characterRef.current?.start();
  }, [characterImage]);

  return (
    <div ref={viewRef} className="w-1/2 h-full flex items-center justify-center">
      {levelConfig ? (
        <Stage height={levelConfig.height()} width={levelConfig.width()}>
          <Layer>
            <Rect
              fillPatternImage={bgImage as HTMLImageElement}
              width={levelConfig.width()}
              height={levelConfig.height()}
            />
            {obstacles}
            <Sprite
              ref={characterRef}
              width={CharacterConfig.CHARACTER_SIZE}
              height={CharacterConfig.CHARACTER_SIZE}
              x={CharacterConfig.START_POSITION_X}
              y={CharacterConfig.START_POSITION_Y}
              scale={{ x: 0.65, y: 0.65 }}
              image={characterImage as HTMLImageElement}
              animations={CHARACTER_SPRITE_ANIMATIONS}
              frameRate={6}
              frameIndex={0}
              animation={animationType}
            />
          </Layer>
        </Stage>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-lg font-bold">Создайте уровень в /config</p>
          <GameButton onClick={(e) => navigate("config")} func="ok" className="text-slate-700">
            Конфигурация
          </GameButton>
        </div>
      )}
    </div>
  );
};
