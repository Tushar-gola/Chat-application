import io from 'socket.io-client';
// eslint-disable-next-line no-undef
const url = process.env.SOCKET_BASE_URL;
export const socket = io(url);
