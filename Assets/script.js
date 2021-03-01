var quizButton = document.querySelector('#start');
var submitBtn = document.querySelector(".submit-btn");
var resetBtn = document.querySelector(".restart-btn");
var returnBtn = document.querySelector(".return-btn");
var endScreen = document.querySelector('.end-screen'); 
var viewHighScores = document.querySelector('.high-score');
var highScoreContainer = document.querySelector('.high-score-container');
var highScoreScreen = document.querySelector('.restart-screen');
var displayedQuestion = document.querySelector('.quiz-container');
var hideStartScreen = document.querySelector('#start-up-screen');
var questionElement = document.querySelector('.quiz-question');
var answerElement = document.querySelector('.answer-button');
var timeEl = document.querySelector(".time");
var secondsLeft = 5;
var highScore = [];
let shuffleQuestions, currentQuestionIndex;

//Populating the page with the quiz after starting and randomizes the order
function startQuiz() {
    setTime();
    hideStartScreen.classList.add('hide');
    displayedQuestion.classList.remove('hide');
    shuffleQuestions = quizQuestions.sort(() => Math.random () - .5);
    currentQuestionIndex = 0;
    nextQuestion();
};

//Set the next question
function nextQuestion() {
    resetState();
    generateQuestion (shuffleQuestions[currentQuestionIndex]);
    
};

//Takes a question from the question array and corresponding answers
function generateQuestion (question) {
    console.log(currentQuestionIndex + " current question index");
    questionElement.innerHTML = question.question;
    question.choices.forEach(answer => {
        const button = document.createElement('button'); 
        button.innerText = answer.text;
        button.classList.add('btn-dark', 'btn');
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
    if (shuffleQuestions.length > currentQuestionIndex) {
        nextQuestion();
    } else {
        endQuiz();
    }
}

function setStatusClass (element, correct) {
    if (correct) {
        element.classList.add('correct');
        console.log('correct!');
        currentQuestionIndex++;
        nextQuestion();
    } else {
        console.log('wrong!');
    }
}

//Removes the previous question's buttons
function resetState () {
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

//Button Navigation functions

//Populates page with end screen
function endQuiz () {
    endScreen.classList.remove('hide');
    displayedQuestion.classList.add('hide');
}

//Populates page with highscore screen
function restartScreen () {
    highScoreScreen.classList.remove('hide');
    endScreen.classList.add('hide');

}

//Populates page with start screen
function startScreen () {
    hideStartScreen.classList.remove('hide');
    highScoreScreen.classList.add('hide');
    highScoreContainer.classList.add('hide');
    timeEl.textContent = "Time: 50";
    secondsLeft = 50;
}

//Populates page with highscores
function allHighScores () {
    hideStartScreen.classList.add('hide');
    highScoreScreen.classList.add('hide');
    endScreen.classList.add('hide');
    highScoreContainer.classList.remove('hide');
    displayedQuestion.classList.add('hide');
}

//Button actions

//Start the quiz by pressing the start button
quizButton.addEventListener("click",  startQuiz);

//Submit Initials button
submitBtn.addEventListener('click', restartScreen);

//Restart button
resetBtn.addEventListener('click', startScreen);

//Highscore link
viewHighScores.addEventListener('click', allHighScores);

//Return button
returnBtn.addEventListener('click', startScreen);

//Timer
function setTime() {
    timeEl.classList.remove('hide');
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft ===0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

var quizQuestions = [
    {question: "A very useful tool to help with debugging and printing content to the debugger is the:",
    choices: [
        {text: "1. Console Log", correct: true}, 
        {text: "2. Terminal", correct: false}, 
        {text: "3. Ice Cream", correct: false}, 
        {text: "4. Javascript", correct: false}
    ]},

    {question: "Commonly used data types DO NOT include:",
    choices: [
        {text: "1. Boolean", correct: true}, 
        {text: "2. Strings", correct: false}, 
        {text: "3. Alerts", correct: false}, 
        {text: "4. Numbers", correct: false}
    ]},

    {question: "blah:",
    choices: [
        {text: "1. Boolean", correct: true}, 
        {text: "2. Strings", correct: false}, 
        {text: "3. Alerts", correct: false}, 
        {text: "4. Numbers", correct: false}
    ]},

    {question: "blag:",
    choices: [
        {text: "1. Boolean", correct: true}, 
        {text: "2. Strings", correct: false}, 
        {text: "3. Alerts", correct: false}, 
        {text: "4. Numbers", correct: false}
    ]}
];