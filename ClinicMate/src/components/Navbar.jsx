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
  Badge,
  alpha
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

  // Theme-aware colors
  const getNavbarColors = () => {
    const isDark = theme.palette.mode === 'dark'
    
    return {
      primary: isDark ? '#4a5568' : '#667eea',
      secondary: isDark ? '#2d3748' : '#764ba2',
      text: isDark ? theme.palette.text.primary : '#ffffff',
      textSecondary: isDark ? theme.palette.text.secondary : 'rgba(255,255,255,0.8)',
      surface: isDark ? alpha(theme.palette.background.paper, 0.1) : 'rgba(255,255,255,0.1)',
      surfaceHover: isDark ? alpha(theme.palette.background.paper, 0.2) : 'rgba(255,255,255,0.2)',
      border: isDark ? alpha(theme.palette.divider, 0.3) : 'rgba(255,255,255,0.15)',
      background: isDark 
        ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      drawerBackground: isDark
        ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconColor: isDark ? theme.palette.primary.main : '#ffffff',
      badgeColor: theme.palette.error.main
    }
  }

  const colors = getNavbarColors()

  const MobileDrawer = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          background: colors.drawerBackground,
          color: colors.text,
          borderLeft: `1px solid ${colors.border}`
        }
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Paper sx={{ 
          p: 1.5, 
          borderRadius: '50%', 
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}>
          <LocalHospital sx={{ fontSize: 32, color: colors.iconColor }} />
        </Paper>
        <Typography variant="h6" sx={{ fontWeight: 700, color: colors.text }}>
          ClinicMate
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
          Healthcare Management
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: colors.border }} />
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
                  backgroundColor: colors.surfaceHover,
                  transform: 'translateX(5px)'
                }
              }}
            >
              <ListItemIcon sx={{ color: colors.iconColor, minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                sx={{ color: colors.text }}
              />
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
          background: colors.background,
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.border}`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark' 
              ? `url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23${theme.palette.text.primary.replace('#', '')}" fill-opacity="0.03"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              : 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
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
              backgroundColor: colors.surface,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: colors.surfaceHover,
                transform: 'scale(1.05)'
              }
            }}>
              <LocalHospital sx={{ fontSize: { xs: 24, sm: 28 }, color: colors.iconColor }} />
            </Paper>
            <Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 800,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                color: colors.text,
                textShadow: theme.palette.mode === 'dark' ? 'none' : '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                ClinicCare
              </Typography>
              <Typography variant="caption" sx={{ 
                color: colors.textSecondary,
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
                  color: colors.text,
                  backgroundColor: colors.surface,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${colors.border}`,
                  mr: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.surfaceHover,
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
                    color: colors.text,
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    mx: 0.5,
                    backgroundColor: colors.surface,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${colors.border}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: colors.surfaceHover,
                      transform: 'translateY(-2px)',
                      boxShadow: theme.palette.mode === 'dark' 
                        ? `0 4px 15px ${alpha(theme.palette.common.black, 0.3)}`
                        : '0 4px 15px rgba(0,0,0,0.2)'
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
                  color: colors.text,
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  ml: 1,
                  backgroundColor: colors.surface,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.surfaceHover,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? `0 4px 15px ${alpha(theme.palette.common.black, 0.3)}`
                      : '0 4px 15px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 24, 
                  height: 24, 
                  mr: 1,
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
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
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.background.paper, 0.95)
                      : 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${colors.border}`,
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                      : '0 8px 32px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <MenuItem 
                  onClick={() => { handleDummyClick('Profile'); handleProfileMenuClose(); }}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <Person sx={{ mr: 1, color: theme.palette.primary.main }} />
                  Profile
                </MenuItem>
                <MenuItem 
                  onClick={() => { handleDummyClick('Settings'); handleProfileMenuClose(); }}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <Settings sx={{ mr: 1, color: theme.palette.primary.main }} />
                  Settings
                </MenuItem>
                <Divider sx={{ borderColor: theme.palette.divider }} />
                <MenuItem 
                  onClick={handleLogout}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <ExitToApp sx={{ mr: 1, color: theme.palette.error.main }} />
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
                  color: colors.text,
                  backgroundColor: colors.surface,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.surfaceHover,
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
                  color: colors.text,
                  backgroundColor: colors.surface,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.surfaceHover,
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