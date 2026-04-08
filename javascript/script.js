// DOM element selectors
const configContainer = document.querySelector(".config-container");
const quizContainer = document.querySelector(".quiz-container");
const answerOptions = quizContainer.querySelector(".answer-options");
const nextQuestionBtn = quizContainer.querySelector(".next-question-btn");
const questionStatus = quizContainer.querySelector(".question-status");
const timerDisplay = quizContainer.querySelector(".timer-duration");
const resultContainer = document.querySelector(".result-container");
// Quiz state variables
const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let quizCategory = "programming";
let quizDifficulty = "easy";
let numberOfQuestions = 10;
let currentQuestion = null;
const questionsIndexHistory = [];
let correctAnswersCount = 0;
let disableSelection = false;
let sessionHistory = [];
let aiQuestions = [];
let isAIQuiz = false;

// Display the quiz result and hide the quiz container
const showQuizResult = () => {
  clearInterval(timer);
  document.querySelector(".quiz-popup").classList.remove("active");
  document.querySelector(".result-popup").classList.add("active");
  const percentage = Math.round((correctAnswersCount / numberOfQuestions) * 100);
  const resultText = `<h2 style="margin-bottom:10px; color:#1d7efd;">Score: ${percentage}%</h2>You answered <b>${correctAnswersCount}</b> out of <b>${numberOfQuestions}</b> questions correctly.`;
  resultContainer.querySelector(".result-message").innerHTML = resultText;

  // Save High Score
  const savedBest = localStorage.getItem(`best_score_${quizCategory}`) || 0;
  if (percentage > savedBest) {
    localStorage.setItem(`best_score_${quizCategory}`, percentage);
  }
};
// Clear and reset the timer
const resetTimer = () => {
  clearInterval(timer);
  currentTime = QUIZ_TIME_LIMIT;
  timerDisplay.textContent = `${currentTime}s`;
};
// Initialize and start the timer for the current question
const startTimer = () => {
  timer = setInterval(() => {
    currentTime--;
    timerDisplay.textContent = `${currentTime}s`;
    if (currentTime <= 0) {
      clearInterval(timer);
      disableSelection = true;
      sessionHistory.push({
        question: currentQuestion.question,
        selected: "Time Out",
        correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect: false
      });
      nextQuestionBtn.style.visibility = "visible";
      quizContainer.querySelector(".quiz-timer").style.background = "#c31402";
      highlightCorrectAnswer();
      // Disable all answer options after one option is selected
      answerOptions.querySelectorAll(".answer-option").forEach((option) => (option.style.pointerEvents = "none"));
    }
  }, 1000);
};
// Fetch a random question based on the selected category or AI generated list
const getRandomQuestion = () => {
  let categoryQuestions = [];

  if (isAIQuiz && aiQuestions.length > 0) {
    categoryQuestions = aiQuestions;
  } else {
    categoryQuestions = question.find((cat) => cat.category.toLowerCase() === quizCategory.toLowerCase())?.questions || [];
  }

  if (categoryQuestions.length === 0) {
    alert("No questions found for this category!");
    return null;
  }

  // Show the results if all questions have been used
  if (questionsIndexHistory.length >= Math.min(numberOfQuestions, categoryQuestions.length)) {
    return showQuizResult();
  }
  // Filter out already asked questions and choose a random one
  const availableQuestions = categoryQuestions.filter((_, index) => !questionsIndexHistory.includes(index));
  const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  questionsIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
  return randomQuestion;
};
// Highlight the correct answer option and add icon
const highlightCorrectAnswer = () => {
  const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
  correctOption.classList.add("correct");
  const iconHTML = `<span class="material-symbols-rounded"> check_circle </span>`;
  correctOption.insertAdjacentHTML("beforeend", iconHTML);
};
// Handle the user's answer selection
const handleAnswer = (option, answerIndex) => {
  if (disableSelection) return;
  clearInterval(timer);
  disableSelection = true;
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect");
  sessionHistory.push({
    question: currentQuestion.question,
    selected: currentQuestion.options[answerIndex],
    correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
    isCorrect: isCorrect
  });
  if (!isCorrect) {
    localStorage.setItem("doubt_question", currentQuestion.question);
    highlightCorrectAnswer();
  } else {
    correctAnswersCount++;
  }
  // Insert icon based on correctness
  const iconHTML = `<span class="material-symbols-rounded"> ${isCorrect ? "check_circle" : "cancel"} </span>`;
  option.insertAdjacentHTML("beforeend", iconHTML);
  // Disable all answer options after one option is selected
  answerOptions.querySelectorAll(".answer-option").forEach((option) => (option.style.pointerEvents = "none"));
  nextQuestionBtn.style.visibility = "visible";
};
// Render the current question and its options in the quiz
const renderQuestion = () => {
  currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;
  disableSelection = false;
  resetTimer();
  startTimer();
  // Update the UI
  nextQuestionBtn.style.visibility = "hidden";
  quizContainer.querySelector(".quiz-timer").style.background = "#32313C";
  quizContainer.querySelector(".question-text").textContent = currentQuestion.question;
  questionStatus.innerHTML = `<b>${questionsIndexHistory.length}</b> of <b>${numberOfQuestions}</b> Questions`;
  answerOptions.innerHTML = "";
  // Create option <li> elements, append them, and add click event listeners
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.classList.add("answer-option");
    li.textContent = option;
    answerOptions.append(li);
    li.addEventListener("click", () => handleAnswer(li, index));
  });
};

const fetchAIQuestions = async () => {
  const startBtn = configContainer.querySelector(".start-quiz-btn");
  const originalBtnText = startBtn.textContent;

  try {
    startBtn.disabled = true;
    startBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> AI is generating questions...`;

    // 1. Try Secure Proxy (Only works on Live Site)
    try {
      console.log(`Quiz Attempt: /api/quiz`);
      const response = await fetch(`/api/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate ${numberOfQuestions} unique multiple choice questions about ${quizCategory}.
          - Difficulty: ${quizDifficulty}.
          - Instructions:
            1. Ensure questions are diverse, creative, and NOT repetitive.
            2. For 'hard' difficulty, use advanced concepts and scenario-based questions.
            3. Each question must have exactly 4 options.
            4. Return ONLY a valid JSON array of objects with 'question', 'options' (array of strings), and 'correctAnswer' (0-3 index).
            5. Do NOT include any markdown formatting like \`\`\`json.` }]
          }],
          model: "gemini-2.0-flash"
        })
      });

      if (response.ok) {
        const data = await response.json();
        let content = data.candidates[0].content.parts[0].text;
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) content = jsonMatch[0];
        const questions = JSON.parse(content);
        if (Array.isArray(questions) && questions.length > 0) {
          aiQuestions = questions;
          isAIQuiz = true;
          return true;
        }
      }
    } catch (e) {
      console.warn("Secure Proxy not reachable (Normal for local dev):", e.message);
    }

    // 2. Fallback to Direct API (Works Local and Live with Key)
    let API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : "";
    if (!API_KEY || API_KEY.includes("PASTE") || API_KEY.includes("MANAGED")) {
      API_KEY = localStorage.getItem("gemini_api_key");
    }

    if (API_KEY && API_KEY.length > 10) {
      console.log("Using direct API fallback...");
      const directUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
      const response = await fetch(directUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate ${numberOfQuestions} unique multiple choice questions about ${quizCategory}.
          - Difficulty: ${quizDifficulty}.
          - Instructions:
            1. Ensure questions are diverse, creative, and NOT repetitive.
            2. For 'hard' difficulty, use advanced concepts and scenario-based questions.
            3. Each question must have exactly 4 options.
            4. Return ONLY a valid JSON array of objects with 'question', 'options' (array of strings), and 'correctAnswer' (0-3 index).
            5. Do NOT include any markdown formatting like \`\`\`json.` }]
          }]
        })
      });
      if (response.ok) {
        const data = await response.json();
        let content = data.candidates[0].content.parts[0].text;
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) content = jsonMatch[0];
        const questions = JSON.parse(content);
        if (Array.isArray(questions) && questions.length > 0) {
          aiQuestions = questions;
          isAIQuiz = true;
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return false;
  } finally {
    startBtn.disabled = false;
    startBtn.textContent = originalBtnText;
  }
};
// Render high scores in the configuration UI
const updateBestScores = () => {
  configContainer.querySelectorAll(".category-option").forEach(btn => {
    const cat = btn.textContent.toLowerCase();
    const best = localStorage.getItem(`best_score_${cat}`);
    if (best) {
      btn.innerHTML = `${btn.textContent} <span style="font-size:0.7rem; display:block; color:#1d7efd;">Best: ${best}%</span>`;
    }
  });
};

// Start the quiz and render the random question
const startQuiz = async () => {
  // Update the quiz settings from UI
  quizCategory = configContainer.querySelector(".category-option.active").textContent;
  numberOfQuestions = parseInt(configContainer.querySelector(".question-option.active").textContent);
  quizDifficulty = configContainer.querySelector(".difficulty-option.active").textContent;

  // Try to generate AI questions first
  const aiSuccess = await fetchAIQuestions();

  if (!aiSuccess) {
    console.log("Falling back to local questions...");
  }

  document.querySelector(".config-popup").classList.remove("active");
  document.querySelector(".quiz-popup").classList.add("active");
  renderQuestion();
};
// Highlight the selected option on click - category, no. of question, or difficulty
configContainer.querySelectorAll(".category-option, .question-option, .difficulty-option").forEach((option) => {
  option.addEventListener("click", () => {
    option.parentNode.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});
// Reset the quiz and return to the configuration container
const resetQuiz = () => {
  resetTimer();
  correctAnswersCount = 0;
  questionsIndexHistory.length = 0;
  sessionHistory = [];
  aiQuestions = [];
  isAIQuiz = false;
  updateBestScores();
  document.querySelector(".config-popup").classList.add("active");
  document.querySelector(".result-popup").classList.remove("active");
};

updateBestScores();
// Event listeners
nextQuestionBtn.addEventListener("click", renderQuestion);
resultContainer.querySelectorAll(".try-again-btn").forEach(btn => {
  if (btn.textContent.includes("Try Again")) {
    btn.addEventListener("click", resetQuiz);
  }
});
configContainer.querySelector(".start-quiz-btn").addEventListener("click", startQuiz);

if (resultContainer.querySelector(".analysis-btn")) {
  resultContainer.querySelector(".analysis-btn").addEventListener("click", () => {
    localStorage.setItem("quiz_analysis_report", JSON.stringify(sessionHistory));
    window.location.href = "analysis.html";
  });
}