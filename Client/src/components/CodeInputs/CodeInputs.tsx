import { FormEvent, useRef, useState } from "react";

import styles from "./CodeInputs.module.scss";
import { ControlViewInput } from "../ControlView/ControlViewInput";

export const CodeInputs = () => {
  const [inputs, setInputs] = useState<string[]>([""]);
  const [focusedInput, setFocusedInput] = useState<number>(0);

  const validateInput = (e: FormEvent<HTMLDivElement>, index: number) => {
    const lastChar = e.currentTarget.textContent?.charAt(e.currentTarget.textContent.length - 1);
    const oldInputIndex = inputs[index];
    console.log(lastChar);
    if (lastChar && /[a-zA-Z]/.test(lastChar)) {
      console.log(lastChar);
      setInputs((prev) => {
        prev[index] = e.currentTarget.textContent || "";
        return prev;
      });
    } else {
      setInputs((prev) => {
        prev[index] = oldInputIndex;
        return prev;
      });
    }
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    const { key } = e;

    switch (key) {
      case "Enter":
        e.preventDefault();

        let newInputsArr = Array.from(inputs);
        newInputsArr.splice(idx+1, 0, "");
        setInputs(newInputsArr);
        setFocusedInput(focusedInput + 1);
        break;
    }
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    setInputs((prev) => {
      prev[idx] = e.target.value;
      return prev;
    });
  };

  const changeFocus = (index: number) => setFocusedInput(index);

  return (
    <>
      {inputs.map((value, index) => (
        <ControlViewInput
          key={index}
          index={index}
          arrayValue={value}
          focusedInput={focusedInput}
          changeFocus={changeFocus}
          onKeyDown={onInputKeyDown}
          onChange={changeInput}
        />
      ))}
    </>
  );
};
