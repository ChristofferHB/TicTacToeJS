import React from "react";
import SocketConnection from './SocketConnection';

export class NewGameComponent extends React.Component {

    constructor(props) {

        super(props);

        this.joinGameButtonClick = this.joinGameButtonClick.bind(this);
        this.createGameButtonClick = this.createGameButtonClick.bind(this);
        this.randomGameButtonClick = this.randomGameButtonClick.bind(this);
        this.gameCodeCallback = this.gameCodeCallback.bind(this);
    }

    componentDidMount() {
        SocketConnection.setGameCodeCallback(this.gameCodeCallback);
    }

    gameCodeCallback(gameCode) {
        this.props.setGameCode(gameCode);
    }

    joinGameButtonClick() {
        this.props.history.push("/joingame");
    }

    createGameButtonClick() {
        SocketConnection.connect(this.props.username, 1);

        setTimeout(function () { //Start the timer
            this.props.history.push("/creategamelobby");
        }.bind(this), 15)
    }

    randomGameButtonClick() {
        this.props.history.push("/randomgamelobby");
    }

    render() {

        return (
            <div>
                <div id="newGameComponentContainer">
                    <p id="startScreenLogo">Tic Tac Toe</p>
                    <button id="createGameButtton" onClick={this.createGameButtonClick}>Create game</button>
                    <button id="joinGameButton" onClick={this.joinGameButtonClick}>Join game</button>
                    <button id="randomGameButton" onClick={this.randomGameButtonClick}>Play against random</button>
                </div>
            </div>
        )
        return <div></div>
    }
}
