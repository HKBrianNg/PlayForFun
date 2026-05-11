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

  const userMenu = [
    { key: 'profile', label: '个人中心' },
    { key: 'logout', label: '退出登录' },
  ];

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
    { key: '2', icon: <PictureOutlined />, label: <Link to="/animal">动物图片</Link> },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        style={{ height: '100%' }}
      >
        <div style={{ height: 32, margin: '16px 0' }} />

        {/* ✅ 最强修复：直接给菜单加左边距！绝对生效 */}
        <div style={{ paddingLeft: '10px' }}>
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
          />
        </div>

      </Sider>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header style={{
          background: '#1677ff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          height: 64,
        }}>
          <div onClick={() => setCollapsed(!collapsed)} style={{ color: '#fff' }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <Input placeholder="搜索" style={{ width: 260 }} />
          <Dropdown menu={{ items: userMenu }}>
            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </Header>

        <Content style={{
          flex: 1,
          padding: '24px',
          background: '#fff',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          <Outlet />
        </Content>
      </div>
    </div>
  );
}