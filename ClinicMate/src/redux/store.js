import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from '../features/appointmentSlice'

export const store = configureStore({
    reducer : {
        appointments : appointmentReducer,
    }
})