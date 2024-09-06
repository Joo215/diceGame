const btnRoll = document.querySelector(".btn--roll");
const diceImg = document.querySelector(".dice");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const score1 = document.getElementById("score--0");
const score2 = document.getElementById("score--1");
const currentl = document.getElementById("current--0");
const current2 = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, playerTurn, playing;

function start() {
  scores = [0, 0];
  currentScore = 0;
  playerTurn = 0;
  playing = true;
  diceImg.classList.add("hidden");
  player1.classList.add("player--turn");
  score1.textContent = 0;
  score2.textContent = 0;
  currentl.textContent = 0;
  current2.textContent = 0;
}
start();

function nextturn() {
  document.getElementById(`current--${playerTurn}`).textContent = 0;
  currentScore = 0;
  playerTurn = playerTurn === 0 ? 1 : 0;
  player1.classList.toggle("player--turn");
  player2.classList.toggle("player--turn");
}
function btnRollClick() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove("hidden");

    diceImg.src = `dice-${dice}.png`;

    if (dice !== 1 && dice !== 2) {
      currentScore += dice;
      document.getElementById(`current--${playerTurn}`).textContent =
        currentScore;
    } else {
      nextturn();
    }
  }
}

btnRoll.addEventListener("click", btnRollClick);
