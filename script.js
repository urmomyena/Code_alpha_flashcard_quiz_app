const flashcard = document.getElementById("flashcard");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const formContainer = document.getElementById("form-container");
const newQuestion = document.getElementById("newQuestion");
const newAnswer = document.getElementById("newAnswer");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const modeToggle = document.getElementById("mode-toggle");

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
  { question: "Which city is known as the City of Lights?", answer: "Paris" },
  { question: "Who painted 'Starry Night'?", answer: "Vincent van Gogh" },
  { question: "What language has the most native speakers?", answer: "Mandarin Chinese" },
  { question: "Which flower is a symbol of Japan?", answer: "Cherry Blossom (Sakura)" },
  { question: "Which book begins with: 'It was the best of times, it was the worst of times'?", answer: "A Tale of Two Cities" },
  { question: "Which country gifted the Statue of Liberty to the USA?", answer: "France" },
  { question: "What is the world’s longest river?", answer: "Nile River" },
  { question: "Who wrote 'Pride and Prejudice'?", answer: "Jane Austen" },
  { question: "Which Italian city is famous for canals?", answer: "Venice" },
  { question: "What is the art of paper folding called?", answer: "Origami" },
  { question: "Which language does the word 'aesthetic' come from?", answer: "Greek" },
  { question: "What is the name of the galaxy we live in?", answer: "Milky Way" },
  { question: "Which musical instrument has 88 keys?", answer: "Piano" },
  { question: "What is the capital of South Korea?", answer: "Seoul" },
  { question: "What do you call a word that is the same forwards and backwards?", answer: "Palindrome" }
];

let currentIndex = 0;
let isEditing = false;

function displayFlashcard() {
  flashcard.classList.remove("flipped");
  const card = flashcards[currentIndex];
  questionEl.innerText = card?.question || "No flashcards available.";
  answerEl.innerText = card?.answer || "";
  showAnswerBtn.style.display = flashcards.length ? "inline-block" : "none";
}

prevBtn.addEventListener("click", () => {
  if (flashcards.length === 0) return;
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  displayFlashcard();
});

nextBtn.addEventListener("click", () => {
  if (flashcards.length === 0) return;
  currentIndex = (currentIndex + 1) % flashcards.length;
  displayFlashcard();
});

showAnswerBtn.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

addBtn.addEventListener("click", () => {
  newQuestion.value = "";
  newAnswer.value = "";
  isEditing = false;
  formContainer.classList.add("show");
});

editBtn.addEventListener("click", () => {
  if (!flashcards.length) return;
  const currentCard = flashcards[currentIndex];
  newQuestion.value = currentCard.question;
  newAnswer.value = currentCard.answer;
  isEditing = true;
  formContainer.classList.add("show");
});

deleteBtn.addEventListener("click", () => {
  if (!flashcards.length) return;
  flashcards.splice(currentIndex, 1);
  if (currentIndex >= flashcards.length) currentIndex = flashcards.length - 1;
  saveFlashcards();
  displayFlashcard();
});

saveBtn.addEventListener("click", () => {
  const question = newQuestion.value.trim();
  const answer = newAnswer.value.trim();
  if (!question || !answer) return alert("Please fill in both fields.");

  if (isEditing) {
    flashcards[currentIndex] = { question, answer };
  } else {
    flashcards.push({ question, answer });
    currentIndex = flashcards.length - 1;
  }

  saveFlashcards();
  formContainer.classList.remove("show");
  displayFlashcard();
});

cancelBtn.addEventListener("click", () => {
  formContainer.classList.remove("show");
});

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function saveFlashcards() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

displayFlashcard();
