import React, { useState } from "react";
import AreaItem from "./fragments/AreaItem";
import { createLeveltemplate } from "../../utils/constants";

const LevelConfig = () => {
  const [levelConfig, setLevelConfig] = useState<number[][]>(createLeveltemplate(12, 12));
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="min-w-main h-[98%] bg-red-200 flex flex-col gap-10">
        <div className="config flex flex-col h-5/6 w-full justify-center items-center">
          {levelConfig.map((row, rowIndex) => (
            <div className="flex" key={rowIndex}>
              {row.map((item, itemIndex) => (
                <AreaItem key={itemIndex} areaKey={item} position={[rowIndex, itemIndex]} />
              ))}
            </div>
          ))}
        </div>

        <div className="buttons flex h-1/6 w-full"></div>
      </div>
    </div>
  );
};

export default LevelConfig;
