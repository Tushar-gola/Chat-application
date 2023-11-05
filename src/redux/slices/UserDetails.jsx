import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

export const UserDetails = createSlice({
  name: 'UserDetails',
  initialState,
  reducers: {
    getData: (state, {payload}) => {
      state.data = payload;
    },
    Cancel: (state) => {
      state.data = {};
    },
  },
});

export const {getData, Cancel} = UserDetails.actions;

export default UserDetails.reducer;
