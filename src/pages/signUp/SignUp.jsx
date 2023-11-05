import React from 'react';
import {Grid, Box, TextField, InputAdornment, FormControl, IconButton, FilledInput, Checkbox, FormControlLabel, FormHelperText, InputLabel, Snackbar, Alert} from '@mui/material';
import {Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon} from '@mui/icons-material';
import {useFormik} from 'formik';
import {Link} from 'react-router-dom';
import {auth, provider} from '../../auth/config';
import {signInWithPopup, signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {SignUpAuth} from '../../schemas/index';
import LoadingButton from '@mui/lab/LoadingButton';
import Style from '../style.module.css';
import Logo from '../../assets/image/auth_logo.png';
import Google from '../../assets/image/google.svg';
const gridRightStyle = {
  padding: {
    xs: '0rem 0rem',
    md: '1.5rem',
  },
};

const imageStyle = {
  width: '40%',
  position: 'absolute',
  bottom: '0',
  left: '4rem',
  display: {xs: 'none', lg: 'block'},
};

const errorStyle = {color: 'red', fontSize: '.8rem', letterSpacing: '.1rem', height: '.6rem'};
export function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [snackError, setSnackError] = React.useState({type: '', message: ''});
  const navigation = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickCurrentShowPassword = () => setShowCurrentPassword((show) => !show);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {handleBlur, handleSubmit, handleChange, errors, touched, setErrors} = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpAuth,
    onSubmit: async (values) => {
      setLoading(true);
      // eslint-disable-next-line no-undef
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/create/register`;
      const registrationSuccess = await registerUser(values, apiUrl);
      if (registrationSuccess) {
        navigation('/dashboard');
        setLoading(false);
      } else {
        setLoading(false);
      }
    },
  });
  const registerUser = async (userData, apiUrl) => {
    try {
      const response = await axios.post(apiUrl, userData);
      const {token, id} = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usersMessages',JSON.stringify([]))
      localStorage.setItem('userInfo', id);
      return true;
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.errors.length > 0) {
        const keyName = error?.response?.data?.errors[0]?.path;
        const message = error?.response?.data?.errors[0]?.msg;
        setErrors({[keyName]: message});
      }
      setSnackError({type: error?.response?.data.type, message: error?.response?.data.message});
      handleClick();
      return false;
    }
  };
  const HandleGoogleAuth = async () => {
    try {
      setChecked(true);

      await signOut(auth);
      const {user, _tokenResponse} = await signInWithPopup(auth, provider);
      const {uid, email} = user;
      const {firstName, lastName, fullName, photoUrl, idToken} = _tokenResponse;
      // eslint-disable-next-line no-undef
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/create/google-register`;
      const registrationSuccess = await registerUser({
        uid,
        email,
        firstName,
        lastName,
        fullName,
        photoUrl,
        idToken,
      }, apiUrl);
      if (registrationSuccess) {
        navigation('/dashboard');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <main
      className={Style.main_bg_color}
      style={{width: '100%', height: '100vh'}}
    >
      <Grid container>
        <Grid
          item
          xl={3}
          lg={3}
          md={0}
          sm={0}
          xs={0}
          sx={{height: '100vh'}}
        ></Grid>

        <Grid item xl={9} lg={9} md={12} sm={12} xs={12} sx={gridRightStyle}>
          <Box className="bg-[#ffffff] rounded-2xl h-full flex justify-center items-center flex-col ">
            <div className="text-center lg:mb-[2rem]">
              <h2 className="text-3xl"> Register Account !</h2>
              <h4 className="text-sm mt-[8px]">
                Get your free Doot account now.
              </h4>
            </div>

            <form
              className={Style.auth_padding}
              style={{paddingTop: '2rem'}}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <label htmlFor="filled-basic1" className="block mb-1">
                    Email
                  </label>
                  <TextField
                    id="filled-basic1"
                    variant="filled"
                    name="email"
                    fullWidth
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color="success"
                    label={errors.email && touched.email ? 'Error' : 'Email'}
                    error={errors.email && touched.email ? true : false}
                  />
                  <FormHelperText style={errorStyle}>
                    {errors.email && touched.email ? errors.email : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <label htmlFor="filled-basic2" className="block mb-1">
                    FullName
                  </label>
                  <TextField
                    id="filled-basic2"
                    label={errors.fullName && touched.fullName ? 'Error' : 'FullName'}
                    variant="filled"
                    name="fullName"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color="success"
                    // autoComplete="fullName"
                    error={errors.fullName && touched.fullName ? true : false}
                  />
                  <FormHelperText style={errorStyle}>
                    {errors.fullName && touched.fullName ? errors.fullName : null}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} >
                  <label
                    htmlFor="filled-adornment-password"
                    className="block mb-1"
                  >
                    Password
                  </label>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel
                      htmlFor="filled-adornment-password"
                      color="success"
                      error={errors.password && touched.password ? true : false}
                    >
                      {errors.password && touched.password ? 'Error' : 'Password'}
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      error={errors.password && touched.password ? true : false}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormHelperText style={errorStyle}>
                    {errors.password && touched.password ? errors.password : null}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} >
                  <label
                    htmlFor="filled-adornment-password1"
                    className="block mb-1"
                  >
                    Confirm Password
                  </label>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel
                      htmlFor="filled-adornment-password1"
                      color="success"
                      error={errors.confirmPassword && touched.confirmPassword ? true : false}
                    >
                      {errors.confirmPassword && touched.confirmPassword ? 'Error' : 'Confirm Password'}
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password1"
                      name="confirmPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      error={errors.confirmPassword && touched.confirmPassword ? true : false}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickCurrentShowPassword}
                            edge="end"
                          >
                            {showCurrentPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormHelperText style={errorStyle}>
                    {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Remember me"
                    control={
                      <Checkbox
                        color="success"
                        onChange={(e) => setChecked(!e.target.checked)}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} className="text-center">

                  <LoadingButton

                    loading={loading}
                    loadingIndicator="Loading…"
                    variant="success"
                    type="submit"
                    disabled={checked}
                    className="bg-[#4eac6d] w-[80%] text-white rounded-lg py-2 text-xl "
                    sx={{
                      'backgroundColor': '#4eac6d',
                      'color': '#fff',
                      'padding': '.5rem 0',
                      '&:hover': {
                        backgroundColor: '#4eac6d',
                      },

                    }}
                  >
                    <span>Sign Up</span>
                  </LoadingButton>
                </Grid>
                <Grid item xs={12} className="text-center ">
                  -------------------
                  <span className="text-sm ">Sign up using</span>
                  -------------------
                </Grid>

                <Grid item xs={12} className="mt-3">
                  <Grid container spacing={2}>
                    <Grid item xs={12} className="text-center">
                      <Box
                        className="bg-[#878a9222] py-2 px-4 rounded-lg cursor-pointer flex items-center w-[50%] m-auto"
                        onClick={HandleGoogleAuth}
                      >
                        <button type="button">
                          <img src={Google} />
                        </button>
                        <span className="ml-4">Sign up with Google</span>
                      </Box>
                    </Grid>

                    <Grid item xs={12} className="text-center">
                      <h2 className="py-6">
                        Don&apos;t have an account ?
                        <Link
                          to="/signIn"
                          className="text-[#4eac6d] font-medium ml-2"
                        >
                          Login
                        </Link>
                      </h2>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{...imageStyle}}>
        <img src={Logo} alt="Image_description" />
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackError.type || 'info'} sx={{width: '100%'}}>
          {snackError.message}
        </Alert>
      </Snackbar>
    </main>
  );
}
