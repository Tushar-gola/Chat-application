/* eslint-disable react/prop-types */
import {createTheme} from '@mui/material';
import {createContext, useContext} from 'react';
import {useColorTheme} from './useColorTheme';

export const ThemeContext = createContext({
  mode: 'dark',
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider = ({children}) => {
  const value = useColorTheme();
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
