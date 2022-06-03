import { createSlice } from "@reduxjs/toolkit";

const _landingPageButtons = createSlice({
    name: 'landingPageButtons',
    initialState: {
        value: '',
    },
    reducers: {
        setButtonsVisable: (state) => {
            state.value = 'visible';
        },
        setButtonsHidden: (state) => {
            state.value = 'hidden'
        }
    }
})

export const {setButtonsVisable} = _landingPageButtons.actions;
export const {setButtonsHidden} = _landingPageButtons.actions;
export default _landingPageButtons.reducer;