import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./components/home/Home"
import Lobby from "./components/lobby/Lobby";
import LobbiesList from "./components/lobby/LobbiesList";
import CreateLobby from "./components/lobby/CreateLobby";
import './components/css/app.css';

// Notifications
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// Function to restrict some routes to non-authenticated players
import RequireAuth from './misc/RequireAuth';

// Routes redirecting a path to a component
class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />

          {/* The following routes require authentications */}
          <Route exact path="/lobby/:lobbyid" component={RequireAuth(Lobby)} />
          <Route exact path="/lobbies" component={RequireAuth(LobbiesList)} />
          <Route exact path="/createlobby" component={RequireAuth(CreateLobby)} />
        </Switch>
        {/* Used for notifications */}
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
