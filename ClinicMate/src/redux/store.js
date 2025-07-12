import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from '../features/appointmentSlice'
import authReducer from '../features/authSlice'
import filterReducer from '../features/filterSlice'
import darkModeReducer from '../features/darkModeSlice'

export const store = configureStore({
    reducer : {
        appointments : appointmentReducer,
        filters : filterReducer,
        auth : authReducer,
        darkMode : darkModeReducer,
    }
})