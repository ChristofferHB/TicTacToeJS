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
            for (let i = 0; i < games.length; i++) {
                if (games[i].gameCode === data.gameCode) {
                    let move = {
                        username: data.username,
                        playerMove: data.playerMove
                    }

                    let board = games[i].board;
                    board[move.playerMove] = move;
                    games[i].board = board;

                    let members = games[i].members;

                    for (let j = 0; j < members.length; j++) {
                        if (members[j].username !== data.username) {
                            checkMoves(data.gameCode); // Check board for win condition
                            io.to(members[j].socket_id).emit('playerMove', { playerName: data.username, playerMove: data.playerMove }); // Send move to player
                        }
                    }
                }
            }
        });

        socket.on('restartGame', function (data) {
            console.log("restartgame socket!");
            restartGame(data.gameCode);
        });

    });

    http.listen(3000, () => {
        console.log('listening on *:3000');
    });
}

function checkMoves(gameCode) {
    for (let i = 0; i < games.length; i++) {
        if (games[i].gameCode === gameCode) {
            let board = games[i].board;
            let playerOne = games[i].members[0].username;
            let playerTwo = games[i].members[1].username;

            let winner = undefined;

            // Check for win condition first row horizontally
            if (board[0] !== undefined && board[1] !== undefined && board[2] !== undefined) {
                if (board[0].username === playerOne && board[1].username === playerOne && board[2].username === playerOne) {

                    winner = {
                        winnerName: board[0].username,
                        winCondition: [0, 1, 2]
                    }

                    console.log(board[0].username + " scored three on a row!");
                }

                if (board[0].username === playerTwo && board[1].username === playerTwo && board[2].username === playerTwo) {

                    winner = {
                        winnerName: board[0].username,
                        winCondition: [0, 1, 2]
                    }

                    console.log(board[0].username + " scored three on a row!");
                }
            }

            // Check for win condition second row horizontally
            if (board[3] !== undefined && board[4] !== undefined && board[5] !== undefined) {
                if (board[3].username === playerOne && board[4].username === playerOne && board[5].username === playerOne) {

                    winner = {
                        winnerName: board[3].username,
                        winCondition: [3, 4, 5]
                    }

                    console.log(board[3].username + " scored three on a row!");
                }

                if (board[3].username === playerTwo && board[4].username === playerTwo && board[5].username === playerTwo) {

                    winner = {
                        winnerName: board[3].username,
                        winCondition: [3, 4, 5]
                    }
                    
                    console.log(board[3].username + " scored three on a row!");
                }
            }

            // Check for win condition third row horizontally
            if (board[6] !== undefined && board[7] !== undefined && board[8] !== undefined) {
                if (board[6].username === playerOne && board[7].username === playerOne && board[8].username === playerOne) {

                    winner = {
                        winnerName: board[6].username,
                        winCondition: [6, 7, 8]
                    }

                    console.log(board[6].username + " scored three on a row!");
                }

                if (board[6].username === playerTwo && board[7].username === playerTwo && board[8].username === playerTwo) {

                    winner = {
                        winnerName: board[6].username,
                        winCondition: [6, 7, 8]
                    }

                    console.log(board[6].username + " scored three on a row!");
                }
            }

            // Check for win condition left row vertically
            if (board[0] !== undefined && board[3] !== undefined && board[6] !== undefined) {
                if (board[0].username === playerOne && board[3].username === playerOne && board[6].username === playerOne) {

                    winner = {
                        winnerName: board[0].username,
                        winCondition: [0, 3, 6]
                    }

                    console.log(board[0].username + " scored three on a row!");
                }

                if (board[0].username === playerTwo && board[3].username === playerTwo && board[6].username === playerTwo) {

                    winner = {
                        winnerName: board[0].username,
                        winCondition: [0, 3, 6]
                    }

                    console.log(board[0].username + " scored three on a row!");
                }
            }

           // Check for win condition center row vertically
            if (board[1] !== undefined && board[4] !== undefined && board[7] !== undefined) {
                if (board[1].username === playerOne && board[4].username === playerOne && board[7].username === playerOne) {

                    winner = {
                        winnerName: board[1].username,
                        winCondition: [1, 4, 7]
                    }

                    console.log(board[1].username + " scored three on a row!");
                }

                if (board[1].username === playerTwo && board[4].username === playerTwo && board[7].username === playerTwo) {

                    winner = {
                        winnerName: board[1].username,
                        winCondition: [1, 4, 7]
                    }

                    console.log(board[1].username + " scored three on a row!");
                }
            }

            // Check for win condition right row vertically
            if (board[2] !== undefined && board[5] !== undefined && board[8] !== undefined) {
                if (board[2].username === playerOne && board[5].username === playerOne && board[8].username === playerOne) {

                    winner = {
                        winnerName: board[2].username,
                        winCondition: [2, 5, 8]
                    }

                    console.log(board[2].username + " scored three on a row!");
                }

                if (board[2].username === playerTwo && board[5].username === playerTwo && board[8].username === playerTwo) {

                    winner = {
                        winnerName: board[2].username,
                        winCondition: [2, 5, 8]
                    }

                    console.log(board[2].username + " scored three on a row!");
                }
            }

            // Check for win condition from top left to bottom right
            if (board[0] !== undefined && board[4] !== undefined && board[8] !== undefined) {
                if (board[0].username === playerOne && board[4].username === playerOne && board[8].username === playerOne) {

                    winner = {
                        winnerName: board[0].username,
                        winCondition: [0, 4, 8]
                    }

                    console.log(board[0].username + " scored three on a row!");
                }

                if (board[0].username === playerTwo && board[4].username === playerTwo && board[8].username === playerTwo) {

                    winner = {
                        winnerName: board[0].username,
                        winCondition: [0, 4, 8]
                    }

                    console.log(board[0].username + " scored three on a row!");
                }
            }
            
            // Check for win condition from top right to bottom left
            if (board[2] !== undefined && board[4] !== undefined && board[6] !== undefined) {
                if (board[2].username === playerOne && board[4].username === playerOne && board[6].username === playerOne) {

                    winner = {
                        winnerName: board[2].username,
                        winCondition: [2, 4, 6]
                    }

                    console.log(board[2].username + " scored three on a row!");
                }

                if (board[2].username === playerTwo && board[4].username === playerTwo && board[6].username === playerTwo) {

                    winner = {
                        winnerName: board[2].username,
                        winCondition: [2, 4, 6]
                    }

                    console.log(board[2].username + " scored three on a row!");
                }
            }

            if(winner !== undefined) {
                if(winner.winnerName === playerOne) {
                    io.to(games[i].members[0].socket_id).emit('gameFinished', { winData: winner });
                    io.to(games[i].members[1].socket_id).emit('gameFinished', { winData: winner });
                }
    
                if(winner.winnerName === playerTwo) {
                    io.to(games[i].members[0].socket_id).emit('gameFinished', { winData: winner });
                    io.to(games[i].members[1].socket_id).emit('gameFinished', { winData: winner });
                }
            }
        }
    }
}

function restartGame(gameCode) {
    for(let i = 0; i < games.length; i++) {
        if(games[i].gameCode === gameCode) {
            games[i].board = [];

            io.to(games[i].members[0].socket_id).emit('restartGame');
            io.to(games[i].members[1].socket_id).emit('restartGame');
        }
    }
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