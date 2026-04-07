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
let numberOfQuestions = 10;
let currentQuestion = null;
const questionsIndexHistory = [];
let correctAnswersCount = 0;
let disableSelection = false;
let sessionHistory = [];

// Display the quiz result and hide the quiz container
const showQuizResult = () => {
  clearInterval(timer);
  document.querySelector(".quiz-popup").classList.remove("active");
  document.querySelector(".result-popup").classList.add("active");
  const percentage = Math.round((correctAnswersCount / numberOfQuestions) * 100);
  const resultText = `<h2 style="margin-bottom:10px; color:#1d7efd;">Score: ${percentage}%</h2>You answered <b>${correctAnswersCount}</b> out of <b>${numberOfQuestions}</b> questions correctly.`;
  resultContainer.querySelector(".result-message").innerHTML = resultText;
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
// Fetch a random question from based on the selected category
const getRandomQuestion = () => {
  const categoryQuestions = question.find((cat) => cat.category.toLowerCase() === quizCategory.toLowerCase())?.questions || [];

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
// Start the quiz and render the random question
const startQuiz = () => {
  document.querySelector(".config-popup").classList.remove("active");
  document.querySelector(".quiz-popup").classList.add("active");
  // Update the quiz category and number of questions
  quizCategory = configContainer.querySelector(".category-option.active").textContent;
  numberOfQuestions = parseInt(configContainer.querySelector(".question-option.active").textContent);
  renderQuestion();
};
// Highlight the selected option on click - category or no. of question
configContainer.querySelectorAll(".category-option, .question-option").forEach((option) => {
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
  document.querySelector(".config-popup").classList.add("active");
  document.querySelector(".result-popup").classList.remove("active");
};
// Event listeners
nextQuestionBtn.addEventListener("click", renderQuestion);
resultContainer.querySelectorAll(".try-again-btn").forEach(btn => {
  if (btn.textContent.includes("Try Again")) {
    btn.addEventListener("click", resetQuiz);
  }
});
configContainer.querySelector(".start-quiz-btn").addEventListener("click", startQuiz);

if (resultContainer.querySelector(".analysis-btn")) {
  const analysisPopup = document.querySelector(".analysis-popup");
  const aiInsightContent = document.getElementById("ai-insight-content");
  const breakdownList = document.getElementById("question-breakdown-list");

  resultContainer.querySelector(".analysis-btn").addEventListener("click", async () => {
    // Open popup natively
    document.querySelector(".result-popup").classList.remove("active");
    analysisPopup.classList.add("active");

    // Render breakdown list
    breakdownList.innerHTML = "";
    let wrongQuestionsText = "";

    sessionHistory.forEach((item, index) => {
      const isWrong = !item.isCorrect;
      if (isWrong) {
        wrongQuestionsText += `Q: ${item.question}\nCorrect: ${item.correctAnswer}\nUser chose: ${item.selected}\n\n`;
      }

      const div = document.createElement("div");
      div.style.cssText = `padding: 15px; border-radius: 8px; border: 1px solid ${item.isCorrect ? '#16AE56' : '#F23723'}; background: rgba(255,255,255,0.05);`;
      div.innerHTML = `
                <p style="font-weight: 600; margin-bottom: 8px; color:#fff;">${index + 1}. ${item.question}</p>
                <p style="font-size: 0.9rem; color: #a2aac2;">You selected: <span style="color: ${item.isCorrect ? '#16AE56' : '#F23723'}">${item.selected}</span></p>
                ${!item.isCorrect ? `<p style="font-size: 0.9rem; color: #a2aac2;">Correct Answer: <span style="color: #16AE56">${item.correctAnswer}</span></p>` : ''}
            `;
      breakdownList.appendChild(div);
    });

    // Trigger Gemini API directly!
    let API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : "";
    if (!API_KEY || API_KEY === "PASTE_YOUR_API_KEY_HERE") {
      API_KEY = localStorage.getItem("gemini_api_key");
    }

    if (wrongQuestionsText === "") {
      aiInsightContent.innerHTML = "Perfect score! You have no weak areas to analyze in this session. Incredible job!";
    } else if (!API_KEY) {
      aiInsightContent.innerHTML = "<em>API Key missing! Please add your Gemini key to config.js to see AI insights.</em>";
    } else {
      try {
        aiInsightContent.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating your personalized strategy with Gemini...`;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: [{ text: `I am taking a quiz. Here are the questions I got wrong:\n\n${wrongQuestionsText}\n\nBased ONLY on these mistakes, provide a very concise analysis (3-4 sentences max) of my weak topics and give me 1 actionable strategy to improve.` }]
            }]
          })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message || "Failed to fetch from Gemini");

        let answer = data.candidates[0].content.parts[0].text;
        answer = answer.replace(/\*\*(.*?)\*\*/g, '<b style="color:#fff;">$1</b>').replace(/\n/g, '<br>');
        aiInsightContent.innerHTML = answer;
      } catch (e) {
        aiInsightContent.innerHTML = `<span style="color:#F23723">Failed to load AI Analysis: ${e.message}</span>`;
      }
    }
  });

  document.getElementById("close-analysis-btn")?.addEventListener("click", () => {
    analysisPopup.classList.remove("active");
    document.querySelector(".result-popup").classList.add("active");
  });
}