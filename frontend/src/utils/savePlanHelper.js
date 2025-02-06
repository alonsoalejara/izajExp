import { AsyncStorage } from '@react-native-async-storage/async-storage';
const axios = require('axios/dist/browser/axios.cjs');
import getApiUrl from './apiUrl';
import Toast from 'react-native-toast-message';

export const savePlan = async (rows, selectedGrua, radioIzaje, radioMontaje) => {
  try {
    const currentUsuarioId = await AsyncStorage.getItem('usuarioId');
    if (!currentUsuarioId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se encontró el usuario ID',
      });
      return;
    }

    const totalPesoAparejos = rows.reduce((total, row) => total + row.pesoTotal, 0);
    const pesoTotalCarga = (
      (typeof selectedGrua.pesoEquipo === 'number' ? selectedGrua.pesoEquipo : 0) +
      (typeof totalPesoAparejos === 'number' ? totalPesoAparejos : 0) +
      (typeof selectedGrua.pesoGancho === 'number' ? selectedGrua.pesoGancho : 0)
    );

    const requestBody = {
      usuario: currentUsuarioId,
      aparejos: rows.map(row => ({
        descripcion: row.descripcion,
        cantidad: row.cantidad,
        pesoUnitario: row.pesoUnitario,
        pesoTotal: row.pesoTotal,
      })),
      datos: {
        largoPluma: selectedGrua.largoPluma,
        contrapeso: selectedGrua.contrapeso,
      },
      cargas: {
        pesoEquipo: selectedGrua.pesoEquipo,
        pesoAparejos: totalPesoAparejos,
        pesoGancho: selectedGrua.pesoGancho,
        pesoTotal: pesoTotalCarga,
        radioTrabajoMax: Math.max(radioIzaje, radioMontaje),
        capacidadLevante: selectedGrua.capacidadLevante,
        porcentajeUtilizacion: 0,
      },
    };

    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('No se encontró token de autenticación');
      alert('No estás autenticado');
      return;
    }

    const apiUrl = getApiUrl('setupIzaje');
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error al guardar el plan de izaje:', error.response ? error.response.data : error.message);
    Toast.show({
      type: 'error',
      text1: 'Error al guardar el plan de izaje',
      visibilityTime: 3000,
    });
  }
};
