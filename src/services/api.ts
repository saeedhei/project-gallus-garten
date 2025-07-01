// src\services\api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_endPoint,
});

// قبل از ارسال هر درخواست، توکن JWT را به هدر اضافه می‌کنیم
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// اگر پاسخ 401 دریافت شد، کاربر را به صفحه login هدایت می‌کنیم
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login'; // کاربر را به login بفرست
    }
    return Promise.reject(error);
  },
);

export default api;
