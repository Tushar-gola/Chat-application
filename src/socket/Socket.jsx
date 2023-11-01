import io from 'socket.io-client';
// eslint-disable-next-line no-undef
const url = process.env.REACT_APP_SOCKET_BASE_URL;
export const socket = io(url, {autoConnect: false, auth: {userId: ''}});
socket.onAny((event, ...args)=>{
  console.log( event, args, 'kkkkkkkkkkkkkkkkkkkkkkkkkkk');
});
