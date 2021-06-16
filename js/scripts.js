function Player(playerNumber, currentRoll, currentTurnScore, turnScore, totalScore, status) {
  this.playerNumber = player;
  this.currentRoll = currentRoll;
  this.currentTurnScore = currentTurnScrore;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
  this.status = status;
}

let player1 = new Player(1, 0, 0, [], 0, false);

let player2 = new Player(2, 0, 0, [], 0, false);

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
