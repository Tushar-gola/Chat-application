import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import { useSelector, useDispatch } from "react-redux";
import { EmptyComponent, ChangeComponent } from "../redux/slices/ToggleComponents";
import LogoutIcon from '@mui/icons-material/Logout';
import { $crud } from '../CRUD/Crud'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from "../theme/ThemeContextProvider";
export default function SliderBar() {
  let dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { mode, toggleColorMode } = useThemeContext();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const column = [
    {
      label: "Profile",
      icon: (
        <AccountCircleIcon
          color="success"
          sx={{ fontSize: "2rem", color: "grey" }}
        />
      ),
      onClick: () => { dispatch(ChangeComponent('Profile')) }
    },
    {
      label: "Chats",
      icon: (
        <ForumIcon color="success" sx={{ fontSize: "2rem", color: "grey" }} />
      ),
      onClick: () => { dispatch(ChangeComponent('Chats')) }
    },
    {
      label: "Contacts",
      icon: (
        <PermContactCalendarIcon
          color="success"
          sx={{ fontSize: "2rem", color: "grey" }}
        />
      ),
    },
    {
      label: "Calls",
      icon: (
        <AddIcCallIcon color="success" sx={{ fontSize: "2rem", color: "grey" }} />
      ),
    },
    {
      label: "Bookmarks",
      icon: (
        <BookmarkAddIcon
          color="success"
          sx={{ fontSize: "2rem", color: "grey" }}
        />
      ),
    },
    {
      label: "Settings",
      icon: <SettingsIcon sx={{ fontSize: "2rem", color: "grey" }} />,
    },
  
  ];
  const HandleLogout = async () => {
    const apiUrl = "/delete/user-logout"
    const response = await $crud.delete(apiUrl)
    console.log(response);
    if (response) {
      handleOpen()
    }
    if (response.type == "success") {
      handleOpen()
      localStorage.clear();
      window.location.reload();
    }
  }
  return (
    <>
      <Backdrop
        sx={{ color: '#4eac6d', zIndex: "1000000000000000000000000" }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        className={`h-screen pt-4 pb-4 bg-[#2e2e2e] flex flex-col justify-between`}
        sx={{
          display: {
            xs: "none",
            lg: "flex",
          },
        }}
      >
        <ul className="flex flex-col gap-y-1">
          <li className="p-4 text-center">
            <MessageIcon color="success" sx={{ fontSize: "2rem" }} />
          </li>

          {column.map(({ label, icon, onClick }, index) => {
            return (
              <li className="p-4 text-center" key={index}>
                <Tooltip title={label} placement="right" onClick={onClick}>
                  <IconButton>{icon}</IconButton>
                </Tooltip>
              </li>
            );
          })}
          <li className="p-4 text-center" >
            <Tooltip title="LogOut" placement="right" onClick={HandleLogout}>
              <IconButton><LogoutIcon sx={{ fontSize: "2rem", color: "grey" }} /></IconButton>
            </Tooltip>
          </li>
        </ul>
        <ul>
          <li className="p-4 text-center">
            <Tooltip title={mode == "dark" ? "Dark Mode" : "Light Mode"} placement="right" onClick={toggleColorMode} >
              <IconButton>
                {!(mode == "dark") ? <NightsStayOutlinedIcon
                  sx={{ fontSize: "2rem", color: "grey" }}
                /> :
                  <LightModeIcon sx={{ fontSize: "2rem", color: "grey" }} />
                }
              </IconButton>
            </Tooltip>
          </li>
          <li></li>
        </ul>
      </Box>

      {/* Mobile View */}

      <Box
        className={`pt-4 pb-4 bg-[#2e2e2e] flex flex-row justify-between `}
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          position: "fixed",
          width: "100%",
          bottom: "-5px",
          left: "0",
        }}
      >
        <ul className="flex flex-row gap-y-1">
          <li className="p-1 text-center">
            <Tooltip placement="right">
              <IconButton>
                <MessageIcon color="success" sx={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>
          </li>

          {column.map(({ label, icon, onClick }, index) => {
            return (
              <li className="p-1 text-center" key={index} >
                <Tooltip title={label} placement="right" onClick={onClick}>
                  <IconButton>{icon}</IconButton>
                </Tooltip>
              </li>
            );
          })}
        </ul>

        <ul>
          <li className="p-1 text-center">
            <Tooltip title="Dark Mode" placement="right">
              <IconButton>
                <NightsStayOutlinedIcon
                  color="success"
                  sx={{ fontSize: "2rem", color: "grey" }}
                />
              </IconButton>
            </Tooltip>
          </li>
          <li></li>
        </ul>
      </Box>
    </>
  );
}
