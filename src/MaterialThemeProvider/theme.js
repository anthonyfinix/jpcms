import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors'
export default createTheme({
  typography: {
    fontFamily: ['Open Sans'].join(','),
  },
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});