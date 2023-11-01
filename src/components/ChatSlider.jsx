/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import {Box, Grid} from '@mui/material';
import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {ChatTopArea, ChatInputArea} from './';
import BgPng from '../assets/image/pattern-05.ffd181cdf9a08b200998.png';
import {useThemeContext} from '../theme/ThemeContextProvider';
import {$crud} from '../CRUD';
import {socket} from '../socket';
// import secureLocalStorage from 'react-secure-storage';
const ChatTopBottomAreaGrid = {
  height: {xs: '70px', lg: '92px'},
};
const ChatAreaGrid = {
  height: {
    xs: 'calc(100dvh - 140px)',
    lg: 'calc(100dvh - 184px)',
  },
  overflowY: 'auto',
  padding: '1rem',
};
// eslint-disable-next-line react/display-name
export const ChatSlider = React.memo(() => {
  const open = useSelector((state) => state.open.open);
  const userId = useSelector((state) => state.open.id);
  const myId = localStorage.getItem('userInfo');
  const userMessagess = JSON.parse(localStorage.getItem('usersMessages')) || [];
  const [foundMessageIndex, setFoundMessageIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [reload, setReload] = useState(false);
  const {mode} = useThemeContext();
  const chatBoxRef = useRef(null);
  const BoxContainer = {
    width: '100%',
    height: '100dvh',
    position: {xs: 'fixed', lg: 'static'},
    right: {xs: `${open}`, lg: '0'},
    top: 0,
    zIndex: '100',
  };
  const [messages, setMessages] = useState([]);
  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  React.useEffect(() => {
    scrollToBottom();
    document.body.scrollTo(0, document.body?.scrollHeight);
  }, [messages]);

  const handleScroll = () => {
    scrollToBottom();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }
    userMessagesCreate();
    setReload(!reload);
    const newMessageObj = {
      message: newMessage,
      time: +Date.now(),
      sender: myId,
      receiver: userId,
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    const chatIndex = userMessagess.findIndex((chat) => chat.sender == myId && chat.receiver == userId);
    if (chatIndex !== -1) {
      userMessagess[chatIndex].message.push({sender: +myId, receiver: +userId, message: newMessage});
    } else {
      userMessagess.push({sender: myId, receiver: userId, message: [{sender: +myId, receiver: +userId, message: newMessage}]});
    }
    localStorage.setItem('usersMessages', JSON.stringify(userMessagess));
    socket.emit('sendMessage', newMessageObj);
  };
  const userMessagesCreate = async () => {
    try {
      const apiUrl = '/create/messages';
      const res = await $crud.post(apiUrl, {receiver: +userId, sender: +myId, message: newMessage, time: +Date.now()});
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  // const getMessage = async () => {
  //   const apiUrl = '/retrieve/messages';
  //   const res = await $crud.retrieve(apiUrl, {receiver: userId, sender: myId} );
  //   setMessages(res?.data?.messages || []);
  // };
  // React.useEffect(()=>{
  //   // getMessage();
  // }, []);

  function handleSearch() {
    const indices = [];
    messages.forEach((message, index) => {
      if (message.message?.includes(searchTerm)) {
        indices.push(index);
      }
    });
    if (chatBoxRef.current) {
      if (indices.length > 0) {
        const lastIndex = indices[indices.length - 1];
        chatBoxRef.current.children[lastIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setFoundMessageIndex(lastIndex);
      } else {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        setFoundMessageIndex(-1);
      }
    }
  }

  socket.off('recieveMessage').on('recieveMessage', (data)=>{
    try {
      console.log(data);
      setReload(!reload);
      const chatIndex = userMessagess.findIndex((chat) => chat.sender == data.receiver && chat.receiver == data.sender);
      if (chatIndex !== -1) {
        userMessagess[chatIndex].message.push({sender: +data.sender, receiver: +data.receiver, message: data.message});
      } else {
        userMessagess.push({sender: +data.receiver, receiver: +data.sender, message: [{sender: +data.sender, receiver: +data.receiver, message: data.message}]});
      }
      localStorage.setItem('usersMessages', JSON.stringify(userMessagess));
    } catch (error) {
      console.error(error.message);
    }
  });
  const userChats = ()=>{
    const messages = userMessagess.filter((data)=> data.sender == +myId && data.receiver == +userId);
    setMessages(messages[0]?.message || []);
  };

  React.useEffect(()=>{
    userChats();
  }, [reload, userId]);
  return (
    <>
      <Box sx={{...BoxContainer, background: `${mode === 'dark' ? '#000' : null}`}}>
        <Grid container >
          <Grid
            item
            xs={12}
            sx={{...ChatTopBottomAreaGrid, position: 'sticky', top: 0, backgroundImage: `url(${BgPng})`}}
          >
            <ChatTopArea setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
          </Grid>

          <Grid item xs={12} sx={{...ChatAreaGrid, backgroundImage: `url(${BgPng})`}} ref={chatBoxRef} >
            <Grid container ref={chatBoxRef}>
              {messages?.map((message, index) => {
                return (
                  <Grid item key={index} xs={12} sx={{
                    display: message.sender == myId ? 'flex' : 'block',
                    flexDirection: 'column',
                  }}>
                    <div
                      className={`message ${message.sender == myId ? 'sender' : 'receiver'} relative ${mode === 'dark' ? 'bg-[#383838] text-[#dae3eb]' : 'bg-[#FFFFFF] text-[#000]'}  ${index === foundMessageIndex ? 'highlighted' : ''}`}>
                      {message.message}
                      <div className=" right-0 bottom-0 text-[10px] ">{message.time}</div>
                    </div>
                    <div className={` ${message.sender == myId ? 'sender-time' : 'receiver-time'} message-timestamp text-[11px]`}>{'Tushar Gola'}</div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          <Grid item xs={12} sx={ChatTopBottomAreaGrid}>
            <ChatInputArea handleSendMessage={handleSendMessage} setNewMessage={setNewMessage} newMessage={newMessage} handleScroll={handleScroll} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
});
