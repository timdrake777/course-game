import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import wallXIn from "../../../assets/ConfigTemplates/wall-x_in.png";
import wallXOut from "../../../assets/ConfigTemplates/wall-x_out.png";
import wallXCorner from "../../../assets/ConfigTemplates/wall-x-corner.png";
import wallXCorner2 from "../../../assets/ConfigTemplates/wall-x-corner-2.png";
import wallY from "../../../assets/ConfigTemplates/wall-y.png";
import wallYReversed from "../../../assets/ConfigTemplates/wall-y-rev.png";
import wallYDark from "../../../assets/ConfigTemplates/wall-y-dark.png";
import wallYReversedDark from "../../../assets/ConfigTemplates/wall-y-rev-dark.png";
import floor from "../../../assets/ConfigTemplates/Floor.png";
import { LevelContextValues } from "../LevelContext";

interface Props {
  areaKey: number;
  position: [number, number];
}

const AreaItem = (props: Props) => {
  const { addHandler } = useContext(LevelContextValues);

  const [areaKey, setAreaKey] = useState<number>(props.areaKey);
  const [image, setImage] = useState<string>();

  const changeKey = () => {
    if (areaKey + 1 > 8) {
      setAreaKey(0);
      return;
    }
    setAreaKey(areaKey + 1);
  };

  const changeTexture = () => {
    switch (areaKey) {
      case 0:
        setImage(floor);
        break;
      case 1:
        setImage(wallXIn);
        break;
      case 2:
        setImage(wallXOut);
        break;
      case 3:
        setImage(wallXCorner);
        break;
      case 4:
        setImage(wallXCorner2);
        break;
      case 5:
        setImage(wallY);
        break;
      case 6:
        setImage(wallYDark);
        break;
      case 7:
        setImage(wallYReversed);
        break;
      case 8:
        setImage(wallYReversedDark);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    changeTexture();
    addHandler(areaKey, props.position);
  }, [areaKey]);

  return (
    <img
      className="w-[32px] h-[32px] hover:brightness-125"
      onClick={changeKey}
      src={image}
      style={{ backgroundImage: `url(${floor})` }}
    />
  );
};

export default AreaItem;
