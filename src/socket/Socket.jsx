/* eslint-disable eqeqeq */
import io from 'socket.io-client';
// eslint-disable-next-line no-undef
const url = process.env.REACT_APP_SOCKET_BASE_URL;
export const socket = io(url, { autoConnect: false, auth: { userId: '' } });
const userMessagess = JSON.parse(localStorage.getItem('usersMessages')) || [];
socket.onAny((event, ...args) => {
  console.log(event, 'Socket');
  if (event == 'recieveMessage')
    socket.on('recieveMessage', (data) => {
      try {
        const chatIndex = userMessagess.findIndex((chat) => chat.sender == data.receiver && chat.receiver == data.sender);
        if (chatIndex !== -1) {
          userMessagess[chatIndex].message.push({ sender: +data.sender, receiver: +data.receiver, message: data.message });
        } else {
          userMessagess.push({ sender: +data.receiver, receiver: +data.sender, message: [{ sender: +data.sender, receiver: +data.receiver, message: data.message }] });
        }
        localStorage.setItem('usersMessages', JSON.stringify(userMessagess));
      } catch (error) {
        console.error(error.message);
      }
    });
});
