import data from '../assets/data.json'

function AppointmentList({ appointments, onEdit }) {
  return (
    <div className="space-y-2">
      {appointments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No appointments for this day.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-2 bg-blue-100 dark:bg-blue-900 rounded cursor-pointer"
            onClick={() => onEdit(appointment)}
          >
            <p className="text-sm">
              {appointment.time} - {data.patients.find((p) => p.id === app.patientId)?.name} with{' '}
              {data.doctors.find((d) => d.id === appointment.doctorId)?.name}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default AppointmentList