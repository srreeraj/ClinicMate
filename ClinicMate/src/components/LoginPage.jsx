import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/authSlice'
import { TextField, Button, Box, Typography, Card, CardContent, Divider } from '@mui/material'
import { LocalHospital, Schedule, People, Security } from '@mui/icons-material'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    const validateCredentials = { email: 'staff@clinic.com', password: '123456'}
    if (email === validateCredentials.email && password === validateCredentials.password) {
        dispatch(login({email}))
        navigate('/')
    } else {
        setError('Invalid username or password')
    }
  }
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Card sx={{ 
        maxWidth: 1200, 
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          display: 'flex', 
          minHeight: { xs: 'auto', md: '600px' },
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          
          {/* Left Side - Login Form */}
          <Box sx={{ 
            flex: 1, 
            p: { xs: 3, md: 6 }, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            bgcolor: 'white'
          }}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospital sx={{ fontSize: 32, color: '#4a90e2', mr: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  ClinicCare
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
                Sign in to manage appointments and patient schedules
              </Typography>
            </Box>

            <Box sx={{ space: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color : 'black',
                    '& fieldset': {
                      borderColor: '#e0e6ed',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a90e2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4a90e2'
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color : 'black',
                    '& fieldset': {
                      borderColor: '#e0e6ed',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a90e2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4a90e2'
                    }
                  }
                }}
              />
              
              {error && (
                <Typography color="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
                  {error}
                </Typography>
              )}
              
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                disabled={!email || !password}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #667eea 0%, #4b3067ff 100%)'
                  },
                  '&:disabled': {
                    background: '#bdc3c7'
                  }
                }}
              >
                Sign In
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                Demo Credentials: staff@clinic.com / 123456
              </Typography>
            </Box>
          </Box>

          {/* Right Side - Features/Info */}
          <Box sx={{ 
            flex: 1, 
            bgcolor: '#4a90e2',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: { xs: 3, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Streamline Your Clinic Operations
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Efficient appointment management for modern healthcare
            </Typography>

            <Box sx={{ space: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Schedule sx={{ fontSize: 40, mr: 3, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Smart Scheduling
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Intuitive calendar interface for managing doctor appointments
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <People sx={{ fontSize: 40, mr: 3, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Patient Management
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Easy patient registration and appointment tracking
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Security sx={{ fontSize: 40, mr: 3, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Secure & Reliable
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    HIPAA-compliant design with data security in mind
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
            
            <Typography variant="body2" sx={{ opacity: 0.7, textAlign: 'center' }}>
              "This system has transformed how we manage our daily appointments and improved our patient flow significantly."
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.6, textAlign: 'center', mt: 1 }}>
              - Dr. Sarah Johnson, Head of Operations
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default LoginPage