import React from "react";
import SocketConnection from './SocketConnection';

export class JoinGameComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            gameCodeFieldText: 'Enter game id',
            errorMessage: ''
        }

        this.joinGameButtonOnClick = this.joinGameButtonOnClick.bind(this);
        this.clearGameCodeField = this.clearGameCodeField.bind(this);
        this.gameCodeFieldChange = this.gameCodeFieldChange.bind(this);
        this.gameCodeSearchCallback = this.gameCodeSearchCallback.bind(this);
    }

    componentDidMount() {
        SocketConnection.setGameCodeSearchCallback(this.gameCodeSearchCallback);
    }

    gameCodeSearchCallback(searchResult) {
        if (!searchResult.foundGame) {
            this.setState({
                errorMessage: 'Could not find game'
            })
        } else {
            this.props.setGameCreatorUsername(searchResult.creator);
            this.props.setGameCode(this.state.gameCodeFieldText);
            this.props.history.push("/joingamelobby");
        }
    }

    joinGameButtonOnClick() {
        if (this.state.gameCodeFieldText === 'Enter game id' || this.state.gameCodeFieldText === '') {
            this.setState({
                errorMessage: 'Please enter game code'
            })
        } else {
            SocketConnection.connect(this.props.username, 2, this.state.gameCodeFieldText);
        }
    }

    gameCodeFieldChange(e) {
        this.setState({
            gameCodeFieldText: e.target.value
        })
    }

    clearGameCodeField() {
        this.setState({
            gameCodeFieldText: ''
        })
    }

    render() {
        return (
            <div>
                <div id="findGameComponentContainer">
                    <p id="startScreenLogo">Tic Tac Toe</p>
                    <label>
                        <input id="startScreenUserNameField" type="text" onClick={this.clearGameCodeField} onChange={this.gameCodeFieldChange} value={this.state.gameCodeFieldText} />
                    </label>
                    <button id="continueButton" onClick={this.joinGameButtonOnClick}>Join</button>
                    <p id="errorMessage">{this.state.errorMessage}</p>
                </div>
            </div>
        )
    }
}
