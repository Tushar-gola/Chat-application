import { ChatArea } from "./slices/OpenChatBox";
import { ToggleComponent } from './slices/ToggleComponents'
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
const rootReducer = combineReducers({
  open: ChatArea.reducer,
  toggle: ToggleComponent.reducer
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["open","ToggleComponent"],
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
