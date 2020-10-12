import React from "react";

export class GameComponent extends React.Component {

    constructor(props) {
  
        super(props);

    }

    render() {
            return (
                <div>
                    <div id="header"></div>
                    <div id="gameContainer">
                        <div id="gridContainer">
                            <div id="box"></div>
                            <div id="box"></div>
                            <div id="box"></div>
                            <div id="box"></div>
                            <div id="box"></div>
                            <div id="box"></div>
                            <div id="box"></div>
                            <div id="box"></div>
                            <div id="box"></div>
                        </div>
                    </div>
                </div>
            )
    }
}
