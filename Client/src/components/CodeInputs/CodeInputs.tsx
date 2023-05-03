import { useEffect, useState } from "react";
import { ControlViewInput } from "../ControlView/ControlViewInput";

export const CodeInputs = () => {
  const [inputs, setInputs] = useState<string[]>([""]);
  const [focusedInput, setFocusedInput] = useState<number>(0);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    const { key } = e;

    switch (key) {
      case "Enter":
        e.preventDefault();

        let newInputsArr = Array.from(inputs);
        newInputsArr.splice(idx + 1, 0, "");
        setInputs(newInputsArr);
        setFocusedInput(focusedInput + 1);
        break;
      case "Backspace":
        if (inputs[idx] === "" && idx !== 0) {
          deleteInput(null, idx);
          setFocusedInput(focusedInput - 1);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedInput(idx !== 0 ? focusedInput - 1 : 0);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedInput(idx !== inputs.length - 1 ? focusedInput + 1 : idx);
        break;
    }
  };

  const changeInput = (value: string, idx: number) => {
    setInputs((prev) => {
      prev[idx] = value;
      return prev;
    });
  };

  const deleteInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    idx: number
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setInputs(inputs.filter((_, index) => index !== idx));
  };

  const changeFocus = (index: number) => {
    setFocusedInput(index);
  };

  useEffect(() => {
    if (inputs.length === 0) {
      setInputs([""]);
    }
  }, [inputs]);

  return (
    <>
      {inputs.map((value, index) => (
        <ControlViewInput
          key={value + index + inputs.length}
          index={index}
          arrayValue={value}
          focusedInput={focusedInput}
          changeFocus={changeFocus}
          deleteInput={deleteInput}
          onKeyDown={onInputKeyDown}
          onChange={changeInput}
        />
      ))}
    </>
  );
};
