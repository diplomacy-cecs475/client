import React, { Component } from 'react';
import '../css/chat.css';

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        if (this.props.lobbyChat) {
            global.socket.socket.on("msgGlobal", (data) => {
                this.addNewMessage(data.msg, data.userFrom);
            });
        }
        else {
            global.socket.socket.on("msgPriv", (data) => {
                this.addNewMessage(data.msg, data.userFrom);
            });
        }
    }

    componentDidUpdate() {
        // Reset the position of the chat bar to the bottom
        this.resetChatScrollPositon();
    }

    addNewMessage(message, sender) {
        // Add my message to the chat
        var { messages } = this.state;

        if (message.length === 0)
            return;

        // Get the current time
        var currentdate = new Date();
        var seconds = currentdate.getSeconds();

        // If the number of seconds is between 0 and 9, we add a 0 before
        if (seconds < 10)
            seconds = "0" + seconds;
        var datetime = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + seconds;

        // Add the message
        messages.push({ message: message, date: datetime, username: sender });
        this.setState({ messages: messages });
    }

    onChatSubmit() {
        // Get the chat field 
        var message = document.getElementById("chat-input").value;

        // Send the message to the server using sockets
        // if it's a global chat
        if (this.props.lobbyChat) {
            global.socket.socket.emit("msg global", { msg: message });
        }
        else {
            global.socket.socket.emit("msg to", { username: this.props.contact, msg: message });
        }
        // add the message to the chat
        this.addNewMessage(message, localStorage.getItem('username'));
        // Clear the chat input
        document.getElementById("chat-input").value = "";
    }

    handleChatKey(e) {
        // If key pressed is enter, submit the message
        if (e.key === "Enter") {
            this.onChatSubmit();
        }
    }

    // Reset the scroll bar position to the bottom
    resetChatScrollPositon() {
        var element = document.getElementById("messages-container");
        if (element)
            element.scrollTop = element.scrollHeight;

    }

    render() {
        const { messages } = this.state;

        if (!this.props.lobbyChat && !this.props.contact) {
            return (<p>Contact not found</p>);
        }
        return (
            <div>
                <div className="chat-messages-container" id="messages-container">
                    {messages.map((message, index) => {
                        return (
                            <div key={"messages-" + index} className="chat-message">
                                <label className="chat-message-username">{message.username}:</label>
                                {message.message}<label className="chat-message-date">{message.date}</label>
                            </div>)
                    })}
                </div>
                <div className="input-group chat-input">
                    <input id="chat-input" type="text" className="form-control input-sm"
                        placeholder="Type your message here..." onKeyPress={(e) => this.handleChatKey(e)}
                        autoComplete="off" />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={() => this.onChatSubmit()}>
                            Send
                        </button>
                    </span>
                </div>
            </div>
        );
    }
};

export default Chat;