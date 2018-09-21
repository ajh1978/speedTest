"use strict";

let score = document.getElementById('score');

let highScore = 0;

// assign button elements in the array
const buttons = [
  document.getElementById('button0'),
  document.getElementById('button1'),
  document.getElementById('button2'),
  document.getElementById('button3')
];

document.getElementById('newGame').addEventListener('click',

  function newGame() {
    document.getElementById('highscore').innerHTML = highScore;
    document.getElementById('overlay').style.visibility = "hidden";
    score.innerHTML = 0;
    let currentScore = 0;
    buttons[0].onclick = function() { pressed(0) };
    buttons[1].onclick = function() { pressed(1) };
    buttons[2].onclick = function() { pressed(2) };
    buttons[3].onclick = function() { pressed(3) };
    const buttonArray = [];
    let current = getRandomInt(0,3);
    let timer = setTimeout(pickNext, 1500, 1000);

    function pickNext(delay) {
      // pick next button
      let next = pickNew(current);

      buttons[current].classList.remove("flash"); // previous
      buttons[next].classList.add("flash"); // next

      // change the active button
      current = next;

      // set timer to pick the next button
      delay -= 10;
      timer = setTimeout(pickNext, delay, delay);

      function pickNew(previous) {
        let next = (previous + getRandomInt(1,3)) % 4;
        buttonArray.push(next);
        if (buttonArray.length > 10) {
          gameOver();
          return false;
        }
        return next;
      }
    }

    // This function is called whenever a button is pressed
    function pressed(i) {
      // takes the first element in buttonArray and compares it with pressed button
      let x = buttonArray.shift();
      if (i === x) {
        currentScore++;
        score.innerHTML = currentScore;
        return true;
      }
      else {
        gameOver();
        return false;
      }
    }

function gameOver() {
    clearTimeout(timer); // stop timer
    for (let i = 0; i < 3; i++) {
      buttons[i].classList.remove("flash");
      buttons[i].onclick = null; // disable click event handlers
    }

    if(currentScore > highScore){
      highScore = currentScore;
    }
    document.getElementById('highscore').innerHTML = highScore;
    document.getElementById('overlay').style.visibility = "visible";
    document.getElementById('gameInfo').innerHTML = "<p>Game over! Voi rähmä!</p><p>Your score was " + currentScore + "!</p>";
  }
});

  // generate random integer within range min - max
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
