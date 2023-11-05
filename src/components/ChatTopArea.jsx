/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { CustomInput, StyleBadge } from './';
import { socket } from '../socket';
import { useSelector } from 'react-redux';
export function ChatTopArea({ setSearchTerm, handleSearch }) {
  const { mode } = useThemeContext();
  const [toggleSearch, setToggleSearch] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [typing, setTyping] = React.useState(false)
  const details = useSelector((state) => state.open);
  const icon = { color: '#495057', fontSize: '1.8rem', cursor: 'pointer' };
  useEffect(() => {
    if (details.status !== undefined && details.status !== null) {
      setIsActive(details.status)
    }
  }, [details.status])
  socket.off('liveStatus').on('liveStatus', (data) => {
    if (data.id == details?.id) {
      setIsActive(data.status)
    }
  });
  socket.off('typeStatus').on('typeStatus', (data) => {
    console.log(data);
    if (data.id == details?.id) {
      setTyping(true);
      const timeout = setTimeout(() => {
        setTyping(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  });
  return (
    <Grid container sx={{
      height: '100%',
      alignItems: 'center',
      padding: { xs: '0 .8rem', lg: '0rem 1.5rem' },
    }}
    >
      <Grid item xs={7} lg={toggleSearch ? 8 : 10}>
        <div className="flex items-center cursor-pointer">
          <div className="w-[50px] h-[50px] rounded-full mr-3 flex items-center ">
            <StyleBadge name={details.name} img={details.logo} dot={isActive ? 'dot' : ""} />
          </div>
          <div>
            <div className={`text-lg ${mode === 'dark' ? 'text-white' : 'text-[#495057]'} `}>{details.name}</div>
            {typing ? <span className="text-sm">{typing && 'istyping...'}</span> : <span className="text-sm">{isActive ? 'Active' : "offline"}</span>}

          </div>
        </div>
      </Grid>
      <Grid item xs={5} lg={toggleSearch ? 4 : 2}>
        <ul className="flex flex-row justify-between text-center gap-3 top-area">
          <li>
            <div style={{ width: '100%' }}>
              <CustomInput mode={mode} onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch();
              }} placeholder="Search.." className={`${toggleSearch ? 'block' : 'hidden'}`} />
            </div>
          </li>
          <li>
            <SearchIcon sx={icon} onClick={() => setToggleSearch(!toggleSearch)} />
          </li>
          <li>
            <LocalPhoneIcon sx={icon} />
          </li>
          <li>
            <VideocamIcon sx={icon} />
          </li>
          <li>
            <InfoIcon sx={icon} />
          </li>
          <li>
            <MoreVertIcon sx={icon} />
          </li>
        </ul>
      </Grid>
    </Grid>
  );
}
