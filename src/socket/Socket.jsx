import io from 'socket.io-client';
const url = process.env.SOCKET_BASE_URL;
export const socket = io(url);
