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

    isPublic(val) {
      if (!val)
        return (<i className="fas fa-lock ml-4"></i>);
    }

    displayLobbies() {
        const { lobbies } = this.state;

        // If there is no lobbies, return
        if (!lobbies)
            return;

        console.log(lobbies);
        // Display each lobby
        return (lobbies.map(lobby => {
            // Display a different line if the lobby is available
            if (lobby.started !== true) {
                return (
                    <tr className="lobby-list-row" key={lobby.tokenId}>
                        <th scope="row">{lobby.name}</th>
                        <td>{lobby.users[0].username}</td>
                        <td>{String(lobby.users.length)}</td>
                        <td>In lobby{this.isPublic(lobby.pubic)}</td>
                    </tr >
                );
            }
            return (
                <tr className="lobby-list-row-disabled" data-toggle="modal" data-id="1" data-target="#passwordModal" key={lobby.tokenId}>
                    <th scope="row">{lobby.name}</th>
                    <td>Owner</td>
                    <td>{lobby.users.length}</td>
                    <td>Playing{this.isPublic(lobby.pubic)}</td>
                </tr >
            );
        }));

        //<tr className="lobby-list-row-disabled" onClick={() => window.location = "/lobby/" + lobby.tokenId} key={lobby.tokenId}>

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
                <div className="modal fade" id="passwordModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div >

        );
    }
};

export default LobbiesList;
