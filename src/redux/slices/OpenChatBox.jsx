import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  open: '-100%',
  id: 0,
};

export const ChatArea = createSlice({
  name: 'ChatArea',
  initialState,
  reducers: {
    open: (state, {payload}) => {
      state.open = '0';
      state.id = payload;
    },
    close: (state) => {
      state.open = '-100%';
    },
  },
});

// Action creators are generated for each case reducer function
export const {open, close} = ChatArea.actions;

export default ChatArea.reducer;
