import { useContext } from "react";
import CodeButtonView from "./CodeButtonView";
import { ControlContextValues } from "../ControlView/ControlContext";

const CodeButtons = () => {
  const {setCurrentLine} = useContext(ControlContextValues)
  return (
    <>
      <CodeButtonView onClick={setCurrentLine}/>
    </>
  );
};

export default CodeButtons;
