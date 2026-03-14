import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Для эмулятора Android используйте: http://10.0.2.2:5000
// Для физического устройства используйте IP вашего компьютера в локальной сети
// Узнать IP: ifconfig (macOS/Linux) или ipconfig (Windows)
// Текущий IP компьютера: 192.168.31.109
// ИЗМЕНИТЕ НИЖЕ НА НУЖНЫЙ АДРЕС:
// - Для эмулятора: 'http://10.0.2.2:5000'
// - Для физического устройства: 'http://192.168.31.109:5000' (замените на ваш IP)
const API_URL = 'http://192.168.31.109:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor для добавления токена
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;

