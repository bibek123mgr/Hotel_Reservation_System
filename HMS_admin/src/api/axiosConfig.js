import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

const AUTHAPI = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

AUTHAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token');
        if (!token) {
            return Promise.reject({ status: 401, message: 'No token provided' });
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

AUTHAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);

        const status = error?.response?.status;
        return Promise.reject({
            ...error,
            status,
        });
    }
);

export { API, AUTHAPI };
