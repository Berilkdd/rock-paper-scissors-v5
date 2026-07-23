import rock from "./assets/images/rock.png";
import paper from "./assets/images/paper.png";
import scissors from "./assets/images/scissors.png";

import rockButton from "./assets/images/rock-button.png";
import paperButton from "./assets/images/paper-button.png";
import scissorsButton from "./assets/images/scissors-button.png";



function App() {
  return (
    <>
      <h1 id="header"></h1>
      <h2 id="message"></h2>

      <div className="game-area">
        <div id="hands" className="hands-row">
          <div className="player-side">
            <img src={rock} id="player-hand" className="hand"/>
          </div>

          <div className="computer-side">
            <img src={rock} id="computer-hand" className="mirror hand"/>
          </div>
        </div>

        <div className="choices-area">
          <p id="player-message">Make your move!</p>

          <div className="choices">
            <img src={rockButton} id="rock" alt="Rock" class="choice-btn" tabindex="0"></img>
            <img src={paperButton} id="rock" alt="Rock" class="choice-btn" tabindex="0"></img>
            <img src={scissorsButton} id="rock" alt="Rock" class="choice-btn" tabindex="0"></img>

          </div>
        </div>

        <div id="scoreboard">
          <p>
            WON: <span id="player-score">0</span>
          </p>

          <p>
            LOST: <span id="computer-score">0</span>
          </p>

          <p>
            DRAW: <span id="draw-score">0</span>
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