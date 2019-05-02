import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../header/Header';
import Chat from '../chat/Chat';
import Map from './Map';
import Flags from './Flags';
import '../css/game.css';
import { createNotification } from '../../misc/CreateNotification';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            players: undefined,
            time_remaining: undefined,
            game_name: undefined,
            round_info: undefined,
            chatting_with: undefined,
            territories: undefined,
            chat_messages: {},
            chat_notifications: []
        };

        this.timer_interval = null;
        this.map_ref = React.createRef();
        this.chat_ref = null;

        // Season info
        this.starting_year = 1900;
        this.seasons = ["Spring", "Fall"];
    }

    componentDidMount() {
        global.socket.reconnect();
        ///// DEBUG /////
        if (this.props.match.params.gameid === "test") {
            this.updateRoomInfo({
                name: "test",
                users: [{ username: localStorage.getItem("username"), ready: false, country: "France" }],
                timer: 5,
                map: [
                    { country: "France", key: "Par", user: localStorage.getItem("username"), units: { army: true, fleet: false } }
                ]
            });
            return;
        }
        ///// !DEBUG /////


        global.socket.emit("get room", { token: this.props.match.params.gameid }).then((response) => {
            this.updateRoomInfo(response);
        });
        global.socket.setListener("update room:event", (data) => {
            this.updateRoomInfo(data.find((room) => { return (room.name === this.state.game_name) }));
        });
        global.socket.setListener("orders sent:event", (data) => this.onOrderSent(data));

        global.socket.setListener("round:event", (data) => {
            this.map_ref.current.roundFinished();
            this.updateRoomInfo(data);
            createNotification("info", "Season :" + this.state.round_info + " has started");
        });

        global.socket.setListener("msgPriv", (data) => {
            var { chat_messages, chat_notifications } = this.state;
            // Get stored message for contact 'userFrom'
            if (!chat_messages[data.userFrom])
                chat_messages[data.userFrom] = [];
            // add the new message
            chat_messages[data.userFrom].push({ message: data.msg, date: "now", username: data.userFrom });
            // If the chat is currently open
            if (this.chat_ref) {
                var chat_msg = this.chat_ref.current.state.messages;
                chat_msg.push({ message: data.msg, date: "now", username: data.userFrom });
                this.chat_ref.current.setState({ messages: chat_msg })
            }
            else {
                if (!chat_notifications.find((contact) => { return (contact === data.userFrom) }))
                    chat_notifications.push(data.userFrom);
            }
            this.setState({ chat_messages: chat_messages, chat_notifications: chat_notifications });
        });

        this.timer_interval = setInterval(this.deacreaseTimer.bind(this), 1000);
    }

    removeNotification(contact_name) {
        var { chat_notifications } = this.state;
        var index = chat_notifications.findIndex((contact) => { return (contact === contact_name) });
        if (index >= 0)
            chat_notifications.splice(index, 1);
        this.setState({ chat_notifications: chat_notifications });
    }

    notificationForContact(contact_name) {
        var { chat_notifications } = this.state;
        return (chat_notifications.find((contact) => { return (contact === contact_name) }));
    }

    onOrderSent(users) {
        var { players } = this.state;

        users.forEach((user) => {
            var player = this.getUserInfo(user.username);
            if (player)
                player.ready = user.orders;
        });
        this.setState({ players: players });
    }

    componentWillUnmount() {
        if (this.timer_interval)
            clearInterval(this.timer_interval);
    }

    updateRoomInfo(data) {
        if (!data)
            return;
        this.setState({
            game_name: data.name,
            players: data.users,
            round_duration: data.timer,
            round_info: this.seasons[data.roundNumber % 2] + " " + Math.floor(this.starting_year + data.roundNumber / 2),
            time_remaining: data.timer * 60,
            territories: data.map
        });

    }

    deacreaseTimer() {
        var { time_remaining } = this.state;
        const me_info = this.getUserInfo(localStorage.getItem("username"));

        if (time_remaining === 0 && me_info.admin) {
            this.endRound();
            return;
        }
        if (!time_remaining && time_remaining === 0) {
            return;
        }
        this.setState({ time_remaining: time_remaining - 1 });
    }

    getUserInfo(username) {
        if (!this.state.players)
            return (null);
        return (this.state.players.find((p) => { return (p.username === username) }))
    }

    leaveRoom() {
        global.socket.emit("leave room");
    }

    endRound() {
        global.socket.emit("end round", false);
    }

    // Display the game header with game informations
    displayGameHeader() {
        // Get the informations from the state
        const { round_info, game_name, time_remaining } = this.state;
        const me_info = this.getUserInfo(localStorage.getItem("username"));

        if (!me_info)
            return;
        var timer_seconds = time_remaining % 60;
        var timer_minutes = Math.floor(time_remaining / 60);
        if (timer_seconds < 10)
            timer_seconds = "0" + timer_seconds;
        if (timer_minutes < 10)
            timer_minutes = "0" + timer_minutes;
        // display
        return (
            <header className="game-header row">
                <div className="col-lg-2 col-sm-6">
                    {timer_minutes}:{timer_seconds}
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
                    <button className="btn btn-success col-sm-6" disabled={me_info.ready} onClick={() => this.map_ref.current.sendOrders()}>Submit orders</button>
                    <button className="btn btn-success col-sm-6" hidden={!me_info.admin} onClick={() => { this.endRound() }}>Finish round</button>
                    <Link onClick={() => this.leaveRoom()} className="btn btn-danger game-leave-btn col-sm-6" to="/lobbies">Leave</Link>
                </div>
            </header>
        );
    }

    // Chat

    // Chat with a new user
    onClickChat(username) {
        this.removeNotification(username);
        this.setState({ chatting_with: username });
    }

    // Close current chat
    onClickChatClose() {
        var { chat_messages, chatting_with } = this.state;
        chat_messages[chatting_with] = this.chat_ref.current.state.messages;
        this.chat_ref = null;
        this.setState({
            chatting_with: undefined,
            chat_messages: chat_messages
        });
    }

    displayChat() {
        const { chatting_with, chat_messages } = this.state;

        var ref = React.createRef();
        this.chat_ref = ref;
        if (!chatting_with)
            return;
        return (
            <div className="game-right-element game-chat col-lg-12 col-md-12 col-sm-12">
                <div className="game-chat-title-container text-center">
                    <h3 className="game-chat-title">Chatting with <b>{chatting_with}</b></h3>
                    <button className="btn game-chat-close-btn" onClick={() => this.onClickChatClose()}><i className="fas fa-times fa-2x"></i></button>
                </div>
                <Chat contact={chatting_with} old_messages={chat_messages[chatting_with]} ref={this.chat_ref} />
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
                                                <i className={"fas fa-comments fa-2x " + (this.notificationForContact(player.username) ? "game-player-list-notification" : "")}></i>
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

        if (!territories) {
            return (<p>Loading..</p>);
        }
        return (
            <div>
                <Header noBackButton={true} />
                <div className="game-container">
                    {this.displayGameHeader()}
                    <div className="row game-content">
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <Map territories={territories} ref={this.map_ref} />
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
