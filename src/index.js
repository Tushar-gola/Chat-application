import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../src/redux/store';
import {ThemeContextProvider} from './theme/ThemeContextProvider';
import {BrowserRouter} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store = {store}>
          <PersistGate loading = {null} persistor = {persistor}>
            <ThemeContextProvider >
              <App />
            </ThemeContextProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
);

