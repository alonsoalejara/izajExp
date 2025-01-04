import { Platform } from 'react-native';

// Configuración base para la URL
const baseUrl = Platform.OS === 'android' 
  ? 'http://10.0.2.2:3000/api/'  // URL para Android
  : 'http://192.168.1.84:3000/api/'; // URL para iOS o dispositivos físicos

// Función para obtener la URL según el endpoint y plataforma
const getApiUrl = (endpoint) => `${baseUrl}${endpoint}`;

export default getApiUrl;
