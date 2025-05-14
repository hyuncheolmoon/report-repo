
import { createTheme } from '@mui/material/styles';
import { palette } from '@/constants';
export const theme = createTheme({
  palette: {
    primary: {
      main: palette.main,
    },
    secondary: {
      main: palette.blue500,
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
}); 