export function getLobbyList(socket) {
    return (new Promise((resolve, reject) => {
        socket.emit("list room");
        resolve();
    }));
}
