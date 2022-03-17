// import io from 'socket.io-client';
// let socket = io('https://localhost:3000');

import io from 'socket.io-client';
let socket = io('https://localhost:3000', {
  withCredentials: true,
});

console.log(socket);

export default socket;
