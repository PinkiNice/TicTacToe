const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ServerSocketManager = require('./src/sockets');

const sockerManager = new ServerSocketManager(io);

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});