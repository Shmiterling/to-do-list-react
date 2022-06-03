import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const _signUpForm = createSlice({
    name: 'signUpForm',
    initialState: {
        value: ' initial'
    },
    reducers: {
        setSignUpFormVisible: (state) => {
            state.value = ' visible'
        },
        setSignUpFormHidden: (state) => {
            state.value = ' hidden'
        },
        setSignUpFormInitial: (state) => {
            state.value = ' initial'
        }
    }
})


export const {setSignUpFormInitial} = _signUpForm.actions
export const {setSignUpFormVisible} = _signUpForm.actions;
export const {setSignUpFormHidden} = _signUpForm.actions;
export default _signUpForm.reducer;