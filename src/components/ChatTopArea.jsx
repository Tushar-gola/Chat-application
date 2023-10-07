import React from 'react';
import {Grid} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Demo from '../assets/image/demo.jpg';
import {useThemeContext} from '../theme/ThemeContextProvider';
import {CustomInput, StyleBadge} from './';
// eslint-disable-next-line react/prop-types
export function ChatTopArea({setSearchTerm, handleSearch}) {
  const {mode} = useThemeContext();
  const [toggleSearch, setToggleSearch] = React.useState(false);
  const icon = {color: '#495057', fontSize: '1.8rem', cursor: 'pointer'};
  return (
    <Grid container sx = {{
      height: '100%',
      alignItems: 'center',
      padding: {xs: '0 .8rem', lg: '0rem 1.5rem'},
    }}
    >
      <Grid item xs = {7} lg = {toggleSearch?8:10}>
        <div className = "flex items-center cursor-pointer">
          <div className = "w-[50px] h-[50px] rounded-full mr-3 flex items-center ">
            <StyleBadge name = {'Tushar Gola'} img = {Demo} dot = {'dot'} />
          </div>
          <div>
            <div className = {`text-lg ${mode === 'dark' ? 'text-white' : 'text-[#495057]'} `}>{'Tushar Gola'}</div>
            <span className = "text-sm">Active</span>
          </div>
        </div>
      </Grid>
      <Grid item xs = {5} lg = {toggleSearch?4:2}>
        <ul className = "flex flex-row justify-between text-center gap-3 top-area">
          <li>
            <div style={{width: '100%'}}>
              <CustomInput mode={mode} onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch();
              }} placeholder="Search.." className={`${toggleSearch?'block':'hidden'}`} />
            </div>
          </li>
          <li>
            <SearchIcon sx={icon} onClick={()=>setToggleSearch(!toggleSearch)} />
          </li>
          <li>
            <LocalPhoneIcon sx = {icon} />
          </li>
          <li>
            <VideocamIcon sx = {icon} />
          </li>
          <li>
            <InfoIcon sx = {icon} />
          </li>
          <li>
            <MoreVertIcon sx = {icon} />
          </li>
        </ul>
      </Grid>
    </Grid>
  );
}
