import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
const axios = require('axios/dist/browser/axios.cjs');

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = async () => {
    setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
    
      if (accessToken) {
        const apiUrl = getApiUrl(endpoint);
    
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
    
        if (response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          console.error('No se encontró un array válido en la respuesta');
        }
      } else {
        console.error('No access token found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [endpoint]);

  return { data, isLoading, refetch };
};
