import { RefObject } from "react";

export const validateInput = (inputString: string, oldInputString: string, inputRef: RefObject<HTMLInputElement>): string => {
  const lastChar = inputString.charAt(inputString.length - 1);
  if (/[a-z\.\)]/i.test(lastChar)) {
    return inputString;
  }

  if (lastChar === "(") {
    
    return inputString + ")"
  }

  if (!lastChar) {
    return "";
  }
  return oldInputString;
};
