import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import Chat from '../chat/Chat';
import '../css/bg.css';
import '../css/lobby.css';

class Lobby extends Component {
    constructor() {
        super();
        this.state = {
            players: [],
            lobby_name: undefined,
            max_players: undefined,
            round_duration: undefined,
            status: undefined
        };
    }

    componentDidMount() {
        // reconnect to the server
        global.socket.reconnect();
        this.getRoomInfo();
        global.socket.setListener("update room:event", (data) => {
            this.updateRoomInfo(data.find((room) => { return (room.name === this.state.lobby_name) }));
        });
        global.socket.setListener("start game:event", (data) => {
            window.location = "/game/" + data.tokenId;
        });
    }

    leaveRoom() {
        global.socket.emit("leave room");
    }

    isAdmin() {
        const my_username = localStorage.getItem("username");

        if (this.state.players.find((p) => { return (p.username === my_username && p.admin === true) }) === undefined)
            return (false);
        return (true);
    }

    updateRoomInfo(data) {
        if (!data)
            return;
        this.setState({
            lobby_name: data.name,
            max_players: data.nbUsersMax,
            players: data.users,
            round_duration: data.timer,
            status: 'Waiting for players'
        });
    }

    getRoomInfo() {
        global.socket.emit("get room", { token: this.props.match.params.lobbyid }).then((response) => {
            this.updateRoomInfo(response);
        });
    }

    startGame() {
        global.socket.emit("start game").then((response) => {
            console.log(response);
        });
        document.getElementById("start-game-btn").disabled = true;
    }

    render() {
        const { players, max_players, lobby_name, round_duration, status } = this.state;

        if (!players || !max_players)
            return (
                <div className="d-flex justify-content-center mt-4 pt-4">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            );
        return (
            <div>
                <Header noBackButton={true} />
                <div className="container bg-card pt-3 pb-1">
                    <div className="row lobby-content">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <h2 className="lobby-content-title text-center">Players ({players.length + "/" + max_players})</h2>
                            <div>
                                {players.map((player, index) => {
                                    if (player.admin) {
                                        return (
                                            <p key={"player" + index} className="lobby-player">{player.username}
                                                <label className="lobby-player-admin">Admin</label>
                                            </p>);
                                    }
                                    else
                                        return (<p key={"player" + index} className="lobby-player">{player.username}</p>);
                                })}
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-4 col-md-6 col-sm-6">
                            <h2 className="lobby-content-title text-center">Lobby settings</h2>
                            <div className="pl-5">
                                <p><b>Lobby name:</b> {lobby_name}</p>
                                <p><b>Round duration:</b> {round_duration}</p>
                                <p><b>Status:</b> {status}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 lobby-chat-container">
                        <Chat contact={lobby_name} lobbyChat={true} />
                    </div>
                    <div className="col-lg-5 col-sm-12 mx-auto text-center">
                        <button id="start-game-btn" disabled={!this.isAdmin()} className="btn btn-success col-lg-5 col-sm-6" onClick={() => this.startGame()}>Play</button>
                        <Link className="btn btn-danger col-lg-5 offset-lg-1 col-sm-6 lobby-leave-btn" to="/lobbies" onClick={() => this.leaveRoom()}>Leave</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Lobby;
