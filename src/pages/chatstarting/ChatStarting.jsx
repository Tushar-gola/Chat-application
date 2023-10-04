import { Box, Button } from '@mui/material'
import React from 'react'
import BgPng from '../../assets/image/pattern-05.ffd181cdf9a08b200998.png'
import MessageIcon from "@mui/icons-material/Message";
import { useSelector } from "react-redux";
const FirstBoxStyle = {
    width: "100%", height: "100%", backgroundImage: `url(${BgPng})`, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem"
}

const SecondBoxStyle = { width: "100px", height: "100px", background: "#4eac6d30", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", marginBottom: "1rem" }

export default function ChatStarting() {
    const open = useSelector((state) => state.open.open);
    const BoxContainer = {
        width: "100%",
        height: "100dvh",
        position: { xs: "fixed", lg: "static" },
        right: { xs: `${open}`, lg: "0" },
        top: 0,
        transition: "1s ease-in-out",
        zIndex: "1000000000000000",

    };
    return (
        <Box sx={BoxContainer}>
            <Box sx={FirstBoxStyle}>
                <Box sx={SecondBoxStyle}>
                    <MessageIcon color="success" sx={{ fontSize: "3.5rem" }} />
                </Box>
                <h1 className='text-2xl text-[#495057] '>Welcome to Doot Chat App</h1>
                <p className='px-[280px] text-center'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, minus! Odit alias quo soluta cupiditate debitis est atque corporis voluptas praesentium, earum minima velit deleniti! Accusamus magnam ducimus cumque dolor aliquid ad eius iusto ratione explicabo. Lorem ipsum dolor sit amet.
                </p>
                <Button variant='success' sx={{ backgroundColor: "#4eac6d", color: "white" }}>
                    Get started
                </Button>
            </Box>
        </Box>
    )
}
