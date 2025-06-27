document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            type: "multiple-choice",
            question: "Which language is used for structuring content on the web?",
            options: ["CSS", "JavaScript", "HTML", "Python"],
            correctAnswer: "HTML"
        },
        {
            type: "fill-in-the-blank",
            question: "______ is used for styling web pages.",
            correctAnswer: "CSS"
        },
        {
            type: "multiple-choice",
            question: "Which of the following is NOT a JavaScript framework/library?",
            options: ["React", "Angular", "Vue.js", "Django"],
            correctAnswer: "Django"
        },
        {
            type: "multiple-choice",
            question: "Which HTTP method is typically used to retrieve data from a server?",
            options: ["POST", "PUT", "GET", "DELETE"],
            correctAnswer: "GET"
        },
        {
            type: "multiple-choice",
            question: "Which tag is used to create a hyperlink in HTML?",
            options: ["<hyperlink>", "<href>", "<link>", "<a>"],
            correctAnswer: "<a>"
        },
        {
            type: "multiple-choice",
            question: "Which property is used to change the background color of an element in CSS?",
            options: ["color", "background-image", "background-color", "text-color"],
            correctAnswer: "background-color"
        },
        {
            type: "fill-in-the-blank",
            question: "JavaScript can be used to make web pages ______.",
            correctAnswer: "interactive"
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];

    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    const quizBox = document.getElementById('quiz-box');
    const questionContainer = document.getElementById('question-container');
    const quizResults = document.getElementById('quiz-results');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const scoreSummary = document.getElementById('score-summary');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        feedbackMessage.classList.remove('show', 'correct', 'incorrect');
        submitAnswerBtn.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
        submitAnswerBtn.disabled = false;

        if (currentQuestion.type === "multiple-choice") {
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-btn');
                button.textContent = option;
                button.addEventListener('click', () => selectOption(button));
                optionsContainer.appendChild(button);
            });
        } else if (currentQuestion.type === "fill-in-the-blank") {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('fill-in-blank-input');
            input.placeholder = 'Type your answer here...';
            optionsContainer.appendChild(input);
            input.focus();
        }
    }

    function selectOption(selectedButton) {
        const currentOptions = optionsContainer.querySelectorAll('.option-btn');
        currentOptions.forEach(btn => btn.classList.remove('selected'));
        selectedButton.classList.add('selected');
        submitAnswerBtn.disabled = false;
    }

    function checkAnswer() {
        const currentQuestion = questions[currentQuestionIndex];
        let isCorrect = false;
        let userAnswer = '';

        if (currentQuestion.type === "multiple-choice") {
            const selectedOption = optionsContainer.querySelector('.option-btn.selected');
            if (selectedOption) {
                userAnswer = selectedOption.textContent;
                if (userAnswer === currentQuestion.correctAnswer) {
                    isCorrect = true;
                }
            }
            const allOptions = optionsContainer.querySelectorAll('.option-btn');
            allOptions.forEach(btn => {
                btn.disabled = true;
                if (btn.textContent === currentQuestion.correctAnswer) {
                    btn.classList.add('correct');
                } else if (btn.classList.contains('selected')) {
                    btn.classList.add('incorrect');
                }
            });

        } else if (currentQuestion.type === "fill-in-the-blank") {
            const inputField = optionsContainer.querySelector('.fill-in-blank-input');
            if (inputField) {
                userAnswer = inputField.value.trim();
                if (userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
                    isCorrect = true;
                }
                inputField.disabled = true;
                inputField.style.borderColor = isCorrect ? 'var(--accent-color)' : 'var(--danger-color)';
                inputField.style.boxShadow = isCorrect ? '0 0 10px rgba(138, 255, 138, 0.7)' : '0 0 10px rgba(255, 107, 107, 0.7)';
            }
        }

        if (isCorrect) {
            score++;
            feedbackMessage.textContent = "Correct!";
            feedbackMessage.classList.add('correct');
        } else {
            feedbackMessage.textContent = `Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`;
            feedbackMessage.classList.add('incorrect');
        }
        feedbackMessage.classList.add('show');

        userAnswers.push({
            question: currentQuestion.question,
            userAnswer: userAnswer,
            correctAnswer: currentQuestion.correctAnswer,
            isCorrect: isCorrect
        });

        submitAnswerBtn.style.display = 'none';
        nextQuestionBtn.style.display = 'block';
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        questionContainer.style.display = 'none';
        quizResults.style.display = 'block';
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = questions.length;
        scoreSummary.style.display = 'none';
    }

    function renderScoreSummary() {
        scoreSummary.innerHTML = '';
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        quizResults.style.display = 'none';
        questionContainer.style.display = 'block';
        scoreSummary.style.display = 'block';
        loadQuestion();
    }

    submitAnswerBtn.addEventListener('click', checkAnswer);
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    restartQuizBtn.addEventListener('click', restartQuiz);

    loadQuestion();
});
