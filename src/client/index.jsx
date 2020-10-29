import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import { StartScreenComponent } from "./StartScreenComponent";
import { NewGameComponent } from "./NewGameComponent";
import { JoinGameComponent } from "./JoinGameComponent";
import { JoinGameLobbyComponent } from "./JoinGameLobbyComponent";
import { CreateGameLobbyComponent } from "./CreateGameLobbyComponent";
import { RandomGameComponent } from "./RandomGameComponent";
import { GameComponent } from "./GameComponent";

export class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showStartScreen: true,
            showFindGameScreen: false,
            gameCode: '',
            gameCreatorUsername: '',
            turnIdentification: ''
        }

        this.setUsername = this.setUsername.bind(this);
        this.setGameCode = this.setGameCode.bind(this);
        this.setGameCreatorUsername = this.setGameCreatorUsername.bind(this);
        this.startGameCallback = this.startGameCallback.bind(this);
        this.setTurnIdentification = this.setTurnIdentification.bind(this);
    }

    startGameCallback() {
        this.props.history.push('/game');
    }

    setGameCreatorUsername(gameCreatorUsername) {
        this.setState({
            gameCreatorUsername: gameCreatorUsername
        });
    }

    setGameCode(gameCode) {
        console.log("GC SET! ");
        this.setState({
            gameCode: gameCode
        });
    }

    setUsername(username) {
        this.setState({
            username: username
        });
    }

    setTurnIdentification(turnIdentification) {
        console.log("SET: ");
        console.log(turnIdentification);

        this.setState({
            turnIdentification: turnIdentification
        });
    }

    render() {
        let v = React.version;
        console.log("VERSION: ");
        console.log(v);
        
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path='/' render={(props) => <StartScreenComponent {...props} setUsername={this.setUsername} />} />
                        <Route exact path='/newGame' render={(props) => <NewGameComponent {...props} username={this.state.username} setGameCode={this.setGameCode} />} />
                        <Route exact path='/joingame' render={(props) => <JoinGameComponent {...props} username={this.state.username} setGameCreatorUsername={this.setGameCreatorUsername} setGameCode={this.setGameCode} />} />
                        <Route exact path='/joingamelobby' render={(props) => <JoinGameLobbyComponent {...props} gameCreatorUsername={this.state.gameCreatorUsername} currentUsername={this.state.username} setTurnIdentification={this.setTurnIdentification} />} />
                        <Route exact path='/creategamelobby' render={(props) => <CreateGameLobbyComponent {...props} gameCode={this.state.gameCode} creatorUsername={this.state.username} setTurnIdentification={this.setTurnIdentification} />} />
                        <Route exact path='/randomgamelobby' render={(props) => <RandomGameComponent {...props} />} />
                        <Route exact path='/game' render={(props) => <GameComponent {...props} username={this.state.username} turnIdentification={this.state.turnIdentification} gameCode={this.state.gameCode} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );

    }
}

ReactDOM.render(<App />, document.getElementById("root"));