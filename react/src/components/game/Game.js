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
            chatting_with: undefined
        };
    }

    componentDidMount() {
        // Debug initialization until the server is working
        this.setState({
            players: [
                { id: 1, username: "Antoine", country: "France" },
                { id: 1, username: "BoB", country: "Germany" },
                { id: 1, username: "BoB", country: "Germany" },
                { id: 1, username: "BoB", country: "Germany" },
                { id: 1, username: "BoB", country: "Germany" },
                { id: 1, username: "BoB", country: "Germany" },
                { id: 1, username: "Kevin", country: "England" }
            ],
            time_remaining: "5:00",
            game_name: "test",
            round_info: "Round 1 - Spring 1901"
        })
    }

    // Display the game header with game informations
    displayGameHeader() {
        // Get the informations from the state
        const { round_info, game_name, time_remaining } = this.state;

        // display
        return (
            <header className="game-header row">
                <div className="col-2">
                    {time_remaining}
                </div>
                <div className="col-4 col-md 2">
                    {round_info}
                </div>
                <div className="col-2">
                    {game_name}
                </div>
                <div className="col-2">
                    Austria
                </div>
                <div className="col-2">
                    <button className="btn btn-success">Submit orders</button>
                    <Link className="btn btn-danger" to="/lobbies">Leave</Link>
                </div>
            </header>
        )
    }

    // Chat

    // Chat with a new user
    onClickChat(username) {
        this.setState({ chatting_with: username });
    }

    // Close current chat
    onClickChatClose() {
        this.setState({ chatting_with: undefined });
    }

    displayChat() {
        const { chatting_with } = this.state;

        if (!chatting_with)
            return;
        return (
            <div className="game-right-element game-chat">
                <div className="game-chat-title-container text-center">
                    <h3 className="game-chat-title">Chatting with <b>{chatting_with}</b></h3>
                    <button className="btn game-chat-close-btn" onClick={() => this.onClickChatClose()}><i class="fas fa-times fa-2x"></i></button>
                </div>
                <div>
                </div>
            </div>);
    }

    // Display the player list
    displayPlayers() {
        const { players } = this.state;

        if (!players)
            return;

        return (
            <div className="game-right-element game-player-list">
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
                                    <tr className="game-player-list-element">
                                        <td>{player.username}</td>
                                        <td>{player.country}</td>
                                        <td>
                                            <button onClick={() => this.onClickChat(player.username)} className="btn game-chat-btn">
                                                <i class="fas fa-comments fa-2x"></i>
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
            <div className="game-right-element game-inventory">
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
                        <div className="col-7">
                            <img className="col-12" src="/images/map.png" alt="game map" />
                        </div>
                        <div className="col-5">
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