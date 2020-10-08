import React from "react";
import ReactDOM from "react-dom";
import {withRouter} from 'react-router-dom';
import {NotFound} from "./not_found";

export class CreateGameLobbyComponent extends React.Component {

    constructor(props) {
  
        super(props);

        this.state = {
            usernameFieldText: 'Enter game id'
        }

    }

    render() {
            return (
                <div>
                    <div id="createGameLobbyComponentContainer">
                        <p id="waitingForFriend">Waiting for your friend to join</p>
                    </div>
                    <div id="createGameLobbyComponentHeader">
                            <p id="gameLobbyCode">Game code: {this.props.gameCode.code}</p>
                    </div>
                    <div id="waitingForFriendAnimation"></div>
                </div>
            )
    }
}
