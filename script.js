"use strict";
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const score0El = document.querySelector(".score-0");
const score1El = document.querySelector(".score-1");
const current0El = document.querySelector(".current-0");
const current1El = document.querySelector(".current-1");
const diceEl = document.querySelector(".dice");
const newGame = document.querySelector(".newgame");
const roll = document.querySelector(".roll");
const hold = document.querySelector(".hold");
let current = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;
const switchPlayer = function () {
  current = 0;
  document.querySelector(`.current-${activePlayer}`).textContent = current;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer !== 0) {
    player0El.classList.add("bg-gray-800");
    player0El.classList.remove("bg-gray-500");
    player1El.classList.add("bg-gray-500");
    player1El.classList.remove("bg-gray-800");
    player0El.classList.add("text-gray-400");
    player0El.classList.remove("text-white");
    player1El.classList.add("text-white");
    player1El.classList.remove("text-gray-400");
    player0El.classList.remove("font-bold");
    player1El.classList.add("font-bold");
  } else {
    player0El.classList.remove("bg-gray-800");
    player0El.classList.add("bg-gray-500");
    player1El.classList.remove("bg-gray-500");
    player1El.classList.add("bg-gray-800");
    player0El.classList.remove("text-gray-400");
    player0El.classList.add("text-white");
    player1El.classList.remove("text-white");
    player1El.classList.add("text-gray-400");
    player0El.classList.add("font-bold");
    player1El.classList.remove("font-bold");
  }
};
score0El.textContent = 0;
score1El.textContent = 0;
roll.addEventListener("click", function () {
  if (playing === true) {
    diceEl.classList.remove("hidden");
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("roll-anim");
    void diceEl.offsetWidth;
    diceEl.classList.add("roll-anim");
    if (dice !== 1) {
      current += dice;
      document.querySelector(`.current-${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});
hold.addEventListener("click", function () {
  if (playing === true) {
    score[activePlayer] += current;
    document.querySelector(`.score-${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("bg-green-700");

      diceEl.classList.add("hidden");
      playing = false;
      document.querySelector(".correct").textContent = `player ${
        activePlayer + 1
      } is won 🎉`;
      hold.classList.add("cursor-not-allowed");
      hold.classList.remove("cursor-pointer");
      roll.classList.remove("cursor-pointer");
      roll.classList.add("cursor-not-allowed");
      newGame.classList.add("bg-red-700");
    } else {
      switchPlayer();
    }
  }
});
newGame.addEventListener("click", function () {
  current = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  document.querySelector(".correct").textContent = ``;
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove("bg-green-700");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  hold.classList.remove("cursor-not-allowed");
  hold.classList.add("cursor-pointer");
  roll.classList.add("cursor-pointer");
  roll.classList.remove("cursor-not-allowed");
  player0El.classList.remove("bg-gray-800");
  player0El.classList.add("bg-gray-500");
  player1El.classList.remove("bg-green-700");
  player1El.classList.add("bg-gray-800");
  newGame.classList.remove("bg-red-700");
  player0El.classList.remove("text-gray-400");
  player0El.classList.add("text-white");
  player1El.classList.remove("text-white");
  player1El.classList.add("text-gray-400");
  player0El.classList.add("font-bold");
  player1El.classList.remove("font-bold");
});
