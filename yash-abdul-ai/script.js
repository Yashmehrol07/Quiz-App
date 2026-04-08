const container = document.querySelector(".container");
const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");
const fileInput = promptForm.querySelector("#file-input");
const fileUploadWrapper = promptForm.querySelector(".file-upload-wrapper");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
// API Setup
// The API Key is securely loaded from javascript/config.js or localStorage.
let API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : "";
if (!API_KEY || API_KEY.includes("PASTE") || API_KEY.includes("YOUR_KEY")) {
  API_KEY = localStorage.getItem("gemini_api_key") || "";
}
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Advanced Knowledge Bridge
window.addEventListener("DOMContentLoaded", () => {
  const reportJSON = localStorage.getItem("quiz_analysis_report");
  const doubtQ = localStorage.getItem("doubt_question");

  if (reportJSON) {
    const report = JSON.parse(reportJSON);
    let promptText = "I just completed a quiz! Can you provide a fantastic analysis of my performance and give me a study plan? Here are the detailed results of what I answered:\n\n";
    report.forEach((q, i) => {
      promptText += `Q${i + 1}: ${q.question}\n- Correct Answer: ${q.correctAnswer}\n- I Selected: ${q.selected}\n- Result: ${q.isCorrect ? "Right" : "Wrong"}\n\n`;
    });
    promptInput.value = promptText;
    localStorage.removeItem("quiz_analysis_report");

    // Auto submit the prompt!
    setTimeout(() => promptForm.dispatchEvent(new Event("submit")), 600);
  } else if (doubtQ) {
    promptInput.value = `I had a doubt on this question during the quiz: "${doubtQ}". Can you explain the correct answer to me?`;
    localStorage.removeItem("doubt_question");
  }
});
let controller, typingInterval;
const chatHistory = [];
const userData = { message: "", file: {} };
// Set initial theme from local storage
const isLightTheme = localStorage.getItem("themeColor") === "light_mode";
document.body.classList.toggle("light-theme", isLightTheme);
themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";
// Function to create message elements
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};
// Scroll to the bottom of the container
const scrollToBottom = () => container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
// Simulate typing effect for bot responses
const typingEffect = (text, textElement, botMsgDiv) => {
  textElement.textContent = "";
  const words = text.split(" ");
  let wordIndex = 0;
  // Set an interval to type each word
  typingInterval = setInterval(() => {
    if (wordIndex < words.length) {
      textElement.textContent += (wordIndex === 0 ? "" : " ") + words[wordIndex++];
      scrollToBottom();
    } else {
      clearInterval(typingInterval);
      botMsgDiv.classList.remove("loading");
      document.body.classList.remove("bot-responding");
    }
  }, 40); // 40 ms delay
};
// Make the API call and generate the bot's response
const generateResponse = async (botMsgDiv) => {
  const textElement = botMsgDiv.querySelector(".message-text");
  controller = new AbortController();

  chatHistory.push({
    role: "user",
    parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: (({ fileName, isImage, ...rest }) => rest)(userData.file) }] : [])],
  });

  try {
    let success = false;
    let lastError = null;

    // 1. Try Secure Proxy (Live Site)
    try {
      console.log(`Attempting Secure Proxy: /api/quiz`);
      const response = await fetch(`/api/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: chatHistory, model: "gemini-1.5-flash" }),
        signal: controller.signal,
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        typingEffect(responseText, textElement, botMsgDiv);
        chatHistory.push({ role: "model", parts: [{ text: responseText }] });
        success = true;
      }
    } catch (e) {
      console.warn("Secure Proxy unavailable, checking fallback.");
    }

    // 2. Fallback to Direct API (Works Local and Live with Key)
    if (!success) {
      let key = (typeof CONFIG !== 'undefined' && CONFIG.GEMINI_API_KEY && !CONFIG.GEMINI_API_KEY.includes("MANAGED")) ? CONFIG.GEMINI_API_KEY : "";
      if (!key) key = localStorage.getItem("gemini_api_key");

      if (key && key.length > 20) {
        console.log("Using direct API fallback for chatbot...");
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: chatHistory }),
          signal: controller.signal,
        });

        if (response.ok) {
          const data = await response.json();
          const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
          typingEffect(responseText, textElement, botMsgDiv);
          chatHistory.push({ role: "model", parts: [{ text: responseText }] });
          success = true;
        } else {
          const err = await response.json();
          throw new Error(err.error?.message || "Direct API failed");
        }
      } else {
        throw new Error("No valid API Key found. Check config.js.");
      }
    }
  } catch (error) {
    const isHighDemand = error.message.toLowerCase().includes("high demand") || error.message.toLowerCase().includes("overloaded");
    const isQuota = error.message.toLowerCase().includes("quota");

    const errorHTML = `<div style="background: rgba(242, 55, 35, 0.1); padding: 15px; border-radius: 12px; border-left: 5px solid #F23723; margin-top: 5px;">
                          <p style="color: #F23723; font-weight: 600; margin-bottom: 5px;"><i class="fa-solid fa-circle-exclamation"></i> ${isQuota ? "Quota Paused" : (isHighDemand ? "AI Mentor is heavily busy!" : "AI Mentor is taking a break!")}</p>
                          <p style="font-size: 0.85rem; color: #a2aac2;">${isQuota ? "You've used all your free AI requests. Try again later!" : (isHighDemand ? "AI is busy. Wait 10 seconds." : error.message)}</p>
                        </div>`;
    textElement.innerHTML = errorHTML;
    botMsgDiv.classList.remove("loading");
    document.body.classList.remove("bot-responding");
    scrollToBottom();
  } finally {
    userData.file = {};
  }
};
// Handle the form submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  const userMessage = promptInput.value.trim();
  if (!userMessage || document.body.classList.contains("bot-responding")) return;
  userData.message = userMessage;
  promptInput.value = "";
  document.body.classList.add("chats-active", "bot-responding");
  fileUploadWrapper.classList.remove("file-attached", "img-attached", "active");
  // Generate user message HTML with optional file attachment
  const userMsgHTML = `
    <p class="message-text"></p>
    ${userData.file.data ? (userData.file.isImage ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />` : `<p class="file-attachment"><span class="material-symbols-rounded">description</span>${userData.file.fileName}</p>`) : ""}
  `;
  const userMsgDiv = createMessageElement(userMsgHTML, "user-message");
  userMsgDiv.querySelector(".message-text").textContent = userData.message;
  chatsContainer.appendChild(userMsgDiv);
  scrollToBottom();
  setTimeout(() => {
    // Generate bot message HTML and add in the chat container
    const botMsgHTML = `<img class="avatar" src="ya.jpg" /> <p class="message-text">Just a sec...</p>`;
    const botMsgDiv = createMessageElement(botMsgHTML, "bot-message", "loading");
    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();
    generateResponse(botMsgDiv);
  }, 600); // 600 ms delay
};
// Handle file input change (file upload)
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  const isImage = file.type.startsWith("image/");
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    fileInput.value = "";
    const base64String = e.target.result.split(",")[1];
    fileUploadWrapper.querySelector(".file-preview").src = e.target.result;
    fileUploadWrapper.classList.add("active", isImage ? "img-attached" : "file-attached");
    // Store file data in userData obj
    userData.file = { fileName: file.name, data: base64String, mime_type: file.type, isImage };
  };
});
// Cancel file upload
document.querySelector("#cancel-file-btn").addEventListener("click", () => {
  userData.file = {};
  fileUploadWrapper.classList.remove("file-attached", "img-attached", "active");
});
// Stop Bot Response
document.querySelector("#stop-response-btn").addEventListener("click", () => {
  controller?.abort();
  userData.file = {};
  clearInterval(typingInterval);
  chatsContainer.querySelector(".bot-message.loading").classList.remove("loading");
  document.body.classList.remove("bot-responding");
});
// Toggle dark/light theme
themeToggleBtn.addEventListener("click", () => {
  const isLightTheme = document.body.classList.toggle("light-theme");
  localStorage.setItem("themeColor", isLightTheme ? "light_mode" : "dark_mode");
  themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";
});
// Delete all chats
document.querySelector("#delete-chats-btn").addEventListener("click", () => {
  chatHistory.length = 0;
  chatsContainer.innerHTML = "";
  document.body.classList.remove("chats-active", "bot-responding");
});
// Show/hide controls for mobile on prompt input focus
document.addEventListener("click", ({ target }) => {
  const wrapper = document.querySelector(".prompt-wrapper");
  const shouldHide = target.classList.contains("prompt-input") || (wrapper.classList.contains("hide-controls") && (target.id === "add-file-btn" || target.id === "stop-response-btn"));
  wrapper.classList.toggle("hide-controls", shouldHide);
});
// Add event listeners for form submission and file input click
promptForm.addEventListener("submit", handleFormSubmit);
promptForm.querySelector("#add-file-btn").addEventListener("click", () => fileInput.click());