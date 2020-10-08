var io = require('socket.io-client');
var jwt = require('jsonwebtoken');

let gameCodeSearchCallback;
let gameCodeCallback;

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
    
}

function setGameCodeCallback(callback) {
    gameCodeCallback = callback;
}

function setGameCodeSearchCallback(callback) {
    gameCodeSearchCallback = callback;
}

module.exports = {connect, setGameCodeSearchCallback, setGameCodeCallback}