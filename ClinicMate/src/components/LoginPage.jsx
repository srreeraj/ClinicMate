import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/authSlice'
import { TextField, Button, Box, Typography } from '@mui/material'

const LoginPage = () => {
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error , setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = () => {
    const validateCredentials = { email : 'staff@clinic.com', password : '123456'}
    if ( email === validateCredentials.email && password === validateCredentials.password) {
        dispatch(login({email}))
        navigate('/')
    } else {
        setError('Invalid username or password')
    }
  }
  
  return (
    <Box classname='flex flex-col item-center justify-center min-h-[calc(100vh-64px)] p-4'>
        <Typography variant='h4' className='mb-4 text-gray-800 dark:text-white'>
            Login
        </Typography>
        <Box className='w-full max-w-md space-y-4'>
            <TextField
             fullWidth
             label='Email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             variant='outlined'
             className='dark:bg-gray-800 dark:text-white'
            />
            <TextField
             fullWidth
             label='Password'
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             variant='outlined'
             className='dark:bg-gray-800 dark:text-white'
            />
            { error && (
                <Typography color='error' className='text-sm'>
                    {error}
                </Typography>
            )}
            <Button
             fullWidth
             variant='contained'
             color='primary'
             onClick={handleLogin}
             disabled={!email || !password}
            >
                Login
            </Button>
        </Box>
    </Box>
  )
}

export default LoginPage
