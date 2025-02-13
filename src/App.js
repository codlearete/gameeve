import React, { useState } from "react";
import HeartGame from "./components/HeartGame"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="landing-page">
      {!showGame ? (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <h1 className="display-4 text-white mb-4">Welcome to the Game</h1>
            <button 
              onClick={() => setShowGame(true)} 
              className="btn btn-danger btn-lg"
            >
              Play Game
            </button>
          </div>
        </div>
      ) : (
        <HeartGame onClose={() => setShowGame(false)} />
      )}
    </div>
  );
};

export default App;