let currentPhase = 1;
let currentRound = 1;
let roundScore = 0;
let playerScore = 0;
let currentDieRoll = 0;

let canRoll = true;

let NUMBER_OF_PHASES = 4;
let NUMBER_OF_ROUNDS = 10;

let currentPhaseDisplay = document.querySelector("#current-phase");
let currentRoundDisplay = document.querySelector("#current-round");
let currentDieRollDisplay = document.querySelector("#current-die-roll");
let roundScoreDisplay = document.querySelector("#current-round-score");
let playerScoreDisplay = document.querySelector("#player-score");
let stopButton = document.querySelector("#out");
let continueButton = document.querySelector("#in");

function endGame() {

}

function incrementRoundScore() {
    switch (currentDieRoll) {
        case "1":
            if (currentPhase >= 3) {
                roundScore += 100;
            } else {
                roundScore += 1;
            }
        case "2":
            if (currentPhase === 4) {
                roundScore *= 2;
            } else {
                roundScore += 2;
            }
        case "3": roundScore += 3;
        case "4": 
            roundScore = 0;
            stop();
        case "5":
            if (currentPhase >= 3) {
                roundScore += 50;
            } else {
                roundScore += 5;
            }
        case "6": roundScore += 6;
    }
    console.log(roundScore);
    canRoll = false;
}

function stop() {
    playerScore += roundScore;
    roundScore = 0;
    if (currentRound === NUMBER_OF_ROUNDS) {
        if (currentPhase === NUMBER_OF_PHASES) {
            endGame();
        } else {
            currentRound = 0;
            currentPhase++;
        }
    } else {
        currentRound++;
    }
    canRoll = true;
}

function stayIn() {
    canRoll = true;
}

document.querySelectorAll(".die-face-value").forEach((button) => (button.addEventListener("click", function () {
    if (canRoll) {
        let thisRoll = button.id.slice(-1);
        currentDieRoll = thisRoll;
        incrementRoundScore();
    }
})));

stopButton.addEventListener("click", function () {
    stop();
});

continueButton.addEventListener("click", function () {
    stayIn();
});

function updateScreen() {
    currentPhaseDisplay.textContent = currentPhase;currentRoundDisplay.textContent = currentRound;currentDieRollDisplay.textContent = currentDieRoll;
    roundScoreDisplay.textContent = roundScore;playerScoreDisplay.textContent = playerScore;
}


updateScreen();
//setInterval(updateScreen, 1);