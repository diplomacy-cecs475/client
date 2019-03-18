import React, { Component } from 'react';
import { sendChatMessage, sendChatMessageToLobby } from '../../sockets/Chat';
import '../css/chat.css';

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };
    }

    componentDidUpdate() {
        // Reset the position of the chat bar to the bottom
        this.resetChatScrollPositon();
    }

    onChatSubmit() {
        // Get the chat field 
        var message = document.getElementById("chat-input").value;

        // Send the message to the server using sockets
        if (this.props.lobbyChat)
            sendChatMessageToLobby(this.props.contact, message);
        else
            sendChatMessage(this.props.contact, message);

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
        messages.push({ message: message, date: datetime, username: localStorage.getItem('username') });
        // Send the message
        this.setState({ messages: messages });
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

        if (!this.props.contact) {
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