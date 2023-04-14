import Konva from "konva";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Layer, Rect, Sprite, Stage } from "react-konva";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import useImage from "use-image";

import {
  IAnimationType,
  ILevelConfig,
  IObstacles,
  IPosition,
  IPositionResponse,
} from "../../interfaces";
import storageActions from "../../utils/storageActions";
import coinAnimation from "../../utils/gameViewActions/coinAnimation";
import obstacleSprites from "../../utils/gameViewActions/obstacleSprites";
import changePosition from "../../utils/gameViewActions/changePosition";
import { AnimationType, CharacterConfig, CHARACTER_SPRITE_ANIMATIONS } from "../../utils/constants";
import EmptyConfig from "./fragments/EmptyConfig";
import CoinsCounter from "./fragments/CoinsCounter";

import coinSfx from "../../assets/Audio/coin.mp3";
import deathSfx from "../../assets/Audio/death.mp3";
import levelCompleteSfx from "../../assets/Audio/levelComplete.wav";
import BgImagePNG from "../../assets/Background/Floor.png";
import characterPNG from "../../assets/Character/character.png";

import styles from "./GameView.module.scss";

export const GameView = () => {
  const navigate = useNavigate();

  const viewRef = useRef<Konva.Stage>(null);
  const characterRef = useRef<Konva.Sprite>(null);
  const keyUpRef = useRef<boolean>(false);
  const keyDownTimeoutRef = useRef<number>();

  const [posX, setPosX] = useState<number>(CharacterConfig.START_POSITION_X);
  const [posY, setPosY] = useState<number>(CharacterConfig.START_POSITION_Y);
  const [animationType, setAnimationType] = useState<IAnimationType>(AnimationType.IDLE);
  const [coinsCount, setCoinsCount] = useState<number>(0);

  const levelConfig = useMemo<ILevelConfig | null>(() => storageActions.getLevelConfig(), []);
  const obstacles: IObstacles = useMemo(() => obstacleSprites(levelConfig), [levelConfig]);

  const [bgImage] = useImage(BgImagePNG);
  const [characterImage] = useImage(characterPNG);
  const coinGetSound = useMemo(() => new Audio(coinSfx), [coinSfx]);
  const deathSound = useMemo(() => new Audio(deathSfx), [deathSfx]);
  const levelCompleteSound = useMemo(() => new Audio(levelCompleteSfx), [levelCompleteSfx]);

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
          deathSound.play();
          clearTimeout(keyDownTimeoutRef.current);
          setTimeout(() => characterRef.current?.stop(), 670);
          break;
        case 2:
          let currentCoinsCount = coinsCount;
          currentCoinsCount += 1;
          let sprite = viewRef.current?.findOne(`#${response.id}`) as Konva.Sprite;

          if (!sprite) break;

          if (currentCoinsCount === obstacles.coins) {
            removeKeyEvents();
            clearTimeout(keyDownTimeoutRef.current);
            coinGetSound.addEventListener("ended", () => {
              levelCompleteSound.play();
              setAnimationType(AnimationType.IDLE);
            });
          }

          coinGetSound.pause();
          coinGetSound.currentTime = 0;
          coinGetSound.play();
          coinAnimation(sprite, response);
          setCoinsCount(currentCoinsCount);
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
    <section
      className={"w-1/2 h-full flex items-center justify-center relative " + styles.gameViewSection}
    >
      {levelConfig ? (
        <>
          <div className="py-3 px-4 w-full absolute top-0 left-0 flex justify-between items-center">
            <a
              href="/config"
              className="text-zinc-200 cursor-pointer hover:text-zinc-400 transition-colors"
              title="Конфигурация"
            >
              <FontAwesomeIcon icon={faGear} size="lg" />
            </a>
            <CoinsCounter currentCoinsCount={coinsCount} allCoins={obstacles.coins} />
          </div>

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
        </>
      ) : (
        <EmptyConfig navigate={navigate} />
      )}
    </section>
  );
};
