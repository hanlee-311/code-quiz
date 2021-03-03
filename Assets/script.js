var quizButton = document.querySelector('#start');
var submitBtn = document.querySelector(".submit-btn");
var resetBtn = document.querySelector(".restart-btn");
var returnBtn = document.querySelector(".return-btn");
var endScreen = document.querySelector('.end-screen'); 
var viewHighScores = document.querySelector('.high-score');
var highScoreContainer = document.querySelector('.high-score-container');
var highScoreList = document.querySelector('.user-high-score');
var highScoreScreen = document.querySelector('.restart-screen');
var highScoreForm = document.querySelector('#input');
var userInitialsInput = document.querySelector('.user-initials');
var displayedQuestion = document.querySelector('.quiz-container');
var hideStartScreen = document.querySelector('#start-up-screen');
var questionElement = document.querySelector('.quiz-question');
var answerElement = document.querySelector('.answer-button');
var timeEl = document.querySelector(".time");
var timeVariable;
var secondsLeft = 75;
var score = 0;
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
        button.classList.add('btn-dark', 'btn', 'btn-padding');
        // if (answer.correct) {
            button.dataset.correct = answer.correct
        // };

        button.addEventListener('click', guessAnswer);
        answerElement.appendChild(button);
    })
}

//Action upon selecting an answer
function guessAnswer (e) {
    console.log('Answer selected');
    // get the button from the event
    const selectedButton = e.target;
    console.log(e.target);
    // pull out the boolean represntinv if its true or not
    const correctAnswer = selectedButton.dataset.correct;
    console.log(correctAnswer);
    // check if its correct
    checkIfCorrect(correctAnswer);
    if (currentQuestionIndex < 10) {
        setTimeout(function () {
        nextQuestion();}, 1000);
    } else {
        setTimeout(function () {
        endQuiz();}, 1000);
    }
   
}

function checkIfCorrect (correct) {
    if (correct == 'true') {
        // add to the score
        score = score + secondsLeft - 5;
        userRight();
        console.log('correct!');
    } else {
        console.log('wrong!');
        //Subtract Time
        secondsLeft = secondsLeft - 10;
        userWrong();
    }
    currentQuestionIndex++;
}

//Removes the previous question's buttons
function resetState () {
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

//Informs the user if the answer was right
function userRight () {
    document.getElementById("right-or-wrong").innerHTML = "Correct!"
};

//Informs the user if the answer was wrong
function userWrong () {
    document.getElementById("right-or-wrong").innerHTML = "Wrong!"
};

//Button Navigation functions

//Populates page with end screen
function endQuiz () {
    endScreen.classList.remove('hide');
    displayedQuestion.classList.add('hide');
    stopTimer();
    document.getElementById("final-score").innerHTML = "Your final score is " + score + ".";
}

//Populates page with highscore screen
function restartScreen (event) {
    event.preventDefault();
    highScoreScreen.classList.remove('hide');
    endScreen.classList.add('hide');
    storeHighScores();
}

//Populates page with start screen
function startScreen () {
    hideStartScreen.classList.remove('hide');
    highScoreScreen.classList.add('hide');
    highScoreContainer.classList.add('hide');
    timeEl.textContent = "Time: 75";
    secondsLeft = 75;
}

//Populates page with highscores
function allHighScores () {
    hideStartScreen.classList.add('hide');
    highScoreScreen.classList.add('hide');
    endScreen.classList.add('hide');
    highScoreContainer.classList.remove('hide');
    displayedQuestion.classList.add('hide');
    stopTimer();
}

//Generating the highscore list
//Highscore related variables
var highScores = [];


// Storing highscores
function storeHighScores () {
    localStorage.setItem("highscore", JSON.stringify(highScores));
    console.log("Stored " + score);
};

//Renders the highscores as <li> elements
function renderHighScores () {
    highScoreList.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var highScore = highScores[i];

        var li = document.createElement("li");
        li.textContent = highScore;
        li.setAttribute("data-index", i);

        highScoreList.appendChild(li);
        console.log("new high score created!");
    }
};

//Submit event for userInitials
highScoreForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var userInitialsText = userInitialsInput.value.trim();

    if (userInitialsText === "") {
        return;
    }

    highScores.push(userInitialsText);
    userInitialsInput.value = "";

    storeHighScores();
    renderHighScores();
    console.log("submitted initials!");
});

//Call function from the bottom of page when page loads 
function init() {
    var storedHighScores = JSON.parse(localStorage.getItem("highscore"));

    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    renderHighScores();
};

//Button actions

//Start the quiz by pressing the start button
quizButton.addEventListener("click", startQuiz);

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
    timeVariable = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft ===0) {
            stopTimer();
            endQuiz();
        } 
    }, 1000);
}

function stopTimer () {
    clearInterval(timeVariable);
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
        {text: "1. Boolean", correct: false}, 
        {text: "2. Strings", correct: false}, 
        {text: "3. Alerts", correct: true}, 
        {text: "4. Numbers", correct: false}
    ]},

    {question: "When you want something to be strictly true, the operator to be used is:",
    choices: [
        {text: "1. ==", correct: false}, 
        {text: "2. =", correct: false}, 
        {text: "3. !=", correct: false}, 
        {text: "4. ===", correct: true}
    ]},

    {question: "Which of the following is NOT a looping structure in Javascript?",
    choices: [
        {text: "1. During", correct: true}, 
        {text: "2. For", correct: false}, 
        {text: "3. While", correct: false}, 
        {text: "4. Do-while", correct: false}
    ]},

    {question: "What is the result of 4 + 6 + '5' based on Javascript rules?",
    choices: [
        {text: "1. 15", correct: false}, 
        {text: "2. 105", correct: true}, 
        {text: "3. 25", correct: false}, 
        {text: "4. Undefined", correct: false}
    ]},

    {question: "The following are types of Pop up boxes in Javascript EXCEPT:",
    choices: [
        {text: "1. Alert", correct: false}, 
        {text: "2. Confirm", correct: false}, 
        {text: "3. Prompt", correct: false}, 
        {text: "4. For", correct: true}
    ]},

    {question: "Which of the following is a string?",
    choices: [
        {text: "1. 20", correct: false}, 
        {text: "2. '20'", correct: true}, 
        {text: "3. [20, '20', Twenty]", correct: false}, 
        {text: "4. None of these", correct: false}
    ]},

    {question: "What must you use to make an array?",
    choices: [
        {text: "1. [ ]", correct: true}, 
        {text: "2. ' '", correct: false}, 
        {text: "3. { }", correct: false}, 
        {text: "4. ( )", correct: false}
    ]},

    {question: "If you want to make a comment in Javascript, you would use:",
    choices: [
        {text: "1. <!-- -->", correct: false}, 
        {text: "2. /*", correct: false}, 
        {text: "3. //", correct: true}, 
        {text: "4. ''", correct: false}
    ]},

    {question: "100 is a type of:",
    choices: [
        {text: "1. Integer", correct: true}, 
        {text: "2. String", correct: false}, 
        {text: "3. Array", correct: false}, 
        {text: "4. Century", correct: false}
    ]}
];

init()