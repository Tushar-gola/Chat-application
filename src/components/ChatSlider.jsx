import { Box, Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatTopArea from "./ChatTopArea";
import ChatInputArea from './ChatInputArea'
import BgPng from '../assets/image/pattern-05.ffd181cdf9a08b200998.png'
import { useThemeContext } from "../theme/ThemeContextProvider";
const ChatTopBottomAreaGrid = {
  height: { xs: "70px", lg: "92px" },
};
const ChatAreaGrid = {
  height: {
    xs: `calc(100dvh - 140px)`,
    lg: `calc(100dvh - 184px)`,
  },
  overflowY: "auto",
  padding: "1rem",
};

export default function ChatSlider() {
  const open = useSelector((state) => state.open.open);
  const { mode } = useThemeContext();
  const chatBoxRef = useRef(null);
  const BoxContainer = {
    width: "100%",
    height: "100dvh",
    position: { xs: "fixed", lg: "static" },
    right: { xs: `${open}`, lg: "0" },
    top: 0,
    zIndex: "1000000000000000",
  };
  const currentTime = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
  const [messages, setMessages] = useState([
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },




    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },

    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'You', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },
    {
      text: "wbfwejhvhj",
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver',
    },

  ]);
  const [newMessage, setNewMessage] = useState('');
  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
    document.body.scrollTo(0, document.body.scrollHeight)
  }, [messages]);

  const handleScroll = () => {
    scrollToBottom();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    const newMessageObj = {
      text: newMessage,
      timestamp: currentTime,
      sender: 'Receiver', // Change this to the sender's name or identifier
      receiver: 'Receiver', // Change this to the receiver's name or identifier
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');

  };




  return (
    <>
      <Box sx={{ ...BoxContainer, background: `${mode === "dark" ? "#000" : null}` }}>
        <Grid container >
          <Grid
            item
            xs={12}
            sx={{ ...ChatTopBottomAreaGrid, position: "sticky", top: 0, backgroundImage: `url(${BgPng})` }}
          >
            <ChatTopArea />
          </Grid>

          <Grid item xs={12} sx={{ ...ChatAreaGrid, backgroundImage: `url(${BgPng})`, }} ref={chatBoxRef} >
            <Grid container ref={chatBoxRef}>
              {messages.map((message, index) => (
                <Grid item key={index} xs={12} sx={{
                  display: message.sender === 'You' ? 'flex' : 'block',
                  flexDirection: "column"
                }}>
                  <div
                    className={`message ${message.sender === 'You' ? 'sender' : 'receiver'} relative ${mode === "dark" ? "bg-[#383838] text-[#dae3eb]" : "bg-[#FFFFFF] text-[#000]"}`}
                  >
                    {message.text}
                    <div className=" right-0 bottom-0 text-[10px] ">{message.timestamp}</div>
                  </div>
                  <div className={` ${message.sender === 'You' ? 'sender-time' : 'receiver-time'} message-timestamp text-[11px]`}>{"Tushar Gola"}</div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sx={ChatTopBottomAreaGrid}>
            <ChatInputArea handleSendMessage={handleSendMessage} setNewMessage={setNewMessage} newMessage={newMessage} handleScroll={handleScroll} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
