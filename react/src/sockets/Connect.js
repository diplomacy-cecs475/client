import socketIOClient from "socket.io-client";

export function Connect(url) {
    return (socketIOClient(url));
}