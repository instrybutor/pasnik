import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLoginButton from './GoogleButtonLogin';
import { useHistory } from 'react-router-dom';
import { useAuth } from './utils/useAuth';
import {
  IGoogleCallbackResponse,
  IGoogleOneTapLoginProps,
} from './GoogleOneTapLogin/types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Paśnik
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const auth = useAuth();
  const history = useHistory();

  const onSuccess = ({ credential, ...props }: IGoogleCallbackResponse) => {
    if (credential) {
      auth.signIn(credential).then(() => {
        history.push('/');
      });
    }
  };

  const config: IGoogleOneTapLoginProps = {
    client_id: process.env.NX_GOOGLE_CLIENT_ID!,
    cancel_on_tap_outside: false,
    callback: onSuccess,
  } as IGoogleOneTapLoginProps;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <GoogleLoginButton
          className={classes.submit}
          googleAccountConfigs={config}
        />
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}
