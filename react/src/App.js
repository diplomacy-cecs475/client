import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/home/home"
import Lobby from "./components/lobby/lobby";
import LobbiesList from "./components/lobby/lobbiesList";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby/:lobbyid" component={Lobby} />
          <Route exact path="/lobbies" component={LobbiesList} />
        </Switch>
      </div>
    );
  }
}

export default App;
