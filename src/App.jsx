import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Animal from './pages/Animal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 所有页面都用同一个布局 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/animal" element={<Animal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}