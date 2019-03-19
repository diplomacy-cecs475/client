import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import Chat from '../chat/Chat';
import Map from './Map';
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
                { id: 1, username: "Antoine", country: "France", fleet: 1, army: 2, supply: 3},
                { id: 2, username: "BoB", country: "Germany", fleet: 1, army: 2, supply: 3 },
                { id: 3, username: "BoB", country: "Germany", fleet: 1, army: 2, supply: 3 },
                { id: 4, username: "BoB", country: "Germany", fleet: 1, army: 2, supply: 3 },
                { id: 5, username: "BoB", country: "Germany", fleet: 1, army: 2, supply: 3 },
                { id: 6, username: "BoB", country: "Germany", fleet: 1, army: 2, supply: 3 },
                { id: 7, username: "Kevin", country: "England", fleet: 1, army: 2, supply: 3 }
            ],
            time_remaining: "5:00",
            game_name: "test",
            round_info: "Round 1 - Spring 1901"
        });
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

    // Close current chat
    onClickChatClose() {
        this.setState({
            chatting_with: undefined,
        });
    }

    displayChat() {
        const { chatting_with } = this.state;

        if (!chatting_with)
            return;
        return (
            <div className="game-right-element game-chat col-lg-12 col-md-12 col-sm-12">
                <div className="game-chat-title-container text-center">
                    <h3 className="game-chat-title">Chatting with <b>{chatting_with}</b></h3>
                    <button className="btn game-chat-close-btn" onClick={() => this.onClickChatClose()}><i className="fas fa-times fa-2x"></i></button>
                </div>
                <Chat contact={chatting_with} />
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
                <div className="container inventory">
                  <ul>
                    <li className="d-flex justify-content-between align-items-center mt-4">
                      <span className="fleet-icon mx-auto"><i className="fas fa-ship fa-3x"></i>
                        <span className="icon-title ml-4">Fleet x</span>
                      </span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center mt-4">
                      <span className="army-icon mx-auto"><i className="fas fa-space-shuttle fa-3x"></i>
                        <span className="icon-title ml-4">Army x</span>
                      </span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center mt-4">
                      <span className="center-icon mx-auto"><i className="fas fa-warehouse fa-3x"></i>
                        <span className="icon-title ml-4">Supply center x</span>
                      </span>
                    </li>
                  </ul>
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
                            <Map />
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
