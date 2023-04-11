import React from "react";
import GameButton from "../Templates/GameButton";
import { NavigateFunction } from "react-router";

interface Props {
  navigate: NavigateFunction;
}

const EmptyConfig = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-lg font-bold">Создайте уровень в /config</p>
      <GameButton onClick={(e) => props.navigate("config")} func="ok" className="text-slate-700">
        Конфигурация
      </GameButton>
    </div>
  );
};

export default EmptyConfig;
