import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generarPDF } from '../utils/PDFGenerator';
import { useFetchData } from '../hooks/useFetchData';
import TablasStyles from '../styles/TablasStyles';
import Tables from '../components/tables/Table.index.js';
import Button from '../components/Button';
import Header from '../components/Header.js';
import Toast from 'react-native-toast-message';
import PDFGenerator from '../utils/PDFGenerator';
import getApiUrl from '../utils/apiUrl';

const Tablas = ({ route, navigation }) => {
  const { eslingaOEstrobo, cantidadManiobra, cantidadGrilletes, tipoGrillete, grua, radioIzaje, radioMontaje, usuarioId } = route.params;
  const { data, isLoading, refetch } = useFetchData('grua');
  const [isSaved, setIsSaved] = useState(false);
  const selectedGrua = data.find(g => g.nombre === grua) || {};

  useEffect(() => {
    if (grua) {
      refetch();
    }
  }, [grua]);

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
    if (!usuarioId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se encontró el usuario ID',
      });
      return;
    }
  
    const planData = {
      usuario: usuarioId,
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

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      if (!accessToken) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se encontró un token de acceso.',
        });
        return;
      }
  
      const response = await fetch(getApiUrl('setupIzaje'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(planData),
      });
    
      const data = await response.json();
      if (response.ok) {
        setIsSaved(true);
        Toast.show({
          type: 'success',
          text1: 'Plan de izaje guardado',
          visibilityTime: 3000,
        });
        console.log('Respuesta del servidor:', data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al guardar',
          text2: data.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Hubo un error',
        text2: 'No se pudo guardar el plan de izaje.',
      });
    }
  };  

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={TablasStyles.titleContainer}>
        <Text style={TablasStyles.title}>Tablas</Text>
      </View>
      <ScrollView style={TablasStyles.container}>
        {isLoading ? (
          <Text>Cargando datos de la grúa...</Text>
        ) : (
          <>
            <Tables.AparejosTable
              rows={rows || []}
              totalPesoAparejos={totalPesoAparejos}
              selectedGrua={selectedGrua}
              radioIzaje={radioIzaje}
              radioMontaje={radioMontaje}
              pesoTotalCarga={pesoTotalCarga}
            />
            <Tables.GruaTable
              datosGrúaRows={datosGruaRows}
              selectedGrua={selectedGrua}
            />
            {isSaved && (
              <PDFGenerator
                selectedGrua={selectedGrua}
                totalPesoAparejos={totalPesoAparejos}
                cargaRows={cargaRows}
                datosGruaRows={datosGruaRows}
              />
            )}
          </>
        )}
      </ScrollView>
      <View style={TablasStyles.buttonContainer}>
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
        <Button
          label={isSaved ? 'PDF' : 'Guardar'}
          onPress={isSaved ? () => {
            console.log('Generando PDF...');
            generarPDF(selectedGrua, totalPesoAparejos, cargaRows, datosGruaRows);
          } : handleGuardar}
          style={{ marginTop: 15, top: -6, height: '60%', width: '45%', left: -79 }}
        />
      </View>
    </View>
  );
};

export default Tablas;