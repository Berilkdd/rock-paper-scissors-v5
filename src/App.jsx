import { useState } from "react";

import rock from "./assets/images/rock.png";
import paper from "./assets/images/paper.png";
import scissors from "./assets/images/scissors.png";

import rockButton from "./assets/images/rock-button.png";
import paperButton from "./assets/images/paper-button.png";
import scissorsButton from "./assets/images/scissors-button.png";



function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [header, setHeader] = useState("Ready?");
  const [message, setMessage] = useState("Choose rock, paper or scissors to start!");
  const [playerHand, setPlayerHand] = useState(rock);
  const [computerHand, setComputerHand] = useState(rock);

  return (
    <>
      <h1>{header}</h1>
      <h2>{message}</h2>

      <div className="game-area">
        <div id="hands" className="hands-row">
          <div className="player-side">
            <img src={playerHand} id="player-hand" className="hand"/>
          </div>

          <div className="computer-side">
            <img src={computerHand} id="computer-hand" className="mirror hand"/>
          </div>
        </div>

        <div className="choices-area">
          <p id="player-message">Make your move!</p>

          <div className="choices">
            <button className="choice-btn">
              <img src={rockButton} alt="Rock" />
            </button>

            <button className="choice-btn">
              <img src={paperButton} alt="Paper" />
            </button>

            <button className="choice-btn">
              <img src={scissorsButton} alt="Scissors" />
            </button>
          </div>
        </div>

        <div id="scoreboard">
          <p>
            WON: <span>{playerScore}</span>
          </p>

          <p>
            LOST: <span>{computerScore}</span>
          </p>

          <p>
            DRAW: <span>{drawScore}</span>
          </p>
        </div>

        <div className="restart">
          <button id="restart-btn">
            Restart Game
          </button>
        </div>
      </div>
    </>
  );
}

export default App;