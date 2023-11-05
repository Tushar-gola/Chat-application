import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: '-100%',
  id: 0,
  status: 0,
  logo: '',
  name: "",

};

export const ChatArea = createSlice({
  name: 'ChatArea',
  initialState,
  reducers: {
    open: (state, { payload = 0 }) => {
      state.open = '0';
      state.id = payload.id;
      state.status = payload.isActive
      state.logo = payload.photoUrl
      state.name = payload.fullName
    },
    close: (state) => {
      state.open = '-100%';
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = ChatArea.actions;

export default ChatArea.reducer;
