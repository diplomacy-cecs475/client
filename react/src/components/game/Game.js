import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import Chat from '../chat/Chat';
import Map from './Map';
import Flags from './Flags';
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
            territories: undefined
        };

        this.timer_interval = null;
    }

    componentDidMount() {
        global.socket.emit("get room", { token: this.props.match.params.gameid }).then((response) => {
            this.setState({
                game_name: response.name,
                players: response.users,
                round_duration: response.timer,
                round_info: "Round 1 - Spring 1901",
                time_remaining: response.timer,
                territories: response.map
            });
        });
        this.timer_interval = setInterval(this.deacreaseTimer, 1000);
    }

    componentWillUnmount() {
        if (this.timer_interval)
            clearInterval(this.timer_interval);
    }

    deacreaseTimer() {
        var { time_remaining } = this.state;

        if (!time_remaining)
            return;
        this.setState({ time_remaining: time_remaining - 1 });
    }

    getUserInfo(username) {
        return (this.state.players.find((p) => { return (p.username === username) }))
    }

    leaveRoom() {
        global.socket.emit("leave room");
    }

    // Display the game header with game informations
    displayGameHeader() {
        // Get the informations from the state
        const { round_info, game_name, time_remaining } = this.state;
        const me_info = this.getUserInfo(localStorage.getItem("username"));

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
                    <Flags className="flag-small" flag={me_info.country} />
                </div>
                <div className="col-lg-3 col-sm-12">
                    <button className="btn btn-success col-sm-6">Submit orders</button>
                    <Link onClick={() => this.leaveRoom()} className="btn btn-danger game-leave-btn col-sm-6" to="/lobbies">Leave</Link>
                </div>
            </header>
        );
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
        const my_username = localStorage.getItem("username");

        if (!players)
            return;

        return (
            <div className="game-right-element game-player-list  col-lg-12 col-md-12 col-sm-12">
                <h3 className="text-center game-right-title">Players</h3>
                <div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Ready</th>
                                <th scope="col">Username</th>
                                <th scope="col">Country</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map(player => {
                                return (
                                    <tr className="game-player-list-element" key={"player-" + player.username}>
                                        <td><span className={"circle " + (player.ready ? "text-success" : "text-danger")}></span></td>
                                        <td>{player.username}</td>
                                        <td><Flags className="flag-small" flag={player.country} /></td>
                                        <td>
                                            <button
                                                onClick={() => this.onClickChat(player.username)}
                                                className="btn game-chat-btn"
                                                disabled={player.username === my_username}>
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

    displayTerritoryList() {
        const { territories } = this.state;

        if (!territories)
            return (<p>Loading..</p>);
        // For each territory
        return (
            <div className="game-right-element game-territory-list col-lg-12 col-md-12 col-sm-12">
                <h3 className="text-center game-right-title">Territories</h3>
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-bordered table-dark table-striped mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Owner</th>
                                <th scope="col">Territory</th>
                                <th scope="col">Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {territories.map((territory) => {
                                var user = this.getUserInfo(territory.user);
                                return (
                                    <tr key={"territory-" + territory.name}>
                                        <td><Flags className="flag-small" flag={(user ? user.country : undefined)} /></td>
                                        <td>{territory.name}</td>
                                        <td>
                                            <i className="fas fa-male mr-1" hidden={!territory.units.army}></i>
                                            <i className="fas fa-anchor" hidden={!territory.units.fleet}></i>
                                        </td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

    render() {
        const { chatting_with, territories } = this.state;

        if (!territories)
            return (<p>Loading..</p>);
        return (
            <div>
                <Header noBackButton={true} />
                <div className="game-container">
                    {this.displayGameHeader()}
                    <div className="row game-content">
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <Map territories={territories} />
                        </div>
                        <div className="col-lg-5 col-md-12 col-sm-12 row">
                            {/* Display chat or player list */}
                            {(chatting_with ? this.displayChat() : this.displayPlayers())}
                            {this.displayTerritoryList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Game;
