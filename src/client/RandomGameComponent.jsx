import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom';
import { NotFound } from "./not_found";

export class RandomGameComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            usernameFieldText: 'Enter game id'
        }

    }

    render() {
        return (
            <div id="gameLobbyComponentContainer">
                <div id="gameLobbyComponentHeader"></div>
            </div>
        )
    }
}
