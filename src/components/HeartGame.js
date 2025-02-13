import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import popSound from "./heart-pop.mp3"; // Ensure pop sound is available
import "./HeartGame.css";

const HeartGame = ({ onClose }) => {
  const [hearts, setHearts] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const [showValentineScreen, setShowValentineScreen] = useState(false);
  const [noButtonMoved, setNoButtonMoved] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: "50%", left: "50%" });
  const [showFireworks, setShowFireworks] = useState(false);
  const [foundMessages, setFoundMessages] = useState([]); // Stores messages persistently

  useEffect(() => {
    const generateHearts = () => {
      let newHearts = [];
      for (let i = 0; i < 5; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 80 + 10 + "%", 
          y: Math.random() * 80 + 10 + "%",
          found: false, 
        });
      }
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  const handleHeartClick = (id) => {
    const audio = new Audio(popSound);
    audio.play();

    const newFoundCount = foundCount + 1;

    setHearts((prevHearts) =>
      prevHearts.map((heart) =>
        heart.id === id ? { ...heart, found: true } : heart
      )
    );

    // Dynamic messages for each found heart
    const messages = [
      "Thank you for being there with me and being patient ❤️",
      "You make my world brighter! ✨",
      "I am truly lucky to have you by my side.💖",
      "You’re my best buddy, and I’m so grateful for every moment with you,💕",
      "To many more years of happiness, adventures, and growing together.😊"
    ];

    setFoundCount(newFoundCount);
    setFoundMessages([...foundMessages, messages[newFoundCount - 1]]);

    if (newFoundCount === 5) {
      setTimeout(() => {
        setShowValentineScreen(true);
      }, 1000);
    }
  };

  const moveNoButton = () => {
      setNoButtonMoved(true);
      setNoButtonPosition({
          top: Math.random() * 70 + "%",
          left: Math.random() * 70 + "%",
      });
  };

  return (
    <div className="popup-overlay">
      {!showValentineScreen ? (
        <div className="game-container">
          {/* Left-side display */}
          <div className="left-screen-info">
            <p className="heart-counter">❤️ {foundCount} / 5</p>
            <div className="message-list">
              {foundMessages.map((msg, index) => (
                <p key={index} className="persistent-message">{msg}</p>
              ))}
            </div>
          </div>

          <h2 className="text-white">Find All the Hidden Hearts!</h2>

          <div className="heart-game-bg">
            {hearts.map((heart) => (
              <div
                key={heart.id}
                className={`heart ${heart.found ? "found" : ""}`}
                style={{ top: heart.y, left: heart.x }}
                onClick={() => handleHeartClick(heart.id)}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="valentine-screen">
          {!showFireworks ? (
            <>
              <h2>Will you be my Valentine? ❤️</h2>
              <div className="buttons">
                <button className="btn btn-danger" onClick={() => setShowFireworks(true)}>
                  Yes ✨
                </button>
                <button
                  className="btn btn-secondary no-btn"
                  style={{
                      position: noButtonMoved ? "absolute" : "relative",
                      top: noButtonMoved ? noButtonPosition.top : "auto",
                      left: noButtonMoved ? noButtonPosition.left : "auto",
                  }}
                  onMouseEnter={moveNoButton}
              >
                  No 🙅‍♂️
              </button>
            </div>
            </>
          ) : (
            <h2 className="happy-valentine-message">💖 Happy Valentine's Day! 💖</h2>
          )}
        </div>
      )}
      {showFireworks && <Confetti />}
      <button className="close-btn" onClick={onClose}>❌ Close</button>
    </div>
  );
};

export default HeartGame;

