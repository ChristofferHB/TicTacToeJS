var io = require('socket.io-client');
var jwt = require('jsonwebtoken');

let gameCodeSearchCallback;
let gameCodeCallback;
let userJoinedGameCallback;
let socket;
let joinerStartGameCallback;
let creatorStartGameCallback;
let playerMoveCallback;

function connect(username, option, gameCode) {

  console.log("ATTEMPTING CONNECT!");
    var user = {
        username: username,
        option: option, // 1 = Create game, 2 = Join game, 3 = Play against random
        gameCode: gameCode
    }

    let validToken = jwt.sign(user, '7fb00784cf41d488427bd9d59430bd95', {expiresIn: '24h'});
    
    socket = io.connect('http://localhost:3000', {
      query: 'token=' + validToken,
      forceNew: true
    });

    socket.on('gameCode', function(data){
        gameCodeCallback(data);
      });
    
    socket.on('gameCodeSearch', function(data){
      gameCodeSearchCallback(data);
    });

    socket.on('userJoinedGame', function(data){
      userJoinedGameCallback(data);
    });

    socket.on('startGame', function(data){
      switch(data.playerRole) {
        case 'creator':
          creatorStartGameCallback(data);
          break;
        
        case 'joiner':
          joinerStartGameCallback(data);
          break;
      }
    });

    socket.on('playerMove', function(data){
      playerMoveCallback(data);
    });
    
}

function emitStartGame(gameCode) {
  socket.emit( 'startGame', { gameCode: gameCode }); 
}

function emitPlayerMove(username, playerMove) {
  socket.emit( 'playerMove', { username: username, playerMove: playerMove }); 
}

function setUserJoinedGameCallback(callback) {
  userJoinedGameCallback = callback;
}

function setGameCodeCallback(callback) {
    gameCodeCallback = callback;
}

function setGameCodeSearchCallback(callback) {
    gameCodeSearchCallback = callback;
}

function setStartGameCreatorCallback(callback) {
  creatorStartGameCallback = callback;
}

function setStartGameJoinerCallback(callback) {
  joinerStartGameCallback = callback;
}

function setPlayerMoveCallback(callback) {
  playerMoveCallback = callback;
}

module.exports = {connect, setGameCodeSearchCallback, setGameCodeCallback, setUserJoinedGameCallback, setPlayerMoveCallback, setStartGameJoinerCallback, setStartGameCreatorCallback, emitStartGame, emitPlayerMove}