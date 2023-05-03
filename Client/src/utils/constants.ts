export enum CharacterConfig {
  CHARACTER_SIZE = 31.2,
  START_POSITION_X = 0,
  START_POSITION_Y = 0,
  STEP = 32,
  ANIMATION_DURATION_SECONDS = 0.5
}

export enum AnimationType {
  IDLE = "idle",
  DOWN = "down",
  UP = "up",
  RIGHT = "right",
  LEFT = "left",
  DEAD = "dead"
}

export enum StageConfig {
  BG_ITEM_SIZE = 32
}

export const OBSTACLES = [1, 2, 3, 4, 5, 6, 7, 8]

export const CHARACTER_SPRITE_ANIMATIONS = {
  idle: [1 + 48 * 2, 3, 48, 48, 1 + 48 * 2, 5, 48, 48],
  down: [1, 3, 48, 48, 1 + 48 * 4, 3, 48, 48],
  left: [1, 3 + 48 * 2, 48, 48, 1 + 48 * 4, 3 + 48 * 2, 48, 48],
  right: [1, 3 + 48 * 4, 48, 48, 1 + 48 * 4, 3 + 48 * 4, 48, 48],
  up: [1, 3 + 48 * 6, 48, 48, 1 + 48 * 4, 3 + 48 * 6, 48, 48],
  dead: [-1 + 48 * 2, 3, 48, 48, 3 + 48 * 2, 0, 48, 48, -1 + 48 * 2, -3, 48, 48, 3 + 48 * 2, -7, 48, 48, -1 + 48 * 2, -10, 48, 48]
};

export const COIN_SPRITE_ANIMATIONS = {
  idle: [0, 0, 32, 32,
         32, 0, 32, 32,
         64, 0, 32, 32,
         96, 0, 32, 32,
         128, 0, 32, 32,
         160, 0, 32, 32,
         192, 0, 32, 32,]
}

export const createLeveltemplate = (height: number = 4, width: number = 4): number[][] => {
  let levelConfigTemplate: number[][] = new Array(height).fill([]);

  levelConfigTemplate = levelConfigTemplate.map((item) => {
    item = new Array(width).fill(0);
    return item;
  });

  return levelConfigTemplate;
};
