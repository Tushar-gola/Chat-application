import {Box, Button, Grid} from '@mui/material';
import React from 'react';
import UserBg from '../assets/image/UserProfile/img-4.8111c4656c8bc3b62569.jpg';
import UserFront from '../assets/image/UserProfile/avatar-1.9c8e605558cece65b06c.jpg';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {useSelector} from 'react-redux';
export function FindUser() {
  const user = useSelector((state) => state?.userData.data.payload);
  return (
    <>
      <Box>
        <Grid container sx = {{borderBottom: '.2px solid #49505792', paddingBottom: '1rem'}}>
          <Grid item xs = {12} sx = {{position: 'relative'}}>
            <div className = 'w-full h-[200px]'>
              <img src = {UserBg} alt = "User profile" className = 'w-full h-full' />
            </div>
            <div className = 'w-[130px] h-[130px] rounded-full absolute top-[70%] left-[33%] border-[6px]'>
              <img src = {user?.photoUrl ?? UserFront} alt = "User profile" className = 'w-full h-full rounded-full' />
            </div>
          </Grid>
          <Grid item xs = {12} sx = {{marginTop: '5rem', textAlign: 'center'}}>
            <h1 className='text-lg'>{user?.fullName ?? 'N/A' }</h1>
            <span className = 'text-[#49505792] text-sm'>Front End Developer</span>
          </Grid>
        </Grid>
        <Grid container sx = {{padding: '1rem'}}>
          <Grid item xs = {12}>
            <h1 className = 'text-xl'>Bio</h1>
            <p className = 'text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique modi veritatis dignissimos laborum exercitationem quaerat autem, praesentium deleniti temporibus eaque!</p>
          </Grid>
          <Grid item xs = {12}>
            <Box sx = {{display: 'flex', justifyContent: 'space-around', padding: '2rem 0'}}>
              <Button variant = "contained" color = 'success' startIcon = {<PersonAddIcon />}>Connect</Button>
              <Button variant = 'outlined' color = 'success' startIcon = {<PersonRemoveIcon />}>Remove</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
