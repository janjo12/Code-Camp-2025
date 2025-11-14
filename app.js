let currentPhase = 1;
let currentRound = 1;
let roundScore = 0;
let playerScore = 0;
let currentDieRoll = 0;
let roundScores = [0]; //starting score is 0
let numberOfRounds = 10;

let NUMBER_OF_PHASES = 4;

let currentPhaseDisplay = document.querySelector("#current-phase");
let currentRoundDisplay = document.querySelector("#current-round");
let roundScoreDisplay = document.querySelector("#current-round-score");
let playerScoreDisplay = document.querySelector("#player-score");
let undoButton = document.querySelector("#undo");
let stopButton = document.querySelector("#stop");

function endGame() {

}

function incrementRoundScore() {
    let roundScoreIncrease = 0;
    switch (currentDieRoll) {
        case "1":
            if (currentPhase >= 3) {
                roundScoreIncrease = 100;
            } else {
                roundScoreIncrease = 1;
            }
            break;
        case "2":
            if (currentPhase === 4) {
                roundScoreIncrease = roundScore;
            } else {
                roundScoreIncrease = 2;
            }
            break;
        case "3": 
            roundScoreIncrease = 3;
            break;
        case "4": 
            roundScore = 0;
            roundScores.push(roundScore);
            stop();
            return;
        case "5":
            if (currentPhase >= 2) {
                roundScoreIncrease= 50;
            } else {
                roundScoreIncrease = 5;
            }
            break;
        case "6": roundScoreIncrease = 6;
    }
    roundScore += roundScoreIncrease;
    roundScores.push(roundScore);
    console.log(roundScores);
}

function undo() {
    if (roundScores.length > 1) {
        if (roundScores[roundScores.length - 1] === 0) {
            if (currentRound === 1) {
                currentPhase--;
                currentRound = numberOfRounds;
            } else {
                currentRound--;
            }
            if (roundScores[roundScores.length - 2] === 0) {
                roundScores.pop(); //intentional; you should need to pop() twice total in this function for this condition
            } else {
                playerScore -= roundScores[roundScores.length - 2];
            }
        }
        roundScores.pop();
        roundScore = roundScores[roundScores.length - 1];
    }
    console.log(roundScores);
}

function stop() {
    playerScore += roundScore;
    roundScore = 0;
    roundScores.push(roundScore);
    if (currentRound === numberOfRounds) {
        if (currentPhase === numberOfPhases) {
            endGame();
        } else {
            currentRound = 0;
            currentPhase++;
        }
    } else {
        currentRound++;
    }
    console.log(roundScores);
}

undoButton.addEventListener("click", function () {
    undo();
});

stopButton.addEventListener("click", function () {
    stop();
});

document.querySelectorAll(".die-face-value").forEach((button) => (button.addEventListener("click", function () {
    let thisRoll = button.id.slice(-1);
    currentDieRoll = thisRoll;
    incrementRoundScore();
})));

function updateScreen() {
    currentPhaseDisplay.textContent = currentPhase;
    currentRoundDisplay.textContent = currentRound;
    roundScoreDisplay.textContent = roundScore;
    playerScoreDisplay.textContent = playerScore;
}

setInterval(updateScreen, 1);