import React from "react";
import { Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export default function ChatTopArea() {
  return (
    <Grid
      container
      sx={{
        // background: "#f2f2f2",
        height: "100%",
        alignItems: "center",
        padding: { xs: "0 .8rem", lg: "0rem 1.5rem" },
      }}
    >
      <Grid item xs={7} lg={10}>
        <h1>Tushar Gola</h1>
      </Grid>
      <Grid item xs={5} lg={2}>
        <ul className="flex flex-row justify-between text-center gap-3">
          <li>
            <SearchIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
          </li>
          <li>
            <LocalPhoneIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
          </li>
          <li>
            <VideocamIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
          </li>
          <li>
            <InfoIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
          </li>
          <li>
            <MoreVertIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
          </li>
        </ul>
      </Grid>
    </Grid>
  );
}
