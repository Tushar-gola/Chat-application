import React from 'react';
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
  FilledInput,
  Checkbox,
  FormControlLabel,
  FormHelperText, Snackbar, Alert,
} from '@mui/material';
import Google from '../../assets/image/google.svg';
import Style from '../style.module.css';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

import Logo from '../../assets/image/auth_logo.png';
import {useFormik} from 'formik';
import {Link} from 'react-router-dom';
import {auth, provider} from '../../auth/config';
import {signInWithPopup} from 'firebase/auth';
import {$crud} from '../../CRUD/Crud';
import LoadingButton from '@mui/lab/LoadingButton';
import {useNavigate} from 'react-router-dom';
import {SignInAuth} from '../../schemas/index';
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
export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [snackError, setSnackError] = React.useState({type: '', message: ''});
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {handleBlur, handleSubmit, handleChange, errors, touched, setErrors} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInAuth,
    onSubmit: async (values) => {
      setLoading(true);
      const apiUrl = '/create/login-with-email';
      const registrationSuccess = await registerUser(values, apiUrl);
      if (registrationSuccess) {
        navigation('/dashboard');
        setLoading(false);
      } else {
        setLoading(false);
      }
    },
  });

  const HandleGoogleAuth = async () => {
    try {
      setChecked(true);
      const {user, _tokenResponse} = await signInWithPopup(auth, provider);
      const {uid, email} = user;
      const {firstName, lastName, fullName, photoUrl, idToken} = _tokenResponse;
      const apiUrl = '/create/google-login';
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

  const registerUser = async (userData, apiUrl) => {
    try {
      const res = await $crud.post(apiUrl, userData);
      if (res?.errors) {
        const {path: keyName, msg: message} = res?.errors[0];
        setErrors({[keyName]: message});
        return false; // Registration failed due to errors
      } else if (res.type == 'success') {
        localStorage.setItem('token', res?.data?.token);
        return true; // Successful registration
      }
    } catch (error) {
      console.log(error, 'error');
      setSnackError({type: error?.type, message: error?.message});
      handleClick();
      return false; // Registration failed due to an exception
    }
  };

  return (
    <main
      className = {Style.main_bg_color}
      style = {{width: '100%', height: '100vh'}}
    >
      <Grid container>
        <Grid
          item
          xl = {3}
          lg = {3}
          md = {0}
          sm = {0}
          xs = {0}
          sx = {{height: '100vh'}}
        ></Grid>

        <Grid item xl = {9} lg = {9} md = {12} sm = {12} xs = {12} sx = {gridRightStyle}>
          <Box className = "bg-[#ffffff] rounded-2xl h-full flex justify-center items-center flex-col ">
            <div className = "text-center lg:mb-[2rem]">
              <h2 className = "text-3xl">Welcome Back !</h2>
              <h4 className = "text-sm mt-[8px]">Sign in to continue to Doot.</h4>
            </div>

            <form
              className = {Style.auth_padding}
              style = {{paddingTop: '2rem'}}
              onSubmit = {handleSubmit}
            >
              <Grid container spacing = {2}>
                <Grid item xs = {12}>
                  <label htmlFor = "filled-basic" className = "block mb-1">
                    Email
                  </label>
                  <TextField
                    id = "filled-basic"
                    variant = "filled"
                    name = "email"
                    fullWidth
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    color = "success"
                    label = {'Email'}
                    error = {errors.email && touched.email ? true : false}
                  />
                  <FormHelperText style = {errorStyle}>
                    {errors.email && touched.email ? errors.email : null}
                  </FormHelperText>
                </Grid>

                <Grid item xs = {12}>
                  <label
                    htmlFor = "filled-adornment-password"
                    className = "block mb-1"
                  >
                    {errors.password && touched.password ? 'Error' : 'Password'}
                  </label>
                  <FormControl variant = "filled" fullWidth>
                    <InputLabel
                      htmlFor = "filled-adornment-password"
                      color = "success"
                      error = {errors.password && touched.password ? true : false}
                    >
                      Password
                    </InputLabel>
                    <FilledInput
                      id = "filled-adornment-password"
                      name = "password"
                      type = {showPassword ? 'text' : 'password'}
                      onChange = {handleChange}
                      onBlur = {handleBlur}
                      error = {errors.password && touched.password ? true : false}
                      endAdornment = {
                        <InputAdornment position = "end">
                          <IconButton
                            aria-label = "toggle password visibility"
                            onClick = {handleClickShowPassword}
                            edge = "end"
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
                  <FormHelperText style = {errorStyle}>
                    {errors.password && touched.password ? errors.password : null}
                  </FormHelperText>
                </Grid>
                <Grid item xs = {12}>
                  <FormControlLabel
                    label = "Remember me"
                    control = {<Checkbox color = "success" onChange = {(e) => setChecked(!e.target.checked)} />}
                  />
                </Grid>
                <Grid item xs = {12} className = "text-center">
                  <LoadingButton
                    // onClick={handleClick}
                    loading = {loading}
                    loadingIndicator = "Loading…"
                    variant = "success"
                    type = "submit"
                    disabled = {checked}
                    className = "bg-[#4eac6d] w-full text-white rounded-lg py-2 text-xl "
                    sx = {{
                      'backgroundColor': '#4eac6d',
                      'color': '#fff',
                      'padding': '.5rem 0',
                      '&:hover': {
                        backgroundColor: '#4eac6d',
                      },

                    }}
                  >
                    <spa>Sign Up</spa>
                  </LoadingButton>
                </Grid>
                <Grid item xs = {12} className = "text-center">
                  ----------------{''}
                  <span className = "text-sm">Sign in with</span>{''}
                  ----------------
                </Grid>

                <Grid item xs = {12} className = "mt-3">
                  <Grid container spacing = {2}>
                    <Grid item xs = {12} className = "text-center">
                      <Box
                        className = " bg-[#878a9222] py-2 px-4 rounded-lg cursor-pointer flex items-center w-[80%] lg:w-[50%] m-auto"
                        onClick = {HandleGoogleAuth}
                      >
                        <button type = "button">
                          <img src = {Google} />
                        </button>
                        <span className = "ml-4">Sign up with Google</span>
                      </Box>
                    </Grid>

                    <Grid item xs = {12} className = "text-center mt-6">
                      <h2>
                        Don&apos;t have an account ?
                        <Link
                          to = "/signUp"
                          className = "text-[#4eac6d] font-medium"
                        >
                          {' '}
                          Register
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

      <Box sx = {{...imageStyle}}>
        <img src = {Logo} alt = "Image description" />
      </Box>
      <Snackbar open = {open} autoHideDuration = {6000} onClose = {handleClose}>
        <Alert onClose = {handleClose} severity = {snackError.type || 'info'} sx = {{width: '100%'}}>
          {snackError.message}
        </Alert>
      </Snackbar>
    </main>
  );
}
