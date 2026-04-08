/**
 * AI Mentor Local Knowledge Base
 * This file provides fallback answers when the Gemini API quota is exceeded.
 */

const LOCAL_KNOWLEDGE = {
    "html": {
        "definition": "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically.",
        "basics": "HTML uses elements represented by tags like <h1>, <p>, and <div> to structure content.",
        "links": "Use the <a> (anchor) tag with the 'href' attribute to create links."
    },
    "css": {
        "definition": "CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a document written in HTML.",
        "selectors": "Selectors are used to target HTML elements. Common ones include class selectors (.classname) and ID selectors (#idname).",
        "box model": "The box model consists of Margins, Borders, Padding, and the Actual Content."
    },
    "javascript": {
        "definition": "JavaScript is a versatile programming language that allows you to implement complex features on web pages, such as interactive maps and animated graphics.",
        "variables": "You can declare variables using 'const' (for constants), 'let' (for reassignable values), or 'var' (legacy).",
        "arrays": "Arrays are used to store multiple values in a single variable, accessed by index (starting at 0)."
    },
    "sql": {
        "definition": "SQL (Structured Query Language) is the standard language for dealing with Relational Databases.",
        "commands": "Common commands include SELECT (to read), INSERT (to create), UPDATE (to edit), and DELETE (to remove)."
    },
    "react": {
        "definition": "React is a JavaScript library for building user interfaces, primarily maintained by Meta.",
        "components": "React apps are built using components, which are reusable pieces of UI code."
    },
    "git": {
        "definition": "Git is a version control system that tracks changes in your code and allows multiple people to work on the same project.",
        "commit": "A commit is a snapshot of your project's changes. Use 'git commit -m \"message\"'."
    }
};

/**
 * Finds a matching answer in the local knowledge base based on user input.
 */
function getLocalFallback(query) {
    const words = query.toLowerCase().split(/\W+/);

    // Try to find a major topic match
    for (const topic in LOCAL_KNOWLEDGE) {
        if (words.includes(topic)) {
            const data = LOCAL_KNOWLEDGE[topic];
            return `[Offline Stability Mode] It looks like you're asking about **${topic.toUpperCase()}**.\n\n${data.definition}\n\nHint: ${Object.values(data)[1]}`;
        }
    }

    return "[Offline Stability Mode] I'm currently in offline mode because the AI Quota was exceeded. I recognize topics like **HTML, CSS, JavaScript, SQL, React, and Git**. Please try asking about one of those!";
}
