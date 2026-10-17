
const questions = [
  {
    question: "Which language makes a webpage interactive?",
    answers: ["C", "JavaScript", "HTML", "CSS"],
    correct: 1
  },
  {
    question: "Which language controls webpage appearance?",
    answers: ["CSS", "C", "SQL", "Python"],
    correct: 0
  },
  {
    question: "Which HTML tag creates a heading?",
    answers: ["<p>", "<img>", "<h1>", "<button>"],
    correct: 2
  }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");

function showQuestion() {
  answered = false;
  const q = questions[current];

  progressEl.textContent =
    `Question ${current + 1} of ${questions.length}`;
  questionEl.textContent = q.question;
  answersEl.replaceChildren();
  feedbackEl.textContent = "";
  nextBtn.hidden = true;
  scoreEl.textContent = `Score: ${score}`;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(index));
    answersEl.appendChild(button);
  });
}

function checkAnswer(index) {
  if (answered) return;
  answered = true;

  const correct = questions[current].correct;

  if (index === correct) {
    score++;
    feedbackEl.textContent = "Correct! 🎉";
  } else {
    feedbackEl.textContent =
      "Not quite! Correct answer: " +
      questions[current].answers[correct];
  }

  Array.from(answersEl.children).forEach(button => {
    button.disabled = true;
  });

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.textContent =
    current === questions.length - 1
      ? "See Results"
      : "Next Question";
  nextBtn.hidden = false;
}

nextBtn.addEventListener("click", () => {
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Quiz Completed!";
    progressEl.textContent = "Well done!";
    answersEl.replaceChildren();
    feedbackEl.textContent =
      `Your final score: ${score}/${questions.length}`;
    nextBtn.hidden = true;
    scoreEl.textContent = "";
  }
});

showQuestion();
