import React, { useRef } from "react";
import { IConfigHandler } from "../../interfaces";

interface Props {
  children: React.ReactNode;
  levelConfig: number[][];
}

interface LevelContext {
  saveAreaValues: () => void;
  addHandler: (key: number, position: [number, number]) => void;
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
    let arr = props.levelConfig;
    handlersRef.current.forEach((item) => {
      
      
      arr[item.position[0]][item.position[1]] = item.key;
      console.log(item.key, item.position, arr[item.position[0]][item.position[1]])
    })
    console.log(arr);
  };

  const addHandler = (key: number, position: [number, number]) => {
    handlersRef.current.push({
      key,
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
