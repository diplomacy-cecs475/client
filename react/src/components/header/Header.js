import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../css/header.css';

class Header extends Component {

    // Display the 'go back' button
    displayBackButton() {
        // If no back button is requested, return
        if (this.props.noBackButton === true)
            return;
        // Default destination
        var backDestination = "/";

        // Apply a custom destination if requested
        if (this.props.backDestination)
            backDestination = this.props.backDestination;

        // Display
        return (
            <div className="container">
                <Link className="back-button" to={backDestination}><i className="fas fa-chevron-circle-left fa-2x"></i></Link>
            </div>);
    }

    render() {
        return (
            <div>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><h1 className="statecraft-title text-center">StateCraft</h1></Link>
                {this.displayBackButton()}
            </div>
        );
    }
};

export default Header;