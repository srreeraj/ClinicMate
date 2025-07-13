import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Fade,
  Badge
} from '@mui/material'
import { 
  Home, 
  Person, 
  Settings, 
  ExitToApp, 
  LocalHospital, 
  Menu as MenuIcon,
  Notifications,
  KeyboardArrowDown
} from '@mui/icons-material'
import { useState } from 'react'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    setProfileMenuAnchor(null)
  }

  const handleDummyClick = (buttonName) => {
    console.log(`${buttonName} clicked`)
  }

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  const menuItems = [
    { label: 'Home', icon: Home, onClick: () => navigate('/calendar') },
    { label: 'Profile', icon: Person, onClick: () => handleDummyClick('Profile') },
    { label: 'Settings', icon: Settings, onClick: () => handleDummyClick('Settings') },
    { label: 'Logout', icon: ExitToApp, onClick: handleLogout }
  ]

  const MobileDrawer = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Paper sx={{ 
          p: 1.5, 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}>
          <LocalHospital sx={{ fontSize: 32, color: 'white' }} />
        </Paper>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          ClinicMate
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Healthcare Management
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                item.onClick()
                setDrawerOpen(false)
              }}
              sx={{
                borderRadius: 2,
                mx: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateX(5px)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 64, sm: 70 },
          px: { xs: 2, sm: 3 },
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexGrow: 1,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/calendar')}
          >
            <Paper sx={{ 
              p: 1, 
              borderRadius: '50%', 
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.25)',
                transform: 'scale(1.05)'
              }
            }}>
              <LocalHospital sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
            </Paper>
            <Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 800,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                ClinicCare
              </Typography>
              <Typography variant="caption" sx={{ 
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                lineHeight: 1,
                display: { xs: 'none', sm: 'block' }
              }}>
                Healthcare Management
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  mr: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              {menuItems.slice(0, -1).map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  startIcon={<item.icon />}
                  onClick={item.onClick}
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    mx: 0.5,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Profile Menu */}
              <Button
                onClick={handleProfileMenuOpen}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  ml: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 24, 
                  height: 24, 
                  mr: 1,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  fontSize: '0.8rem'
                }}>
                  SC
                </Avatar>
                Staff
              </Button>

              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
                TransitionComponent={Fade}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <MenuItem onClick={() => { handleDummyClick('Profile'); handleProfileMenuClose(); }}>
                  <Person sx={{ mr: 1, color: '#667eea' }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleDummyClick('Settings'); handleProfileMenuClose(); }}>
                  <Settings sx={{ mr: 1, color: '#667eea' }} />
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1, color: '#f44336' }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <MobileDrawer />
    </>
  )
}

export default Navbar