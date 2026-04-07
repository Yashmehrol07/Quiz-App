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
            ${!q.isCorrect ? `<div class="ai-explanation" id="ai-exp-${i}"><i class="fa-solid fa-spinner fa-spin"></i> Waiting for AI explanation...</div>` : `<div class="ai-explanation" style="background: rgba(22, 174, 86, 0.1); color: #16AE56;"><i class="fa-solid fa-check-circle"></i> Correct! Great job.</div>`}
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
            // Using gemini-pro to absolutely guarantee compatibility with v1beta
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: wrongQuestionsText }]
                    }]
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Failed to fetch from Gemini");

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
