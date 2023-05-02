import { FC, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./ControlViewInput.module.scss";

interface InputProps {
  index: number;
  focusedInput: number;
  changeFocus: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
}

export const ControlViewInput: FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && props.focusedInput === props.index) {
      inputRef.current.focus();
    } else if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [props.focusedInput, inputRef.current]);

  return (
    <div className={styles.inputBox} onClick={() => inputRef.current?.focus()}>
      <input
        type="text"
        className="peer px-1 bg-transparent focus:bg-[#4d4d4d] order-2"
        onKeyDown={(e) => props.onKeyDown(e, props.index)}
        onFocus={() => props.changeFocus(props.index)}
        onChange={(e) => props.onChange(e, props.index)}
        ref={inputRef}
      />
      <div className="peer-focus:bg-[#666] flex justify-end items-center px-1 order-1 text-white/70">
        {props.index + 1}
      </div>
      <div className="hidden peer-focus:bg-[#4d4d4d] peer-focus:flex order-3 items-center">
        <button className={styles.deleteBtn}>X</button>
      </div>
    </div>
  );
};
