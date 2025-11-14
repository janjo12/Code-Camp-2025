let roundCountSelector = document.querySelector("#roundCountSelect");
let startGameButton = document.querySelector("#startGame");
let howToPlayButton = document.querySelector("#howToPlay");

roundCountSelector.addEventListener("click", function () {
    sessionStorage.setItem("roundCount", roundCountSelector.value);
    console.log(roundCountSelector.value);
});

startGameButton.querySelector("click", function () {
    
});