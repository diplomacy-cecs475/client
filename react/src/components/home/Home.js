import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import { createNotification } from '../../misc/CreateNotification';
import Authenticate from '../../authentication/Authenticate';
import { setToken, clearToken } from '../../authentication/Token';
import '../css/home.css';

class Home extends Component {
    onAuthenticate(e, url) {
        // Get the value of the username input
        var username = document.getElementById("input-username").value;

        // If no username was found
        if (!username) {
            // Do not change page
            e.preventDefault();
            // Display a notification warning
            createNotification('warning', 'Please insert your username');
            return;
        }
        // Authenticate with the server
        Authenticate(username).then(response => {
            // Save the token received from the server
            setToken(response.newToken);
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
                        <input className="col-2 offset-5 form-control" id="input-username" type="text" placeholder="Username" />
                    </div>
                    <div className="row mx-auto w-50">
                        <div className="col-6 text-center">
                            <Link onClick={(e) => this.onAuthenticate(e, '/lobbies')} className="btn btn-dark home-button" to="/lobbies">
                                Join a room
                            </Link>
                        </div>
                        <div className="col-6 text-center">
                            <Link onClick={(e) => this.onAuthenticate(e, '/createlobby')} className="btn btn-dark home-button" to="/createlobby">
                                Create a room
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;
