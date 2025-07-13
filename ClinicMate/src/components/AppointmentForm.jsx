import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAppointment, updateAppointment, deleteAppointment } from '../features/appointmentSlice'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import data from '../assets/data.json'

const AppointmentForm = ({date, appointment, onClose }) => {
  const dispatch = useDispatch()
  const [patientId, setPatientId] = useState(appointment?.patientId || '')
  const [doctorId , setDoctorId] = useState(appointment?.doctorId || '')
  const [time , setTime] = useState(appointment?.time || '')

  const handleSubmit = () => {
    const appointmentData = {
      id : appointment?.id || uuidv4(),
      date : date.toISOString(),
      patientId,
      doctorId,
      time,
    }
    if (appointment) {
      dispatch(updateAppointment(appointmentData))
    } else {
      dispatch(addAppointment(appointmentData))
    }
    onClose()
  }

  const handleDelete = () => {
    if(appointment) {
      dispatch(deleteAppointment(appointment.id))
    }
    onClose()
  }
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{appointment ? 'Edit Appointment' : 'Add Appointment'}</DialogTitle>
      <DialogContent>
        <div className="space-y-4 py-4">
          <Select
            fullWidth
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            displayEmpty
            renderValue={(value) => value ? data.patients.find(p => p.id === value)?.name : 'Select Patient'}
          >
            {data.patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            displayEmpty
            renderValue={(value) => value ? data.doctors.find(d => d.id === value)?.name : 'Select Doctor'}
          >
            {data.doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>{doctor.name}</MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            label="Time"
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        {appointment && (
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!patientId || !doctorId || !time}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AppointmentForm
