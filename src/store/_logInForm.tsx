import { createSlice } from "@reduxjs/toolkit";

const _logInForm = createSlice({
    name:'logInForm',
    initialState: {
        value: ' initial'
    },
    reducers: {
        setLogInFormVisible: (state) => {
            state.value = ' visible'
        },
        setLogInFormHidden: (state) => {
            state.value = ' hidden'
        },
        setLogInFormInitial: (state) => {
            state.value = ' initial'
        }
    }
})


export const {setLogInFormInitial} = _logInForm.actions;
export const {setLogInFormVisible} = _logInForm.actions;
export const {setLogInFormHidden} = _logInForm.actions;
export default _logInForm.reducer;