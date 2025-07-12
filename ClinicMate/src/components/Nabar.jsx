import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Home, Person, Settings, ExitToApp } from '@mui/icons-material'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleDummyClick = (buttonName) => {
    console.log(`${buttonName} clicked`)
  }

  return (
    <AppBar position="static" className="bg-blue-600 dark:bg-blue-800 mb-4">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white">
          ClinicMate
        </Typography>
        <div className="flex gap-2">
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => navigate('/calendar')}
            className="text-white"
          >
            Home
          </Button>
          <Button
            color="inherit"
            startIcon={<Person />}
            onClick={() => handleDummyClick('Profile')}
            className="text-white"
          >
            Profile
          </Button>
          <Button
            color="inherit"
            startIcon={<Settings />}
            onClick={() => handleDummyClick('Settings')}
            className="text-white"
          >
            Settings
          </Button>
          <Button
            color="inherit"
            startIcon={<ExitToApp />}
            onClick={handleLogout}
            className="text-white"
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar