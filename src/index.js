import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store';
import { ThemeContextProvider } from './theme/ThemeContextProvider';
import { BrowserRouter } from 'react-router-dom';
// import { createTheme } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root'));
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4eac6d'
//     }
//   }
// })
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider >
          <App />
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);

