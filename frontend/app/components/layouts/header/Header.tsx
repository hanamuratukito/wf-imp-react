import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { signOut } from '../../../features/auth/api/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const router = useRouter();
  const classes = useStyles();

  const tryLogout = async () => {
    try {
      const res = await signOut();

      if (res.data.success) {
        // サインアウト時には各Cookieを削除
        // TODO セキュリティ面を考慮するとサーバーでcookie登録するのが望ましい
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutButton = () => {
    if (Cookies.get('_access_token')) {
      return (
        <Button
          color="inherit"
          className="!ml-auto"
          onClick={tryLogout}
        >
          ログアウト
        </Button>
      );
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">ログイン</Typography>
        {logoutButton()}
      </Toolbar>
    </AppBar>
  );
}
