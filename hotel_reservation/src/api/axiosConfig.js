// src/api/axiosConfig.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

// General API without auth
const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true
});

// Authenticated API that includes token in headers
const AUTHAPI = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true
});

// Automatically attach token to AUTHAPI
AUTHAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token');
        console.log(token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { API, AUTHAPI };
