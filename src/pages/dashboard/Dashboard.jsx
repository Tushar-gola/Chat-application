import React, {useEffect} from 'react';
import {Grid} from '@mui/material';
import {useSelector} from 'react-redux';
import {FindUser, SliderBar, ChatBox, ChatSlider} from '../../components';
import {ChatStarting} from '../';
import {socket} from '../../socket';
export function Dashboard() {
  const ToggleComponent = useSelector((state) => state.toggle.name);
  const id = useSelector((state) => state.open.id);
  const authSocket = ()=>{
    const token = localStorage.getItem('userInfo');
    if (token != null) {
      socket.connect();
      socket.auth.userId = +token;
    }
  };
  useEffect(()=>{
    authSocket();
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs = {12} md = {3} lg = {3}>
          <Grid container>
            <Grid
              item
              xs = {2}
              sx = {{
                display: {
                  xs: 'none',
                  lg: 'block',
                },
              }}
            >
              <SliderBar />
            </Grid>

            <Grid item xs = {12} lg = {10}>
              {ToggleComponent === 'Profile' ? <FindUser /> : ToggleComponent === 'Chats' ? <ChatBox /> : null}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs = {0} md = {9} lg = {9} height = {'100dvh'} position = {'relative'}>
          {/* {ToggleComponent === 'Chats' ? <ChatSlider /> : id!== 0 ? <ChatStarting/>: null} */}
          {/* { id === 0 && ToggleComponent === 'Profile' ? <ChatStarting/> : ToggleComponent === 'Chats' && id !== 0? <ChatSlider /> :<ChatStarting/>} */}
          {ToggleComponent === 'Chats' && id !== 0 ? <ChatSlider /> :<ChatStarting/>}
        </Grid>

        <Grid
          item
          xs = {12}
          sx = {{
            display: {
              xs: 'block',
              lg: 'none',
            },
          }}>
          <SliderBar />
        </Grid>
      </Grid>
    </>
  );
}
