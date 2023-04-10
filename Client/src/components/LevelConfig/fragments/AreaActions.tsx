import React, { useContext, useRef, useState } from "react";
import { LevelContextValues } from "../LevelContext";
import GameButton from "../../Templates/GameButton";
import GameInput from "../../Templates/GameInput";
import { IAreaSize } from "../../../interfaces";
import ConfigSection from "../../Templates/ConfigSection";
import classNames from "classnames";

interface Props {
  changeAreaSize: (height: number, width: number) => void;
  deleteConfig: () => void;
  areaSize: IAreaSize;
}

const AreaActions = (props: Props) => {
  const { saveAreaValues } = useContext(LevelContextValues);

  const [showSaveMessage, setShowSaveMessage] = useState<JSX.Element>(<></>);

  const showTimer = useRef<number>(0);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.target as HTMLFormElement);
    props.changeAreaSize(
      Number.parseInt(`${formData.get("height")}`),
      Number.parseInt(`${formData.get("width")}`)
    );
  };

  const handlerSave = () => {
    if (showTimer.current > 0) {
      setShowSaveMessage(<></>);
      clearTimeout(showTimer.current);
      showTimer.current = 0;
    }

    showTimer.current = setTimeout(() => {
      setShowSaveMessage(<></>);
      showTimer.current = 0;
    }, 2000);

    setShowSaveMessage(
      <p
        key={showTimer.current}
        className="absolute opacity-0 select-none -top-10 left-6 text-sm font-normal text-emerald-400 animate-btn"
      >
        Шаблон сохранен
      </p>
    );

    saveAreaValues();
  };

  return (
    <div className="buttons flex h-1/6 w-full gap-8">
      <ConfigSection className="w-1/2 flex items-center justify-around">
        <div className="relative">
          {showSaveMessage}
          <GameButton onClick={handlerSave} func="ok" className="relative bg-slate-800/70 z-10">
            Сохранить шаблон
          </GameButton>
        </div>

        <GameButton onClick={props.deleteConfig} func="alert">
          Удалить шаблон
        </GameButton>
      </ConfigSection>
      <ConfigSection className="w-1/2 h-full flex items-center">
        <form
          className="w-full grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-5"
          onSubmit={handlerSubmit}
        >
          <div className="w-32 justify-self-end">
            <GameInput
              type="number"
              name="width"
              header="Ширина"
              maxValueGame={20}
              minValueGame={1}
              value={props.areaSize.width}
            />
          </div>
          <div className="w-32 justify-self-start">
            <GameInput
              type="number"
              name="height"
              header="Высота"
              maxValueGame={20}
              minValueGame={1}
              value={props.areaSize.height}
            />
          </div>
          <div className="col-span-full self-start">
            <GameButton func="ok" type="submit">
              Сохранить размер
            </GameButton>
          </div>
        </form>
      </ConfigSection>
    </div>
  );
};

export default AreaActions;
