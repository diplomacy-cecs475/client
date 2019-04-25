import socketIOClient from "socket.io-client";
import { createNotification } from "../misc/CreateNotification";

// Class storing a response from the server
class SocketResponse {
    constructor(response, code) {
        this.success = response.success;
        this.data = response.response;
        this.code = code;
    }
}

class Sockets {
    constructor() {
        this.listeners = [
            { endpoint: "add user:response", callback: this.authenticationCallback.bind(this) },
            { endpoint: "get room:response", callback: this.defaultCallback.bind(this) },
            { endpoint: "create room:response", callback: this.defaultCallback.bind(this) },
            { endpoint: "list room:response", callback: this.defaultCallback.bind(this) },
            { endpoint: "join room:response", callback: this.defaultCallback.bind(this) },
            { endpoint: "reconnect user:response", callback: this.defaultCallback.bind(this) },
            { endpoint: "leave room:response", callback: this.defaultCallback.bind(this) },
            { endpoint: "start game:response", callback: this.defaultCallback.bind(this) },
        ];
        // SocketIO's socket
        this.socket = null;
        // Message received
        this.messages_received = [];
        // Timeout in ms
        this.request_timeout = 5000;
        this.request_counter = 0;
    }
    // User

    isConnected() {
        if (!localStorage.getItem("x-access-token"))
            return (false);
        return (true);
    }

    clearUser() {
        localStorage.clear("x-access-token");
    }

    // Send

    // Find a message in the message list
    findMessageWithCode(code) {
        var message = null;
        // Search for the index of the message
        var index = this.messages_received.findIndex((m) => {
            return (m.code === code);
        });
        // If message exist
        if (index >= 0) {
            // get and remove the message from the list
            message = this.messages_received.splice(index, 1)[0];
        }
        // Return the message
        return (message);
    }

    // Send data to the server and return a response
    emit(endpoint, data) {
        // Check if socket exist
        if (!this.socket) {
            console.error("Emit failed, socket is null");
            return;
        }
        if (!data)
            data = {};

        // generate a code that the server will include in his response
        this.request_counter++;
        var code = this.request_counter;
        data.code = code;
        // send the data to the server
        this.socket.emit(endpoint, data);
        // wait for the response for {request_timeout} milliseconds
        return (new Promise((resolve, reject) => {
            // start an interval to check every 10ms if there was a response
            var interval = setInterval(() => {
                // Search if message was received
                const message = this.findMessageWithCode(code);
                // If so, return the message
                if (message !== null) {
                    // clear the interval
                    clearInterval(interval);
                    // if an error occured
                    if (message.success === false) {
                        createNotification("error", message.data);
                        reject(message.data);
                        return;
                    }
                    // else send the response
                    resolve(message.data);
                }
            }, 10);
            // set a timeout that will be called after {request_timeout} milliseconds without any response
            setTimeout(() => {
                clearInterval(interval);
                reject("Emit to :`" + endpoint + "` has timeout.");
            }, this.request_timeout);
        }));
    }

    // Receiver callbacks

    authenticationCallback(data) {
        // save username and user's token
        if (data.success) {
            console.log("set username to ", data.response.username);
            localStorage.setItem("username", data.response.username);
            localStorage.setItem("x-access-token", data.response.tokenId);
        }
        // Continue to the default callback
        this.defaultCallback(data);
    }

    defaultCallback(data) {
        this.messages_received.push(new SocketResponse(data, data.code));
    }

    // Connect and add all listeners

    setListener(endpoint, callback) {
        this.socket.on(endpoint, callback);
    }

    addAllListeners() {
        this.listeners.forEach((listener) => {
            this.setListener(listener.endpoint, listener.callback);
        });
    }

    // reconnect to the server
    reconnect() {
        this.emit("reconnect user", { tokenId: localStorage.getItem("x-access-token") }).then((response) => {
        });
    }

    connect(url) {
        console.log("Connecting to :" + url);
        this.socket = socketIOClient(url);
        this.addAllListeners();
    }

}

export default Sockets;