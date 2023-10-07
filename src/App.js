import React from 'react';
import './App.css';
import {Routers} from './routes';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {useThemeContext} from '../src/theme/ThemeContextProvider';
function App() {
  const {theme} = useThemeContext();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routers />
      </ThemeProvider>
    </>
  );
}

export default App;
