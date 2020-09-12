var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;

// Staarting timer and changing landing screen to quiz questions
function startTimer() {
    
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // Timer is set and begins 90s countdown
    setTimer();
    // Get questions to display at the same time
    makeQuestions();
}

// Set timer function referenced in the start timer function
function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);

}

// Grab questions referenced in the start timer function
function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-primary btn-block");
    }
}

// Display option to log score and name to the scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
}

// Function adding scores 
function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // Create new object with name and score
var newScore = {
        name: userNameInput,
        score: secondsLeft,
    };
    // Get any local scores
    // If none available then create 
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // Push object into score array
    highScores.push(newScore)
    // Turn objects into an array of strings then put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

}

// Button event listeners
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscores.html'
});

function hideFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.style.display='none'
}

function showFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("feedback")[0]
    
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {   
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback,1000);
        showFeedback();   
    } else {
        pEl.innerHTML = "Sorry, that's incorrect.";
        setTimeout(hideFeedback,1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }    
    makeQuestions();
});