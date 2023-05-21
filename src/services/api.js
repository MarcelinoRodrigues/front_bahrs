import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44311/api/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

export default api;