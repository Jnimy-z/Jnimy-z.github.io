import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5173/',
    timeout: 5000
})

// 请求拦截
request.interceptors.request.use(
    (config) => {
        Object.assign(config.headers, {
            'Content-Type': 'application/json'
        })
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        debugger
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截
request.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            alert('登录过期')
        }
        return Promise.reject(error)
    }
)

export default request