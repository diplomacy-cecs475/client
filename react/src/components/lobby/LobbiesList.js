import React, { Component } from 'react';
import Header from '../header/Header';
import '../css/lobbies_list.css';
import '../css/bg.css';
import { ListLobbies, JoinRoom } from '../../sockets/ListLobbies';

class LobbiesList extends Component {
  constructor() {
    super();
    this.state = {
      lobbies: undefined,
      tokenId: undefined
    };

    ListLobbies().then(res => {
      console.log("Res = ", res);
      this.setState({ lobbies: res });
    });
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
            <tr className="lobby-list-row" data-toggle="modal" data-target="#passwordModal" key={lobby.tokenId} onClick={() => this.setState({ tokenId: lobby.tokenId })}>
              <th scope="row">{lobby.name}</th>
              <td>{lobby.users[0].username}</td>
              <td>{String(lobby.users.length)} / {lobby.nbUsersMax}</td>
              <td>In lobby<i className="fas fa-lock ml-4"></i></td>
            </tr >
          );
        //Room public
        return (
          <tr className="lobby-list-row" key={lobby.tokenId} onClick={() => {
            JoinRoom(lobby.tokenId, "").then(res => {
              window.location = "/lobby/" + res.tokenId;
            });
          }}>
            <th scope="row">{lobby.name}</th>
            <td>{lobby.users[0].username}</td>
            <td>{String(lobby.users.length)} / {lobby.nbUsersMax}</td>
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
                <input id="password" type="password" className="form-control" placeholder="Password" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {
                  JoinRoom(this.state.tokenId, document.getElementById('password').value).then(res => {
                    console.log(res);
                    window.location = "/lobby/" + res.tokenId;
                  });
                }}>Validate
                        </button>
              </div>
            </div>
          </div>
        </div>
      </div >

    );
  }
};

export default LobbiesList;
