let currentPhase = 1;
let currentRound = 1;
let roundScore = 0;
let playerScore = 0;
let currentDieRoll = 0;
let numberOfPhases = 4;
let numberOfRounds = 10;

/*
console.log(sessionStorage.getItem("roundCount"));

let numberOfRounds = Number(sessionStorage.getItem("roundCount"));

console.log(numberOfRounds);
*/

let currentPhaseDisplay = document.querySelector("#current-phase");
let currentRoundDisplay = document.querySelector("#current-round");
let currentDieRollDisplay = document.querySelector("#die-roll");
let roundScoreDisplay = document.querySelector("#current-round-score");
let playerScoreDisplay = document.querySelector("#player-score");
let continueButton = document.querySelector("#continue");
let stopButton = document.querySelector("#stop");

function endGame() {
    document.querySelector("body").textContent = `Final Score: ${playerScore}`;
}

function incrementRoundScore() {
    switch (currentDieRoll) {
        case "1":
            if (currentPhase >= 3) {
                roundScore += 100;
            } else {
                roundScore += 1;
            }
            break;
        case "2":
            if (currentPhase === 4) {
                roundScore *= 2;
            } else {
                roundScore += 2;
            }
            break;
        case "3": 
            roundScore += 3;
            break;
        case "5":
            if (currentPhase >= 2) {
                roundScore += 50;
            } else {
                roundScore += 5;
            }
            break;
        case "6": roundScore += 6;
    }
    console.log(`incremented score: ${roundScore}`);
}

function roll() {
    currentDieRoll = String(Math.floor(Math.random() * 6 + 1));
    console.log(`rolled die: ${currentDieRoll}`);
}

function stop() {
    playerScore += roundScore;
    if (currentRound === numberOfRounds) {
        if (currentPhase === numberOfPhases) {
            endGame();
        } else {
            currentRound = 1;
            currentPhase++;
        }
    } else {
        currentRound++;
    }
    roll();
    roundScore = 0;
}

continueButton.addEventListener("click", function () {
    incrementRoundScore();
    roll();
    if (currentDieRoll === 4) {
        stop();
    }
});

stopButton.addEventListener("click", function () {
    stop();
});


function updateScreen() {
    currentPhaseDisplay.textContent = currentPhase;
    currentRoundDisplay.textContent = currentRound;
    currentDieRollDisplay.textContent = currentDieRoll;
    roundScoreDisplay.textContent = roundScore;
    playerScoreDisplay.textContent = playerScore;
}

setInterval(updateScreen, 1);

roll();
incrementRoundScore();