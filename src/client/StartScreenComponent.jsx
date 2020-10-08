import React from "react";
import { withRouter } from 'react-router-dom';

export class StartScreenComponent extends React.Component {

    constructor(props) {
  
        super(props);

        this.state = {
            usernameFieldText: 'Enter nickname',
            errorMessage: ''
        }

        this.continueButtonOnClick = this.continueButtonOnClick.bind(this);
        this.usernameFieldChange = this.usernameFieldChange.bind(this);
        this.clearUsernameField = this.clearUsernameField.bind(this);
    }

    continueButtonOnClick() {
          
        if(this.state.usernameFieldText === 'Enter nickname' || this.state.usernameFieldText === '') {
            this.setState({
                errorMessage: 'Please enter a nickname'
              })
        } else {
            this.props.setUsername(this.state.usernameFieldText);
            this.props.history.push('/newgame');
        }
    }

    usernameFieldChange(e) {
        this.setState({
            usernameFieldText: e.target.value
          })
    }

    clearUsernameField() {
        this.setState({
            usernameFieldText: ''
          })
    }

    render() {

            return(
                <div>
                <div id="startScreenContainer">
                    <p id="startScreenLogo">Tic Tac Toe</p>
                    <label>
                            <input id="startScreenUserNameField" type="text" onClick={this.clearUsernameField} onChange={this.usernameFieldChange} value={this.state.usernameFieldText}/>
                    </label>
                    <button id="continueButton" onClick={this.continueButtonOnClick}>Continue</button>
                    <p id="errorMessage">{this.state.errorMessage}</p>
                </div>
            </div>
            );
    }
}
