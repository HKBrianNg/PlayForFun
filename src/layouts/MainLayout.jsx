import { useState } from 'react'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Menu as MenuIcon,
  HomeOutlined,
  ImageOutlined,
  Search,
  ChevronLeft,
} from '@mui/icons-material'
import { Link, Outlet } from 'react-router-dom'

const drawerWidthOpen = 240
const drawerWidthClosed = 60

export default function MainLayout() {
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleDrawer = () => setOpen(!open)
  const handleMenu = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const menuItems = [
    { text: 'Home', icon: <HomeOutlined />, path: '/' },
    { text: 'Day 1', icon: <ImageOutlined />, path: '/day1' },
    { text: 'Day 2', icon: <ImageOutlined />, path: '/day2' },
  ]

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      
      {/* 左侧侧边栏 */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidthOpen : drawerWidthClosed,
            boxSizing: 'border-box',
            transition: 'width 0.2s ease',
            overflowX: 'hidden',
            bgcolor: '#1976d2',
            color: '#fff',
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: open ? 1 : 0, 
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: '#fff'
            }}
          >
            Play For Fun
          </Typography>
        </Toolbar>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={Link} 
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'flex-start' : 'center',
                px: open ? 2 : 0,
                overflow: 'hidden',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: open ? 40 : '100%',
                  color: '#fff',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {/* 🔥 文字强制白色 + 折叠完全隐藏 */}
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: '#fff !important',
                  opacity: open ? 1 : 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 顶部导航 */}
      <AppBar position="fixed" sx={{
        width: `calc(100% - ${open ? drawerWidthOpen : drawerWidthClosed}px)`,
        ml: open ? drawerWidthOpen : drawerWidthClosed,
        boxShadow: 'none',
        bgcolor: '#1976d2',
        transition: 'margin-left 0.2s ease, width 0.2s ease',
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>

          <Box sx={{ 
            bgcolor: 'rgba(255,255,255,0.15)', 
            px: 2, py: 0.5, 
            borderRadius: 1, 
            display: 'flex', 
            alignItems: 'center', 
            flex: 1, 
            maxWidth: '400px' 
          }}>
            <Search sx={{ color: 'white', mr: 1 }} />
            <InputBase 
              placeholder="Search…" 
              sx={{ color: 'white', width: '100%' }} 
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={handleMenu}>
            <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }}>U</Avatar>
          </IconButton>
          <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Setting</MenuItem>
            <MenuItem onClick={handleClose}>Login</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* 内容区域 */}
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        mt: 8,
        bgcolor: '#f5f5f5',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        <Outlet />
      </Box>
    </Box>
  )
}