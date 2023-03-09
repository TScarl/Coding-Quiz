var startQuizEl = document.querySelector(".start-btn");
var startScreenEl = document.querySelector(".start-screen");
var highScoresEl = document.querySelector(".scores");
var timerEl = document.querySelector(".timer-display");
var questionContainer = document.querySelectorAll(".question-container");
var answerFeedback = document.querySelectorAll(".answer-feedback");


//setting the time to 15 seconds per question. setting index to start at 0;
var time = questionContainer.length * 15;
var timer;
var currentQuestionIndex = 0;

//removes the answers from below the questions
answerFeedback.forEach((feedback) => {
    feedback.textContent = "";
});


startQuizEl.addEventListener("click", function () {
    console.log("you hit my button!");

    //hides the start screen
    startScreenEl.setAttribute("class", "hide");

    //shows the timer and sets each second to be 1000 milliseconds
    timer = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    //begins showQuestion function (using the index, which already starts at 0)
    showQuestion(currentQuestionIndex);
    //begins the clockTick function
    clockTick()
});

function showQuestion(index) {
    //sets the current questions displayed to the 1st question in the questionContainer array
    var currentQuestion = questionContainer[index];

    //this uses the index to set the container for the current question to active, and only display one question as active at a time
    questionContainer.forEach((container, i) => {
        if (i === index) {
            container.classList.add("active");
        } else {
            container.classList.remove("active");
        }
    });

    //allows the user to click any of the multiple choices for their answer
    var answerList = currentQuestion.querySelectorAll(".choices-list li");
    answerList.forEach(answer => {
        answer.addEventListener("click", function (event) {

            //passes event, currentQuestion and answerList to the handleAnswerClick function
            handleAnswerClick(event, currentQuestion, answerList)
        });
    });
};

function handleAnswerClick(event, currentQuestion, answerList) {
    console.log("You clicked a li from the choices-list!");
    event.preventDefault()

    //if a choice with "correct-answer" as a class is clicked it will be a correct answer, if not it is a wrong answer
    if (event.target.classList.contains("correct-answer")) {
        answerFeedback[currentQuestionIndex].textContent = "Correct!";
        time += 5;
        timerEl.textContent = time;
    } else {
        answerFeedback[currentQuestionIndex].textContent = "Wrong!";
        time -= 5;
        timerEl.textContent = time;
    }

    //pushes question to the next question until there are no more questions and then endGame function begins
    currentQuestionIndex++;
    if (currentQuestionIndex < questionContainer.length) {
        showQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

//makes timer count downward, displays the time/score, and ends game if time reaches 0 or questions are finished. begins endGame function
function clockTick() {
    time--;
    timerEl.textContent = time
    if (time <= 0 || currentQuestionIndex === questionContainer.length) {
        endGame();
    }
}

function endGame() {
    //stops the timer
    clearInterval(timer);
    //last question wasn't already having "active" class removed, so had to create this line
    var questionContainer5 = document.querySelector("#question-container-5");
    questionContainer5.classList.remove("active");

    //shows the final page where insert your initials are see your score.
    var finalPage = document.querySelector(".submit-score");
    finalPage.classList.add("active");

    var submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var initialsEl = document.querySelector(".initials").value;

        //score is not pushed to localStorage if there are no initials
        if (initialsEl !== "") {

            //turns the time into your score
            var scoreEl = time;

            //retreives or creates an array which will be sent to localStorage
            var scores = JSON.parse(localStorage.getItem("scores")) || [];

            //newScore is an object which get sent to localStorage to join into the scores array
            var newScore = {
                id: Date.now(),
                initials: initialsEl,
                score: scoreEl
            };

            //pushes newScore to localStorage
            scores.push(newScore);

            //turns scores into a string so it can be sent to localStorage
            localStorage.setItem("scores", JSON.stringify(scores));

            var finalScoreEl = document.querySelector(".final-score");
            finalScoreEl.textContent = time;

            finalPage.textContent = ""

            var scoreHistoryEl = document.querySelector(".score-history");
            scoreHistoryEl.textContent = "";

            //was supposed to display scores in an ordered list in the highscores.html
            scores.forEach(function (score) {
                var scoreItem = document.createElement("li");
                scoreItem.textContent = score.initials + " - " + score.score;
                scoreHistoryEl.appendChild(scoreItem);
            });
        }
    });
    scoreBoard();
}

//this function doesn't actually display very well... not sure why
function scoreBoard() {

    //creates an ol named scoreList which is meant to display the scores
    var scoreList = document.querySelector(".score-list")
    scoreList = document.createElement("ol");

    //creates li to display each score in the scoreList
    scores.forEach(function (score) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = score.initials + " - " + score.score;
        scoreList.appendChild(scoreItem);
    });

    //supposed to display the scoreList to the highScore tab... 
    var highScoresEl = document.querySelector(".scores");
    highScoresEl.textContent = "";
    highScoresEl.appendChild(scoreList);
}

//is supposed to restart quiz... never worked and now button is displaying anyways...
function restartQuiz() {
    //hides finalPage and displays startScreen
    finalPage.classList.remove("active");
    startScreenEl.classList.add("active");

    //makes replay button clickable to restart quiz
var replayBtn = document.querySelector(".replay");
replayBtn.addEventListener("click", function () {
    console.log("you clicked replay");
    restartQuiz();
});
};


    // restart the game with full time
    time = questionContainer.length * 15;
    //restart the index to 0
    currentQuestionIndex = 0;
    //restart the display of time
    timerEl.textContent = time;