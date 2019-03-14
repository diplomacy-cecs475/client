import React, { Component } from 'react';
import Header from '../header/Header';
import { Link } from "react-router-dom";
import "../css/bg.css";
import "../css/create_lobby.css";

class Lobby extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container bg-card pt-1 pb-2 pt-4">
                    <input className="col-2 offset-5 form-control mb-4" type="text" placeholder="Room name" />
                    <input className="col-2 offset-5 form-control mb-4" type="text" placeholder="Password" />
                    <div className="dropdown mx-auto mb-4">
                      <button className="btn btn-secondary dropdown-toggle col-2 offset-5" type="button" id="dropdownPlayers" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Total players
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownPlayers">
                        <a className="dropdown-item" href="#">2</a>
                        <a className="dropdown-item" href="#">3</a>
                        <a className="dropdown-item" href="#">4</a>
                        <a className="dropdown-item" href="#">5</a>
                        <a className="dropdown-item" href="#">6</a>
                        <a className="dropdown-item" href="#">7</a>
                      </div>
                    </div>
                    <div className="mx-auto mb-4 timer-btn">
                      <p className="font-weight-lighter">Round timer :</p>
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
                    <div className="mx-auto mb-3">
                      <Link className="btn btn-dark mx-auto" to="/lobby/0">Create room</Link>
                  </div>
                </div>
            </div>
        );
    }
};

export default Lobby;
