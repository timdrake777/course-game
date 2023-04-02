import React, { useContext } from "react";
import { LevelContextValues } from "../LevelContext";

const AreaActions = () => {
  const {saveAreaValues} = useContext(LevelContextValues);
  return (
    <div className="buttons flex h-1/6 w-full bg-slate-800/50 rounded-md border border-slate-700/50">
      <button onClick={saveAreaValues}>Сохранить</button>
    </div>
  );
};

export default AreaActions;
