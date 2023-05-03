import { FC, ReactNode, createContext, useState } from "react";

interface ControlContext {
  setLineCallback: (callback: (newString: string) => void) => void;
  setCurrentLine: (newString: string) => void;
}

interface Props {
  children: ReactNode;
}

export const ControlContextValues = createContext<ControlContext>({
  setLineCallback: () => {},
  setCurrentLine: () => {}
})

export const ControlContextProvider: FC<Props> = ({children}) => {
  const [inputCallback, setInputCallback] = useState<(newString: string) => void>();

  const setLineCallback = (callback: (newString: string) => void) => {
    setInputCallback(callback);
  }

  const setCurrentLine = (newString: string) => {
    if (!inputCallback) {
      console.log("Нет функции");
      return
    }
    inputCallback(newString);
  }

  return (
    <ControlContextValues.Provider value={{
      setLineCallback,
      setCurrentLine
    }}>
      {children}
    </ControlContextValues.Provider>
  )
}