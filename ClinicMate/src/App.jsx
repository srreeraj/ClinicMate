import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from './components/LoginPage'
import CalendarView from './components/CalendarView'
import Navbar from './components/Nabar'

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navbar/>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/calendar" /> : <LoginPage />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/calendar" /> : <LoginPage />}
            />
            <Route
              path="/calendar"
              element={isAuthenticated ? <CalendarView /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
  )
}

export default App