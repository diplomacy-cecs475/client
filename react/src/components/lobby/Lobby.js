import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';

class Lobby extends Component {
    render() {
        return (
            <div>
                <Header backDestination="/lobbies" />
                <div className="container">
                    <Link className="btn btn-primary" to={"/game/" + this.props.match.params.lobbyid}>Play</Link>
                </div>
            </div>
        );
    }
};

export default Lobby;