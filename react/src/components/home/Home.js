import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import '../css/home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Header noBackButton={true} />
                <div className="container">
                    <div className="mb-5">
                        <input className="col-2 offset-5 form-control" type="text" placeholder="Username" />
                    </div>
                    <div className="row mx-auto w-50">
                        <div className="col-6 text-center">
                            <Link className="btn btn-dark home-button" to="/lobbies">Join a room</Link>
                        </div>
                        <div className="col-6 text-center">
                            <Link className="btn btn-dark home-button" to="/createlobby">Create a room</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;
