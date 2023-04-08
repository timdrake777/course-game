import React, { useEffect, useState } from "react";
import AreaItem from "./fragments/AreaItem";
import { createLeveltemplate } from "../../utils/constants";
import LevelContext from "./LevelContext";
import AreaConfig from "./fragments/AreaConfig";
import AreaActions from "./fragments/AreaActions";
import { IAreaSize } from "../../interfaces";
import storageActions from "../../utils/storageActions";

const LevelConfig = () => {
  const [levelConfig, setLevelConfig] = useState<number[][]>();
  const [areaSize, setAreaSize] = useState<IAreaSize>({ width: 20, height: 20 });

  const changeAreaSize = (height: number, width: number) => {
    setAreaSize({ width, height });
  };

  useEffect(() => {
    setLevelConfig(
      storageActions.getLevelConfig()?.points ||
        createLeveltemplate(areaSize.height, areaSize.width)
    );
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-900">
      <LevelContext levelConfig={levelConfig || []}>
        <div className="min-w-main h-[98%] flex flex-col gap-10">
          <AreaConfig levelConfig={levelConfig || []} />
          <AreaActions changeAreaSize={changeAreaSize}/>
        </div>
      </LevelContext>
    </div>
  );
};

export default LevelConfig;
