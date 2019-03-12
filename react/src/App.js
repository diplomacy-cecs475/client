import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/home/Home"
import Lobby from "./components/lobby/Lobby";
import LobbiesList from "./components/lobby/LobbiesList";
import CreateLobby from "./components/lobby/CreateLobby";
import './components/css/app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby/:lobbyid" component={Lobby} />
          <Route exact path="/lobbies" component={LobbiesList} />
          <Route exact path="/createlobby" component={CreateLobby} />
        </Switch>
      </div>
    );
  }
}

export default App;
