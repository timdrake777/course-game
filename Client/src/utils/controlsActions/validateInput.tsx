import { RefObject } from "react";

export const validateInput = (inputString: string): boolean => {
  // const lastChar = inputString.charAt(inputString.length - 1);
  // if (/[a-z\.\)а-я]/i.test(lastChar)) {
  //   return inputString;
  // }
  
  return !/^[a-zа-я]*\.[a-zа-я]*\([0-9]*\)$/i.test(inputString);

  // if (lastChar === "(") {
  //   return inputString + ")"
  // }

  // if (!lastChar) {
  //   return "";
  // }
};
