import React, { Component } from 'react';
import Header from '../header/Header';
import '../css/lobbies_list.css';
import '../css/bg.css';

class LobbiesList extends Component {
    constructor() {
        super();
        this.state = {
            lobbies: undefined
        };

        global.socket.emit("list room");
    }

    componentDidMount() {
        // Initialize some test lobbies until the server communication works

        global.socket.on('list room:response', (data) => {
          this.setState({lobbies:data.response});
        });
        // this.setState({
        //     lobbies: [
        //         { id: 0, name: "test", owner: "antoine", nb_players: "1/4", status: "In lobby" },
        //         { id: 1, name: "room 2", owner: "bob", nb_players: "7/7", status: "Playing" }
        //     ]
        // });
    }

    displayLobbies() {
        const { lobbies } = this.state;

        // If there is no lobbies, return
        if (!lobbies)
            return;

        // Display each lobby
        return (lobbies.map(lobby => {
            // Display a different line if the lobby is available
            if (lobby.started !== true) {
                return (
                    <tr className="lobby-list-row" key={lobby.tokenId}>
                        <th scope="row">{lobby.name}</th>
                        <td>Owner</td>
                        <td>{String(lobby.users.length)}</td>
                        <td>"In lobby"</td>
                    </tr >
                );
            }
            return (
                <tr className="lobby-list-row-disabled" onClick={() => window.location = "/lobby/" + lobby.id} key={lobby.id}>
                    <th scope="row">{lobby.name}</th>
                    <td>Owner</td>
                    <td>{lobby.users.length}</td>
                    <td>"Playing"</td>
                </tr >
            );
        }));
        //     if (lobby.status === "Playing") {
        //         return (
        //             <tr className="lobby-list-row-disabled" key={lobby.id}>
        //                 <th scope="row">{lobby.name}</th>
        //                 <td>{lobby.owner}</td>
        //                 <td>{lobby.nb_players}</td>
        //                 <td>{lobby.status}</td>
        //             </tr >
        //         );
        //     }
        //     return (
        //         <tr className="lobby-list-row" onClick={() => window.location = "/lobby/" + lobby.id} key={lobby.id}>
        //             <th scope="row">{lobby.name}</th>
        //             <td>{lobby.owner}</td>
        //             <td>{lobby.nb_players}</td>
        //             <td>{lobby.status}</td>
        //         </tr >
        //     );
        // }));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container bg-card pt-3 pb-1">
                    <table className="table lobby-list-table">
                        <thead className="head">
                            <tr>
                                <th scope="col">Room name</th>
                                <th scope="col">Owner</th>
                                <th scope="col">Players</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayLobbies()}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
};

export default LobbiesList;
