import React from "react";

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

    }

    boxOnClick = (boxNumber) => {

        let boxData = this.state.boxData;

        switch(boxNumber) {
            case 1:
                boxData[0] = 'X';

                this.setState({ 
                    boxData: boxData
                 });

                break;
            
            case 2:
                console.log("2");
                break;

            case 3:
                console.log("3");
                break;


            case 4:
                console.log("4");
                break;

            case 5:
                console.log("5");
                break;

            case 6:
                console.log("6");
                break;

            case 7:
                console.log("7");
                break;

            case 8:
                console.log("8");
                break;

            case 9:
                console.log("9");
                break;
        }
    }

    render() {
        console.log("BOXDATA!");
        console.log(this.state.boxData[0]);
            return (
                <div>
                    <div id="header"></div>
                    <div id="gameContainer">
                        <div id="gridContainer">
                            <div id="box" onClick={() => this.boxOnClick(1)}>{this.state.boxData[0]}</div>
                            <div id="box" onClick={() => this.boxOnClick(2)}></div>
                            <div id="box" onClick={() => this.boxOnClick(3)}></div>
                            <div id="box" onClick={() => this.boxOnClick(4)}></div>
                            <div id="box" onClick={() => this.boxOnClick(5)}></div>
                            <div id="box" onClick={() => this.boxOnClick(6)}></div>
                            <div id="box" onClick={() => this.boxOnClick(7)}></div>
                            <div id="box" onClick={() => this.boxOnClick(8)}></div>
                            <div id="box" onClick={() => this.boxOnClick(9)}></div>
                        </div>
                    </div>
                </div>
            )
    }
}
