import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import Chat from '../chat/Chat';
import '../css/bg.css';
import '../css/lobby.css';
import { Connect } from '../../sockets/Connect';
import { getToken } from '../../authentication/Token';

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

      //Reconnect the user, because each time the page is change, user is disconnect
      global.socket.emit("reconnect user", getToken());
    }

    componentDidMount() {


      global.socket.on('reconnect user:response', (data) => {

        console.log("data = ", data);
      });


        // Initialize until the server communication works
        this.setState({
            players: [
                { username: 'Antoine', admin: true },
                { username: localStorage.getItem('username'), admin: false }
            ],
            lobby_name: "test",
            max_players: '4',
            round_duration: "5:00 min",
            status: 'Waiting for players'
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
                                {players.map(player => {
                                    if (player.admin) {
                                        return (
                                            <p className="lobby-player">{player.username}
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
