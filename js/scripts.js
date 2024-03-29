var newGameBtn = document.getElementById("js-newGameButton");

newGameBtn.addEventListener("click" , newGame);

$(".btnOption").on("click", function()
{ playerPick($(this).attr("data-name"))
})

var gameState = "notStarted"
  player = {
         name: "",
         score: 0
  },
  computer = {
        score: 0

  };
  var newGameElem = document.getElementById("js-newGameElement"),
   pickElem = document.getElementById("js-playerPickElement"),
   resultsElem = document.getElementById("js-resultsTableElement");

function setGameElements() {
   switch(gameState) {
       case "started":
               newGameElem.style.display = "none";
               pickElem.style.display = "block";
               resultsElem.style.display = "block";
           break;
       case "ended":
               newGameBtn.innerText = "Play again";
               playerPickElem.textContent = "Player’s choice";
               computerPickElem.textContent = "Computer’s choice";
               playerResultElem.textContent = "Player’s score";
               computerResultElem.textContent = "Computer’s score";
       case "notStarted":
       default:
               newGameElem.style.display = "block";
               pickElem.style.display = "none";
               resultsElem.style.display = "none";
   }
}

setGameElements();

var playerPointsElem = document.getElementById("js-playerPoints"),
   playerNameElem = document.getElementById("js-playerName"),
   computerPointsElem = document.getElementById("js-computerPoints");

function newGame() {
 swal({
   title: "Who are you?",
   text: "Type your name:",
   type: "input",
   showCancelButton: true,
   closeOnConfirm: false,
   animation: "slide-from-top",
   inputPlaceholder: "player’s name"
 },

 function(inputValue){
    if (inputValue === false) return false;
 
    if (inputValue === "") {
      swal.showInputError("You need to write your name!");
      return false;
    }
    swal("Let's start!", "Take a challenge " + inputValue, "success");
    player.name = inputValue;
 
 
    if (player.name) {
      player.score = computer.score = 0;
      gameState = "started";
      setGameElements();
 
      playerNameElem.innerHTML = player.name;
      setGamePoints();
    }
  });
 
 } 
 
 function playerPick(playerPick) {
    console.log(playerPick);
 }
 
 function getComputerPick() {
    var possiblePicks = ["rock", "paper", "scissors"];
    return possiblePicks[Math.floor(Math.random()*3)];
 }
 
 var playerPickElem = document.getElementById("js-playerPick"),
    computerPickElem = document.getElementById("js-computerPick"),
    playerResultElem = document.getElementById("js-playerResult"),
    computerResultElem = document.getElementById("js-computerResult");
 
 function playerPick(playerPick) {
    var computerPick = getComputerPick();
 
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
 }
 
 function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = "";
 
    var winnerIs = "player";
 
    if (playerPick == computerPick) {
        winnerIs = "noone"; 
        playerResultElem.innerHTML = "Tie!";
        computerResultElem.innerHTML = "Tie!";
    } else if (
        (computerPick == "rock" &&  playerPick == "scissors") ||
        (computerPick == "scissors" &&  playerPick == "paper") ||
        (computerPick == "paper" &&  playerPick == "rock")) {
 
        winnerIs = "computer";
    }
 
    if (winnerIs == "player") {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == "computer") {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
 
    setGamePoints();
    gameFinished();
 }
 
 function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
 }
 
 function gameFinished() {
    if (player.score == 10) {
        swal("Oleyyy!", player.name + " wins!", "success")
        gameState = "ended"
    } else if (computer.score == 10) {
        sweetAlert({
        title: "Oh noooo!",
        text: "Computer is the winner",
        type: "error"
    });
        gameState = "ended"
    }
    setGameElements();
 }
