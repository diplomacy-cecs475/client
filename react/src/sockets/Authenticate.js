
export function Authenticate(socket, username) {
    return (new Promise((resolve, reject) => {
        socket.emit("add user", username);
        resolve();
    }));
}