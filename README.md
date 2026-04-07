# 🧠 AbdulYash AI Learning Hub

The **AbdulYash AI Learning Hub** is an advanced, high-performance web platform designed to revolutionize the way students learn and practice. This project seamlessly integrates a smart quiz engine with an AI-powered mentor to provide a comprehensive learning experience.

## 🚀 "Killer" Features

- **Dynamic AI Question Generation**: Uses the **Google Gemini API** to generate unique multiple-choice questions on-the-fly based on your selected **Subject** and **Difficulty** (Easy, Moderate, Hard).
- **Smart Fallback System**: If the AI API is unavailable, the system automatically switches to a high-quality local question bank, ensuring a smooth experience at all times.
- **Detailed AI Analysis Dashboard**: After every quiz, get a full breakdown of your performance with **personalized 1-2 line AI explanations** for every single mistake you made.
- **AI Mentor Chatbot**: A dedicated space to ask follow-up questions and clear your doubts instantly using natural language.
- **Premium UI/UX**: Built with a stunning **Glassmorphism** design, smooth CSS animations, and a fully responsive layout optimized for all devices.

## 🛠️ Built With

- **Technoloy**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Brain**: Google Gemini API (`gemini-1.5-flash`)
- **Icons**: FontAwesome & Material Symbols
- **Fonts**: Google Fonts (Poppins & Montserrat)

## 🏗️ Getting Started

### 1. Prerequisites
- A modern web browser (Chrome, Firefox, Edge).
- A **Google Gemini API Key** (Get yours at [Google AI Studio](https://aistudio.google.com/app/apikey)).

### 2. Setup
1.  Clone this repository to your local machine.
2.  Open the folder in your code editor (e.g., VS Code).
3.  Create or open `javascript/config.js` and add your API key:
    ```javascript
    const CONFIG = {
        GEMINI_API_KEY: "YOUR_API_KEY_HERE"
    };
    ```
    *(Note: This file is ignored by Git to keep your key private).*

## 💻 How to Run in VS Code

For the best experience, we recommend using the **Live Server** extension:

1.  Open the project folder in **VS Code**.
2.  Install the **Live Server** extension (by Ritwick Dey).
3.  Open `index.html`.
4.  Click the **"Go Live"** button in the bottom-right corner of your VS Code window.
5.  The app will automatically open in your default browser!

## 📜 License
This project is part of a Final Year achievement. All rights reserved.

---
*Built with ❤️ for a spectacular learning experience.*
