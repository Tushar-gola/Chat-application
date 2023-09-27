import React from 'react'
import { Box, Grid, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from 'emoji-picker-react';
import { useThemeContext } from "../theme/ThemeContextProvider";
export default function ChatInputArea({ handleSendMessage, setNewMessage, newMessage, handleScroll }) {
    const [inputValue, setInputValue] = React.useState(0);
    const [selectedEmoji, setSelectedEmoji] = React.useState(false);
    const inputRef = React.useRef(null);
    const { mode, toggleColorMode } = useThemeContext();
    const AddEmoji = (item) => {
        setNewMessage(prev => prev + item?.emoji)
    }
    return (
        <>
            <div style={{ position: "absolute", bottom: "92px" }}>
                {selectedEmoji && <EmojiPicker onEmojiClick={AddEmoji} lazyLoadEmojis={true} theme={mode == "dark" ? "dark" : "light"} />}
            </div>

            <Grid
                container
                sx={{
                    // background: "#f2f2f2",
                    height: "100%",
                    alignItems: "center",
                    padding: { xs: "0 1rem", lg: "0rem 1.5rem" },
                    display: { xs: "none", lg: "flex" },
                }}
            >
                <Grid item xs={1} className="flex gap-3 justify-center items-center ">
                    <Box>
                        <MoreHorizIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
                    </Box>
                    <Box sx={{ position: "relative" }}>
                        <InsertEmoticonIcon sx={{ color: "#495057", fontSize: "1.8rem" }} onClick={() => setSelectedEmoji(!selectedEmoji)} />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={10}
                    className="flex justify-center items-end lg:items-center"
                >
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className={`form-input py-3 px-3 text-md w-[90%] lg:w-[100%] outline-none rounded-md ${mode == "dark" ? "bg-[#383838]  text-[#adb5bd]" : null} `}
                        autoFocus
                        value={newMessage}
                        ref={inputRef}
                        onKeyDown={(e) => e.key == "Enter" ? handleSendMessage() : null}
                        onChange={(e) => { setNewMessage(e.target.value) }}
                    />
                </Grid>
                <Grid item xs={1} className="flex gap-2 justify-center items-center ">
                    <Box sx={{ display: { xs: "none", lg: "block" } }}>
                        <MicIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
                    </Box>
                    <Box onClick={() => { handleSendMessage(); handleScroll(); inputRef.current.focus(); }} >
                        <SendIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
                    </Box>
                </Grid>
            </Grid>

            {/* Mobile View */}

            <Grid
                container
                sx={{
                    background: "#f2f2f2",
                    height: "100%",
                    alignItems: "center",
                    padding: { xs: "0 1rem", lg: "0rem 1.5rem" },
                    display: { xs: "flex", lg: "none" },
                }}
            >
                <Grid item xs={10}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        autoFocus
                        value={newMessage}
                        ref={inputRef}
                        onChange={(e) => { setNewMessage(e.target.value); setInputValue(e.target.value.length) }}
                        className="form-input py-3 px-3 text-md w-[100%] lg:w-[100%] outline-none rounded-md bg-[#ffffff]  "
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        sx={{
                            minWidth: "50px",
                            marginLeft: "1rem",
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#4eac6d",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}

                    >
                        {inputValue > 0 ? (
                            <SendIcon sx={{ color: "#FFF", fontSize: "1.8rem" }}
                                onClick={() => { handleSendMessage(); setInputValue(0); inputRef.current.focus(); }}
                            />
                        ) : (
                            <MicIcon sx={{ color: "#495057", fontSize: "1.8rem" }} />
                        )}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
