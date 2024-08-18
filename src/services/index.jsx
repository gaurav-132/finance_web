import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your base URL
    headers: {
        // 'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token') ? localStorage.getItem('token'): null,
    },
});   

export default api;
