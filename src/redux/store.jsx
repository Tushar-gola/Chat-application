import {ChatArea} from './slices/OpenChatBox';
import {ToggleComponent} from './slices/ToggleComponents';
import {UserDetails} from './slices/UserDetails';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
  open: ChatArea.reducer,
  toggle: ToggleComponent.reducer,
  userData: UserDetails.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['open', 'ToggleComponent', 'userData'],
};
const persistReducers = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
