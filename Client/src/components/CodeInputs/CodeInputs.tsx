import { FormEvent, useRef, useState } from "react";

import styles from './CodeInputs.module.scss'

export const CodeInputs = () => {
    const inputRef = useRef(null);
    const [inputs, setInputs] = useState<string[]>([""]);

    const validateInput = (e: FormEvent<HTMLDivElement>, index: number) => {
        const lastChar = e.currentTarget.textContent?.charAt(e.currentTarget.textContent.length - 1)
        const oldInputIndex = inputs[index];
        console.log(lastChar)
        if (lastChar && /[a-zA-Z]/.test(lastChar)) {
            console.log(lastChar)
            setInputs((prev) => {
                prev[index] = e.currentTarget.textContent || "";
                return prev;
            })
        } else {
            setInputs((prev) => {
                prev[index] = oldInputIndex;
                return prev;
            })
        }
    }

    return (
        <>
            {inputs.map((item, index) => (
                <div key={index} suppressContentEditableWarning={true} contentEditable className={styles.inputCode} onInput={(e) => validateInput(e, index)} ref={inputRef}>
                    {item}
                </div>))}
        </>
    )
}