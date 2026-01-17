document.addEventListener("DOMContentLoaded", () => {
  // ----- Game variables -----
  let score = 0;
  let timeLeft = 120;
  let currentAnswer = null;
  let input = "";
  let attempts = 0;

  // ----- DOM elements -----
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const questionEl = document.getElementById("question");
  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");
  const answerDisplay = document.getElementById("answer-display");
  const skipBtn = document.getElementById("skip-btn");
  const backspaceBtn = document.getElementById("backspace-btn");
  const enterBtn = document.getElementById("enter-btn");

  // ----- Event listeners -----
  document.querySelectorAll(".num-btn").forEach(btn => {
    btn.onclick = () => pressKey(parseInt(btn.textContent));
  });

  document.addEventListener('touchmove', function(e) {
  e.preventDefault();
  }, { passive: false });


  backspaceBtn.onclick = backspaceKey;
  enterBtn.onclick = checkAnswer;
  skipBtn.onclick = nextQuestion;

  startBtn.onclick = () => {
    startScreen.classList.add("hidden");  // hide start
    gameScreen.classList.remove("hidden"); // show game
    startGame();
  };

  // ----- Game functions -----
  function startGame() {
    score = 0;
    timeLeft = 300;
    updateScore();
    updateTimer();
    startTimer();
    nextQuestion();
  }

  function startTimer() {
    const interval = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(interval);
        alert("Time's up! Score: " + score);
      }
    }, 1000);
  }

  function updateTimer() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timerEl.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function updateScore() {
    scoreEl.textContent = score;
  }

  function nextQuestion() {
    attempts = 0;
    input = "";

    answerDisplay.textContent = "";
    answerDisplay.className = "";   // reset color + animation

    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const isMult = Math.random() < 0.5;

    if (isMult) {
      questionEl.textContent = `${a} × ${b}`;
      currentAnswer = a * b;
    } else {
      questionEl.textContent = `${a * b} ÷ ${a}`;
      currentAnswer = b;
    }
  }

  function pressKey(num) {
    input += num;
    answerDisplay.textContent = input;
  }

  function backspaceKey() {
    input = input.slice(0, -1);
    answerDisplay.textContent = input;
  }

  function checkAnswer() {
    const guess = parseInt(input);

    if (guess === currentAnswer) {
      score++;
      updateScore();
      answerDisplay.className = "correct flash";
      setTimeout(nextQuestion, 400);
      return;
    }

    // wrong answer
    attempts++;
    answerDisplay.className = "wrong flash";

    if (attempts < 2) {
      // allow retry
      input = "";
      setTimeout(() => {
        answerDisplay.textContent = "";
        answerDisplay.className = "";
      }, 400);
    } else {
      // move on after 2nd fail
      setTimeout(nextQuestion, 400);
    }
  }
});

