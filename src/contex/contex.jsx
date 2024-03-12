import runChat from "../config/geminiApi";

import { createContext, useState } from "react";
export const Context = createContext();

const ContextProvider = (props) => {
  const [inpute, setInpute] = useState("");
  const [recentPromt, setRecentPromt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  
  
  const onSent = async () => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    setRecentPromt(inpute)
    const response = await runChat(inpute);
    setResultData(response)
    setLoading(false)
    setInpute("")
  };
  
  const contexValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPromt,
    recentPromt,
    showResult,
    loading,
    resultData,
    inpute,
    setInpute,
  };
  return (
    <Context.Provider value={contexValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
