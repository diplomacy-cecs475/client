import React, { Component } from 'react';
import Header from '../header/Header';
import "../css/bg.css";
import "../css/create_lobby.css";
import { createNotification } from '../../misc/CreateNotification';

class CreateLobby extends Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
          status: undefined
      };

      global.socket.on('create room:response', (data) => {
        if (data.success)
        {
          console.log("test"); //if we change the location it will disconnect the logout the user and destroy the room
          // window.location = "/lobby/" + data.response.tokenId;
        }
        else {
          createNotification('error', data.response);
        }
      });
  }

  create() {
    var name = this.refs.name.value.trim();

    if (name === "")
      createNotification('warning', 'Missing room name');
    else
      global.socket.emit("create room", this.refs.name.value, this.refs.password.value === "" ? true : false, this.refs.password.value);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container bg-card pt-1 pb-2 pt-4">
          <input ref="name" className="col-2 offset-5 form-control mb-4" type="text" placeholder="Room name" />
          <input ref="password" className="col-2 offset-5 form-control mb-4" type="password" placeholder="Password" />
          <select ref="players" className="custom-select custom-select-lg mb-3 col-2 offset-5">
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
                <input ref="timer3" type="radio" name="timer" value="30" autoComplete="off"/> 30 min
              </label>
              <label className="btn btn-dark">
                <input ref="timer4" type="radio" name="timer" value="1" autoComplete="off"/> 1 hour
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
