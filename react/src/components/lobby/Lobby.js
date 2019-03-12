import React, { Component } from 'react';
import Header from '../header/Header';

class Lobby extends Component {
    render() {
        return (
            <div>
                <Header backDestination="/lobbies" />
            </div>
        );
    }
};

export default Lobby;