import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import TablasStyles from '../styles/TablasStyles';
import Tables from '../components/tables/Table.index.js';
import getApiUrl from '../utils/apiUrl';
const axios = require('axios/dist/browser/axios.cjs');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import Header from '../components/Header.js';

const Tablas = ({ route, navigation }) => {
  const { eslingaOEstrobo, cantidadManiobra, cantidadGrilletes, tipoGrillete, grua, radioIzaje, radioMontaje, usuarioId } = route.params;
  const [isSaved, setIsSaved] = useState(false);
  const [currentUsuarioId, setCurrentUsuarioId] = useState(null);

  const gruaData = {
    'Terex RT555': { pesoEquipo: 12000, pesoGancho: 450, capacidadLevante: 17800, largoPluma: 19.8, contrapeso: 6.4 },
    'Grúa 2': { pesoEquipo: 10000, pesoGancho: 400, capacidadLevante: 16000, largoPluma: 20, contrapeso: 7 },
    'Grúa 3': { pesoEquipo: 11000, pesoGancho: 420, capacidadLevante: 17000, largoPluma: 21, contrapeso: 8 },
  };

  const selectedGrua = gruaData[grua] || {};

  const rows = [
    {
      item: '1',
      descripcion: `${eslingaOEstrobo.toUpperCase()}`,
      cantidad: cantidadManiobra,
      pesoUnitario: 27,
      pesoTotal: cantidadManiobra * 27,
    },
    {
      item: '2',
      descripcion: `Grillete ${tipoGrillete}"`.toUpperCase(),
      cantidad: cantidadGrilletes,
      pesoUnitario: 27,
      pesoTotal: cantidadGrilletes * 27,
    },
  ];

  const totalPesoAparejos = rows.reduce((total, row) => total + row.pesoTotal, 0);
  const pesoTotalCarga = (
    (typeof selectedGrua.pesoEquipo === 'number' ? selectedGrua.pesoEquipo : 0) +
    (typeof totalPesoAparejos === 'number' ? totalPesoAparejos : 0) +
    (typeof selectedGrua.pesoGancho === 'number' ? selectedGrua.pesoGancho : 0)
  );

  const cargaRows = [
    { item: '1', descripcion: 'PESO DEL EQUIPO', valor: `${selectedGrua.pesoEquipo || 0} kg` },
    { item: '2', descripcion: 'PESO DE APAREJOS', valor: `${totalPesoAparejos} kg` },
    { item: '3', descripcion: 'PESO GANCHO', valor: `${selectedGrua.pesoGancho || 0} kg` },
    { item: '4', descripcion: 'PESO TOTAL', valor: `${pesoTotalCarga} kg` },
    { item: '5', descripcion: 'RADIO DE TRABAJO MAXIMO', valor: `${Math.max(radioIzaje, radioMontaje)} mts` },
    { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: `${selectedGrua.capacidadLevante || 0} kg` },
    { item: '7', descripcion: '% DE UTILIZACIÓN', valor: '' },
  ];

  const datosGruaRows = [
    { item: '1', descripcion: 'LARGO PLUMA', valor: `${selectedGrua.largoPluma || 0} mts` },
    { item: '2', descripcion: 'CONTRAPESO', valor: `${selectedGrua.contrapeso || 0} ton` },
  ];

  useEffect(() => {
    const fetchUsuarioId = async () => {
      try {
        const id = await AsyncStorage.getItem('usuarioId');
        if (id) {
          setCurrentUsuarioId(id);
        } else {
          console.log('No se encontró el usuarioId en AsyncStorage');
        }
      } catch (error) {
        console.error('Error al obtener el usuarioId de AsyncStorage:', error);
      }
    };

    fetchUsuarioId();
  }, []);

  const handleGuardar = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de guardar este plan de izaje?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: handleConfirmar,
        },
      ],
      { cancelable: false }
    );
  };

  const handleConfirmar = async () => {
    if (!currentUsuarioId) {
      alert('No se encontró el usuario ID');
      return;
    }
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

    console.log('Datos a enviar:', requestBody);

    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('No se encontró token de autenticación');
      alert('No estás autenticado');
      return;
    }

    try {
      const apiUrl = getApiUrl('setupIzaje');
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      setIsSaved(true);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al guardar el plan de izaje:', error.response ? error.response.data : error.message);
      alert('Hubo un error al guardar el plan de izaje. Intenta nuevamente.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sección superior con imagen, degradado y logo */}
      <Header />

      <ScrollView style={TablasStyles.container}>
        <Text style={TablasStyles.title}>Tablas</Text>

        <Tables.AparejosTable
          rows={rows}
          totalPesoAparejos={totalPesoAparejos}
          grúaSeleccionada={grua}
        />

        <Tables.CargaTable
          cargaRows={cargaRows}
          grúaSeleccionada={grua}
          radioIzaje={radioIzaje}
          radioMontaje={radioMontaje}
          totalPesoAparejos={totalPesoAparejos}
          pesoTotalCarga={pesoTotalCarga}
        />

        <Tables.GruaTable
          datosGrúaRows={datosGruaRows}
          grúaSeleccionada={grua}
        />
      </ScrollView>

      <View style={TablasStyles.buttonContainer}>
        {/* Usando el componente Button para Volver */}
        <Button
          label="Volver"
          onPress={() => navigation.goBack()}
          isCancel={true}
          style={{          
            backgroundColor: 'transparent', marginTop: 15, 
            top: -6, height: '60%',
            width: '45%', left: -49
          }}
        />

        {/* Usando el componente Button para Guardar o Generar PDF */}
        <Button
          label={isSaved ? 'PDF' : 'Guardar'}
          onPress={isSaved ? () => navigation.navigate('GenerarPDF') : handleGuardar}
          style={{ marginTop: 15, top: -6, height: '60%', width: '45%', left: -79 }}
        />
      </View>
    </View>
  );
};

export default Tablas;
