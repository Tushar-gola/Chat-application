/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Grid, Button, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { CustomInput } from './';
import Assests from './assests';
import { socket } from '../socket';
import { useSelector } from 'react-redux';
export const ChatInputArea = React.memo(({ handleSendMessage, setNewMessage, newMessage, handleScroll }) => {
  const [inputValue, setInputValue] = React.useState(0);
  const [selectedEmoji, setSelectedEmoji] = React.useState(false);
  const [toggleAssets, setToggleAssets] = React.useState(false)
  const userId = useSelector((state) => state.open.id);
  const inputRef = React.useRef(null);
  const myId = localStorage.getItem('userInfo');
  const { mode } = useThemeContext();
  const AddEmoji = (item) => {
    setNewMessage((prev) => prev + item?.emoji);
  };
  const handleChange = React.useCallback((e) => {
    setNewMessage(e.target.value);
    socket.emit('typing', { receiver: +userId, sender: +myId })
  }, [userId]);

  return (
    <>
      <div style={{ position: 'absolute', bottom: '92px' }}>
        {selectedEmoji && <EmojiPicker onEmojiClick={AddEmoji} lazyLoadEmojis={true} theme={mode === 'dark' ? 'dark' : 'light'} />}
      </div>
      <Assests close={() => setToggleAssets(false)} toggleAssets={toggleAssets} />
      <Grid
        container
        sx={{
          height: '100%',
          alignItems: 'center',
          padding: { xs: '0 1rem', lg: '0rem 1.5rem' },
          display: { xs: 'none', lg: 'flex' },
          zIndex: "1"
        }}
      >
        <Grid item xs={1} className="flex gap-3 justify-center items-center ">
          <Box>
            <IconButton onClick={() => setToggleAssets(true)}>
              <MoreHorizIcon sx={{ color: '#495057', fontSize: '1.8rem' }} />
            </IconButton>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <InsertEmoticonIcon sx={{ color: '#495057', fontSize: '1.8rem' }} onClick={() => setSelectedEmoji(!selectedEmoji)} />
          </Box>
        </Grid>
        <Grid item xs={10} className="flex justify-center items-end lg:items-center">
          <CustomInput type="text" placeholder="Type your message..." autoFocus value={newMessage} ref={inputRef} onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
            onChange={handleChange} mode={mode} />
        </Grid>
        <Grid item xs={1} className="flex gap-2 justify-center items-center ">
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <MicIcon sx={{ color: '#495057', fontSize: '1.8rem' }} />
          </Box>
          <Box onClick={() => {
            handleSendMessage(); handleScroll(); inputRef.current.focus();
          }}>
            <SendIcon sx={{ color: '#495057', fontSize: '1.8rem' }} />
          </Box>
        </Grid>
      </Grid>

      {/* Mobile View */}

      <Grid
        container
        sx={{
          height: '100%',
          alignItems: 'center',
          padding: { xs: '0 1rem', lg: '0rem 1.5rem' },
          display: { xs: 'flex', lg: 'none' },
        }}>
        <Grid item xs={10}>
          <CustomInput type="text" placeholder="Type your message..." autoFocus value={newMessage} ref={inputRef} onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }} mode={mode} />
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{
              minWidth: '50px',
              marginLeft: '1rem',
              width: '50px',
              height: '50px',
              backgroundColor: '#4eac6d',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}

          >
            {inputValue > 0 ? (
              <SendIcon sx={{ color: '#FFF', fontSize: '1.8rem' }}
                onClick={() => {
                  handleSendMessage(); setInputValue(0); inputRef.current.focus();
                }}
              />
            ) : (
              <MicIcon sx={{ color: '#495057', fontSize: '1.8rem' }} />
            )}
          </Button>
        </Grid>
      </Grid>
    </>
  );
});
