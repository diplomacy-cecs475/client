import React, { Component } from 'react';
import Header from '../header/Header';
import '../css/lobbies_list.css';
import '../css/bg.css';
import { createNotification } from '../../misc/CreateNotification';

class LobbiesList extends Component {
    constructor() {
        super();
        this.state = {
            lobbies: undefined,
            tokenId: undefined
        };

        //Put all the socket on soket folder
        global.socket.emit("list room");

        global.socket.on('join room:response', (data) => {
          console.log("response = ", data);
          if (data.success)
          {
            //TODO change location
            createNotification('success', "Join room was succesful");
          }
          else
            createNotification('error', data.response);
        });
    }

    componentDidMount() {
        // Initialize some test lobbies until the server communication works

        global.socket.on('list room:response', (data) => {
          this.setState({lobbies:data.response});
        });

        // this.setState({
        //     lobbies: [
        //         { tokenId: 0, name: "test", isPublic: false, status: "In lobby", users: [{username: "test2"}]}
        //     ]
        // });

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
              //If the room need a password, we add the lock icon and set the modal when the user click on the row
              if (!lobby.public)
                return (
                  <tr className="lobby-list-row" data-toggle="modal" data-target="#passwordModal" key={lobby.tokenId} onClick={() => this.setState({tokenId: lobby.tokenId})}>
                    <th scope="row">{lobby.name}</th>
                    <td>{lobby.users[0].username}</td>
                    <td>{String(lobby.users.length)}</td>
                    <td>In lobby<i className="fas fa-lock ml-4"></i></td>
                </tr >
                );
                //Room public
                return (
                  <tr className="lobby-list-row" key={lobby.tokenId} onClick={() => {
                      this.setState({tokenId: lobby.tokenId});
                      global.socket.emit("join room", this.state.tokenId, "");
                  }}>
                        <th scope="row">{lobby.name}</th>
                        <td>{lobby.users[0].username}</td>
                        <td>{String(lobby.users.length)}</td>
                        <td>In lobby</td>
                    </tr >
                );
            }
            return (
                <tr className="lobby-list-row-disabled" key={lobby.tokenId}>
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

    joinRoomPrivate() {
      console.log("pass = ", this.refs.password.value);
      global.socket.emit("join room", this.state.tokenId, this.refs.password.value);
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
                <div className="modal fade" id="passwordModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Password needed</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <input ref="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.joinRoomPrivate.bind(this)}>Validate</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div >

        );
    }
};

export default LobbiesList;
