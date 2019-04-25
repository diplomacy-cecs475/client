import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import { createNotification } from '../../misc/CreateNotification';
import '../css/home.css';

class Home extends Component {
    componentDidMount() {
        // set as default the last username used
        document.getElementById("input-username").value = localStorage.getItem("username");
    }

    onAuthenticate(e, url) {
        // Get the value of the username input
        var username = document.getElementById("input-username").value;

        // prevent the default action of the  button
        e.preventDefault();

        // If no username was found
        if (!username) {
            // Display a notification warning
            createNotification('warning', 'Please insert your username');
            return;
        }
        // Authenticate with the server
        global.socket.emit("add user", { username: username }).then((response) => {
            // change to a new page
            window.location = url;
        });
    }

    render() {
        global.socket.clearUser();

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
