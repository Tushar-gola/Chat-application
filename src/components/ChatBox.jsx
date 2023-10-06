import React from 'react';
import {useThemeContext} from '../theme/ThemeContextProvider';
import Style from '../pages/style.module.css';
import Demo from '../assets/image/demo.jpg';
import {useDispatch} from 'react-redux';
import {Grid} from '@mui/material';
import {open} from '../redux';
import {SearchUsers} from './';
import {StyleBadge} from './';

export function ChatBox() {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = React.useState(null);
  const [searchModal, setSearchModal] = React.useState(false);
  const {mode} = useThemeContext();
  const users = [
    {id: 1, name: 'Ravi'},
    {id: 2, name: 'Ramu'},
    {id: 3, name: 'Tushar Gola'},
    {id: 4, name: 'Tushar Gola'},

  ];
  const [currentUser, setCurrentUser] = React.useState(users);
  const handleItemClick = (userId) => {
    setActiveItem(userId);
  };
  const SearchUser = (e) => {
    const newText = e.target.value;
    const filtered = users.filter((item) =>
      item.name.toLowerCase().includes(newText.toLowerCase()),
    );
    setCurrentUser(filtered);
  };
  return (
    <>
      <Grid container >
        <Grid item xs = {12}>
          <Grid container rowSpacing = {4} sx = {{marginTop: '1.5rem'}}>
            <Grid item xs = {12} className = "px-4 flex justify-between">
              <h1 className = "text-3xl text-[#495057] font-medium tracking-wide">Chats</h1>
              <SearchUsers opened = {searchModal} onClose = {() => setSearchModal(false)} />
            </Grid>
            <Grid item xs = {12} className = "px-4">
              <input
                type = "text"
                placeholder = "Search here..."
                onChange = {SearchUser}
                className = {`form-input py-3 px-3 text-md w-full outline-none rounded-md  ${mode === 'dark' ? 'bg-[#383838]  text-[#adb5bd]' : 'bg-[#f6f6f9]'}`}
              />
            </Grid>
            <Grid item xs = {12} className = "px-4">
              <span className = {` text-md    ${mode === 'dark' ? 'text-[#d4d8db]' : `${Style.light_grey_opacity_75}`}`}>
                FAVOURITES
              </span>
            </Grid>
            <Grid item xs = {12}>
              <ul style = {{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {currentUser.length > 0 ? currentUser && currentUser.map((user) => (
                  <li key = {user.id} onClick = {() => {
                    handleItemClick(user.id); dispatch(open());
                  }} className = {`user-details py-1 px-4 ${activeItem === user.id ? 'active' : ''}`}
                  >
                    <div className = "flex items-center cursor-pointer">
                      <div className = "w-[40px] h-[40px] rounded-full mr-3 flex items-center ">
                        <StyleBadge name = {user.name} img = {Demo} dot = {'dot'} />
                      </div>
                      <div className = {`text-lg ${mode === 'dark' ? 'text-white' : 'text-[#495057]'}`}>{user.name}</div>
                    </div>
                  </li>
                )) : <div className = "px-4 text-xl">User not Exist.............</div>}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    </>
  );
}
