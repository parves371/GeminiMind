import React, { useContext } from "react";

import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../contex/contex";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    inpute,
    setInpute,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>GeminiMind</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hellow, Parves.</span>
              </p>
              <p>how can i help you?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>suggest beautiful places to see on a upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>briefly summarize this concept: urban planing</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstom team bonding activites for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of thr following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>

            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInpute(e.target.value)}
              value={inpute}
              type="text"
              placeholder="enter your text"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Grmini may display inaccurate info,including about people,so
            dubble-check it's responses. your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
