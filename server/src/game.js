class Game {
  static getWinScores() {
    return [7, 56, 448, 84, 273, 73, 146, 292];
  }

  static isPlayerWon(playerScore) {
    let result = false;
    /**
      Cool hack stolen from stackexchange.
      All cells in game are labeled as powers of 2.
      And winScores are all sums of those labels which leads to win
      AND operator between winScore and playerScore will return winScore
      if player score covers some of win combinations
    **/
    Game.getWinScores().forEach((winScore) => {
      if ((winScore & playerScore) === winScore) 
        result = true;
    });

    return result;
  }

  constructor() {
    this.field = Array(9).fill(false);  // false means empty cell
    this.scores = [0, 0];               // 1st and 2nd player respectively
    this.nTurns = 0;                    // Counter of turns
    this.turn = 'x';                    // 'x' or 'o'. 'x' plays first
    /**
      'x', 'o', 'tie' or false depending on game state.
      false means game hasn't ended yet.
    **/
    this.winner = false;
  }

  playTurn(playerId, cellId) {
    if (playerId < 0 || playerId > 1) {
      throw new Error('Invalid player id');
    } else if (cellId < 0 || cellId > 8) {
      throw new Error('Invalid cell id');
    } else if (this.field[cellId]) {
      throw new Error('Double playing same cell');
    } else if (playerId === 0 && this.turn === 'o' || playerId === 1 && this.turn === 'x') {
      throw new Error('Playing not in players turn');
    } else if (this.winner) {
      throw new Error('Game is already finished');
    }

    this.scores[playerId] += Math.pow(2, cellId); // Update player's score
    this.field[cellId] = this.turn;               // Mark field cell as played
    this.turn = this.turn === 'x' ? 'o' : 'x';    // Flip whos turn is next
    this.nTurns++;

    this.updateGameResult();
  }

  updateGameResult() {
    if (Game.isPlayerWon(this.scores[0])) {
      this.winner = 'x';
    } else if (Game.isPlayerWon(this.scores[1])) {
      this.winner = 'o';
    } else if (this.nTurns === 9) {
      this.winner = 'tie';
    } else {
      this.winner = false;
    }
  }

  getState() {
    return ({
      field: this.field,
      turn: this.turn,
      winner: this.winner
    });
  }
}

module.exports = Game;