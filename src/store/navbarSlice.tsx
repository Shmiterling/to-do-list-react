import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name:"navbar",
    initialState: {
        value: "daily"
    },
    reducers: {
        changeToDaily: (state) => {
            state.value = 'daily'
        },
        changeToLibrary: (state) => {
            state.value = 'library'
        },
        changeToProfile: (state) => {
            state.value = 'profile'
        }
    }
});

export const { changeToDaily } = navbarSlice.actions;
export const { changeToLibrary} = navbarSlice.actions;
export const { changeToProfile } = navbarSlice.actions;
export default navbarSlice.reducer;