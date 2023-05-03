import { FC, useEffect, useRef, useState } from "react";
import styles from "./ControlViewInput.module.scss";
import { validateInput } from "../../utils/controlsActions/validateInput";
import classNames from "classnames";
import { IInputValue, IPosition } from "../../interfaces";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InputProps {
  index: number;
  focusedInput: number;
  arrayValue: IInputValue;
  changeFocus: (index: number) => void;
  deleteInput: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => void;
  onChange: (value: string, idx: number) => void;
}

export const ControlViewInput: FC<InputProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [alertPosition, setAlertPosition] = useState<IPosition>({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement>(null);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let newString = e.target.value;
    if (!validateInput(newString)) {
      setHasError(false);
    }
    setInputValue(newString);
    props.onChange(newString, props.index);
  };

  const onClickSection = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const showAlertMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAlertPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (inputRef.current && props.focusedInput === props.index) {
      inputRef.current.focus();
    }
  }, [props.focusedInput, inputRef.current]);

  useEffect(() => {
    setInputValue(props.arrayValue.value);
    setHasError(props.arrayValue.hasError);
  }, [props.arrayValue]);

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        className="peer px-1 bg-transparent focus:bg-[#4d4d4d] order-2 grow"
        value={inputValue}
        onKeyDown={(e) => props.onKeyDown(e, props.index)}
        onFocus={() => props.changeFocus(props.index)}
        onChange={changeInput}
        ref={inputRef}
      />
      <div
        className={classNames(
          "group flex justify-between items-center px-1 order-1 text-white/70 w-12",
          {
            "bg-red-800/80 peer-focus:bg-red-600/80": hasError,
            "peer-focus:bg-[#666]": !hasError,
          }
        )}
        onClick={onClickSection}
        onMouseMove={hasError ? showAlertMessage : undefined}
      >
        {hasError && (
          <>
            <FontAwesomeIcon icon={faCircleQuestion} size="xs"/>
            <div
              className={"fixed hidden group-hover:flex " + styles.errorCloud}
              style={{ left: alertPosition?.x - 210, top: alertPosition?.y - 25 }}
            >
              <p className="text-slate-800 text-base font-normal">В строке ошибка, исправь ее!</p>
            </div>
          </>
        )}
        <code className="grow text-end">{props.index + 1}</code>
      </div>
      <div className="flex opacity-0 order-3 items-center w-10 peer-focus:bg-[#4d4d4d] peer-focus:opacity-100 hover:opacity-100">
        <button className={styles.deleteBtn} onClick={(e) => props.deleteInput(e, props.index)}>
          X
        </button>
      </div>
    </div>
  );
};
