
const questions = [
  {
    question: "What is the smallest independent country in the world?",
    answers: ["Canada", "Malta", "India", "Vatican City"],
    correct: 2
  },
  {
    question: "Which country has the largest population in South America?",
    answers: ["Peru", "Colombia", "Netherlands", "Brazil"],
    correct: 1
  },
  {
    question: "Where is Eifel tower located?",
    answers: ["Spain", "France", "England", "Scotland"],
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
