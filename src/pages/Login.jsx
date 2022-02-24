import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userService } from '../services/user.service.js';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../assets/imgs/logo/blackLogo.svg';
import leftSvg from '../assets/imgs/login-svg-left.svg';
import rightSvg from '../assets/imgs/login-svg-right.svg';

import { setUser } from '../store/user.action.js';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Taskflow
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme2 = createTheme();

export function Login() {
  const history = useHistory();

  const { loggedInUser } = useSelector((state) => ({
    loggedInUser: state.userModule.loggedInUser,
  }));

  // useEffect(() => {}, [loggedInUser]);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(setUser(user, 'login'));
    if (user.email && user.password) history.push('/workspace');
  };
  const responseGoogle = (response) => {
    console.log(response);
    const user = {
      email: response.profileObj.email,
      password: '11111',
    };
    dispatch(setUser(user, 'login'));

    // if (loggedInUser.email === user.email)
    history.push('/workspace');
  };

  const URL =
    process.env.NODE_ENV === 'production'
      ? 'https://taskflow-nadav-tom-oded.herokuapp.com/login'
      : '//http://localhost:3000/login';

  return (
    <section className='login-signup'>
      <ThemeProvider theme={theme2}>
        <Container component='main' maxWidth='xs'>
          <img
            className='logo-img'
            src={logo}
            alt='logo'
            onClick={() => {
              history.push('/');
            }}
          />
          {/* {loggedInUser ? <h1>hello {' ' + loggedInUser.fullName}</h1> : null} */}
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />

              <GoogleLogin
                clientId={
                  '484186307654-22veet8tro4ahi5q7a01un8rgrodj2qj.apps.googleusercontent.com'
                }
                buttonText='Login with Google'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                nredirect_uri={URL}
              />
              <Button
                className='google-btn'
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                {/* <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href='/signup' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        <div className='left-img-div'>
          <img src={leftSvg} alt='' />
        </div>
        <div className='right-img-div'>
          <img src={rightSvg} alt='' />
        </div>
      </ThemeProvider>
    </section>
  );
}
