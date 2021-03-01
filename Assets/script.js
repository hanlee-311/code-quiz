var quizButton = document.querySelector('#start');
var displayedQuestion = document.querySelector('.quiz-container');
var hideStartScreen = document.querySelector('#start-up-screen');
var questionElement = document.querySelector('.quiz-question');
var answerElement = document.querySelector('.answer-button');
var highScore = [];
var quizQuestions = [{question: "A very useful tool to help with debugging and printing content to the debugger is the: ",
choices: ["Console Log", "Terminal", "Ice Cream", "Javascript"], 
correct: "Console Log"
}];
let shuffleQuestions, currentQuestionIndex;

function startQuiz() {
    console.log("Quiz Started!");
    hideStartScreen.classList.add('hide');
    displayedQuestion.classList.remove('hide');
    shuffleQuestions = quizQuestions.sort(() => Math.random () - .5);
    currentQuestionIndex = 0;
    nextQuestion();
};

function nextQuestion() {
    console.log("Next Question");
    generateQuestion (shuffleQuestions[currentQuestionIndex]);
    
};

function generateQuestion (question) {
    console.log("Generating Question");
    questionElement.innerHTML = question.question;
}

//Start the quiz by pressing the button
quizButton.addEventListener("click",  startQuiz)