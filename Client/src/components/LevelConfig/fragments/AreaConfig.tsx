import React from "react";
import AreaItem from "./AreaItem";

interface Props {
  levelConfig: number[][];
}

const AreaConfig = (props: Props) => {
  return (
    <div className="config flex bg-slate-800/50 flex-col h-5/6 w-full justify-center items-center rounded-md border border-slate-700/50">
      <div className="flex flex-col border-2 border-slate-700">
        {props.levelConfig.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row.map((item, itemIndex) => (
              <AreaItem key={`${rowIndex}-${itemIndex}`} areaKey={item} position={[rowIndex, itemIndex]} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaConfig;
