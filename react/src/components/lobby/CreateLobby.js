import React, { Component } from 'react';
import Header from '../header/Header';

class Lobby extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h1 className="text-center">Create a lobby</h1>
                </div>
            </div>
        );
    }
};

export default Lobby;