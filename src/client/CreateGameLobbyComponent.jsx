import React from "react";
import SocketConnection from './SocketConnection';
import { Checkmark } from 'react-checkmark';

export class CreateGameLobbyComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
           waitingForOpponent: true,
           opponentUsername: ''
        }

        this.userJoinedGameCallback = this.userJoinedGameCallback.bind(this);
        this.startGameBtnOnClick = this.startGameBtnOnClick.bind(this);
    }

    componentDidMount() {
        SocketConnection.setUserJoinedGameCallback(this.userJoinedGameCallback);
    }

    startGameBtnOnClick() {
        SocketConnection.emitStartGame(this.props.gameCode);
        console.log(this.props.gameCode);
        this.props.history.push('/game');
    } 

    userJoinedGameCallback(user) {
        this.setState({
            waitingForOpponent: false,
            opponentUsername: user.username
          });
    }

    render() {

        if(this.state.waitingForOpponent) {
            return (
                <div>
                    <div id="createGameLobbyComponentContainer">
                    </div>
                    <div id="header">
                            <p id="gameLobbyCode">Game code: {this.props.gameCode.code}</p>
                    </div>
                    <div id="playerContainer">
                            <div id="playerOneContainer">
                                {this.props.creatorUsername}
                                <div id="checkmarkDiv">
                                    <Checkmark size={35} />
                                </div>
                            </div>
                            <div id="playerTwoContainerWaiting">
                                Waiting for player...
                                <div id="waitingForFriendAnimation"></div>
                            </div>
                    </div>
                </div>
            )
        } 

        return(
            <div>
            <div id="createGameLobbyComponentContainer">
                    </div>
                    <div id="header">
                            <p id="gameLobbyCode">Game code: {this.props.gameCode.code}</p>
                    </div>
                    <div id="playerContainer">
                            <div id="playerOneContainer">
                                {this.props.creatorUsername}
                                <div id="checkmarkDiv">
                                    <Checkmark size={35} />
                                </div>
                            </div>
                            <div id="playerTwoContainer">
                                {this.state.opponentUsername}
                                <div id="otherUserCheckMarkDiv">
                                        <Checkmark size={35} />
                                </div>
                            </div>
                            <button id="startGameBtn" onClick={this.startGameBtnOnClick}>Start game</button>
                    </div>
                </div>
        );
    }
}
