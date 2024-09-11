import axios from 'axios';
import { logout } from '../app/slices/authSlice'; // Redux logout action

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        // 'Content-Type': 'application/json',
    },
});

let isLoggingOut = false; 

export const setupAxiosInterceptors = (store) => {
    api.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401 && !isLoggingOut) {
                isLoggingOut = true;
                alert("Session expired. You have been logged out.");
                store.dispatch(logout()); // Dispatch the logout action using the store

                return Promise.reject({ message: 'token_expired', originalError: error });
            }
            return Promise.reject(error);
        }
    );
};

export default api;
