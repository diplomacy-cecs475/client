import React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'

// Function used to display a component only if the user's token is found
export default function requireAuth(Component) {
    class AuthenticatedComponent extends React.Component {
        render() {
            // check if user is connected
            if (global.socket.isConnected()) {
                return (<Component {...this.props} />);
            }
            // if not, redirect to the login page
            return <Redirect to='/' />
        }
    }

    return withRouter(AuthenticatedComponent);
}