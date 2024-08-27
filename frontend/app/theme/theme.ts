import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#95D1CC',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#bdbdbd',
    },
    text: { primary: '#ff9800' },
  },
});

export default theme;
