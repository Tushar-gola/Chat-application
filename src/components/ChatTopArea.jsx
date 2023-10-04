import React from "react";
import { Grid, Avatar, Badge, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Demo from '../assets/image/demo.jpg'
import { useThemeContext } from "../theme/ThemeContextProvider";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
export default function ChatTopArea() {
  const { mode } = useThemeContext();
  return (
    <Grid
      container
      sx={{
        // background: `${mode === "dark" ? "#00000067" : "#f2f2f2"}`,
        height: "100%",
        alignItems: "center",
        padding: { xs: "0 .8rem", lg: "0rem 1.5rem" },
      }}
    >
      <Grid item xs={7} lg={10}>
        <div className="flex items-center cursor-pointer">
          <div className="w-[50px] h-[50px] rounded-full mr-3 flex items-center ">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant={'dot'}
            >
              <Avatar alt={"Tushar"} src={Demo} />
            </StyledBadge>
          </div>
          <div>
            <div className={`text-lg ${mode === "dark" ? "text-white" : "text-[#495057]"} `}>{"Tushar Gola"}</div>
            <span className="text-sm">Active</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={5} lg={2}>
        <ul className="flex flex-row justify-between text-center gap-3">
          <li>
            <SearchIcon sx={{ color: "#495057", fontSize: "1.8rem", cursor: "pointer" }} />
          </li>
          <li>
            <LocalPhoneIcon sx={{ color: "#495057", fontSize: "1.8rem", cursor: "pointer" }} />
          </li>
          <li>
            <VideocamIcon sx={{ color: "#495057", fontSize: "1.8rem", cursor: "pointer" }} />
          </li>
          <li>
            <InfoIcon sx={{ color: "#495057", fontSize: "1.8rem", cursor: "pointer" }} />
          </li>
          <li>
            <MoreVertIcon sx={{ color: "#495057", fontSize: "1.8rem", cursor: "pointer" }} />
          </li>
        </ul>
      </Grid>
    </Grid>
  );
}
