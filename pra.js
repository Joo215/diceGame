const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const currentl = document.getElementById("current--0");
const current2 = document.getElementById("current--1");
const diceImg = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const score1 = document.getElementById("score--0");
const score2 = document.getElementById("score--1");

let playing, turnPlayer, currentScore;

function start() {
  playing = true;
  player1.classList.add("player--turn");
  turnPlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  score1.textContent = 0;
  score2.textContent = 0;
  currentl.textContent = 0;
  current2.textContent = 0;

  player1.classList.remove("winner");
  player2.classList.remove("winner");
  player2.classList.remove("player--turn");

  const winnerMessage = document.querySelector(".winner-player");
  if (winnerMessage) {
    winnerMessage.remove();
  }
}

start();

function btnRollClick() {
  if (playing) {
    // dice 값을 1~6 사이의 숫자로 만들어 주는 로직
    const dice = Math.trunc(Math.random() * 6) + 1;
    // diceImg의 주사위 이미지 변경
    diceImg.src = `dice-${dice}.png`;

    // dice 값이 1 또는 2 가 아니면 다이스 값 더하기 로직
    if (dice !== 1 && dice !== 2) {
      currentScore += dice;
      // 해당 플레이어 현재 점수에 dice 값 더해주기
      document.getElementById(`current--${turnPlayer}`).textContent =
        currentScore;
    } else nextTurn();
  }
}

function nextTurn() {
  // 현재 플레이어의 currentScore 초기화
  document.getElementById(`current--${turnPlayer}`).textContent = 0;
  // currentScore 값 초기화
  currentScore = 0;
  // turnPlayer 변경해주는 로직 (만약 turnPlayer가 1이면 0 으로 0 이면 1로 변경)
  turnPlayer = turnPlayer === 0 ? 1 : 0;
  // toggle로 turnPlayer 표시 바꿔주기!
  player1.classList.toggle("player--turn");
  player2.classList.toggle("player--turn");

  // turnPlayer 표시 메세지
  const turnMessage = document.createElement("div");
  turnMessage.classList.add(turnPlayer === 0 ? "player1-turn" : "player2-turn");
  turnMessage.textContent = `Player${turnPlayer + 1} Turn`;
  document.body.appendChild(turnMessage);
  setTimeout(() => {
    document.body.removeChild(turnMessage);
  }, 700);
}

function btnHoldClick() {
  if (playing) {
    scores[turnPlayer] += currentScore;
    document.getElementById(`score--${turnPlayer}`).textContent =
      scores[turnPlayer];
    if (scores[turnPlayer] >= 50) {
      playing = false;

      document.querySelector(`.player--${turnPlayer}`).classList.add("winner");
      document
        .querySelector(`.player--${turnPlayer}`)
        .classList.remove("player--turn");

      const winnerMessage = document.createElement("div");
      winnerMessage.classList.add("winner-player");
      winnerMessage.textContent = `Winner : Player ${turnPlayer + 1}`;
      document.body.appendChild(winnerMessage);
    }
  } else nextTurn();
}

btnRoll.addEventListener("click", btnRollClick);
btnHold.addEventListener("click", btnHoldClick);
btnNew.addEventListener("click", start);
