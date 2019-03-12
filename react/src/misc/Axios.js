import axios from 'axios';
import { getTokenInHeader } from '../authentication/Token';
import { createNotification } from './CreateNotification';

// Handle an error that has been catched
function handleError(error) {
    var response = undefined;

    if (error && error.response)
        response = error.response;
    // If the error content was not found
    if (!response || !response.data || !response.data.error) {
        return ("An error was catched");
    }
    response = response.data;
    // Create a notification with the error
    createNotification('warning', response.error);
    return (response.error);
}

// execute a http post request to a url with some data
export function httpPost(url, data) {
    return (new Promise(function (resolve, reject) {
        // call the axio's post function with the user's token
        axios.post(url, data, getTokenInHeader()).then(response => {
            resolve(response);
        }).catch(error => {
            reject(handleError(error));
        });
    }));
}

// execute a http get request to a url
export function httpGet(url) {
    return (new Promise(function (resolve, reject) {
        // call the axio's get function with the user's token
        axios.get(url, getTokenInHeader()).then(response => {
            resolve(response);
        }).catch(error => {
            reject(handleError(error));
        });
    }));
}