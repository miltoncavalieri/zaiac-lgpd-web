import { Component, render } from 'react';
import React, { createContext, useState, useEfect} from 'react';

const {Provider, Consumer} = createContext('authentication');

export class AuthenticationProvider extends Component {
    state = {
        auth: false,
        name: '',
        token: ''
    };

    render() {

    return (
        <Provider value={this.state}>{this.props.children}</Provider>
    );
    }
}

//export default AuthenticationContext;