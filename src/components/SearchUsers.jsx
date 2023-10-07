import React, {useEffect} from 'react';
import {Button, Dialog, Slide, Box, Grid} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import SearchIcon from '@mui/icons-material/Search';
import {useThemeContext} from '../theme/ThemeContextProvider';
import {$crud} from '../CRUD';
import {useDispatch} from 'react-redux';
import {getData} from '../redux';
import {ChangeComponent} from '../redux';
import {CustomInput} from './';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction = "up" ref = {ref} {...props} />;
});
// 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
// eslint-disable-next-line react/prop-types
export function SearchUsers({opened, onClose}) {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const {mode} = useThemeContext();
  const dispatch = useDispatch();
  useEffect(() => {
    setOpen(opened);
  }, [opened]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const data = async (value) => {
    try {
      const apiUrl = '/retrieve/debounce-user';
      const res = await $crud.retrieve(apiUrl, {value: value[0]});
      res?.data?.length > 0 ? setUserData(res?.data):setUserData([]);
    } catch (error) {
      console.error(error.message, 'error');
    }
  };

  const debounce = (func, time) => {
    let Timer;
    return (...args) => {
      clearTimeout(Timer);
      Timer = setTimeout(() => {
        func(args);
      }, time);
    };
  };
  const debounceGetData = debounce(data, 500);
  return (
    <>
      <Button variant = "outlined" className = 'bg-[#4eac6d7b]' color = "success"
        onClick = {handleClickOpen}
      >
        <AddIcon />
      </Button>
      <Dialog
        open = {open}
        TransitionComponent = {Transition}
        keepMounted
        aria-describedby = "alert-dialog-slide-description"
      >
        <Box sx = {{width: '500px', height: '800px'}}>
          <Grid container>
            <Grid item xs = {12} sx = {{position: 'sticky', top: 0, background: `${mode == 'dark' ? '#262626' : '#FFFFF'}`, paddingBottom: '1rem'}}>
              <Grid container>
                <Grid item xs = {12}>
                  <Button variant = 'outlined' color = 'success' sx = {{
                    'border': 'none', '&:hover': {
                      border: 'none',
                    }, 'padding': '1rem',
                  }} onClick = {handleClose}
                  >
                    <ArrowBackIosIcon sx = {{color: 'black'}} />
                  </Button>
                </Grid>
                <Grid item xs = {12} sx = {{padding: ' 0 1rem'}}>
                  <div className = 'relative'>
                    <CustomInput type="text"
                      placeholder="Search here..."
                      onChange={(e) => debounceGetData(e.target.value)} mode={mode} />
                    {/* <SearchIcon sx = {{position: 'absolute', top: '25%', left: '1%', color: 'grey'}} /> */}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs = {12} sx = {{padding: ' 2rem 0rem', overflowY: 'auto'}}>
              <ul>
                {
               userData?.length > 0 ? userData?.map((item) => {
                 return (
                   <li className='flex bg-[#00000004] px-[16px] py-2 my-2 cursor-pointer' key={item?._id} onClick={() => {
                     // eslint-disable-next-line new-cap
                     dispatch(getData({payload: item})); handleClose(); dispatch(ChangeComponent('Profile'));
                   }}>
                     <img src = {item?.photoUrl} alt = {item?.fullName} className = 'w-[50px] rounded-full' />
                     <div className = 'ml-3'>
                       <h1 className='text-lg'>{item?.fullName}</h1>
                       <p className = 'text-[12px]'>Full stack developer</p>
                     </div>
                   </li>
                 );
               }):<div className='px-[20px]'>User not found.....</div>
                }
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
