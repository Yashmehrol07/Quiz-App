const question = [
  {
    category: "programming",
    questions: [
      // HTML & CSS
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Pre Processor",
          "Hyper Text Markup Language",
          "Hyper Text Multiple Language",
          "Hyper Tool Multi Language",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Colorful Style Sheets",
          "Computer Style Sheets",
          "Cascading Simple Sheets",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which CSS property is used to change text color?",
        options: ["text-color", "color", "font-color", "background-color"],
        correctAnswer: 1,
      },
      {
        question: "Which tag is used to link an external CSS file?",
        options: ["<script>", "<style>", "<link>", "<meta>"],
        correctAnswer: 2,
      },
      {
        question:
          "Which CSS property controls the space between lines of text?",
        options: ["spacing", "line-height", "letter-spacing", "text-indent"],
        correctAnswer: 1,
      },

      // JavaScript
      {
        question:
          "Which of the following is a correct way to declare a variable in JavaScript?",
        options: [
          "var x = 10;",
          "variable x = 10;",
          "int x = 10;",
          "let 10 = x;",
        ],
        correctAnswer: 0,
      },
      {
        question: "What does the 'typeof' operator do in JavaScript?",
        options: [
          "Checks the type of a variable",
          "Declares a variable",
          "Assigns a value to a variable",
          "Converts a variable to another type",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Which keyword is used to define a constant variable in JavaScript?",
        options: ["var", "let", "const", "define"],
        correctAnswer: 2,
      },
      {
        question: "What is the output of '2' + 2 in JavaScript?",
        options: ["4", "22", "TypeError", "NaN"],
        correctAnswer: 1,
      },
      {
        question:
          "Which JavaScript method is used to write text into an HTML element?",
        options: ["innerHTML", "document.write", "console.log", "alert"],
        correctAnswer: 0,
      },

      // Python
      {
        question: "How do you write a comment in Python?",
        options: [
          "// This is a comment",
          "# This is a comment",
          "/* This is a comment */",
          "<!-- This is a comment -->",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which data type is mutable in Python?",
        options: ["Tuple", "List", "String", "Integer"],
        correctAnswer: 1,
      },
      {
        question: "Which function is used to print output in Python?",
        options: ["display()", "echo()", "print()", "write()"],
        correctAnswer: 2,
      },
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "define", "def", "function"],
        correctAnswer: 2,
      },
      {
        question: "What is the output of len([1,2,3,4])?",
        options: ["3", "4", "5", "Error"],
        correctAnswer: 1,
      },

      // C & C++
      {
        question: "In C, how do you define a function?",
        options: [
          "function myFunction()",
          "def myFunction()",
          "void myFunction()",
          "func myFunction()",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which of the following is a correct comment syntax in C?",
        options: [
          "// This is a comment",
          "# This is a comment",
          "<!-- This is a comment -->",
          "-- This is a comment",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Which header file is used in C++ for input and output operations?",
        options: [
          "#include <stdio.h>",
          "#include <iostream>",
          "#include <stdlib.h>",
          "#include <string.h>",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the correct syntax for a 'for' loop in C++?",
        options: [
          "for (i = 0; i < 10; i++)",
          "for i in range(10)",
          "loop(i, 10)",
          "for i = 1 to 10",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "What is the default return type of a C++ function if not specified?",
        options: ["void", "int", "float", "char"],
        correctAnswer: 1,
      },

      // Databases (SQL & NoSQL)
      {
        question: "Which SQL command is used to retrieve data?",
        options: ["SELECT", "FETCH", "GET", "SHOW"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correctAnswer: 2,
      },
      {
        question: "Which SQL clause is used to filter records?",
        options: ["WHERE", "HAVING", "ORDER BY", "GROUP BY"],
        correctAnswer: 0,
      },
      {
        question: "What is the primary key in a database?",
        options: [
          "A unique identifier for records",
          "A duplicate column",
          "A foreign key",
          "An index",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which SQL statement is used to insert new data?",
        options: ["INSERT INTO", "ADD", "NEW RECORD", "UPDATE"],
        correctAnswer: 0,
      },

      // More questions across various categories (total 400)

      {
        question:
          "What is the correct syntax to output 'Hello World' in Python?",
        options: [
          "echo 'Hello World'",
          "print('Hello World')",
          "console.log('Hello World')",
          "printf('Hello World')",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Which HTML element is used to define the title of a document?",
        options: ["<title>", "<head>", "<meta>", "<link>"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a valid CSS selector?",
        options: ["#id", ".class", "element", "#id.class", "All of the above"],
        correctAnswer: 4,
      },
      {
        question:
          "What is the purpose of the 'return' statement in a function?",
        options: [
          "To exit the function",
          "To return a value",
          "To define a function",
          "Both A and B",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which of the following is not a programming language?",
        options: ["Python", "Java", "HTML", "C++"],
        correctAnswer: 2,
      },
      {
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Application Program Interface",
          "Application Programming Interaction",
          "Application Program Interaction",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a front-end framework?",
        options: ["Django", "Flask", "Angular", "Spring"],
        correctAnswer: 2,
      },
      {
        question: "What is the default port for HTTP?",
        options: ["80", "443", "21", "25"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is used to style web pages?",
        options: ["HTML", "CSS", "JavaScript", "All of the above"],
        correctAnswer: 1,
      },
      {
        question: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "JavaScript Online Notation",
          "Java Standard Object Notation",
          "JavaScript Object Name",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correctAnswer: 2,
      },
      {
        question: "What is the main purpose of a database?",
        options: [
          "To store data",
          "To process data",
          "To visualize data",
          "To analyze data",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a version control system?",
        options: ["Git", "GitHub", "Bitbucket", "All of the above"],
        correctAnswer: 0,
      },
      {
        question: "What is the correct way to create a function in JavaScript?",
        options: [
          "function myFunction()",
          "create myFunction()",
          "def myFunction()",
          "function: myFunction()",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["style", "class", "font", "styles"],
        correctAnswer: 0,
      },
      {
        question: "What is the purpose of the 'if' statement in programming?",
        options: [
          "To execute code conditionally",
          "To loop through code",
          "To define a function",
          "To declare a variable",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a popular JavaScript library?",
        options: ["jQuery", "Bootstrap", "Django", "Flask"],
        correctAnswer: 0,
      },
      {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: [
          "The global object",
          "The current object",
          "The parent object",
          "None of the above",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is a CSS preprocessor?",
        options: ["Sass", "LESS", "Stylus", "All of the above"],
        correctAnswer: 3,
      },
      {
        question: "What is a REST API?",
        options: [
          "A database system",
          "A protocol for communication",
          "A UI framework",
          "A data structure",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which HTTP method is used to retrieve data?",
        options: ["GET", "POST", "DELETE", "PUT"],
        correctAnswer: 0,
      },
      {
        question: "What is the purpose of Git?",
        options: [
          "Text editor",
          "Version control",
          "Database management",
          "Web development",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Which command is used to check the status of a Git repository?",
        options: ["git log", "git status", "git init", "git clone"],
        correctAnswer: 1,
      },
      {
        question: "What is an SQL Injection attack?",
        options: [
          "An attack that steals passwords",
          "A type of hacking to inject SQL commands",
          "A way to fix broken SQL queries",
          "A secure database management technique",
        ],
        correctAnswer: 1,
      },

      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Pre Processor",
          "Hyper Text Markup Language",
          "Hyper Text Multiple Language",
          "Hyper Tool Multi Language",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Which of the following is a correct way to declare a variable in JavaScript?",
        options: [
          "var x = 10;",
          "variable x = 10;",
          "int x = 10;",
          "let 10 = x;",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is the correct file extension for Python files?",
        options: [".py", ".python", ".pyt", ".pt"],
        correctAnswer: 0,
      },
      {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<styles>"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Flask"],
        correctAnswer: 0,
      },
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Stylish Question Language",
          "Structured Question Language",
          "Style Query Language",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which symbol is used for comments in Java?",
        options: ["//", "#", "/* */", "<!-- -->"],
        correctAnswer: 0,
      },
      {
        question: "How do you write comment in Python?",
        options: [
          "// This is a comment",
          "# This is a comment",
          "/* This is a comment */",
          "<!-- This is a comment -->",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Colorful Style Sheets",
          "Computer Style Sheets",
          "Cascading Simple Sheets",
        ],
        correctAnswer: 0,
      },
      {
        question: "In JavaScript, how do you create a function?",
        options: [
          "create function myFunction()",
          "def function myFunction()",
          "func myFunction()",
          "function myFunction()",
        ],
        correctAnswer: 3,
      },
      {
        question: "What does the 'typeof' operator do in JavaScript?",
        options: [
          "Checks the type of a variable",
          "Declares a variable",
          "Assigns a value to a variable",
          "Converts a variable to another type",
        ],
        correctAnswer: 0,
      },
      {
        question: "In C, how do you define a function?",
        options: [
          "function myFunction()",
          "def myFunction()",
          "void myFunction()",
          "func myFunction()",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which of the following is a characteristic of Python?",
        options: [
          "Compiled language",
          "Dynamic typing",
          "Low-level language",
          "Static typing",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which language is used for Android development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: 1,
      },
      {
        question:
          "What is the purpose of the 'forEach()' method in JavaScript?",
        options: [
          "Removes duplicate elements from an array",
          "Filters elements in an array",
          "Sorts an array",
          "Iterates through each element in an array",
        ],
        correctAnswer: 3,
      },
      {
        question: "What does the 'return' keyword do in a function?",
        options: [
          "Ends the function and returns a value",
          "Continues the function",
          "Exits the function without value",
          "Ends the program execution",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is NOT a semantic HTML element?",
        options: ["<header>", "<footer>", "<div>", "<article>"],
        correctAnswer: 2,
      },
      {
        question: "What is the primary purpose of a 'for' loop in programming?",
        options: [
          "Repeat code for a specified number of times",
          "Repeat code until a condition is true",
          "Define a function",
          "Evaluate conditions in the loop",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which data structure is ideal for LIFO (Last In First Out)?",
        options: ["Queue", "Stack", "Linked list", "Array"],
        correctAnswer: 1,
      },
      {
        question:
          "Which command is used in Git to store changes in the repository?",
        options: ["git commit", "git push", "git pull", "git add"],
        correctAnswer: 0,
      },
      {
        question: "What does the 'map()' function do in JavaScript?",
        options: [
          "Sorts an array",
          "Filters out items",
          "Creates a new array",
          "Modifies the original array",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is an IDE?",
        options: [
          "An Integrated Development Environment",
          "A function for code execution",
          "An interpreter",
          "An input method for writing code",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Which of the following is a feature of object-oriented programming?",
        options: [
          "Encapsulation",
          "Modularity",
          "Recursion",
          "Memory Management",
        ],
        correctAnswer: 0,
      },
      {
        question: "What does SQL stand for?",
        options: [
          "Simple Question Language",
          "Systematic Query Language",
          "Standard Question Language",
          "Structured Query Language",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which of these is an example of a non-relational database?",
        options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"],
        correctAnswer: 0,
      },
      {
        question: "How do you write comment in CSS?",
        options: [
          "// This is a comment",
          "/* This is a comment */",
          "# This is a comment",
          "<!-- This is a comment -->",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Which of the following algorithms is used to sort an array by comparing elements?",
        options: ["Bubble sort", "Insertion sort", "Quick sort", "Merge sort"],
        correctAnswer: 0,
      },
      {
        question: "What does the 'finally' block in Java do?",
        options: [
          "Handles all exceptions",
          "Attempts to handle runtime exceptions",
          "Executes code after try-catch",
          "Defines execution start point",
        ],
        correctAnswer: 2,
      },

      {
        question:
          "What is the correct syntax to output 'Hello World' in Python?",
        options: [
          "echo 'Hello World'",
          "print('Hello World')",
          "console.log('Hello World')",
          "printf('Hello World')",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Which HTML element is used to define the title of a document?",
        options: ["<title>", "<head>", "<meta>", "<link>"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a valid CSS selector?",
        options: ["#id", ".class", "element", "#id.class", "All of the above"],
        correctAnswer: 4,
      },
      {
        question:
          "What is the purpose of the 'return' statement in a function?",
        options: [
          "To exit the function",
          "To return a value",
          "To define a function",
          "Both A and B",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which of the following is not a programming language?",
        options: ["Python", "Java", "HTML", "C++"],
        correctAnswer: 2,
      },
      {
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Application Program Interface",
          "Application Programming Interaction",
          "Application Program Interaction",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a front-end framework?",
        options: ["Django", "Flask", "Angular", "Spring"],
        correctAnswer: 2,
      },
      {
        question: "What is the default port for HTTP?",
        options: ["80", "443", "21", "25"],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is used to style web pages?",
        options: ["HTML", "CSS", "JavaScript", "All of the above"],
        correctAnswer: 1,
      },
      {
        question: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "JavaScript Online Notation",
          "Java Standard Object Notation",
          "JavaScript Object Name",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correctAnswer: 2,
      },
      {
        question: "What is the main purpose of a database?",
        options: [
          "To store data",
          "To process data",
          "To visualize data",
          "To analyze data",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a version control system?",
        options: ["Git", "GitHub", "Bitbucket", "All of the above"],
        correctAnswer: 0,
      },
      {
        question: "What is the correct way to create a function in JavaScript?",
        options: [
          "function myFunction()",
          "create myFunction()",
          "def myFunction()",
          "function: myFunction()",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["style", "class", "font", "styles"],
        correctAnswer: 0,
      },
      {
        question: "What is the purpose of the 'if' statement in programming?",
        options: [
          "To execute code conditionally",
          "To loop through code",
          "To define a function",
          "To declare a variable",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of the following is a popular JavaScript library?",
        options: ["jQuery", "Bootstrap", "Django", "Flask"],
        correctAnswer: 0,
      },
      {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: [
          "The global object",
          "The current object",
          "The parent object",
          "None of the above",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of the following is a CSS preprocessor?",
        options: ["Sass", "LESS", "Stylus", "All of the above"],
        correctAnswer: 3,
      },
      {
        question:
          "Which data structure is best for searching elements quickly?",
        options: ["Binary search tree", "Array", "Linked list", "Queue"],
        correctAnswer: 0,
      },
      {
        question: "What is the correct syntax for a JavaScript if statement?",
        options: [
          "if (condition) {}",
          "if condition {}",
          "if {} else",
          "if {condition}",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    category: "geography",
    questions: [
      {
        question: "Which is the longest river in the world?",
        options: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "South Korea", "Japan", "Thailand"],
        correctAnswer: 2,
      },
      {
        question: "What is the largest ocean in the world?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which country has the largest population in the world?",
        options: ["India", "China", "United States", "Indonesia"],
        correctAnswer: 1,
      },
      {
        question: "Which country is known for the Great Barrier Reef?",
        options: ["Australia", "United States", "South Africa", "New Zealand"],
        correctAnswer: 0,
      },
      {
        question: "Which is the smallest country in the world?",
        options: ["Monaco", "Liechtenstein", "Vatican City", "San Marino"],
        correctAnswer: 2,
      },
      {
        question: "Which is the tallest mountain in the world?",
        options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
        correctAnswer: 2,
      },
      {
        question: "What is the capital of Canada?",
        options: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
        correctAnswer: 0,
      },
      {
        question: "Which desert is the largest hot desert in the world?",
        options: [
          "Gobi Desert",
          "Atacama Desert",
          "Sahara Desert",
          "Karakum Desert",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which country is known as the Land of the Midnight Sun?",
        options: ["Sweden", "Finland", "Norway", "Denmark"],
        correctAnswer: 2,
      },
      {
        question: "What is the longest mountain range in the world?",
        options: ["Himalayas", "Rocky Mountains", "Andes", "Alps"],
        correctAnswer: 2,
      },
      {
        question: "Which river flows through Egypt?",
        options: [
          "Amazon River",
          "Yangtze River",
          "Nile River",
          "Ganges River",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which is the largest island in the world?",
        options: ["Greenland", "New Guinea", "Borneo", "Madagascar"],
        correctAnswer: 0,
      },
      {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Hong Kong"],
        correctAnswer: 2,
      },
      {
        question: "Which country has the most time zones?",
        options: ["United States", "Russia", "Canada", "Australia"],
        correctAnswer: 1,
      },
      {
        question: "Which country is known for the Eiffel Tower?",
        options: ["Germany", "Italy", "Spain", "France"],
        correctAnswer: 3,
      },
      {
        question: "Which is the most populous city in the world?",
        options: ["Tokyo", "Shanghai", "New York City", "Delhi"],
        correctAnswer: 0,
      },
      {
        question: "Which mountain range is located in South America?",
        options: [
          "Himalayas",
          "Rocky Mountains",
          "Appalachian Mountains",
          "Andes",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which continent is known as the 'Dark Continent'?",
        options: ["Asia", "Africa", "South America", "Europe"],
        correctAnswer: 1,
      },
      {
        question: "What is the capital of Brazil?",
        options: ["Buenos Aires", "Rio de Janeiro", "Brasília", "Sao Paulo"],
        correctAnswer: 2,
      },
      {
        question: "What is the official language of Brazil?",
        options: ["Spanish", "English", "Portuguese", "French"],
        correctAnswer: 2,
      },
      {
        question: "Which country has the most volcanoes?",
        options: ["Japan", "Indonesia", "United States", "Italy"],
        correctAnswer: 1,
      },
      {
        question: "Which city is known as the Big Apple?",
        options: ["Los Angeles", "New York City", "Chicago", "San Francisco"],
        correctAnswer: 1,
      },
      {
        question: "Which ocean is located to the east of Africa?",
        options: [
          "Indian Ocean",
          "Pacific Ocean",
          "Southern Ocean",
          "Atlantic Ocean",
        ],
        correctAnswer: 3,
      },
      {
        question: "Which is the second largest continent by area?",
        options: ["Asia", "Africa", "North America", "Europe"],
        correctAnswer: 1,
      },
    ],
  },
  {
    category: "mathematics",
    questions: [
      // Basic Arithmetic
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
      },
      {
        question: "What is 5 × 3?",
        options: ["15", "20", "25", "30"],
        correctAnswer: 0,
      },
      {
        question: "What is 100 ÷ 4?",
        options: ["20", "25", "30", "35"],
        correctAnswer: 1,
      },
      {
        question: "What is 9 - 3?",
        options: ["3", "5", "6", "7"],
        correctAnswer: 2,
      },
      {
        question: "What is 12 + 15?",
        options: ["25", "26", "27", "28"],
        correctAnswer: 2,
      },

      // Algebra
      {
        question: "Solve for x: 2x + 3 = 7",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
      },
      {
        question: "Solve for x: x² - 4 = 0",
        options: ["2", "-2", "±2", "4"],
        correctAnswer: 2,
      },
      {
        question: "Find the value of x if 3x = 9",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2,
      },
      {
        question: "If y = 2x and x = 3, find y",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1,
      },

      // Geometry
      {
        question: "What is the area of a square with side length 5?",
        options: ["10", "15", "20", "25"],
        correctAnswer: 3,
      },
      {
        question: "How many degrees are in a right angle?",
        options: ["45", "90", "120", "180"],
        correctAnswer: 1,
      },
      {
        question:
          "What is the perimeter of a rectangle with length 10 and width 4?",
        options: ["24", "28", "30", "32"],
        correctAnswer: 1,
      },
      {
        question:
          "What is the hypotenuse of a right triangle with sides 3 and 4?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 0,
      },

      // Trigonometry
      {
        question: "What is sin(30°)?",
        options: ["0.5", "0.866", "1", "0"],
        correctAnswer: 0,
      },
      {
        question: "What is cos(0°)?",
        options: ["0", "0.5", "1", "-1"],
        correctAnswer: 2,
      },
      {
        question: "What is tan(45°)?",
        options: ["0", "1", "√2", "undefined"],
        correctAnswer: 1,
      },
      {
        question: "What is sec(60°)?",
        options: ["1", "2", "√3", "2/√3"],
        correctAnswer: 2,
      },

      // Calculus
      {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "1"],
        correctAnswer: 1,
      },
      {
        question: "What is the integral of 2x?",
        options: ["x²", "2x²", "x² + C", "2x + C"],
        correctAnswer: 2,
      },
      {
        question: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
        correctAnswer: 0,
      },
      {
        question: "What is the limit of (1 + 1/n)ⁿ as n → ∞?",
        options: ["e", "1", "0", "∞"],
        correctAnswer: 0,
      },

      // Statistics & Probability
      {
        question: "What is the mean of [2, 4, 6, 8, 10]?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 2,
      },
      {
        question:
          "If a fair coin is flipped, what is the probability of getting heads?",
        options: ["1/4", "1/3", "1/2", "1"],
        correctAnswer: 2,
      },
      {
        question: "What is the mode of [1, 2, 2, 3, 4, 4, 4, 5]?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 3,
      },
      {
        question:
          "If you roll a six-sided die, what is the probability of rolling a 5?",
        options: ["1/2", "1/3", "1/6", "1/4"],
        correctAnswer: 2,
      },

      // More Complex Problems
      {
        question: "What is 15 × 14?",
        options: ["200", "210", "215", "220"],
        correctAnswer: 1,
      },
      {
        question: "What is 8³?",
        options: ["512", "216", "256", "128"],
        correctAnswer: 0,
      },
      {
        question: "What is 48 ÷ 6?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
      },
      {
        question: "What is the square root of 196?",
        options: ["12", "14", "16", "18"],
        correctAnswer: 1,
      },
      {
        question: "What is the cube root of 27?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
      },
      {
        question: "What is the factorial of 5?",
        options: ["60", "100", "120", "150"],
        correctAnswer: 2,
      },
      {
        question: "If a = 3 and b = 4, what is a² + b²?",
        options: ["9", "12", "16", "25"],
        correctAnswer: 3,
      },
      {
        question: "What is log₂ 8?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
      },
      {
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
      },
      {
        question: "What is 15 × 13?",
        options: ["180", "185", "195", "200"],
        correctAnswer: 2,
      },
      {
        question: "What is the value of 8³?",
        options: ["512", "216", "256", "128"],
        correctAnswer: 0,
      },
      {
        question: "What is 48 ÷ 6?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
      },
      {
        question: "What is the value of 3 + 5 × 4?",
        options: ["20", "22", "24", "23"],
        correctAnswer: 3,
      },
      {
        question: "What is the sum of the angles in a triangle?",
        options: ["180°", "360°", "90°", "270°"],
        correctAnswer: 0,
      },
      {
        question:
          "What is the perimeter of a square with a side length of 4 cm?",
        options: ["12 cm", "16 cm", "20 cm", "24 cm"],
        correctAnswer: 1,
      },
      {
        question: "What is 11²?",
        options: ["121", "131", "141", "111"],
        correctAnswer: 3,
      },
      {
        question: "What is 9 × 12?",
        options: ["105", "110", "108", "120"],
        correctAnswer: 2,
      },
      {
        question: "What is the value of 16 ÷ 4?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
      {
        question: "What is 25% of 200?",
        options: ["30", "40", "50", "60"],
        correctAnswer: 2,
      },
      {
        question:
          "What is the area of a rectangle with length 5 cm and width 8 cm?",
        options: ["40 cm²", "50 cm²", "55 cm²", "60 cm²"],
        correctAnswer: 0,
      },
      {
        question: "What is the value of 10 ÷ 2 + 3?",
        options: ["8", "7", "9", "6"],
        correctAnswer: 1,
      },
      {
        question: "What is 3 × 7 + 2?",
        options: ["20", "21", "22", "23"],
        correctAnswer: 1,
      },
      {
        question: "What is the greatest common divisor (GCD) of 24 and 36?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 3,
      },
      {
        question: "What is the least common multiple (LCM) of 6 and 8?",
        options: ["24", "32", "48", "56"],
        correctAnswer: 0,
      },
      {
        question: "What is the value of 2³ × 3?",
        options: ["12", "15", "18", "24"],
        correctAnswer: 0,
      },
      {
        question: "What is the value of 10 × (5 + 3)?",
        options: ["80", "70", "60", "50"],
        correctAnswer: 1,
      },
      {
        question: "What is the value of 14 × 14?",
        options: ["186", "196", "206", "216"],
        correctAnswer: 1,
      },
      {
        question: "What is the sum of the first 10 positive integers?",
        options: ["50", "55", "60", "65"],
        correctAnswer: 1,
      },
      {
        question: "What is 12 × 15?",
        options: ["150", "160", "170", "180"],
        correctAnswer: 3,
      },
      {
        question:
          "What is the area of a circle with a radius of 3 cm? (Use π = 3.14)",
        options: ["28.26 cm²", "31.42 cm²", "36.14 cm²", "39.14 cm²"],
        correctAnswer: 0,
      },
      {
        question: "What is the value of (8 + 2) × 3?",
        options: ["30", "32", "34", "28"],
        correctAnswer: 0,
      },
      {
        question: "What is the value of 50% of 80?",
        options: ["30", "35", "40", "45"],
        correctAnswer: 2,
      },
      {
        question: "What is the value of 25 ÷ 5 × 3?",
        options: ["12", "15", "18", "20"],
        correctAnswer: 1,
      },
    ],
  },
  {
    category: "entertainment",
    questions: [
      {
        question: "Who won the Academy Award for Best Actor in 2022?",
        options: [
          "Leonardo DiCaprio",
          "Will Smith",
          "Joaquin Phoenix",
          "Matthew McConaughey",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which movie won the Academy Award for Best Picture in 2021?",
        options: ["Parasite", "1917", "The Shape of Water", "Nomadland"],
        correctAnswer: 3,
      },
      {
        question:
          "Who played the character of Jack Dawson in the movie Titanic?",
        options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Tom Hanks"],
        correctAnswer: 0,
      },
      {
        question:
          "Which TV show featured the characters Daenerys Targaryen and Jon Snow?",
        options: ["Breaking Bad", "Game of Thrones", "The Witcher", "Vikings"],
        correctAnswer: 1,
      },
      {
        question: "Who is known as the 'King of Pop'?",
        options: [
          "Michael Jackson",
          "Prince",
          "Whitney Houston",
          "Elvis Presley",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which superhero is known for saying, 'I am Iron Man'?",
        options: ["Black Panther", "Captain America", "Thor", "Iron Man"],
        correctAnswer: 3,
      },
      {
        question:
          "Which movie franchise includes a character named Luke Skywalker?",
        options: [
          "Guardians of the Galaxy",
          "Star Wars",
          "The Matrix",
          "Star Trek",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Who played the character of Hermione Granger in the Harry Potter film series?",
        options: [
          "Emma Watson",
          "Anne Hathaway",
          "Maggie Smith",
          "Natalie Portman",
        ],
        correctAnswer: 0,
      },
      {
        question: "Who directed the movie 'Inception'?",
        options: [
          "James Cameron",
          "Steven Spielberg",
          "Christopher Nolan",
          "Martin Scorsese",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which artist released the album 'Lover' in 2019?",
        options: [
          "Billie Eilish",
          "Taylor Swift",
          "Ed Sheeran",
          "Ariana Grande",
        ],
        correctAnswer: 1,
      },
      {
        question: "What was the first video game to feature Mario?",
        options: [
          "Mario Kart",
          "Super Mario Bros.",
          "Donkey Kong",
          "The Legend of Zelda",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Which movie features the famous line, 'Here's looking at you, kid'?",
        options: [
          "Casablanca",
          "Citizen Kane",
          "The Godfather",
          "Gone with the Wind",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which country won the FIFA World Cup in 2018?",
        options: ["France", "Germany", "Argentina", "Brazil"],
        correctAnswer: 0,
      },
      {
        question: "Who created the comic book character Spider-Man?",
        options: ["Jack Kirby", "Stan Lee", "Steve Ditko", "John Romita"],
        correctAnswer: 1,
      },
      {
        question: "In which movie did Heath Ledger portray the Joker?",
        options: [
          "The Dark Knight",
          "Batman Begins",
          "The Dark Knight Rises",
          "Joker",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which band is known for the hit song 'Bohemian Rhapsody'?",
        options: ["The Rolling Stones", "Led Zeppelin", "Queen", "The Beatles"],
        correctAnswer: 2,
      },
      {
        question:
          "Which actress starred as Katniss Everdeen in 'The Hunger Games'?",
        options: [
          "Kristen Stewart",
          "Shailene Woodley",
          "Jennifer Lawrence",
          "Emma Stone",
        ],
        correctAnswer: 2,
      },
      {
        question: "Who played the role of the Joker in the 2019 movie 'Joker'?",
        options: [
          "Heath Ledger",
          "Johnny Depp",
          "Joaquin Phoenix",
          "Jared Leto",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Which Disney animated film features the song 'A Whole New World'?",
        options: [
          "Cinderella",
          "Aladdin",
          "Beauty and the Beast",
          "The Little Mermaid",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Which TV series features the characters of Walter White and Jesse Pinkman?",
        options: ["Narcos", "Better Call Saul", "The Sopranos", "Breaking Bad"],
        correctAnswer: 3,
      },
      {
        question: "Who sang the hit song 'Shape of You'?",
        options: ["Justin Bieber", "Ariana Grande", "Sam Smith", "Ed Sheeran"],
        correctAnswer: 3,
      },
      {
        question: "Which film won the Academy Award for Best Picture in 2020?",
        options: [
          "The Irishman",
          "Once Upon a Time in Hollywood",
          "Parasite",
          "1917",
        ],
        correctAnswer: 2,
      },
      {
        question: "What year did the movie 'The Matrix' release?",
        options: ["1997", "1998", "2000", "1999"],
        correctAnswer: 3,
      },
      {
        question:
          "Which actor played Tony Stark/Iron Man in the Marvel Cinematic Universe?",
        options: [
          "Mark Ruffalo",
          "Chris Evans",
          "Robert Downey Jr.",
          "Chris Hemsworth",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which singer is known as the 'Queen of Pop'?",
        options: ["Mariah Carey", "Lady Gaga", "Whitney Houston", "Madonna"],
        correctAnswer: 3,
      },
    ],
  },
];
