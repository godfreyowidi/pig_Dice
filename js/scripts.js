function Player(playerNumber, currentRoll, currentTurnScore, turnScore, totalScore, status) {
  this.playerNumber = playerNumber;
  this.currentRoll = currentRoll;
  this.currentTurnScore = currentTurnScore;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
  this.status = status;
}

let rollValuesArray = [];
Player.prototype.rollDice = function() {
  let rollValue = Math.floor(Math.random() * 6) + 1;
  rollValuesArray.push(rollValue);
  this.currentRoll = rollValue;
  if (rollValue === 1) {
    this.endTurn();
  }
};
Player.prototype.endTurn = function() {
  let sum = 0;
  if (rollValuesArray.includes(1)) {
    this.turnScore.push(0);
  } else rollValuesArray.forEach(function(element) {
    sum += element;
  });
  this.turnScore.push(sum);
  rollValuesArray = [];
  this.currentTurnScore = 0;
};
Player.prototype.calcTurnScore = function() {
  let sum = 0;
  rollValuesArray.forEach(function(element) {
    sum += element;
  });
  this.currentTurnScore = sum;
};
Player.prototype.calcTotalScore = function() {
let sum = 0;
this.turnScore.forEach(function(element) {
  sum += element;
});
this.totalScore = sum;
};
Player.prototype.gameOver = function() {
  if (this.totalScore >= 2) {
    $(".game-board").hide();
    $("#gameResults").show();
    $("#winner").text(this.playerNumber);
  };
};

$(document).ready(function() {
let player1 = new Player(1, 0, 0, [], 0, false);
let player2 = new Player(2, 0, 0, [], 0, false);
  $("#p1-roll").click(function() {
    player1.rollDice();
    $("#dice-roll").text(player1.currentRoll);
    if (player1.currentRoll === 1) {
      player1.currentTurnScore = 0;
      $("#p1-roll").hide();
    }
    player1.calcTurnScore();
    $(".p1-currentTurnScore").text(player1.currentTurnScore);
  });

  $("#p2-roll").click(function() {
    player2.rollDice();
    $("#dice-roll").text(player2.currentRoll);
    if (player2.currentRoll === 1) {
      player2.currentTurnScore = 0;
      $("#p2-roll").hide();
    }
    player2.calcTurnScore();
    $(".p2-currentTurnScore").text(player2.currentTurnScore);
  });

  $("#p1-pass").click(function() {
    player1.endTurn();
    player1.calcTotalScore();
    $(".player-2").show();
    $(".player-1").slideUp();
    $("#p1-total").text(player1.totalScore);
    $("#p2-roll").show();
    $(".p1-score").text(player1.currentTurnScore);
    player1.gameOver();
  });

  $("#p2-pass").click(function() {
    player2.endTurn();
    player2.calcTotalScore();
    $(".player-1").show();
    $(".player-2").slideUp();
    $("#p2-total").text(player2.totalScore);
    $("#p1-roll").show();
    $(".p2-score").text(player2.currentTurnScore);
    player2.gameOver();
  });

  $("#newGame").click(function() {
    location.reload();
  })
});