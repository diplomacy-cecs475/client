const { emit } = require('./socket_functions/emit');

export function Authenticate(username) {
    return (emit("add user", { username: username }, false));
}
