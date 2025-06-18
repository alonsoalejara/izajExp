import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import axios from 'axios';

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = async () => {
    setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        // Solo advertencia ligera, no error en consola
        console.warn('No se encontró token de acceso para la petición.');
        setData([]);
        return;
      }

      const apiUrl = getApiUrl(endpoint);

      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else if (
          response.data.data === null ||
          response.data.data === undefined ||
          (typeof response.data.data === 'string' && response.data.data.trim() === '')
        ) {
          console.warn('Respuesta vacía del backend.');
          setData([]);
        } else {
          // Datos no son array ni vacíos
          console.warn('La respuesta del backend no contiene un array válido:', response.data.data);
          setData([]);
        }
      } else {
        console.warn('Respuesta vacía del backend.');
        setData([]);
      }
    } catch (error) {
      // Aquí puedes loguear el error si quieres, o solo advertir
      console.warn('Error al obtener datos:', error.message || error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [endpoint]);

  return { data, isLoading, refetch };
};
