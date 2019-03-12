import React, { Component } from 'react';
import Header from '../header/Header';
import '../css/lobbies_list.css';

class LobbiesList extends Component {
    constructor() {
        super();
        this.state = {
            lobbies: undefined
        };
    }

    componentDidMount() {
        this.setState({
            lobbies: [
                { id: 0, name: "test", owner: "antoine", nb_players: "1/4", status: "In lobby" },
                { id: 1, name: "test", owner: "antoine", nb_players: "1/4", status: "In lobby" }
            ]
        });
    }

    displayLobbies() {
        const { lobbies } = this.state;

        if (!lobbies)
            return;

        return (lobbies.map(lobby => {
            return (
                <tr className="lobby-list-row" onClick={() => window.location = "/lobby/" + lobby.id} key={lobby.id} >
                    <th scope="row">{lobby.name}</th>
                    <td>{lobby.owner}</td>
                    <td>{lobby.nb_players}</td>
                    <td>{lobby.status}</td>
                </tr >
            )
        }));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <table className="table lobby-list-table">
                        <thead className="thead-dark">
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