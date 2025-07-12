import { createSlice } from '@reduxjs/toolkit'

const loadAppointments = () => {
    const data = localStorage.getItem('appointments')
    return data ? JSON.parse(data) : []
}

const saveAppointements = (appointements) => {
    localStorage.setItem('appointments', JSON.stringify(appointements))
}

const appointementSlice = createSlice({
    name : 'appointments',
    initialState : {
        appointements : loadAppointments(),
    },
    reducers : {
        addAppointment : (state , action) => {
            state.appointements.push(action.payload)
            saveAppointements(state.appointements)
        },
        updateAppointment : (state, action) => {
            const index = state.appointements.findIndex(app => app.id === action.payload.id)
            if(index !== -1) {
                state.appointements[index] = action.payload
                saveAppointements(state.appointements)
            }
        },
        deleteAppointment : (state, action) => {
            state.appointements = state.appointements.filter(app => app.id !== action.payload)
            saveAppointements(state.appointements)
        },
    },
})

export const { addAppointment, updateAppointment, deleteAppointment } = appointementSlice.actions;
export default appointementSlice.reducer;