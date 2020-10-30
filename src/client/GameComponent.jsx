import React from "react";
import SocketConnection from "./SocketConnection";

export class GameComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            boxData: [
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
                { turnIdentification: '', bgColor: '#fff' },
            ],
            canSetBoxData: true
        }

        this.setBoxData = this.setBoxData.bind(this);
        this.boxOnClick = this.boxOnClick.bind(this);
        this.playerMoveCallback = this.playerMoveCallback.bind(this);
        this.userWonGameCallback = this.userWonGameCallback.bind(this);
    }

    componentDidMount() {
        SocketConnection.setPlayerMoveCallback(this.playerMoveCallback);
        SocketConnection.setUserWonGameCallback(this.userWonGameCallback);
    }

    userWonGameCallback(data) {
        console.log("GOT DATA");
        console.log(data);

        let boxData = this.state.boxData;

        for(let i = 0; i < data.winData.winCondition.length; i++) {
            boxData[data.winData.winCondition[i]].bgColor = '#76c241';
        }

        this.setState({
            boxData: boxData,
            canSetBoxData: false
        });
    }

    playerMoveCallback(data) {
        console.log("CALLBACK: ");
        console.log(data);
        this.setBoxData(data.playerMove, data.playerName);
    }

    setBoxData(playerMove, playerName) {
            let boxData = this.state.boxData;

            if(!boxData[playerMove].turnIdentification) {
    
                if(playerName === undefined) { // undefined == this clients move
                    boxData[playerMove].turnIdentification = this.props.turnIdentification;
                } else {
                    if(this.props.turnIdentification === 'X') {
                        boxData[playerMove].turnIdentification = 'O';
                    } else {
                        boxData[playerMove].turnIdentification = 'X';
                    }
                }
    
                this.setState({
                    boxData: boxData
                });
    
            }
    }

    boxOnClick = (boxNumber) => {
        if(this.state.canSetBoxData) {
            console.log("BOXONCLICK: ");
            console.log(boxNumber);
            this.setBoxData(boxNumber);
            SocketConnection.emitPlayerMove(this.props.gameCode, this.props.username, boxNumber);
        }
    }

    render() {
        return (
            <div>
                <div id="header"></div>
                <div id="gameContainer">
                    <div id="gridContainer">
                        {this.state.boxData.map((item, i) =>
                            <div id="box" key={i} style={{backgroundColor: this.state.boxData[i].bgColor}} onClick={() => this.boxOnClick(i)}><p id="turnIdentification">{this.state.boxData[i].turnIdentification}</p></div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
