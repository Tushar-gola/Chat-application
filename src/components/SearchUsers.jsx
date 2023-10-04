import React, { useEffect } from 'react'
import { Button, Dialog, Slide, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import UserFront from '../assets/image/UserProfile/avatar-1.9c8e605558cece65b06c.jpg'
import { useThemeContext } from "../theme/ThemeContextProvider";
import { $crud } from '../CRUD/Crud'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchUsers({ opened, onClose }) {
    const [open, setOpen] = React.useState(false);
    const { mode } = useThemeContext();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(opened)
    }, [opened])

    const getData = async (value) => {
        console.log(value, "value");
        const apiUrl = "/retrieve/debounce-use";
        const res = await $crud.retrieve(apiUrl, value[0]);
        console.log(res, "res");
    }

    const debounce = (func, time) => {
        let Timer;
        return (...args) => {
            clearTimeout(Timer)
            Timer = setTimeout(() => {
                func(args)
            }, time)
        }
    }
    const debounceGetData = debounce(getData, 2000);
    return (
        <>
            <Button variant="outlined" className='bg-[#4eac6d7b]' color="success"
                onClick={handleClickOpen}>
                <AddIcon />
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <Box sx={{ width: "500px", height: "800px" }}>
                    <Grid container>
                        <Grid item xs={12} sx={{ position: "sticky", top: 0, background: `${mode == "dark" ? "#262626" : "#FFFFF"}`, paddingBottom: "1rem" }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button variant='outlined' color='success' sx={{
                                        border: "none", "&:hover": {
                                            border: "none"
                                        }, padding: "1rem"
                                    }} onClick={handleClose}>
                                        <ArrowBackIosIcon sx={{ color: "black" }} />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{ padding: " 0 1rem" }}>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            placeholder="Search here..."
                                            onChange={(e) => debounceGetData(e.target.value)}
                                            className={`form-input py-3 px-10 text-md w-full outline-none rounded-md ${mode == "dark" ? "bg-[#383838]  text-[#adb5bd]" : null} `}
                                        />
                                        <SearchIcon sx={{ position: "absolute", top: "25%", left: "1%", color: "grey" }} />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ padding: " 2rem 0rem", overflowY: "auto" }}>
                            <ul>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>

                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>

                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>

                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>

                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>

                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>

                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>

                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                                <li className='flex bg-[#00000004] px-[16px] py-2 my-2'>
                                    <img src={UserFront} alt="User" className='w-[50px] rounded-full' />
                                    <div className='ml-3'>
                                        <h1 className='text-lg'>Tushar Gola</h1>
                                        <p className='text-[12px]'>Full stack developer</p>
                                    </div>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </>
    )
}
