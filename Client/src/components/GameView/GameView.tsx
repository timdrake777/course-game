import Konva from "konva";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Circle, KonvaNodeComponent, Layer, Rect, Sprite, Stage, Text } from "react-konva";
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
import { IAnimationType } from "../../interfaces";

import styles from './GameView.module.scss'

export const GameView = () => {
  const viewRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<Konva.Sprite>(null);

  const [posX, setPosX] = useState<number>(CharacterConfig.START_POSITION_X);
  const [posY, setPosY] = useState<number>(CharacterConfig.START_POSITION_Y);
  const [animationType, setAnimationType] = useState<IAnimationType>(AnimationType.IDLE);

  const keyUpRef = useRef<boolean>(false);
  const keyDownTimeoutRef = useRef<number>();

  const [bgImage] = useImage(BgImagePNG);
  const [characterImage] = useImage(characterPNG);

  const arrowTimeout = () =>
    setTimeout(() => {
      keyDownTimeoutRef.current = undefined;
      setAnimationType(AnimationType.IDLE);
    }, 500);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (keyDownTimeoutRef.current) {
        console.log(keyDownTimeoutRef.current);
        return;
      }

      switch (key) {
        case "ArrowUp":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, posY, setPosY, "y", -1);
          setAnimationType(AnimationType.UP);
          break;
        case "ArrowDown":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, posY, setPosY, "y", 1);
          setAnimationType(AnimationType.DOWN);
          break;
        case "ArrowLeft":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, posX, setPosX, "x", -1);
          setAnimationType(AnimationType.LEFT);
          break;
        case "ArrowRight":
          event.preventDefault();
          keyDownTimeoutRef.current = arrowTimeout();
          changePosition(characterRef, posX, setPosX, "x", 1);
          setAnimationType(AnimationType.RIGHT);
          break;

        default:
          break;
      }
    },
    [posX, posY]
  );

  const handleUserKeyUp = async () => {
    keyUpRef.current = true;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    // window.addEventListener("keyup", handleUserKeyUp);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      window.removeEventListener("keyup", handleUserKeyUp);
    };
  }, [handleUserKeyPress]);

  useLayoutEffect(() => {
    characterRef.current?.start();
  }, [characterImage]);

  return (
    <div ref={viewRef} className={styles.gameViewSection}>
      <Stage height={StageConfig.STAGE_HEIGHT} width={StageConfig.STAGE_WIDTH}>
        <Layer>
          <Rect
            fillPatternImage={bgImage as HTMLImageElement}
            width={window.innerWidth}
            height={window.innerHeight}
          />
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
    </div>
  );
};
