import { FC, useEffect, useRef, useState } from "react";
import styles from "./ControlViewInput.module.scss";

interface InputProps {
  index: number;
  focusedInput: number;
  arrayValue: string;
  changeFocus: (index: number) => void;
  deleteInput: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
}

export const ControlViewInput: FC<InputProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    props.onChange(e, props.index);
  };

  const onClickSection = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    }
  }

  useEffect(() => {
    if (inputRef.current && props.focusedInput === props.index) {
      inputRef.current.focus();
    }
  }, [props.focusedInput, inputRef.current]);

  useEffect(() => {
    setInputValue(props.arrayValue);
  }, [props.arrayValue]);

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        className="peer px-1 bg-transparent focus:bg-[#4d4d4d] order-2"
        value={inputValue}
        onKeyDown={(e) => props.onKeyDown(e, props.index)}
        onFocus={() => props.changeFocus(props.index)}
        onChange={changeInput}
        ref={inputRef}
      />
      <div className="peer-focus:bg-[#666] flex justify-end items-center px-1 order-1 text-white/70" onClick={onClickSection}>
        {props.index + 1}
      </div>
      <div className="flex opacity-0 peer-focus:bg-[#4d4d4d] peer-focus:opacity-100 hover:opacity-100 order-3 items-center">
        <button className={styles.deleteBtn} onClick={(e) => props.deleteInput(e, props.index)}>
          X
        </button>
      </div>
    </div>
  );
};
