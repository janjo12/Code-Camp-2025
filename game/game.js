let currentPhase = 1;
let currentRound = 1;
let roundScore = 0;
let playerScore = 0;
let currentDieRoll = 0;
let roundScores = [0]; //starting score is 0
let numberOfPhases = 4;

console.log(sessionStorage.getItem("roundCount"));

let numberOfRounds = Number(sessionStorage.getItem("roundCount"));

console.log(numberOfRounds);

let currentPhaseDisplay = document.querySelector("#current-phase");
let currentRoundDisplay = document.querySelector("#current-round");
let roundScoreDisplay = document.querySelector("#current-round-score");
let playerScoreDisplay = document.querySelector("#player-score");
let undoButton = document.querySelector(".undoBtnContainer");
let stopButton = document.querySelector(".stopBtnContainer");

// Modal functionality
const modal = document.getElementById("phaseModal");
const modalImage = document.querySelector("#phaseModal img");
const closeBtn = document.querySelector(".close");

// Function to show modal with phase image
function showPhaseModal(phase) {
    modalImage.src = `../assets/phase${phase}.png`;
    modal.style.display = "flex";
}

// Show modal on page load
window.addEventListener("load", () => {
    showPhaseModal(currentPhase);
});

// Close modal when X is clicked
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking anywhere on the modal
modal.addEventListener("click", () => {
    modal.style.display = "none";
});

function endGame() {
    document.querySelector("body").style.backgroundImage = "url('../assets/final.png')";
    document.querySelector("body").style.backgroundSize = "cover";
    document.querySelector("body").style.backgroundPosition = "center";
    document.querySelector("body").style.backgroundRepeat = "no-repeat";
    
    // Hide the game container
    document.querySelector(".container").style.display = "none";
    
    // Create and display the final score
    const scoreDisplay = document.createElement("div");
    scoreDisplay.textContent = playerScore;
    scoreDisplay.style.position = "absolute";
    scoreDisplay.style.top = "65%";
    scoreDisplay.style.left = "50%";
    scoreDisplay.style.transform = "translate(-50%, -50%)";
    scoreDisplay.style.color = "#000";
    scoreDisplay.style.fontFamily = "Luckiest Guy";
    scoreDisplay.style.fontSize = "64px";
    scoreDisplay.style.fontStyle = "normal";
    scoreDisplay.style.fontWeight = "400";
    scoreDisplay.style.lineHeight = "normal";
    scoreDisplay.style.letterSpacing = "3.84px";
    scoreDisplay.style.zIndex = "10";
    
    document.querySelector("body").appendChild(scoreDisplay);
    
    // Add click event to redirect to landing page after a short delay
    setTimeout(() => {
        document.querySelector("body").addEventListener("click", () => {
            window.location.href = "../landing/landing.html";
        });
    }, 500);
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
            roundScores.push("Bust!");
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
            if (roundScores[roundScores.length - 2] === "Bust!") {
                roundScores.pop(); //intentional; you should need to pop() twice total in this function for this condition
            } else {
                playerScore -= roundScores[roundScores.length - 2];
            }
        }
        roundScores.pop();
        roundScore = roundScores[roundScores.length - 1];
    }
}

function stop() {
    playerScore += roundScore;
    roundScore = 0;
    roundScores.push(roundScore);
    if (currentRound === numberOfRounds) {
        if (currentPhase === numberOfPhases) {
            endGame();
        } else {
            currentRound = 1;
            currentPhase++;
            showPhaseModal(currentPhase);
        }
    } else {
        currentRound++;
    }
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
