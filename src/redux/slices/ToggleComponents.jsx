import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Chats",
   
};

export const ToggleComponent = createSlice({
    name: "ToggleComponent",
    initialState,
    reducers: {
        ChangeComponent: (state, { payload }) => {
            state.name = payload;

        },
        EmptyComponent: (state) => {
            state.open = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const { ChangeComponent, EmptyComponent } = ToggleComponent.actions;

export default ToggleComponent.reducer;
