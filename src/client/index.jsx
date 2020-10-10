import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import {StartScreenComponent} from "./StartScreenComponent";
import {NewGameComponent} from "./NewGameComponent";
import {JoinGameComponent} from "./JoinGameComponent";
import {JoinGameLobbyComponent} from "./JoinGameLobbyComponent";
import {CreateGameLobbyComponent} from "./CreateGameLobbyComponent";
import {RandomGameComponent} from "./RandomGameComponent";

export class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showStartScreen: true,
            showFindGameScreen: false,
            gameCode: ''
        }

        this.showFindGameScreen = this.showFindGameScreen.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setGameCode = this.setGameCode.bind(this);

    }

    setGameCode(gameCode) {
        this.setState({
            gameCode: gameCode
          });
    }

    showFindGameScreen() {
        this.setState({
            showStartScreen: false,
            showFindGameScreen: true
          });
    }

    setUsername(username) {
        this.setState({
            username: username
          });
    }


    render() {

        console.log("FROM RND: ");
        console.log(this.state.gameCode);

        return (
            <BrowserRouter>
                <div>
                    <Switch>
                            <Route exact path='/' render={(props) => <StartScreenComponent {...props} setUsername={this.setUsername} /> } />
                            <Route exact path='/newGame' render={(props) => <NewGameComponent {...props} username={this.state.username} setGameCode={this.setGameCode} /> } />
                            <Route exact path='/joingame' render={(props) => <JoinGameComponent {...props} username={this.state.username} /> } />
                            <Route exact path='/joingamelobby' render={(props) => <JoinGameLobbyComponent {...props} /> } />
                            <Route exact path='/creategamelobby' render={(props) => <CreateGameLobbyComponent {...props} gameCode={this.state.gameCode} creatorUsername={this.state.username} /> } />
                            <Route exact path='/randomgamelobby' render={(props) => <RandomGameComponent {...props} /> } />
                    </Switch>
                </div>
            </BrowserRouter>
    );

    }
}

ReactDOM.render(<App/>, document.getElementById("root"));