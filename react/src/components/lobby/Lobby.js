import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import Chat from '../chat/Chat';
import { GetRoomInfo } from '../../sockets/Rooms';
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
        GetRoomInfo(this.props.match.params.lobbyid).then(response => {
            console.log(response);
            this.setState({
                lobby_name: response.name,
                max_players: response.nbUsersMax,
                players: response.users,
                status: 'Waiting for players'
            });
        });
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
                <Header backDestination="/lobbies" />
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
                                        return (<p className="lobby-player">{player.username}</p>);
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
                        <Link className="btn btn-success col-lg-5 col-sm-6" to={"/game/" + this.props.match.params.lobbyid}>Play</Link>
                        <Link className="btn btn-danger col-lg-5 offset-lg-1 col-sm-6 lobby-leave-btn" to="/lobbies">Leave</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Lobby;
