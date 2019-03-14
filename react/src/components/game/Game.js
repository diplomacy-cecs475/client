import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import '../css/game.css';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            players: undefined,
            time_remaining: undefined,
            game_name: undefined,
            round_info: undefined,
            chatting_with: undefined,
            chat_messages: []
        };
    }

    componentDidMount() {
        // Debug initialization until the server is working
        this.setState({
            players: [
                { id: 1, username: "Antoine", country: "France" },
                { id: 2, username: "BoB", country: "Germany" },
                { id: 3, username: "BoB", country: "Germany" },
                { id: 4, username: "BoB", country: "Germany" },
                { id: 5, username: "BoB", country: "Germany" },
                { id: 6, username: "BoB", country: "Germany" },
                { id: 7, username: "Kevin", country: "England" }
            ],
            time_remaining: "5:00",
            game_name: "test",
            round_info: "Round 1 - Spring 1901"
        });
    }

    componentDidUpdate() {
        // Reset the position of the chat bar to the bottom
        this.resetChatScrollPositon();
    }

    // Display the game header with game informations
    displayGameHeader() {
        // Get the informations from the state
        const { round_info, game_name, time_remaining } = this.state;

        // display
        return (
            <header className="game-header row">
                <div className="col-lg-2 col-sm-6">
                    {time_remaining}
                </div>
                <div className="col-lg-4 col-sm-6">
                    {round_info}
                </div>
                <div className="col-lg-2 col-sm-6">
                    {game_name}
                </div>
                <div className="col-lg-2 col-sm-6">
                    Austria
                </div>
                <div className="col-lg-2 col-sm-12">
                    <button className="btn btn-success col-sm-6">Submit orders</button>
                    <Link className="btn btn-danger game-leave-btn col-sm-6" to="/lobbies">Leave</Link>
                </div>
            </header>
        )
    }

    // Chat

    // Chat with a new user
    onClickChat(username) {
        this.setState({ chatting_with: username });
    }

    onChatSubmit() {
        // Get the chat field 
        var message = document.getElementById("chat-input").value;
        var { chat_messages } = this.state;

        if (message.length === 0)
            return;

        var currentdate = new Date();
        var seconds = currentdate.getSeconds();
        // If the number of seconds is between 0 and 9, we add a 0 before
        if (seconds < 10)
            seconds = "0" + seconds;
        var datetime = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + seconds;

        // ONLY UNTIL SERVER
        chat_messages.push({ message: message, date: datetime, username: localStorage.getItem('username') });
        // 
        // Send the message
        this.setState({ chat_messages: chat_messages });
        // Clear the chat input
        document.getElementById("chat-input").value = "";
    }

    handleChatKey(e) {
        // If key pressed is enter, submit the message
        if (e.key === "Enter") {
            this.onChatSubmit();
        }
    }

    resetChatScrollPositon() {
        var element = document.getElementById("messages-container");
        if (element)
            element.scrollTop = element.scrollHeight;

    }
    // Close current chat
    onClickChatClose() {
        this.setState({
            chatting_with: undefined,
            chat_messages: []
        });
    }

    displayChat() {
        const { chatting_with, chat_messages } = this.state;

        if (!chatting_with)
            return;
        return (
            <div className="game-right-element game-chat col-lg-12 col-md-12 col-sm-12">
                <div className="game-chat-title-container text-center">
                    <h3 className="game-chat-title">Chatting with <b>{chatting_with}</b></h3>
                    <button className="btn game-chat-close-btn" onClick={() => this.onClickChatClose()}><i className="fas fa-times fa-2x"></i></button>
                </div>
                <div>
                    <div className="game-chat-messages-container" id="messages-container">
                        {chat_messages.map((message, index) => {
                            return (
                                <div key={"messages-" + index} className="game-chat-message">
                                    <label className="game-chat-message-username">{message.username}:</label>
                                    {message.message}<label className="game-chat-message-date">{message.date}</label>
                                </div>)
                        })}
                    </div>
                    <div className="input-group game-chat-input">
                        <input id="chat-input" type="text" className="form-control input-sm"
                            placeholder="Type your message here..." onKeyPress={(e) => this.handleChatKey(e)}
                            autoComplete="off" />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" onClick={() => this.onChatSubmit()}>
                                Send
                            </button>
                        </span>
                    </div>
                </div>
            </div>);
    }

    // Display the player list
    displayPlayers() {
        const { players } = this.state;

        if (!players)
            return;

        return (
            <div className="game-right-element game-player-list  col-lg-12 col-md-12 col-sm-12">
                <h3 className="text-center game-right-title">Players</h3>
                <div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Country</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map(player => {
                                return (
                                    <tr className="game-player-list-element" key={"player-" + player.id}>
                                        <td>{player.username}</td>
                                        <td>{player.country}</td>
                                        <td>
                                            <button onClick={() => this.onClickChat(player.username)} className="btn game-chat-btn">
                                                <i className="fas fa-comments fa-2x"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    displayInventory() {
        return (
            <div className="game-right-element game-inventory col-lg-12 col-md-12 col-sm-12">
                <h3 className="text-center game-right-title">Inventory</h3>
                <div>
                </div>
            </div>
        );
    }

    render() {
        const { chatting_with } = this.state;

        return (
            <div>
                <Header noBackButton={true} />
                <div className="game-container">
                    {this.displayGameHeader()}
                    <div className="row game-content">
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <img className="col-12" src="/images/map.png" alt="game map" />
                        </div>
                        <div className="col-lg-5 col-md-12 col-sm-12 row">
                            {/* Display chat or player list */}
                            {(chatting_with ? this.displayChat() : this.displayPlayers())}
                            {this.displayInventory()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Game;