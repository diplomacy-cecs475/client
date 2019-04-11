import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import { createNotification } from '../../misc/CreateNotification';
import { setToken, clearToken } from '../../authentication/Token';
import { Authenticate } from '../../sockets/Authenticate';
import { Connect } from '../../sockets/Connect';
import '../css/home.css';

// connect to the server
global.socket = Connect('http://statecraft.tk');
// global.socket = Connect(':4000');

class Home extends Component {
    componentDidMount() {
        // set as default the last username used
        var username = localStorage.getItem("username");
        document.getElementById("input-username").value = username;
    }

    onAuthenticate(e, url) {
        // Get the value of the username input
        var username = document.getElementById("input-username").value;
        e.preventDefault();

        // If no username was found
        if (!username) {
            // Display a notification warning
            createNotification('warning', 'Please insert your username');
            return;
        }
        // Authenticate with the server
        Authenticate(username).then(response => {
            // save the token
            setToken(response.tokenId);
            // save the username
            localStorage.setItem("username", response.username);
            // change to a new page
            window.location = url;
        });
    }
    render() {
        // Clear the current
        clearToken();

        return (
            <div className="home-container">
                <Header noBackButton={true} />
                <div className="container">
                    <div className="mb-5">
                        <input className="col-2 offset-5 form-control" id="input-username" type="text" placeholder="Username" autoComplete="off" />
                    </div>
                    <div className="row mx-auto">
                        <div className="col-6 text-right">
                            <Link onClick={(e) => this.onAuthenticate(e, '/lobbies')} className="btn btn-dark home-button" to="/lobbies">
                                Join a room
                            </Link>
                        </div>
                        <div className="col-6 text-left">
                            <Link onClick={(e) => this.onAuthenticate(e, '/createlobby')} className="btn btn-dark home-button" to="/createlobby">
                                Create a room
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <h2>How to play</h2>
                    <iframe title="how to play" width="560" height="315" src="https://www.youtube.com/embed/v9rcnahI-_s" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        );
    }
};

export default Home;
