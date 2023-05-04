import { createContext, FC, ReactNode, useRef } from "react";
import { IInputValue } from "../../interfaces";

interface Props {
  children: ReactNode
}

interface IMessageContext {
  setInputsInContext: (inputs: IInputValue[]) => void;
  runCode: () => void;
}

export const MessageContextValues = createContext<IMessageContext>({
  setInputsInContext: () => {},
  runCode: () => {}
});

export const MessageContextProvider: FC<Props> = ({ children }) => {
  const inputValues = useRef<IInputValue[]>([]);

  const setInputsInContext = (inputs: IInputValue[]) => {
    inputValues.current = inputs;
  }

  const runCode = () => {
    let errorKey = false;

    let temp = inputValues.current.map((item, index) => {
      let newElement = item.value.split(/[.\(\)]/)
      newElement.pop();
      if (newElement.length === 0 || item.hasError) {
        errorKey = true;
      }
      return newElement;
    })

    
    console.log(temp);
    
  }

  return (
    <MessageContextValues.Provider value={{
      setInputsInContext,
      runCode
    }}>
      {children}
    </MessageContextValues.Provider>
  )
}