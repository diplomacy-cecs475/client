const { getToken } = require('../../authentication/Token');
const { createNotification } = require("../../misc/CreateNotification");

function createEmitPromise(eventName, dataToSend) {
    // return a Promise
    return (new Promise((resolve, reject) => {
        // add a listener to the response from the event
        global.socket.on(eventName + ":response", (data) => {
            // if the server send a negative response
            if (data.success === false) {
                createNotification('error', data.response);
                reject(data.response);
                return;
            }
            // resolve the response
            resolve(data.response);
        });
        // emit after 100ms
        setTimeout(() => global.socket.emit(eventName, dataToSend), 100);
        // Add a 5 seconds timeout in case the server does not respond
        setTimeout(() => { reject("Request has timeout") }, 5000);
    }));
}

// Emit data to the server using a socket,
export function emit(eventName, dataToSend, reconnect = true) {
    // Reconnect to the server before emitting
    if (reconnect) {
        return (new Promise((resolve, reject) => {
            // reconnect
            emit("reconnect user", { tokenId: getToken() }, false).then(response => {
                // emit the original data
                createEmitPromise(eventName, dataToSend)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        }));
    }
    // emit the data to the server
    return (createEmitPromise(eventName, dataToSend));
}