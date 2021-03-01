var quizButton = document.querySelector('#start');
var displayedQuestion = document.querySelector('.quiz-container');
var hideStartScreen = document.querySelector('#start-up-screen');
var highScore = [];
var quizQuestions = [{"question": "A very useful tool to help with debugging and printing content to the debugger is the: ",
"choices": ["Console Log", "Terminal", "Ice Cream", "Javascript"], 
"correct": "Console Log"
}];

function startQuiz() {
    console.log("Quiz Started!");
    hideStartScreen.classList.add('hide');
    displayedQuestion.classList.remove('hide');
    generateQuestion();
};

function generateQuestion() {
    console.log("Generating Question");
    
    
};

//Start the quiz by pressing the button
quizButton.addEventListener("click",  startQuiz)