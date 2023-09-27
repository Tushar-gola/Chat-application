import React from "react";
import { Button, Grid } from "@mui/material";
import Style from "../pages/style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { open, close } from "../redux/slices/OpenChatBox";
import Demo from '../assets/image/demo.jpg'
import SearchUsers from "./SearchUsers";
import { useThemeContext } from "../theme/ThemeContextProvider";
export default function ChatBox({ handle }) {
  let dispatch = useDispatch()
  const [activeItem, setActiveItem] = React.useState(null);
  const [searchModal, setSearchModal] = React.useState(false)
  const { mode, toggleColorMode } = useThemeContext();
  const users = [
    { id: 1, name: 'Ravi' },
    { id: 2, name: 'Ramu' },
    { id: 3, name: 'Tushar Gola' },
  ];
  const handleItemClick = (userId) => {
    setActiveItem(userId);
  };
  return (
    <>
      <Grid container  >
        <Grid item xs={12}>
          <Grid container rowSpacing={4} sx={{ marginTop: "1.5rem" }}>
            <Grid item xs={12} className="px-4 flex justify-between">
              <h1 className="text-3xl text-[#495057] font-medium tracking-wide">
                Chats
              </h1>
              <SearchUsers opened={searchModal} onClose={() => setSearchModal(false)} />
            </Grid>
            <Grid item xs={12} className="px-4">
              <input
                type="text"
                placeholder="Search here..."
                className={`form-input py-3 px-3 text-md w-full outline-none rounded-md bg-[#f6f6f9] ${mode == "dark" ? "bg-[#383838]  text-[#adb5bd]" : null}`}
              />
            </Grid>
            <Grid item xs={12} className="px-4">
              <span className={`${Style.light_grey_opacity_75} text-md`}>
                FAVOURITES
              </span>
            </Grid>
            <Grid item xs={12}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {users.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => { handleItemClick(user.id); dispatch(open()) }}
                    className={`user-details py-1 px-4 ${activeItem === user.id ? 'active' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="w-[40px] h-[40px] rounded-full mr-3 flex items-center">
                        <img src={Demo} alt="user Image" className="w-full rounded-full" />
                      </div>
                      <div className="text-lg text-[#495057]">{user.name}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </>
  );
}
