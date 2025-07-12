import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name : 'filters',
    initialState : {
        doctor : '',
        patient : '',
    },
    reducers : {
        setDoctorFilter : (state, action) =>{
            state.doctor = action.payload
        },
        setPatientFilter : (state, action) => {
            state.patient = action.payload
        },
        clearFilter : (state) => {
            state.doctor = ''
            state.patient = ''
        },
    },
})

export const { setDoctorFilter, setPatientFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;