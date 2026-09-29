import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home'
import Login from './admin/Login'
import Admin from './admin/Admin'
import { useSession } from './services/auth'
function Protected({ children }) {
  const s = useSession()
  if (s === undefined) return <p className="pad">Loading…</p>
  return s ? children : <Navigate to="/admin/login" replace />
}
// HashRouter: URLs look like /#/admin, so GitHub Pages needs no 404 tricks.
createRoot(document.getElementById('root')).render(
  <HashRouter><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin/*" element={<Protected><Admin /></Protected>} />
  </Routes></HashRouter>)
