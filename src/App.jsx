import { useState, useEffect, useRef } from "react";

import rock from "./assets/images/rock.png";
import paper from "./assets/images/paper.png";
import scissors from "./assets/images/scissors.png";

import rockButton from "./assets/images/rock-button.png";
import paperButton from "./assets/images/paper-button.png";
import scissorsButton from "./assets/images/scissors-button.png";

const handImages = {
  rock,
  paper,
  scissors,
};

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function App() {

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [header, setHeader] = useState("Ready?");
  const [message, setMessage] = useState("Choose rock, paper or scissors to start!");
  const [hands, setHands] = useState({
    player: "rock",
    computer: "rock",
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const playerHandRef = useRef(null);
  const computerHandRef = useRef(null);

  function shake(onComplete) {  

    const playerHand = playerHandRef.current;
    const computerHand = computerHandRef.current;

    let position = 0;
    const speed = 360;
    let direction = -1;
    let previousTime = null;
    let bounceCount = 0;

    function update(browserTime) {

      if (previousTime === null) {
        previousTime = browserTime;
        requestAnimationFrame(update);
        return;
      }

      const deltaTime = browserTime - previousTime;
      previousTime = browserTime;

      position += direction * speed * (deltaTime / 1000);

      if (position <= -60) {
        position = -60;
        direction = 1;
      }

      if (position >= 0) {
        position = 0;
        bounceCount++;

        if (bounceCount >= 3) {
          playerHand.style.transform = "translateY(0px)";
          computerHand.style.transform = "scaleX(-1) translateY(0px)";
          onComplete();
          return;
        }

        direction = -1;
      }

      playerHand.style.transform = `translateY(${position}px)`;
      computerHand.style.transform = `scaleX(-1) translateY(${position}px)`;

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function resetHands() {
    setHands({
      player: "rock",
      computer: "rock",
    });
  }

  function playRound(choice) {
    setIsPlaying(false);
    resetHands();
    shake(() => {
      setIsPlaying(true);
      getHands(choice);
    });
  }

  function getHands(choice) {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[index];

    setHands({
      player: choice,
      computer: randomChoice,
    });
  }

  function getResult() {
    if (hands.player === hands.computer) {
      return "draw";
    } else if (beats[hands.player] === hands.computer) {
      return "win";
    } else {
      return "lose";
    }
  }

  function updateScore(currentResult) {
    if (currentResult === "win") {
      setPlayerScore(score => score + 1);
    } else if (currentResult === "lose") {
      setComputerScore(score => score + 1);
    } else {
      setDrawScore(score => score + 1);
    }
  }

  function updateTexts(currentResult) {
    if (currentResult === "win") {
      setHeader("VICTORY!");
      setMessage("YOU CRUSHED THE COMPUTER");
    } else if (currentResult === "lose") {
      setHeader("OUCH!");
      setMessage("BETTER LUCK NEXT TIME");
    } else {
      setHeader("DRAW!");
      setMessage("TRY AGAIN FOR GLORY");
    }
  }

  function restartGame() {
    setIsPlaying(false);

    setPlayerScore(0);
    setComputerScore(0);
    setDrawScore(0);

    setHeader("Ready?");
    setMessage("Choose rock, paper or scissors to start!");

    resetHands();    
  }

  useEffect(() => {
    if (!isPlaying) return;

    const currentResult = getResult();

    updateScore(currentResult);
    updateTexts(currentResult);

  }, [hands, isPlaying]);
  
  return (
    <>
      <h1>{header}</h1>
      <h2>{message}</h2>

      <div className="game-area">
        <div id="hands" className="hands-row">
          <div className="player-side">
            <img ref={playerHandRef} src={handImages[hands.player]} id="player-hand" className="hand"/>
          </div>

          <div className="computer-side">
            <img ref={computerHandRef} src={handImages[hands.computer]} id="computer-hand" className="mirror hand"/>
          </div>
        </div>

        <div className="choices-area">
          <p id="player-message">Make your move!</p>

          <div className="choices">
            <button onClick={() => playRound("rock")}>              
            <img className="choice-btn" src={rockButton} alt="Rock" />
            </button>

            <button onClick={() => playRound("paper")}>
              <img className="choice-btn" src={paperButton} alt="Paper" />
            </button>

            <button onClick={() => playRound("scissors")}>
              <img className="choice-btn" src={scissorsButton} alt="Scissors" />
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
          <button id="restart-btn" onClick={restartGame}>
            Restart Game
          </button>
        </div>
      </div>
    </>
  );
}

export default App;