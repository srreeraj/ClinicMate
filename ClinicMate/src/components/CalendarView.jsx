import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, isSameMonth } from 'date-fns'
import AppointmentForm from './AppointmentForm'
import DatePickerMobile from './DatePickerMobile'
import AppointmentList from './AppointmentList'
import DarkModeToggle from './DarkModeToggle'
import { setDoctorFilter, setPatientFilter, clearFilter } from '../features/filterSlice'
import data from '../assets/data.json'

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editAppointment, setEditAppointment] = useState(null)
  const appointments = useSelector((state) => state.appointments.appointments)
  const { doctor, patient } = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const today = new Date()
  const startDate = startOfMonth(today)
  const endDate = endOfMonth(today)
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  const firstDayIndex = getDay(startDate)

  const filteredAppointments = appointments.filter((app) => {
    const appDate = new Date(app.date)
    const matchesDate = isSameDay(appDate, selectedDate)
    const matchesDoctor = doctor ? app.doctorId === doctor : true
    const matchesPatient = patient ? app.patientId === patient : true
    return matchesDate && matchesDoctor && matchesPatient
  })

  const openForm = (date, appointment = null) => {
    setSelectedDate(date)
    setEditAppointment(appointment)
    setIsFormOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Appointment Calendar</h1>
        <DarkModeToggle />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <DatePickerMobile selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className="flex flex-col gap-4 mb-4">
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={doctor}
            onChange={(e) => dispatch(setDoctorFilter(e.target.value))}
          >
            <option value="">All Doctors</option>
            {data.doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={patient}
            onChange={(e) => dispatch(setPatientFilter(e.target.value))}
          >
            <option value="">All Patients</option>
            {data.patients.map((pat) => (
              <option key={pat.id} value={pat.id}>{pat.name}</option>
            ))}
          </select>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => dispatch(clearFilters())}
          >
            Clear Filters
          </button>
        </div>
        <AppointmentList
          appointments={filteredAppointments}
          onEdit={(appointment) => openForm(selectedDate, appointment)}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex gap-4 mb-4">
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={doctor}
            onChange={(e) => dispatch(setDoctorFilter(e.target.value))}
          >
            <option value="">All Doctors</option>
            {data.doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={patient}
            onChange={(e) => dispatch(setPatientFilter(e.target.value))}
          >
            <option value="">All Patients</option>
            {data.patients.map((pat) => (
              <option key={pat.id} value={pat.id}>{pat.name}</option>
            ))}
          </select>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => dispatch(clearFilter())}
          >
            Clear Filters
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-bold p-2 bg-gray-200 dark:bg-gray-700">
              {day}
            </div>
          ))}
          {Array(firstDayIndex).fill().map((_, i) => (
            <div key={`empty-${i}`} className="p-2 bg-gray-100 dark:bg-gray-900"></div>
          ))}
          {days.map((day) => {
            const dayAppointments = appointments.filter((app) =>
              isSameDay(new Date(app.date), day)
            )
            return (
              <div
                key={day}
                className={`p-2 border h-24 overflow-auto cursor-pointer ${
                  isSameMonth(day, today)
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-gray-50 dark:bg-gray-900 opacity-50'
                }`}
                onClick={() => isSameMonth(day, today) && openForm(day)}
              >
                <div className="text-sm font-bold">{format(day, 'd')}</div>
                {dayAppointments.map((app) => (
                  <div
                    key={app.id}
                    className="text-xs p-1 bg-blue-100 dark:bg-blue-900 rounded mt-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      openForm(day, app)
                    }}
                  >
                    {app.time} - {data.patients.find((p) => p.id === app.patientId)?.name}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {isFormOpen && (
        <AppointmentForm
          date={selectedDate}
          appointment={editAppointment}
          onClose={() => {
            setIsFormOpen(false)
            setEditAppointment(null)
          }}
        />
      )}
    </div>
  )
}

export default CalendarView