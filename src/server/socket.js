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

        if (!exists) {
            switch (option) {
                case 1:

                    let gameCode = generateGameCode();

                    let game = {
                        gameCode: gameCode,
                        members: [],
                        board: []
                    }

                    let member = {
                        username: username,
                        socket_id: socket.id
                    }

                    game.members.push(member);
                    games.push(game);

                    io.to(socket.id).emit('gameCode', { code: gameCode });

                    break;

                case 2:
                    let foundGame = false;
                    let receivedGameCode = socket.decoded_token.gameCode;

                    for (let i = 0; i < games.length; i++) {
                        if (games[i].gameCode === receivedGameCode) {

                            let newMember = {
                                username: username,
                                socket_id: socket.id
                            }

                            games[i].members.push(newMember);

                            console.log("Found game");
                            io.to(socket.id).emit('gameCodeSearch', { foundGame: true, creator: games[i].members[0].username });

                            let creatorSocketId = games[i].members[0].socket_id;
                            io.to(creatorSocketId).emit('userJoinedGame', { username: newMember.username });
                            foundGame = true;
                        }
                    }

                    if (!foundGame) {
                        console.log("Could not find game");
                        console.log(socket.id);
                        io.to(socket.id).emit('gameCodeSearch', { foundGame: false });
                    }
                    break;
            }
        } else {
            console.log("EXISTS!");
        }


        socket.on('disconnect', function () {
            for (let i = 0; i < games.length; i++) {
                for (let j = 0; j < games[i].members.length; j++) {
                    let member = games[i].members[j];

                    if (member.username === username) {
                        let membersArray = Object.keys(games[i].members).map((k) => games[i].members[k]);
                        membersArray.splice(j, 1);

                        games[i].members = membersArray;

                    }

                }
            }
            console.log("Disconnected!");
            console.log(games);
        });

        socket.on('startGame', function (data) {

            console.log("STARTGAME CALLED!");
            console.log(data);

            for (let i = 0; i < games.length; i++) {
                if (games[i].gameCode === data.gameCode) {
                    console.log(games[i]);
                    console.log("FOUND IT!");

                    let randomTurnIdentification = Math.floor(Math.random() * 2) + 1;

                    if (randomTurnIdentification === 1) {
                        io.to(games[i].members[0].socket_id).emit('startGame', { playerRole: 'creator', turnIdentification: 'X' });
                        io.to(games[i].members[1].socket_id).emit('startGame', { playerRole: 'joiner', turnIdentification: 'O' });
                    }

                    if (randomTurnIdentification === 2) {
                        io.to(games[i].members[0].socket_id).emit('startGame', { playerRole: 'creator', turnIdentification: 'O' });
                        io.to(games[i].members[1].socket_id).emit('startGame', { playerRole: 'joiner', turnIdentification: 'X' });
                    }
                }
            }
        });

        socket.on('playerMove', function (data) {

            console.log("PLAYERMOVE CALLED");
            console.log(data);


            for(let i = 0; i < games.length; i++) {
                if(games[i].gameCode === data.gameCode) {
                    console.log("FOUNDYESH!");
                    let move = {
                        username: data.username,
                        playerMove: data.playerMove
                    }

                    let board = games[i].board;
                    board.push(move);
                    games[i].board = board;

                    let members = games[i].members;

                    for(let j = 0; j < members.length; j++) {
                        if(members[j].username !== data.username) {
                            io.to(members[j].socket_id).emit('playerMove', { playerName: data.username, playerMove: data.playerMove });
                        }
                    }

                    console.log(games[i].members);

                    //io.to(socket.id).emit('gameCode', { code: gameCode });

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

    for (let i = 0; i < games.length; i++) {
        for (let j = 0; i < games[j].members; j++) {
            if (games[i].members[j].username === username) {
                exists = true;
            }
        }
    }

    return exists;

}

function generateGameCode() {
    let code = Math.random().toString(36).substring(2, 5);

    for (let i = 0; i <= 3; i++) {
        let tmpNumber = Math.round(Math.random() * 10);
        tmpNumber = tmpNumber.toString();
        code += tmpNumber;
    }

    let codeExists = false;

    for (let i = 0; i < games.length; i++) {
        if (games[i].gameId === code) {
            codeExists = true;
        }
    }

    if (!codeExists) {
        return code;
    } else {
        generateGameCode();
    }

}

module.exports = { listen }