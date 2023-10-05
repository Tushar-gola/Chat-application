import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

export const UserDetails = createSlice({
  name: 'UserDetails',
  initialState,
  reducers: {
    getData: (state, {payload}) => {
      console.log(state, payload, 'lllllllllll');
      state.data = payload;
    },
    Cancel: (state) => {
      state.data = {};
    },
  },
});

export const {getData, Cancel} = UserDetails.actions;

export default UserDetails.reducer;
