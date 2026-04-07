document.addEventListener("DOMContentLoaded", async () => {
    const reportJSON = localStorage.getItem("quiz_analysis_report");
    const questionsContainer = document.getElementById("questions-container");
    const overallInsight = document.getElementById("overall-insight");

    if (!reportJSON) {
        overallInsight.innerHTML = "No quiz data found. Please take a quiz first!";
        return;
    }

    const sessionHistory = JSON.parse(reportJSON);

    // Render the basic cards first so the user can see them
    questionsContainer.innerHTML = "";
    let wrongQuestionsText = "I just took a quiz. For each of the following questions I got wrong, please provide a highly concise 1-2 sentence explanation of why the correct answer is right and why my answer was wrong, so I can understand my doubt. Format your response EXACTLY like this:\n\nQ1 Explanation: ...\nQ2 Explanation: ...\n\nHere are the questions:\n\n";

    sessionHistory.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = `q-card ${q.isCorrect ? 'correct' : 'incorrect'}`;
        div.id = `q-card-${i}`;
        div.innerHTML = `
            <h3 style="margin-bottom: 10px;">Q${i + 1}: ${q.question}</h3>
            <p style="color: #a2aac2; margin-bottom: 5px;">Your Answer: <span style="color:${q.isCorrect ? '#16AE56' : '#F23723'}; font-weight:600;">${q.selected}</span></p>
            ${!q.isCorrect ? `<p style="color: #a2aac2;">Correct Answer: <span style="color:#16AE56; font-weight:600;">${q.correctAnswer}</span></p>` : ''}
            <div class="ai-explanation" id="ai-exp-${i}">
                ${q.isCorrect ? `<div style="color: #16AE56;"><i class="fa-solid fa-check-circle"></i> Correct! Great job.</div>` : `<i class="fa-solid fa-spinner fa-spin"></i> Waiting for AI explanation...`}
            </div>
            ${!q.isCorrect ? `<button onclick="speakText('ai-exp-${i}')" style="background:none; border:none; color:#1d7efd; cursor:pointer; font-size:0.8rem; margin-top:5px; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-volume-high"></i> Listen to Explanation</button>` : ''}
        `;
        questionsContainer.appendChild(div);

        if (!q.isCorrect) {
            wrongQuestionsText += `Q${i + 1}: ${q.question}\nCorrect Answer: ${q.correctAnswer}\nMy Answer: ${q.selected}\n\n`;
        }
    });

    let API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : "";
    if (!API_KEY || API_KEY === "PASTE_YOUR_API_KEY_HERE") {
        API_KEY = localStorage.getItem("gemini_api_key");
    }

    const hasWrong = sessionHistory.some(q => !q.isCorrect);

    if (!hasWrong) {
        overallInsight.innerHTML = "<span style='color:#16AE56; font-weight:600;'><i class='fa-solid fa-trophy'></i> Perfect Score! You nailed every question.</span>";
    } else if (!API_KEY) {
        overallInsight.innerHTML = "<span style='color:#F23723'>API Key missing! Please add your Gemini key to config.js to see AI explanations.</span>";
        sessionHistory.forEach((q, i) => {
            if (!q.isCorrect) document.getElementById(`ai-exp-${i}`).innerHTML = "No API Key provided.";
        });
    } else {
        try {
            let lastError = null;
            let endpoints = typeof CONFIG !== 'undefined' ? CONFIG.ENDPOINTS : ["https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"];

            for (const url of endpoints) {
                try {
                    console.log(`Attempting Analysis with: ${url}`);
                    const response = await fetch(`${url}?key=${API_KEY}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: [{ role: "user", parts: [{ text: wrongQuestionsText }] }]
                        })
                    });

                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error?.message || "Model failed");

                    const answerText = data.candidates[0].content.parts[0].text;
                    overallInsight.innerHTML = "<span style='color:#16AE56; font-weight:600;'><i class='fa-solid fa-check-circle'></i> Specific Question Analyses Generated Successfully!</span>";

                    // Simple parsing to try and plug explanations into respective cards
                    sessionHistory.forEach((q, i) => {
                        if (!q.isCorrect) {
                            const expDiv = document.getElementById(`ai-exp-${i}`);
                            const regex = new RegExp(`Q${i + 1} Explanation:\\s*([\\s\\S]*?)(?=Q\\d+ Explanation:|$)`, "i");
                            const match = answerText.match(regex);
                            if (match && match[1]) {
                                expDiv.innerHTML = `<i class="fa-solid fa-robot"></i> <b>AI Tutor:</b> ${match[1].trim().replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}`;
                            } else {
                                expDiv.innerHTML = `<i class="fa-solid fa-robot"></i> <b>AI Tutor:</b> The correct answer is ${q.correctAnswer} because it correctly addresses the question's premise.`;
                            }
                        }
                    });
                    return; // Success!
                } catch (e) {
                    lastError = e;
                    console.warn(`Analysis Endpoint failed: ${url}`, e.message);
                    continue;
                }
            }
            throw lastError || new Error("All analysis models failed");
        } catch (error) {
            overallInsight.innerHTML = `<span style='color:#F23723'><i class="fa-solid fa-circle-exclamation"></i> Error generating AI insights: ${error.message}</span>`;
            sessionHistory.forEach((q, i) => {
                if (!q.isCorrect) {
                    const expDiv = document.getElementById(`ai-exp-${i}`);
                    if (expDiv) expDiv.innerHTML = "Explanation failed to load. " + error.message;
                }
            });
        }
    }
});

window.speakText = (elementId) => {
    const text = document.getElementById(elementId).innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.cancel(); // Stop any current speech
    window.speechSynthesis.speak(utterance);
};
