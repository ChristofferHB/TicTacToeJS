import React from "react";
import SocketConnection from "./SocketConnection";

export class GameComponent extends React.Component {

    constructor(props) {
  
        super(props);

        this.state = {
            boxData: [
                'X',
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
        SocketConnection.setPlayerMoveCallback(playerMoveCallback);
    }

    playerMoveCallback(data) {
        console.log("CB!!");
        console.log(data);
    }

    setBoxData(boxNumber) {

        let boxData = this.state.boxData;

        if(!boxData[boxNumber]) {
            switch(boxNumber) {
                case 0:
                    boxData[0] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 0);
    
                    break;
                
                case 1:
                    boxData[1] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 1);
    
                    break;
    
                case 2:
                    boxData[2] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 2);
    
                    break;
    
    
                case 3:
                    boxData[3] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 3);
    
                    break;
    
                case 4:
                    boxData[4] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 4);
    
                    break;
    
                case 5:
                    boxData[5] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 5);
    
                    break;
    
                case 6:
                    boxData[6] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 6);
    
                    break;
    
                case 7:
                    boxData[7] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 7);
    
                    break;
    
                case 8:
                    boxData[8] = this.props.turnIdentification;
    
                    this.setState({ 
                        boxData: boxData
                     });
    
                     SocketConnection.emitPlayerMove(this.props.username, 8);
    
                    break;
            }
        }
    }

    boxOnClick = (boxNumber) => {
        this.setBoxData(boxNumber);
    }

    render() {
            return (
                <div>
                    <div id="header"></div>
                    <div id="gameContainer">
                        <div id="gridContainer">
                        {this.state.boxData.map((item,i) => 
                            <div id="box" key={i} onClick={() => this.boxOnClick(i)}><p id="turnIdentification">{this.state.boxData[i]}</p></div>
                        )}
                        </div>
                    </div>
                </div>
            )
    }
}
