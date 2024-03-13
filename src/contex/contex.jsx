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

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + " " + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPromt(prompt);
    } else {
      setRecentPromt(inpute);
      setPrevPrompts((prev) => [...prev, inpute]);
      response = await runChat(inpute);
    }
    let responseArray = response.split("**");
    let newArray = ""; // Initialize as an empty string to avoid "undefined" prefix
    for (let index = 0; index < responseArray.length; index++) {
      if (index === 0) {
        newArray += responseArray[index];
      } else if (index % 2 === 0) {
        // For even-indexed segments, append directly
        newArray += responseArray[index];
      } else {
        // For odd-indexed segments, wrap with <br> tags
        newArray += "<b>" + responseArray[index] + "</b>";
      }
    }
    let newRespons = newArray.split("*").join("</br>");
    let newResponsArry = newRespons.split(" ");
    for (let index = 0; index < newResponsArry.length; index++) {
      let newWord = newResponsArry[index];
      delayPara(index, newWord);
    }
    setLoading(false);
    setInpute("");
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
    newChat
  };
  return (
    <Context.Provider value={contexValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
