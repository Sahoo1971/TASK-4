import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green
    },
    secondary: {
      main: '#ff5722', // Orange
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;
