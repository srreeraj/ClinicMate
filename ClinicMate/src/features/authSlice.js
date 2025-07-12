import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
    const data = localStorage.getItem('auth')
    return data ? JSON.parse(data) : { isAuthenticated : false, user : null}
}

const saveAuthState = (state) => {
    localStorage.setItem('auth', JSON.stringify(state))
}

const authSlice = createSlice({
    name : 'auth',
    initialState : loadAuthState(),
    reducers : {
        login : (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
            saveAuthState(state)
        },
        logout : (state) => {
            state.isAuthenticated = false
            state.user = null
            saveAuthState(state)
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;