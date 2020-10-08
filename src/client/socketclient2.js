var io = require('socket.io-client');
var jwt = require('jsonwebtoken');

var user = {
    username: 'Chris',
    option: 2, // 1 = Create game, 2 = Join game, 3 = Play against random
    gameCode: 'ycz4303'
}

let validToken = jwt.sign(user, '7fb00784cf41d488427bd9d59430bd95', {expiresIn: '24h'});

socket = io.connect('http://localhost:3000', {
  query: 'token=' + validToken,
  forceNew: true
});

socket.on('userFound', function(data){
  console.log("Found: " + data);
});
