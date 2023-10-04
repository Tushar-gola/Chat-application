import {amber} from '@mui/material/colors';

const theme = {
  palette: {
    primary: amber,
  },
};

const white = '#adb5bd';
const lightGray = '#f1f1f1';
const middleGray = '#687e96';
const dark = '#101418';
const middleDark = '#262626';

export const getDesignTokens = (mode) => ({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: () => mode === 'light' ?
                    ({
                      backgroundColor: lightGray,
                      color: dark,
                    }) :
                    ({
                      backgroundColor: middleDark,
                      color: white,
                    }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? dark : white,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: mode === 'dark' && white,
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#9747FF',
    },
    ...(mode === 'light' ?
            {
              contrastThreshold: 2.5,
              background: {
                paper: white,
                default: lightGray,
              },
              text: {
                primary: dark,
                secondary: middleGray,
              },
            } :
            {
              contrastThreshold: 4.5,
              background: {
                paper: middleDark,
                default: dark,
              },
              text: {
                // primary: "#C4C3CD",
                // secondary: "#C4C3CD"
                primary: white,
                secondary: lightGray,
              },
            }),
  },
});

export default theme;
