const { emit } = require('./socket_functions/emit');

export function sendMessage(message, contact) {
    return (emit("msg to", { username: contact, msg: message }));
}

export function sendGlobalMessage(message) {
    return (emit("msg global", { msg: message }));

}