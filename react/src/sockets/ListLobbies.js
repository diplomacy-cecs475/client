const { emit } = require('./socket_functions/emit');

export function ListLobbies() {
  return emit("list room");
}

export function JoinRoom(tokenId, password) {
  return emit("join room:response", tokenId, password);
}
