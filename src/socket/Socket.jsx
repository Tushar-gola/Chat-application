import io from 'socket.io-client';
// eslint-disable-next-line no-undef
const url = process.env.REACT_APP_SOCKET_BASE_URL;
console.log(url);
export const socket = io('http://192.168.1.24:9000/', {autoConnect: false, auth: {userId: ''}});
