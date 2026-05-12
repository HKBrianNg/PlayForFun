import { useState, useEffect } from 'react'
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  CircularProgress
} from '@mui/material'
import {
  Menu as MenuIcon,
  HomeOutlined,
  ImageOutlined,
  Search,
  ChevronLeft,
  LoginOutlined,
  LogoutOutlined
} from '@mui/icons-material'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const drawerWidthOpen = 240
const drawerWidthClosed = 60

// 模拟用户信息和登录接口
const mockLoginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        resolve({
          id: 1,
          username: 'admin',
          nickname: '超级管理员',
          avatar: 'A'
        })
      } else {
        reject(new Error('用户名或密码错误'))
      }
    }, 800)
  })
}

export default function MainLayout() {
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  // 登录相关状态
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  
  const navigate = useNavigate()

  // 初始化：从localStorage恢复登录状态
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const toggleDrawer = () => setOpen(!open)
  const handleMenu = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  // 打开登录弹窗
  const handleOpenLoginDialog = () => {
    setLoginDialogOpen(true)
    setErrorMsg('')
  }

  // 关闭登录弹窗
  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false)
    setUsername('')
    setPassword('')
    setErrorMsg('')
  }

  // 登录提交处理
  const handleLoginSubmit = async () => {
    if (!username || !password) {
      setErrorMsg('请输入用户名和密码')
      return
    }

    setLoading(true)
    setErrorMsg('')
    
    try {
      const user = await mockLoginApi(username, password)
      setCurrentUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
      handleCloseLoginDialog()
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  // 退出登录处理
  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    handleClose()
    navigate('/')
  }

  const menuItems = [
    { text: 'Home', icon: <HomeOutlined />, path: '/' },
    { text: 'Day 1', icon: <ImageOutlined />, path: '/day1' },
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

          {/* 登录/用户信息区域 */}
          {currentUser ? (
            <>
              <IconButton onClick={handleMenu}>
                <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }}>
                  {currentUser.avatar}
                </Avatar>
              </IconButton>
              <Menu 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)} 
                onClose={handleClose}
              >
                <MenuItem disabled>
                  <Typography variant="body2">
                    欢迎：{currentUser.nickname}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>个人中心</MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                    <LogoutOutlined fontSize="small" />
                  </ListItemIcon>
                  退出登录
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              variant="text" 
              color="inherit" 
              startIcon={<LoginOutlined />}
              onClick={handleOpenLoginDialog}
              sx={{ textTransform: 'none' }}
            >
              登录
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* 登录弹窗 */}
      <Dialog open={loginDialogOpen} onClose={handleCloseLoginDialog}>
        <DialogTitle sx={{ bgcolor: '#1976d2', color: '#fff' }}>
          用户登录
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            请输入您的用户名和密码进行登录
          </DialogContentText>
          
          {errorMsg && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Typography>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="用户名"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="dense"
            label="密码"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseLoginDialog} 
            disabled={loading}
            sx={{ color: '#1976d2' }}
          >
            取消
          </Button>
          <Button 
            onClick={handleLoginSubmit} 
            disabled={loading}
            sx={{ 
              bgcolor: '#1976d2', 
              color: '#fff',
              '&:hover': { bgcolor: '#1565c0' }
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : '登录'}
          </Button>
        </DialogActions>
      </Dialog>

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