import React from "react";
import SocketConnection from "./SocketConnection";

export class GameComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            boxData: [
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]
        }

        this.setBoxData = this.setBoxData.bind(this);
        this.boxOnClick = this.boxOnClick.bind(this);
        this.playerMoveCallback = this.playerMoveCallback.bind(this);
    }

    componentDidMount() {
        SocketConnection.setPlayerMoveCallback(this.playerMoveCallback);
    }

    playerMoveCallback(data) {
        console.log("CALLBACK: ");
        console.log(data);
        this.setBoxData(data.playerMove, data.playerName);
    }

    setBoxData(playerMove, playerName) {

        console.log("PLAYERMOVENAME: ");
        console.log(playerName);

        let boxData = this.state.boxData;

        if(!boxData[playerMove]) {

            if(playerName === undefined) { // undefined == this clients move
                boxData[playerMove] = this.props.turnIdentification;
            } else {
                if(this.props.turnIdentification === 'X') {
                    boxData[playerMove] = 'O';
                } else {
                    boxData[playerMove] = 'X';
                }
            }

            this.setState({
                boxData: boxData
            });

        }
    }

    boxOnClick = (boxNumber) => {
        this.setBoxData(boxNumber);
        SocketConnection.emitPlayerMove(this.props.gameCode, this.props.username, boxNumber);
    }

    render() {
        return (
            <div>
                <div id="header"></div>
                <div id="gameContainer">
                    <div id="gridContainer">
                        {this.state.boxData.map((item, i) =>
                            <div id="box" key={i} onClick={() => this.boxOnClick(i)}><p id="turnIdentification">{this.state.boxData[i]}</p></div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
