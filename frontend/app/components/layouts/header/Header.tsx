import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
