import { createTheme } from '@material-ui/core/styles';

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
