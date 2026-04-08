const CONFIG = {
    // Paste your Google Gemini API key below, or set it via the UI to store in browser memory
    // GEMINI_API_KEY: "APIzaSy...", // Use for Vercel Env Vars
    GEMINI_API_KEY: "AIzaSyD0OMfi-uz6oaPD7IXlTsw7buiNfSl7qmg",
    // We try multiple endpoints and pinned versions to handle high demand
    ENDPOINTS: [
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-001:generateContent",
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent",
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent"
    ]
};
