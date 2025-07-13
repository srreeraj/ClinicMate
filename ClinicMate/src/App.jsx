import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, CssBaseline, ThemeProvider, createTheme, Fade } from '@mui/material'
import LoginPage from './components/LoginPage'
import CalendarView from './components/CalendarView'
import Navbar from './components/Navbar'

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)

  // Create a custom theme
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#667eea',
        light: '#7c8ff0',
        dark: '#5a6fd8',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#764ba2',
        light: '#8b5ec5',
        dark: '#6a42a0',
        contrastText: '#ffffff'
      },
      background: {
        default: isDarkMode ? '#121212' : '#f8fafc',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff'
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#2c3e50',
        secondary: isDarkMode ? '#b0bec5' : '#7f8c8d'
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800
      },
      h2: {
        fontWeight: 700
      },
      h3: {
        fontWeight: 700
      },
      h4: {
        fontWeight: 600
      },
      h5: {
        fontWeight: 600
      },
      h6: {
        fontWeight: 600
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
            transition: 'all 0.3s ease'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0,0,0,0.4)' 
              : '0 4px 20px rgba(0,0,0,0.1)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8
          }
        }
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        transition: 'all 0.3s ease'
      }}>
        {/* Show Navbar only when authenticated */}
        {isAuthenticated && (
          <Fade in timeout={500}>
            <Box>
              <Navbar/>
            </Box>
          </Fade>
        )}
        
        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/calendar" replace />
                ) : (
                  <Fade in timeout={800}>
                    <Box sx={{ height: '100vh' }}>
                      <LoginPage />
                    </Box>
                  </Fade>
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/calendar" replace />
                ) : (
                  <Fade in timeout={800}>
                    <Box sx={{ height: '100vh' }}>
                      <LoginPage />
                    </Box>
                  </Fade>
                )
              }
            />
            <Route
              path="/calendar"
              element={
                isAuthenticated ? (
                  <Fade in timeout={800}>
                    <Box sx={{ 
                      flex: 1,
                      p: { xs: 1, sm: 2, md: 3 },
                      overflow: 'auto',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <CalendarView />
                    </Box>
                  </Fade>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Box>
        
        {/* Footer for authenticated users */}
        {isAuthenticated && (
          <Fade in timeout={1000}>
            <Box sx={{
              py: 2,
              px: 3,
              backgroundColor: isDarkMode 
                ? 'rgba(255,255,255,0.05)' 
                : 'rgba(102, 126, 234, 0.05)',
              borderTop: `1px solid ${isDarkMode 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(102, 126, 234, 0.1)'}`,
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <Box sx={{ 
                color: isDarkMode ? '#b0bec5' : '#7f8c8d',
                fontSize: '0.875rem',
                fontWeight: 500
              }}>
                © 2024 ClinicCare. All rights reserved. | Healthcare Management System
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App