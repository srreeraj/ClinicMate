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
  const appointments = useSelector((state) => state.appointments?.appointments || [])
  const { doctor, patient } = useSelector((state) => state.filters)
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)
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
    // Check if trying to create appointment on past date
    const isPastDate = date < today && !isSameDay(date, today)
    if (isPastDate && !appointment) {
      return // Don't open form for new appointments on past dates
    }
    
    setSelectedDate(date)
    setEditAppointment(appointment)
    setIsFormOpen(true)
  }

  // Base classes for light and dark modes
  const baseClasses = {
    container: `min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`,
    card: `rounded-lg shadow-sm border transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`,
    text: {
      primary: isDarkMode ? 'text-gray-100' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      muted: isDarkMode ? 'text-gray-500' : 'text-gray-500'
    },
    button: {
      primary: `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
        isDarkMode
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`,
      secondary: `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
        isDarkMode
          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`
    },
    input: `w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      isDarkMode
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    }`
  }

  return (
    <div className={baseClasses.container}>
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className={`${baseClasses.card} p-6 mb-6`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${baseClasses.text.primary}`}>
                Appointment Calendar
              </h1>
              <p className={`${baseClasses.text.secondary} mt-1`}>
                {format(today, 'MMMM yyyy')} • {appointments.length} appointments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          <div className={baseClasses.card}>
            <div className="p-4">
              <DatePickerMobile selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
          </div>
          
          {/* Filter Section */}
          <div className={baseClasses.card}>
            <div className="p-4">
              <h3 className={`text-lg font-semibold ${baseClasses.text.primary} mb-4 flex items-center gap-2`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${baseClasses.text.secondary} mb-1`}>
                    Doctor
                  </label>
                  <select
                    className={baseClasses.input}
                    value={doctor}
                    onChange={(e) => dispatch(setDoctorFilter(e.target.value))}
                  >
                    <option value="">All Doctors</option>
                    {data.doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${baseClasses.text.secondary} mb-1`}>
                    Patient
                  </label>
                  <select
                    className={baseClasses.input}
                    value={patient}
                    onChange={(e) => dispatch(setPatientFilter(e.target.value))}
                  >
                    <option value="">All Patients</option>
                    {data.patients.map((pat) => (
                      <option key={pat.id} value={pat.id}>{pat.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  className={baseClasses.button.secondary}
                  onClick={() => dispatch(clearFilter())}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          <div className={baseClasses.card}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${baseClasses.text.primary}`}>
                  Appointments for {format(selectedDate, 'MMM d, yyyy')}
                </h3>
                {/* Only show New button if selected date is not in the past */}
                {(!selectedDate || selectedDate >= today || isSameDay(selectedDate, today)) && (
                  <button
                    className={baseClasses.button.primary}
                    onClick={() => openForm(selectedDate)}
                  >
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New
                  </button>
                )}
              </div>
              <AppointmentList
                appointments={filteredAppointments}
                onEdit={(appointment) => openForm(selectedDate, appointment)}
              />
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          {/* Filter Section */}
          <div className={`${baseClasses.card} p-6 mb-6`}>
            <h3 className={`text-lg font-semibold ${baseClasses.text.primary} mb-4 flex items-center gap-2`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h3>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className={`block text-sm font-medium ${baseClasses.text.secondary} mb-1`}>
                  Doctor
                </label>
                <select
                  className={baseClasses.input}
                  value={doctor}
                  onChange={(e) => dispatch(setDoctorFilter(e.target.value))}
                >
                  <option value="">All Doctors</option>
                  {data.doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>{doc.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className={`block text-sm font-medium ${baseClasses.text.secondary} mb-1`}>
                  Patient
                </label>
                <select
                  className={baseClasses.input}
                  value={patient}
                  onChange={(e) => dispatch(setPatientFilter(e.target.value))}
                >
                  <option value="">All Patients</option>
                  {data.patients.map((pat) => (
                    <option key={pat.id} value={pat.id}>{pat.name}</option>
                  ))}
                </select>
              </div>
              <button
                className={baseClasses.button.secondary}
                onClick={() => dispatch(clearFilter())}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className={baseClasses.card}>
            <div className="p-6">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div 
                    key={day} 
                    className={`text-center font-semibold py-3 ${baseClasses.text.primary}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month start */}
                {Array(firstDayIndex).fill().map((_, i) => (
                  <div key={`empty-${i}`} className="h-24"></div>
                ))}
                
                {/* Calendar days */}
                {days.map((day) => {
                  const dayAppointments = appointments.filter((app) =>
                    isSameDay(new Date(app.date), day)
                  )
                  const isToday = isSameDay(day, today)
                  const isSelected = isSameDay(day, selectedDate)
                  const isCurrentMonth = isSameMonth(day, today)
                  const isPastDate = day < today && !isToday
                  const isClickable = isCurrentMonth && !isPastDate
                  
                  return (
                    <div
                      key={day}
                      className={`
                        h-24 p-2 border transition-colors duration-200
                        ${!isCurrentMonth 
                          ? 'opacity-30 cursor-not-allowed' 
                          : isPastDate
                          ? `opacity-60 cursor-not-allowed ${
                              isDarkMode 
                                ? 'bg-gray-900 border-gray-800 text-gray-600' 
                                : 'bg-gray-50 border-gray-300 text-gray-400'
                            }`
                          : `cursor-pointer ${
                              isToday 
                                ? isDarkMode 
                                  ? 'bg-blue-900 border-blue-700' 
                                  : 'bg-blue-50 border-blue-200'
                                : isSelected
                                ? isDarkMode
                                  ? 'bg-gray-700 border-gray-600'
                                  : 'bg-gray-100 border-gray-300'
                                : isDarkMode
                                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`
                        }
                      `}
                      onClick={() => isClickable && openForm(day)}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        !isCurrentMonth
                          ? 'text-gray-400'
                          : isPastDate
                          ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                          : isToday 
                          ? isDarkMode ? 'text-blue-300' : 'text-blue-700'
                          : baseClasses.text.primary
                      }`}>
                        {format(day, 'd')}
                      </div>
                      
                      {/* Appointments */}
                      <div className="space-y-1 overflow-y-auto max-h-16">
                        {dayAppointments.slice(0, 2).map((app) => (
                          <div
                            key={app.id}
                            className={`text-xs p-1 rounded transition-colors duration-150 ${
                              isPastDate
                                ? `cursor-default ${
                                    isDarkMode
                                      ? 'bg-gray-800 text-gray-500'
                                      : 'bg-gray-200 text-gray-500'
                                  }`
                                : `cursor-pointer ${
                                    isDarkMode
                                      ? 'bg-blue-700 text-blue-100 hover:bg-blue-600'
                                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  }`
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!isPastDate) openForm(day, app)
                            }}
                          >
                            <div className="font-medium">{app.time}</div>
                            <div className="truncate">
                              {data.patients.find((p) => p.id === app.patientId)?.name}
                            </div>
                          </div>
                        ))}
                        {dayAppointments.length > 2 && (
                          <div className={`text-xs ${baseClasses.text.muted} text-center`}>
                            +{dayAppointments.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${baseClasses.card} max-w-md w-full`}>
              <AppointmentForm
                date={selectedDate}
                appointment={editAppointment}
                onClose={() => {
                  setIsFormOpen(false)
                  setEditAppointment(null)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarView