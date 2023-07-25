import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useEffect } from 'react';
import { useHeader } from '../../../hooks/useHeader';

export default function ButtonAppBar() {
  const { classes, isLogin, isClient, tryLogout, setIsClient } =
    useHeader();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const logoutButton = () => {
    if (isLogin && isClient) {
      return (
        <Button color="inherit" className="!ml-auto" onClick={tryLogout}>
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
