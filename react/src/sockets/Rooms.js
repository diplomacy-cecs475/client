const { emit } = require('./socket_functions/emit');

export function CreateRoom(roomName, password, playerLimit, timer) {
    return (emit("create room", {
        name: roomName,
        publicVisibility: (password.length === 0 ? true : false),
        password: password,
        time: timer,
        nbUsersMax: playerLimit
    }));
}

export function GetRoomInfo(roomToken) {
    return (emit("get room", { tokenId: roomToken }));
}