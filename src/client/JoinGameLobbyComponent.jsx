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
                        <div id="createGameLobbyComponentHeader">
                                <p id="gameLobbyCode">Game code: </p>
                        </div>
                        <div id="playerContainer">
                                <div id="playerOneContainer">
                                    Freck
                                    <div id="checkmarkDiv">
                                        <Checkmark size={35} />
                                    </div>
                                </div>
                                <div id="playerTwoContainer">
                                    Check
                                    <div id="otherUserCheckMarkDiv">
                                            <Checkmark size={35} />
                                    </div>
                                </div>
                        </div>
                    </div>
            )
    }
}
