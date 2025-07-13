import { createSlice } from '@reduxjs/toolkit'

const loadAppointments = () => {
    const data = localStorage.getItem('appointments')
    return data ? JSON.parse(data) : []
}

const saveAppointments = (appointements) => {
    localStorage.setItem('appointments', JSON.stringify(appointements))
}

const appointmentSlice = createSlice({
    name : 'appointments',
    initialState : {
        appointments : loadAppointments(),
    },
    reducers : {
        addAppointment : (state , action) => {
            state.appointments.push(action.payload)
            saveAppointments(state.appointments)
        },
        updateAppointment : (state, action) => {
            const index = state.appointments.findIndex(app => app.id === action.payload.id)
            if(index !== -1) {
                state.appointments[index] = action.payload
                saveAppointments(state.appointments)
            }
        },
        deleteAppointment : (state, action) => {
            state.appointments = state.appointments.filter(app => app.id !== action.payload)
            saveAppointments(state.appointments)
        },
    },
})

export const { addAppointment, updateAppointment, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;