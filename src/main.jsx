import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 🔥 全局样式重置：消灭浏览器默认空白
const style = document.createElement('style');
style.innerHTML = `
  * {
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }
  html, body, #root {
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
  }
`;

document.head.appendChild(style);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
