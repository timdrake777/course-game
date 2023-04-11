import Konva from "konva";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Layer, Rect, Sprite, Stage } from "react-konva";
import useImage from "use-image";
import changePosition from "../../utils/gameViewActions/changePosition";
import {
  AnimationType,
  CharacterConfig,
  CHARACTER_SPRITE_ANIMATIONS,
  StageConfig,
} from "../../utils/constants";

import BgImagePNG from "../../assets/Background/Floor.png";
import characterPNG from "../../assets/Character/character.png";
import {
  IAnimationType,
  ILevelConfig,
  IObstacles,
  IPosition,
  IPositionResponse,
} from "../../interfaces";
import storageActions from "../../utils/storageActions";
import obstacleSprites from "../../utils/gameViewActions/obstacleSprites";
import GameButton from "../Templates/GameButton";
import { useNavigate } from "react-router";
import coinAnimation from "../../utils/gameViewActions/coinAnimation";

export const GameView = () => {
  const navigate = useNavigate();

  const viewRef = useRef<Konva.Stage>(null);
  const characterRef = useRef<Konva.Sprite>(null);
  const keyUpRef = useRef<boolean>(false);
  const keyDownTimeoutRef = useRef<number>();
  const coinsCount = useRef<number>(0);

  const [posX, setPosX] = useState<number>(CharacterConfig.START_POSITION_X);
  const [posY, setPosY] = useState<number>(CharacterConfig.START_POSITION_Y);
  const [animationType, setAnimationType] = useState<IAnimationType>(AnimationType.IDLE);
  const [levelConfig, setLevelConfig] = useState<ILevelConfig | null>(
    storageActions.getLevelConfig()
  );
  const obstacles: IObstacles = useMemo(() => obstacleSprites(levelConfig), [levelConfig]);

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

      let response: IPositionResponse = { code: 0, id: "" };

      switch (key) {
        case "ArrowUp":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          response = changePosition(characterRef, absolutePosition, setPosY, "y", -1, levelConfig);
          setAnimationType(AnimationType.UP);
          break;
        case "ArrowDown":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          response = changePosition(characterRef, absolutePosition, setPosY, "y", 1, levelConfig);
          setAnimationType(AnimationType.DOWN);
          break;
        case "ArrowLeft":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          response = changePosition(characterRef, absolutePosition, setPosX, "x", -1, levelConfig);
          setAnimationType(AnimationType.LEFT);
          break;
        case "ArrowRight":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          response = changePosition(characterRef, absolutePosition, setPosX, "x", 1, levelConfig);
          setAnimationType(AnimationType.RIGHT);
          break;

        default:
          break;
      }

      switch (response.code) {
        case 1:
          setTimeout(() => setAnimationType(AnimationType.DEAD), 100);
          removeKeyEvents();
          clearTimeout(keyDownTimeoutRef.current);
          setTimeout(() => characterRef.current?.stop(), 670);
          break;
        case 2:
          let sprite = viewRef.current?.findOne(`#${response.id}`) as Konva.Sprite;
          if (sprite) {
            coinsCount.current += 1;
            coinAnimation(sprite, response);
          }
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

  const addKeyEvents = () => {
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("keyup", handleUserKeyUp);
  };

  const removeKeyEvents = () => {
    window.removeEventListener("keydown", handleUserKeyPress);
    window.removeEventListener("keyup", handleUserKeyUp);
  };

  useEffect(() => {
    addKeyEvents();
    return () => {
      removeKeyEvents();
    };
  }, [handleUserKeyPress]);

  useLayoutEffect(() => {
    characterRef.current?.start();
  }, [characterImage]);

  return (
    <div className="w-1/2 h-full flex items-center justify-center">
      {levelConfig ? (
        <Stage height={levelConfig.height()} width={levelConfig.width()} ref={viewRef}>
          <Layer>
            <Rect
              fillPatternImage={bgImage as HTMLImageElement}
              width={levelConfig.width()}
              height={levelConfig.height()}
            />
            {obstacles?.elements}
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
