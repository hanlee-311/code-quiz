var quizButton = document.querySelector('#start');
var endScreen = document.querySelector('.end-screen'); 
var displayedQuestion = document.querySelector('.quiz-container');
var hideStartScreen = document.querySelector('#start-up-screen');
var questionElement = document.querySelector('.quiz-question');
var answerElement = document.querySelector('.answer-button');
var timeEl = document.querySelector(".time");
var secondsLeft = 50;
var highScore = [];
let shuffleQuestions, currentQuestionIndex;

//Populating the page with the quiz after starting and randomizes the order
function startQuiz() {
    console.log("Quiz Started!");
    setTime();
    hideStartScreen.classList.add('hide');
    displayedQuestion.classList.remove('hide');
    shuffleQuestions = quizQuestions.sort(() => Math.random () - .5);
    currentQuestionIndex = 0;
    nextQuestion();
};

//Set the next question
function nextQuestion() {
    console.log("Next Question");
    generateQuestion (shuffleQuestions[currentQuestionIndex]);
    
};

//Takes a question from the question array and corresponding answers
function generateQuestion (question) {
    console.log("Generating Question");
    console.log(currentQuestionIndex);
    questionElement.innerHTML = question.question;
    question.choices.forEach(answer => {
        const button = document.createElement('button'); 
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        };
        button.addEventListener('click', selectAnswer);
        answerElement.appendChild(button);
    })
}

function selectAnswer (e) {
    const selectedButton = e.target;
    const correctAnswer = selectedButton.dataset.correct;
    setStatusClass(document.body, correctAnswer);
    Array.from(answerElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correctAnswer);
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextQuestion();
    } else {
        endScreen.classList.add('hide');
    }
}

function setStatusClass (element, correct) {
    if (correct) {
        element.classList.add('correct');
        console.log('correct!');
        currentQuestionIndex++;
        console.log(currentQuestionIndex);
    } 
}

//Timer
function setTime() {
    timeEl.classList.remove('hide');
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left.";
        // generateRandomWord();

        if(secondsLeft ===0) {
            clearInterval(timerInterval);
            sendmessage();
        }
    }, 1000);
}


//Start the quiz by pressing the start button
quizButton.addEventListener("click",  startQuiz)

var quizQuestions = [
    {question: "A very useful tool to help with debugging and printing content to the debugger is the:",
    choices: [
        {text: "Console Log", correct: true}, 
        {text: "Terminal", correct: false}, 
        {text: "Ice Cream", correct: false}, 
        {text: "Javascript", correct: false}
    ]},

    {question: "Commonly used data types DO NOT include:",
    choices: [
        {text: "Boolean", correct: true}, 
        {text: "Strings", correct: false}, 
        {text: "Alerts", correct: false}, 
        {text: "Numbers", correct: false}
    ]}
];