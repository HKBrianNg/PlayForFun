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

const drawerWidth = 240

export default function MainLayout() {
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleDrawer = () => setOpen(!open)
  const handleMenu = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const menuItems = [
    { text: '首页', icon: <HomeOutlined />, path: '/' },
    { text: '动物图片', icon: <ImageOutlined />, path: '/animal' },
  ]

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      
      {/* 顶部导航栏 */}
      <AppBar
        position="fixed"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: open ? `${drawerWidth}px` : 0,
          boxShadow: 'none',
          bgcolor: '#1976d2',
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>

          <Box sx={{
            position: 'relative', bgcolor: 'rgba(255,255,255,0.15)',
            px: 2, py: 0.5, borderRadius: 1, display: 'flex',
            alignItems: 'center', flex: 1, maxWidth: '400px',
          }}>
            <Search sx={{ color: 'white', mr: 1 }} />
            <InputBase placeholder="搜索…" sx={{ color: 'white', width: '100%' }} />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={handleMenu}>
            <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }}>U</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>个人中心</MenuItem>
            <MenuItem onClick={handleClose}>退出登录</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* 左侧菜单 */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 64,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 64,
            boxSizing: 'border-box',
            transition: 'width 0.2s',
            overflowX: 'hidden',
            bgcolor: '#1976d2',
            color: '#fff',
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
          <Typography variant="h6" sx={{ opacity: open ? 1 : 0, whiteSpace: 'nowrap' }}>
            控制台
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
                minHeight: '48px',
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, color: '#fff' }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 🔥 内容区域：强制纵向滚动条 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          bgcolor: '#f5f5f5',
          height: 'calc(100vh - 64px)',
          overflowY: 'scroll',    /* 强制显示纵向滚动条 */
          overflowX: 'hidden',    /* 禁止横向滚动 */
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}