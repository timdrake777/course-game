import React, { useState } from "react";
import AreaItem from "./fragments/AreaItem";
import { createLeveltemplate } from "../../utils/constants";
import LevelContext from "./LevelContext";
import AreaConfig from "./fragments/AreaConfig";
import AreaActions from "./fragments/AreaActions";

const LevelConfig = () => {
  const [levelConfig, setLevelConfig] = useState<number[][]>(createLeveltemplate(20, 20));
  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-900">
      <LevelContext levelConfig={levelConfig}>
        <div className="min-w-main h-[98%] flex flex-col gap-10">
          <AreaConfig levelConfig={levelConfig} />
          <AreaActions/>
        </div>
      </LevelContext>
    </div>
  );
};

export default LevelConfig;
