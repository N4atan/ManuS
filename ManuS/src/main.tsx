
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import PageLogin from './pages/PageLogin'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import { Header } from './components/Header/Header'
import PageServices from './pages/PageServices'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/services" element={<PageServices />} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
