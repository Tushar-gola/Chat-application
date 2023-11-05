import React, { useEffect } from 'react';
import { useThemeContext } from '../theme/ThemeContextProvider';
import Style from '../pages/style.module.css';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { open } from '../redux';
import { $crud } from '../CRUD';
import { StyleBadge, CustomInput, SearchUsers } from './';
import { socket } from '../socket';
export function ChatBox() {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = React.useState(null);
  const [searchModal, setSearchModal] = React.useState(false);
  const [users, setUsers] = React.useState();
  const { mode } = useThemeContext();
  const getUsers = async () => {
    try {
      const apiUrl = '/retrieve/all-user';
      const res = await $crud.retrieve(apiUrl);
      if (res?.type === 'success') {
        setUsers(res.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  const handleItemClick = (userId) => {
    setActiveItem(userId);
  };
  const SearchUser = (e) => {
    const newText = e.target.value;
    const filtered = users.filter((item) =>
      item.fullName.toLowerCase().includes(newText.toLowerCase()),
    );
    setUsers(filtered);
  };
  socket.off('activeStatus').on('activeStatus', (data) => {
    getUsers();
  })
  return (
    <>
      <Grid container >
        <Grid item xs={12}>
          <Grid container rowSpacing={4} sx={{ marginTop: '1.5rem' }}>
            <Grid item xs={12} className="px-4 flex justify-between">
              <h1 className="text-3xl text-[#495057] font-medium tracking-wide">Chats</h1>
              <SearchUsers opened={searchModal} onClose={() => setSearchModal(false)} />
            </Grid>
            <Grid item xs={12} className="px-4">
              <CustomInput type="text" placeholder="Search here..." mode={mode} onChange={SearchUser} />
            </Grid>
            <Grid item xs={12} className="px-4">
              <span className={`text-md ${mode === 'dark' ? 'text-[#d4d8db]' : `${Style.light_grey_opacity_75}`}`}>
                FAVOURITES
              </span>
            </Grid>
            <Grid item xs={12}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {users?.map((user) => {
                  return (
                    <li key={user.id} onClick={() => {
                      handleItemClick(user.id); dispatch(open(user));
                    }} className={`user-details py-1 px-4 ${activeItem === user.id ? 'active' : ''}`}
                    >
                      <div className="flex items-center cursor-pointer">
                        <div className="w-[40px] h-[40px] rounded-full mr-3 flex items-center ">
                          <StyleBadge name={user.fullName} img={user.photoUrl} dot={user?.isActive ? 'dot' : ''} />
                        </div>
                        <div className={`text-lg ${mode === 'dark' ? 'text-white' : 'text-[#495057]'}`}>{user.fullName}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    </>
  );
}
