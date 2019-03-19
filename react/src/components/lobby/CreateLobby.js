import React, { Component } from 'react';
import Header from '../header/Header';
import { Link } from "react-router-dom";
import "../css/bg.css";
import "../css/create_lobby.css";

class CreateLobby extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container bg-card pt-1 pb-2 pt-4">
          <input className="col-2 offset-5 form-control mb-4" type="text" placeholder="Room name" />
          <input className="col-2 offset-5 form-control mb-4" type="text" placeholder="Password" />
          <select className="custom-select custom-select-lg mb-3 col-2 offset-5">
            <option value="" hidden >Total players</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <p class="text-center">Round timer:</p>
          <div className="mx-auto mb-4 timer-btn d-flex justify-content-center">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-dark active">
                <input type="radio" name="timer" id="5min" autocomplete="off" checked /> 5 min
                        </label>
              <label className="btn btn-dark">
                <input type="radio" name="timer" id="15min" autocomplete="off" /> 15 min
                        </label>
              <label className="btn btn-dark">
                <input type="radio" name="timer" id="30min" autocomplete="off" /> 30 min
                        </label>
              <label className="btn btn-dark">
                <input type="radio" name="timer" id="1hour" autocomplete="off" /> 1 hour
                        </label>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Link className="btn btn-dark mx-auto" to="/lobby/0">Create room</Link>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateLobby;
