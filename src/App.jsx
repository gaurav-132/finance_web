import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/authPages/Login'
import { useSelector } from 'react-redux'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import ProtectedRoute from './utils/ProtectedRoute'
import AdminLayout from './pages/layouts/AdminLayout.jsx'
import Employees from './pages/employees/Employees.jsx'
import Customers from './pages/customer/Customers.jsx'

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={!isAuthenticated ? <Login /> : <Navigate to='/admin/dashboard' />} />
                <Route path="admin" element={<Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} />} />

                <Route path="admin/*" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                    <Route path="dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
                    <Route path="employees" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Employees /></ProtectedRoute>} />
                    <Route path="customers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Customers /></ProtectedRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
