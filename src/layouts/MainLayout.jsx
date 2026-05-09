// src/layouts/MainLayout.jsx
import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Input } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  PictureOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import 'antd/dist/reset.css';

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  // 下拉菜单
  const userMenu = [
    { key: 'profile', label: '个人中心' },
    { key: 'logout', label: '退出登录' },
  ];

  // 左侧菜单 ✅ 修复 items 写法
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '2',
      icon: <PictureOutlined />,
      label: <Link to="/animal">动物图片</Link>,
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      {/* 左侧菜单 */}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div style={{ height: 32, margin: 16 }} />
        
        {/* ✅ 修复：用 items，不用子元素 */}
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>

      <Layout>
        {/* 顶部导航 */}
        <Header
          style={{
            background: '#1677ff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
          }}
        >
          <div onClick={() => setCollapsed(!collapsed)} style={{ color: '#fff' }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <Input placeholder="搜索" style={{ width: 250 }} />

          <Dropdown menu={{ items: userMenu }}>
            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </Header>

        {/* 内容 */}
        <Content
          style={{
            margin: '20px',
            padding: '20px',
            background: '#fff',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}