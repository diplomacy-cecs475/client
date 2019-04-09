const { emit } = require('./socket_functions/emit');

export function CreateRoom(roomName, password, playerLimit) {
    return (emit("create room", [...roomName, (password.length === 0 ? true : false), password]));
}