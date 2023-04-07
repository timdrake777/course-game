export enum CharacterConfig {
  CHARACTER_SIZE = 31.2,
  START_POSITION_X = 0,
  START_POSITION_Y = 0,
  STEP = 32,
}

export enum AnimationType {
  IDLE = "idle",
  DOWN = "down",
  UP = "up",
  RIGHT = "right",
  LEFT = "left",
}

export enum StageConfig {
  BG_ITEM_SIZE = 64,
  STAGE_HEIGHT = window.innerHeight,
  STAGE_WIDTH = BG_ITEM_SIZE * 12,
}

export const CHARACTER_SPRITE_ANIMATIONS = {
  idle:   [1 + 48 * 2, 3, 48, 48, 1 + 48 * 2, 5, 48, 48],
  down:   [1, 3, 48, 48, 1 + 48 * 4, 3, 48, 48],
  left:   [1, 3 + 48 * 2, 48, 48, 1 + 48 * 4, 3 + 48 * 2, 48, 48],
  right:  [1, 3 + 48 * 4, 48, 48, 1 + 48 * 4, 3 + 48 * 4, 48, 48],
  up:     [1, 3 + 48 * 6, 48, 48, 1 + 48 * 4, 3 + 48 * 6, 48, 48],
};

export const createLeveltemplate = (height: number = 4, width: number = 4): number[][] => {
  let levelConfigTemplate: number[][] = new Array(height);

  for(let i = 0; i < levelConfigTemplate.length; i++) {
    levelConfigTemplate[i] = new Array(width).fill(0);
  }

  console.log(levelConfigTemplate);
  
  return levelConfigTemplate;
}

