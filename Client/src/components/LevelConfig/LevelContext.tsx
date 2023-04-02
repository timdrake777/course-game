import React, { useRef } from "react";
import { IConfigHandler } from "../../interfaces";

interface Props {
  children: React.ReactNode;
  levelConfig: number[][];
}

interface LevelContext {
  saveAreaValues: () => void;
  addHandler: (getFunc: () => number, position: [number, number]) => void;
}

export const LevelContextValues = React.createContext<LevelContext>({
  saveAreaValues: function (): void {
    throw new Error("Function not implemented.");
  },
  addHandler: function (): void {
    throw new Error("Function not implemented.");
  },
});

const LevelContext = ({ children, ...props }: Props) => {
  const handlersRef = useRef<IConfigHandler[]>([]);
  const valuesArrayRef = useRef<number[][]>(props.levelConfig);

  const saveAreaValues = () => {
    handlersRef.current.map((item) => {
      console.log(item.getFunc(), item.position)
      
      valuesArrayRef.current[item.position[0]][item.position[1]] = item.getFunc();
    })
    console.log(valuesArrayRef.current);
  };

  const addHandler = (getFunc: () => number, position: [number, number]) => {
    handlersRef.current.push({
      getFunc,
      position,
    });
  };

  return (
    <LevelContextValues.Provider
      value={{
        addHandler,
        saveAreaValues,
      }}
    >
      {children}
    </LevelContextValues.Provider>
  );
};

export default LevelContext;
