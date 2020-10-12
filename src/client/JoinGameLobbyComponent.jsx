import React from "react";
import { Checkmark } from 'react-checkmark';

export class JoinGameLobbyComponent extends React.Component {

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
                        </div>
                        <div id="header">
                        </div>
                        <div id="playerContainer">
                                <div id="playerOneContainer">
                                    {this.props.gameCreatorUsername}
                                    <div id="checkmarkDiv">
                                        <Checkmark size={35} />
                                    </div>
                                </div>
                                <div id="playerTwoContainer">
                                    {this.props.currentUsername}
                                    <div id="otherUserCheckMarkDiv">
                                            <Checkmark size={35} />
                                    </div>
                                </div>
                                <p id="waitingForCreator">Waiting for {this.props.gameCreatorUsername} to start the game...</p>
                        </div>
                    </div>
            )
    }
}
