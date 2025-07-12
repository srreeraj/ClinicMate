import { createSlice } from "@reduxjs/toolkit";

const loadDarkModeState = () => {
    const data = localStorage.getItem('darkMode')
    return data ? JSON.parse(data) : { isDarkMode : false}
}

const saveDarkModeState = (state) => {
    localStorage.setItem('darkMode', JSON.stringify(state))
}

const darkModeSlice = createSlice({
    name : 'darkMode',
    initialState : loadDarkModeState(),
    reducers : {
        toggleDarkMode : (state) => {
            state.isDarkMode = !state.isDarkMode
            saveDarkModeState(state)
        },
        setDarkMode : (state, action) => {
            state.isDarkMode = action.payload
            saveDarkModeState(state)
        },
    },
})

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;