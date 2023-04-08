import classNames from "classnames";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  func?: "ok" | "alert";
}

const GameButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={classNames(
        "px-3 py-1 h-fit border-2 transition-colors rounded-md font-medium text-slate-200 hover:text-slate-800",
        className,
        {
          "border-emerald-400 hover:bg-emerald-400 hover:drop-shadow-button-ok": props.func === "ok",
          "border-red-600/80 hover:bg-emerald-600/80": props.func === "alert",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default GameButton;
