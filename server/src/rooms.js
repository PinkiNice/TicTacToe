const Game = require('./game.js');
const rooms = {};

class Room {

  constructor(id) {
    this.x = false;
    this.o = false;
    this.game = new Game();
    this.chat = [];
    this.id = id;
  }

  connectPlayer(socket) {
    // Check if room is lack of players
    if (!this.x || !this.o) {
      this.x ? this.o = socket.id : this.x = socket.id ;
      // Connect if so
      socket.join(this.id);
    } else if (!this.playerInside(socket.id)) {
      throw Error('Room is full');
    }
  }

  disconnectPlayer(socket) {

    if (this.x === socket.id) {
      this.x = false;
    } else if (this.o === socket.id) {
      this.o = false;
    } else {
      // You tried to disconnect a person who is not in the room
      // Already disconnected, huh?
    }
  }

  restartGame() {
    /**
      Wiping game state
    **/
    this.game = new Game();
  }
  
  getPlayerToken(id) {
    if (this.x === id) {
      return 'x';
    } else if (this.o === id) {
      return 'o';
    } else {
      return false;
    }
  }

  playTurn(token, cellId) {
    // Transform player's token to his index [x=0, o=1]
    const playerId = token === 'x' ? 0 : token === 'o' ? 1 : -1;
    this.game.playTurn(playerId, cellId);
  }

  playerInside(socketId) {
    // Decide if socket is already in the game
    return this.x === socketId || this.o === socketId;
  }

  isFull() {
    return !!this.x && !!this.o;
  }
  
  getGameState() {
    return this.game.getState();
  }
}

module.exports = Room;