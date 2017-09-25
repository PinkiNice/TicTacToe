const event = require('../../shared/event.js');
const Room = require('./rooms.js');



//Simple store for keeping all rooms and players
const rooms = {
};

class ServerSocketManager {
  constructor(io) {
    this.io = io;
    io.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(socket) {

    socket.on('disconnect', () => {
      this.disconnectFromRoom(socket);
    });

    socket.on(event.GAME_CREATE, () => {
      const id = socket.id;

      if (!rooms[id]) {
        // Create room only if it doesn't exists yet
        // (This should never happen anyway)
        rooms[id] = new Room(socket.id);
        socket.emit(event.GAME_CREATED, id);
      } else {
        socket.emit(event.ERROR, 'Room already exists');
      }
    });

    socket.on(event.GAME_CONNECT, (id) => {

      const room = rooms[id];

      if (room) {

        if (room.isFull() && !room.playerInside(socket.id)) {
          socket.emit(event.ERROR, 'Room is already filled');
          return;
        }

        room.connectPlayer(socket);

        socket.emit(event.GAME_CONNECTED, { 
          id,
          player: room.getPlayerToken(socket.id)
        });

        socket.emit(event.CHAT_STATE, room.chat);

        if (room.isFull()) {
          // If connected user is 2nd in the room
          // Tell everyone that game has started
          this.broadcastGameUpdate(id);
        }

      } else {
        socket.emit(event.ERROR, 'Game not found');
      }
    });

    socket.on(event.PLAY_TURN, ({ roomId, cellId }) => {
      const room = rooms[roomId];
      // If room exists and socket really playing it
      if (room && room.playerInside(socket.id)) {
        const token = room.getPlayerToken(socket.id);

        // If turn is made in right order
        if (token === room.getGameState().turn) {
          room.playTurn(token, cellId);
          this.broadcastGameUpdate(roomId);
        }
      }
    })

    socket.on(event.GAME_RESTART, ({ roomId }) => {
      const room = rooms[roomId];
      if (room && room.playerInside(socket.id)) {
        room.restartGame();
        this.broadcastGameUpdate(roomId);
      }
    })

    socket.on(event.CHAT_NEW_MESSAGE, ({ roomId, message }) => {
      const room = rooms[roomId];

      if (room && room.playerInside(socket.id)) {
        message.sender = room.getPlayerToken(socket.id);
        room.chat.push(message);
        this.broadcastChatUpdate(room.id, message);
      }
    });
  }

  broadcastChatUpdate(roomId, message) {
    /**
      Sends new chat message to every player in the room
    **/
    this.io.to(roomId).emit(event.CHAT_UPDATE, message);
  }

  broadcastGameUpdate(roomId) {
    /**
      Sends current game state to sockets connected 
    **/
    this.io.to(roomId).emit(event.GAME_UPDATE, rooms[roomId].getGameState());
  }

  disconnectFromRoom(socket) {
    /**
      Safely kicks socket from room and delete it if needed
    **/

    const allRooms = Object.values(rooms);
    const room = allRooms.find(room => room.x === socket.id || room.o === socket.id);

    if (room && room.isFull()) {
      room.disconnectPlayer(socket);
    } else if (room) {
      // Room had 1 player inside, so we need to delete it now
      delete rooms[room.id];
    } else {
      //Room not even found
    }
  }
}

module.exports = ServerSocketManager;
