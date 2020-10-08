const app = require("./app");
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const socketIoJwt = require('socketio-jwt');

let games = [];

function listen() {
    io.use(socketIoJwt.authorize({
        secret: '7fb00784cf41d488427bd9d59430bd95',
        handshake: true
    }));
    
    io.on('connection', function (socket) {
        let username = socket.decoded_token.username;
        let option = socket.decoded_token.option;
        console.log(username + " connected!");
        console.log("Picked: " + option);

        let exists = usernameExists(username);
        console.log(exists);

        if(!exists) {
            switch(option) {
                case 1:
    
                    let gameCode = generateGameCode();
    
                    let game = {
                        gameCode: gameCode,
                        members: [],
                    }
    
                    let member = {
                        username: username
                    }
    
                    game.members.push(JSON.stringify(member));
    
                    games.push(game);
                    console.log("Game created by: " + username);
                    console.log("Game code: " + gameCode);

                    io.to(socket.id).emit('gameCode', {code: gameCode}); 

                    console.log(games);
                    
                    break;
                
                case 2:
                    let foundGame = false;
                    let receivedGameCode = socket.decoded_token.gameCode;
    
                    for(let i = 0; i < games.length; i++) {
                        if(games[i].gameCode === receivedGameCode) {
    
                            let newMember = {
                                username: username
                            }
            
                            games[i].members.push(JSON.stringify(newMember));
    
                            console.log("Found game");
                            io.to(socket.id).emit('gameCodeSearch', {foundGame: true, creator: games[i].members[0].username}); 
                            console.log(games[i].members);
                            foundGame = true;
                        }
                    }
    
                    if(!foundGame) {
                        console.log("Could not find game");
                        console.log(socket.id);
                        io.to(socket.id).emit('gameCodeSearch', {foundGame: false}); 
                    }
                    break;
            }
        } else {
            console.log("EXISTS!");
        }

        
        socket.on('disconnect', function () {
            for(let i = 0; i < games.length; i++) {
                for(let j = 0; j < games[i].members.length; j++) {
                   let member = JSON.parse(games[i].members[j]);
                   
                   if(member.username === username) {
                       let membersArray = Object.keys(games[i].members).map((k) => games[i].members[k]);
                       membersArray.splice(j, 1);
                       
                       games[i].members = membersArray;

                   }
                   
                }
            }
        });
    });

    http.listen(3000, () => {
        console.log('listening on *:3000');
      });
}

function usernameExists(username) {
    let exists = false;

    for(let i = 0; i < games.length; i++) {
        for(let j = 0; i < games[j].members; j++) {
            if(games[i].members[j].username === username) {
                exists = true;
            }
        }
    }
    
    return exists;

}

function generateGameCode() {
    let code = Math.random().toString(36).substring(2, 5);

    for(let i = 0; i <= 3; i++) {
        let tmpNumber = Math.round(Math.random() * 10);
        tmpNumber = tmpNumber.toString();
        code += tmpNumber;
    }

    let codeExists = false;

    for(let i = 0; i < games.length; i++) {
        if(games[i].gameId === code) {
            codeExists = true;
        }
    }

    if(!codeExists) {
        return code;
    } else {
        generateGameCode();
    }

}

module.exports = {listen}