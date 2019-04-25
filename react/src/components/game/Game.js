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
        global.socket.emit("get room", { token: this.props.match.params.gameid }).then((response) => {
            this.setState({
                game_name: response.name,
                players: response.users,
                round_duration: response.timer,
                round_info: "Round 1 - Spring 1901",
                time_remaining: "5:00",
            });
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
                <div className="col-lg-1 col-sm-6">
                    Austria
                </div>
                <div className="col-lg-3 col-sm-12">
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
                <h3 className="text-center game-right-title">Units</h3>
                  <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-bordered table-dark table-striped mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Territory</th>
                          <th scope="col">flag</th>
                          <th scope="col">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>France</td>
                          <td>Otto</td>
                          <td>fleet</td>
                        </tr>
                        <tr>
                          <td>Spain</td>
                          <td>Thornton</td>
                          <td>army</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
            </div>
        );
        // return (
        //     <div className="game-right-element game-inventory col-lg-12 col-md-12 col-sm-12">
        //         <h3 className="text-center game-right-title">Inventory</h3>
        //         <div className="container inventory">
        //             <ul>
        //                 <li className="d-flex justify-content-between align-items-center mt-4">
        //                     <span className="fleet-icon mx-auto"><i className="fas fa-anchor fa-3x"></i>
        //                         <span className="icon-title ml-4">Fleet x</span>
        //                     </span>
        //                 </li>
        //                 <li className="d-flex justify-content-between align-items-center mt-4">
        //                     <span className="army-icon mx-auto"><i className="fas fa-male fa-3x"></i>
        //                         <span className="icon-title ml-4">Army x</span>
        //                     </span>
        //                 </li>
        //                 <li className="d-flex justify-content-between align-items-center mt-4">
        //                     <span className="center-icon mx-auto"><i className="fas fa-warehouse fa-3x"></i>
        //                         <span className="icon-title ml-4">Supply center x</span>
        //                     </span>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // );
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
