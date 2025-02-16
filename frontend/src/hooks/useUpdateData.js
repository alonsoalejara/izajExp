import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
const axios = require('axios/dist/browser/axios.cjs');

export const useUpdateData = (endpoint) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateData = async (updatedData) => {
    setIsUpdating(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access token found');
        return false;
      }

      const apiUrl = getApiUrl(endpoint);
      await axios.put(apiUrl, updatedData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('Datos actualizados con éxito');
      return true;
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateData, isUpdating };
};
