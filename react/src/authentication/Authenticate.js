// import { httpPost } from '../misc/Axios';

// Authenticate to the server
export default function (username) {
    // Until the server is implemented
    return (new Promise((resolve, reject) => {
        resolve({ newToken: "newtoken" });
    }));
    // Send a post request
    // return (httpPost('/authenticate', { username: username }));
}