import data from '../assets/data.json'

function AppointmentList({ appointments, onEdit, isDarkMode, baseClasses }) {
  return (
    <div className="space-y-2">
      {appointments.length === 0 ? (
        <p className={`${baseClasses?.text?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>
          No appointments for this day.
        </p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              isDarkMode 
                ? 'bg-blue-900 hover:bg-blue-800 border border-blue-800' 
                : 'bg-blue-100 hover:bg-blue-200 border border-blue-200'
            }`}
            onClick={() => onEdit(appointment)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-blue-100' : 'text-blue-900'
                }`}>
                  {appointment.time}
                </p>
                <p className={`text-sm mt-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span className="font-medium">
                    {data.patients.find((p) => p.id === appointment.patientId)?.name || 'Unknown Patient'}
                  </span>
                  <span className={`mx-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    with
                  </span>
                  <span className="font-medium">
                    Dr. {data.doctors.find((d) => d.id === appointment.doctorId)?.name || 'Unknown Doctor'}
                  </span>
                </p>
                {appointment.notes && (
                  <p className={`text-xs mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {appointment.notes}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {appointment.status && (
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    appointment.status === 'confirmed' 
                      ? isDarkMode 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-green-100 text-green-800'
                      : appointment.status === 'pending'
                      ? isDarkMode 
                        ? 'bg-yellow-900 text-yellow-300' 
                        : 'bg-yellow-100 text-yellow-800'
                      : isDarkMode 
                        ? 'bg-red-900 text-red-300' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                )}
                <svg 
                  className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AppointmentList