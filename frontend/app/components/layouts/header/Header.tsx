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
import { useEffect, useState } from "react";
import { getIsLogin, authSlice } from '../../../features/auth/stores/authStore';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function ButtonAppBar() {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);

  // useEffectを使わずにHTMLのだし分けを行うと、エラーが発生するためその回避
  // 参考：https://nishinatoshiharu.com/next-hydration-warning-resolution/
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const tryLogout = async () => {
    try {
      const res = await signOut();

      if (res.data.success) {
        // サインアウト時には各Cookieを削除
        // TODO セキュリティ上、Cookieはサーバ側で登録するべき
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        dispatch(authSlice.actions.updateIsLogin({ isLogin: false }));

        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutButton = () => {
    if (isLogin && isClient) {
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
