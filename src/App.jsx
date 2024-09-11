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
import Loans from './pages/loans/Loans.jsx'
import Todaysdata from './pages/todays/Todaysdata.jsx'
import LoanRequests from './pages/loanrequests/LoanRequests.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Users from './pages/users/Users.jsx'
import Locations from './pages/locations/Locations.jsx'
import { useStore } from 'react-redux'
import { useEffect } from 'react'
import { setupAxiosInterceptors } from './services/index.jsx'

function App() {
    
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    const store = useStore(); // Access Redux store

    useEffect(() => {
        setupAxiosInterceptors(store); 
    }, [store]);

    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path="/admin/login" element={!isAuthenticated ? <Login /> : <Navigate to='/admin/dashboard' />} />
                   
                    <Route path="admin" element={<Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} />} />
                    
                    <Route path="admin/*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminLayout /></ProtectedRoute>}>
                        <Route index element={<Navigate to="/admin/dashboard" />} />
                        <Route path="dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
                        <Route path="employees" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Employees /></ProtectedRoute>} />
                        <Route path="customers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Customers /></ProtectedRoute>} />
                        <Route path="loans" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Loans /></ProtectedRoute>} />
                        <Route path="todays" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Todaysdata /></ProtectedRoute>} />
                        <Route path="requests" element={<ProtectedRoute isAuthenticated={isAuthenticated}><LoanRequests /></ProtectedRoute>} />
                        <Route path="salary" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Customers /></ProtectedRoute>} />
                        <Route path="users" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Users/></ProtectedRoute>} />
                        <Route path="locations" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Locations/></ProtectedRoute>} />                        
                    </Route>
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;
