import React from 'react';
import {Grid} from '@mui/material';
import SliderBar from '../../components/SliderBar';
import ChatBox from '../../components/ChatBox';
import ChatSlider from '../../components/ChatSlider';
import {useSelector} from 'react-redux';
import FindUser from '../../components/FindUser';
import ChatStarting from '../chatstarting/ChatStarting';

export default function Dashboard() {
  const ToggleComponent = useSelector((state) => state.toggle.name);
  const id = useSelector((state) => state.open.id);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <Grid container>
            <Grid
              item
              xs={2}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'block',
                },
              }}>
              <SliderBar />
            </Grid>

            <Grid item xs={12} lg={10}>
              {ToggleComponent === 'Profile' ? <FindUser /> : ToggleComponent === 'Chats' ? <ChatBox /> : null}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={0} md={9} lg={9} height={'100dvh'} position={'relative'}>
          {ToggleComponent === 'Chats' ? <ChatSlider /> : id !== 0 || !(ToggleComponent === 'Chats') ? <ChatStarting /> : null}
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: {
              xs: 'block',
              lg: 'none',
            },
          }}
        >
          <SliderBar />
        </Grid>
      </Grid>
    </>
  );
}
