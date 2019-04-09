import React, { Component } from 'react';
import Header from '../header/Header';
import { createNotification } from '../../misc/CreateNotification';
import { CreateRoom } from '../../sockets/CreateRoom';
import "../css/bg.css";
import "../css/create_lobby.css";

class CreateLobby extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: undefined
    };
  }

  create() {
    var name = document.getElementById('room_name').value;
    var password = document.getElementById('room_password').value;
    var player_limit = document.getElementById('room_player_limit').value;

    var min = this.refs.timer1.checked ? 5 : (this.refs.timer2.checked ? 15 : (this.refs.timer3.checked ? 30 : (this.refs.timer4.checked ? 60 : 5)));
    if (name === "" || player_limit === "")
      createNotification('warning', 'Some fields are empty');
    else {
      CreateRoom(name, password, player_limit, min).then(response => {
        window.location = "/lobby/" + response.tokenId;
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container bg-card pt-1 pb-2 pt-4">
          <input id="room_name" className="col-2 offset-5 form-control mb-4" type="text" placeholder="Room name" autoComplete="off" />
          <input id="room_password" className="col-2 offset-5 form-control mb-4" type="password" placeholder="Password" autoComplete="off" />
          <select id="room_player_limit" className="custom-select custom-select-lg mb-3 col-2 offset-5">
            <option value="" hidden >Total players</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <p className="text-center">Round timer:</p>
          <div className="mx-auto mb-4 timer-btn d-flex justify-content-center">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-dark active">
                <input ref="timer1" type="radio" name="timer" value="5" autoComplete="off" defaultChecked /> 5 min
              </label>
              <label className="btn btn-dark">
                <input ref="timer2" type="radio" name="timer" value="15" autoComplete="off" /> 15 min
              </label>
              <label className="btn btn-dark">
                <input ref="timer3" type="radio" name="timer" value="30" autoComplete="off" /> 30 min
              </label>
              <label className="btn btn-dark">
                <input ref="timer4" type="radio" name="timer" value="1" autoComplete="off" /> 1 hour
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-dark mx-auto" onClick={this.create.bind(this)}>Create room</button>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateLobby;
