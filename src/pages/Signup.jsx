import * as React from 'react';
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
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setUser } from '../store/user.action.js';
import { useHistory } from 'react-router-dom';
import logo from '../assets/imgs/logo/blackLogo.svg';
import leftSvg from '../assets/imgs/login-svg-left.svg';
import rightSvg from '../assets/imgs/login-svg-right.svg';

import { userService } from '../services/user.service.js';

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

const theme = createTheme();

export function Signup() {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    let fullName = firstName + ' ' + lastName;
    let initials =
      firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

    const user = {
      email: data.get('email'),
      password: data.get('password').toString(),
      fullName: fullName,
      initials,
    };
    if (user.email && user.password && user.fullName && user.initials) {
      console.log(user);
      dispatch(setUser(user, 'signup'));
      setTimeout(() => {
        history.push('/workspace');
      });
    } else {
      console.log('you cant signup without al the information required');
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
    const user = {
      email: response.profileObj.email,
      password: '11111',
      fullName:
        response.profileObj.givenName + ' ' + response.profileObj.familyName,
      initials:
        response.profileObj.givenName.charAt(0).toUpperCase() +
        response.profileObj.familyName.charAt(0).toUpperCase(),
      imgUrl: response.profileObj.imageUrl || null,
    };
    console.log(user);
    if (user.email && user.password) history.push('/workspace');
    dispatch(setUser(user, 'signup'));
  };

  const URL =
    process.env.NODE_ENV === 'production'
      ? 'https://taskflow-nadav-tom-oded.herokuapp.com/signup'
      : '//http://localhost:3000/signup';

  return (
    <section className='login-signup'>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <img
            className='logo-img'
            src={logo}
            alt='logo'
            onClick={() => {
              history.push('/');
            }}
          />
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
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <GoogleLogin
                clientId={
                  '484186307654-22veet8tro4ahi5q7a01un8rgrodj2qj.apps.googleusercontent.com'
                }
                buttonText='Signup with Google'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                nredirect_uri={URL}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    {' Already have an account? Sign in'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      <div className='left-img-div'>
        <img src={leftSvg} alt='' />
      </div>
      <div className='right-img-div'>
        <img src={rightSvg} alt='' />
      </div>
    </section>
  );
}
