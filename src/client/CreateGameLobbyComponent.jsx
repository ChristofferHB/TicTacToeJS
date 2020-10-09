import React from "react";
import ReactDOM from "react-dom";
import {withRouter} from 'react-router-dom';
import {NotFound} from "./not_found";
import SocketConnection from './SocketConnection';
import { Checkmark } from 'react-checkmark';

export class CreateGameLobbyComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
           waitingForOpponent: true
        }

        this.setUserJoinedGameCallback = this.setUserJoinedGameCallback.bind(this);
    }

    componentDidMount() {
        SocketConnection.setUserJoinedGameCallback(this.setUserJoinedGameCallback);
    }

    setUserJoinedGameCallback(user) {
        console.log(user.username + " joined!");

        this.setState({
            waitingForOpponent: false
          });
    }

    render() {

        if(this.state.waitingForOpponent) {
            return (
                <div>
                    <div id="createGameLobbyComponentContainer">
                    </div>
                    <div id="createGameLobbyComponentHeader">
                            <p id="gameLobbyCode">Game code: {this.props.gameCode.code}</p>
                    </div>
                    <div id="playerContainer">
                            <div id="waitingForFriendAnimation"></div>
                            <div id="playerOneContainer">
                                <div id="checkmarkDiv">
                                    <Checkmark size={35} />
                                </div>
                            </div>
                            <div id="playerTwoContainer">
                                Waiting for player...
                            </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div id="createGameLobbyComponentContainer">
                        <p id="waitingForFriend">Friend joined!</p>
                    </div>
                    <div id="createGameLobbyComponentHeader">
                            <p id="gameLobbyCode">Game code: {this.props.gameCode.code}</p>
                    </div>
                </div>
            )
        }
    }
}
