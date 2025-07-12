import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../features/darkModeSlice'
import { IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'

function DarkModeToggle() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)
  const dispatch = useDispatch()

  return (
    <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit">
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}

export default DarkModeToggle