
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import PageLogin from './pages/PageLogin'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageLogin />} />
    </Routes>
  </BrowserRouter>,
)
