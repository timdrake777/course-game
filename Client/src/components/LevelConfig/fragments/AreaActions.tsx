import React, { useContext } from "react";
import { LevelContextValues } from "../LevelContext";
import GameButton from "../../Templates/GameButton";
import GameInput from "../../Templates/GameInput";

interface Props {
  changeAreaSize: (height: number, width: number) => void;
}

const AreaActions = (props: Props) => {
  const { saveAreaValues } = useContext(LevelContextValues);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData(e.target as HTMLFormElement);
  };
  return (
    <div className="buttons flex h-1/6 w-full bg-slate-800/50 rounded-md border border-slate-700/50">
      <div className="w-1/2 flex items-center justify-around">
        <GameButton onClick={saveAreaValues} func="ok">
          Сохранить
        </GameButton>
      </div>
      <form className="w-1/2 flex items-center justify-center" onSubmit={handlerSubmit}>
        <div className="w-32">
          <GameInput
            type="number"
            name="width"
            header="Ширина"
            maxValueGame={10}
            minValueGame={1}
            value={1}
          />
        </div>
        <div className="w-32">
          <GameInput
            type="number"
            name="height"
            header="Высота"
            maxValueGame={10}
            minValueGame={1}
            value={1}
          />
        </div>
        <GameButton func="ok" type="submit">
          Сохранить
        </GameButton>
      </form>
    </div>
  );
};

export default AreaActions;
