import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { generarPDF } from '../utils/PDF/PDFGenerator';
import styles from '../styles/TablasStyles.js';
import Components from '../components/Components.index.js';
import { obtenerDatosTablas } from '../data/tablasData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';

const Tablas = ({ route, navigation }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Extraemos los datos recibidos de las pantallas anteriores
  const { setupAparejosData, setupCargaData, setupGruaData, setupRadioData } = route.params || {};

  // Fusionamos todos los datos en un único objeto para que obtenerDatosTablas los lea correctamente
  const combinedData = {
    ...setupCargaData,
    ...setupGruaData,
    ...setupRadioData,
    ...setupAparejosData,
  };

  console.log('Tablas: Datos recibidos desde SetupCarga:', combinedData);

  const { datosTablaManiobra, datosTablaGrua, datosTablaPesoAparejos } = obtenerDatosTablas(combinedData);

  // Función que transforma los datos y llama a generarPDF
  const handlePDF = async () => {
    console.log('Generando PDF...');

    // Transformamos la tabla de Aparejos (CUADRO APAREJOS) agregando un número de item
    const rows = datosTablaPesoAparejos.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      cantidad: row.cantidad,
      // Se elimina " kg" para que el template reciba un valor numérico
      pesoUnitario: parseFloat(row.pesoUnitario),
      pesoTotal: row.pesoTotal,
    }));

    // Transformamos la tabla de Maniobra (CUADRO CARGA)
    const cargaRows = datosTablaManiobra.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      valor:
        typeof row.cantidad === 'object'
          ? `${row.cantidad.valor} ${row.cantidad.unidad}`
          : row.cantidad,
    }));

    // Transformamos la tabla de la Grúa (CUADRO DATOS GRÚA)
    const datosGruaRows = datosTablaGrua.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      valor: row.cantidad,
    }));

    // Calculamos el total de peso de aparejos
    const totalPesoAparejos = datosTablaPesoAparejos.reduce(
      (total, row) => total + row.pesoTotal,
      0
    );

    // Usamos el objeto grúa recibido en combinedData como selectedGrua
    const selectedGrua = combinedData.grua;

    // Llamamos a la función que genera el PDF
    await generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows);
  };

  // Función para enviar el plan de izaje mediante POST y luego cambiar el estado
  const handleGuardar = async () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de guardar este plan de izaje?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              console.log('Guardando plan de izaje...');

              // Transformamos la tabla de aparejos para que cada valor numérico sea del tipo adecuado
              const aparejos = datosTablaPesoAparejos.map(item => ({
                descripcion: item.descripcion,
                cantidad: item.cantidad,
                pesoUnitario: parseFloat(item.pesoUnitario),
                pesoTotal: item.pesoTotal,
              }));

              // Extraer datos para el objeto "datos" con conversión a número
              const datos = {
                largoPluma:
                  parseFloat(combinedData.largoPluma) ||
                  parseFloat(datosTablaGrua.find(item => item.descripcion === 'Largo de pluma')?.cantidad) ||
                  0,
                contrapeso: parseFloat(combinedData.grua?.contrapeso) || 0,
              };

              // Extraer datos para el objeto "cargas" desde la tabla de maniobra
              const cargas = {
                pesoEquipo: datosTablaManiobra.find(item => item.descripcion === 'Peso del equipo')?.cantidad.valor || 0,
                pesoAparejos: datosTablaManiobra.find(item => item.descripcion === 'Peso aparejos')?.cantidad.valor || 0,
                pesoGancho: datosTablaManiobra.find(item => item.descripcion === 'Peso del gancho')?.cantidad.valor || 0,
                pesoTotal: datosTablaManiobra.find(item => item.descripcion === 'Peso total')?.cantidad.valor || 0,
                radioTrabajoMax: datosTablaManiobra.find(item => item.descripcion === 'Radio de trabajo máximo')?.cantidad.valor || 0,
                capacidadLevante: datosTablaManiobra.find(item => item.descripcion === 'Capacidad de levante')?.cantidad.valor || 0,
                porcentajeUtilizacion: 0,
              };

              // Aseguramos que 'usuario' sea un string usando la clave correcta de AsyncStorage
              const usuario =
                (combinedData.usuario && combinedData.usuario.toString()) ||
                (await AsyncStorage.getItem('usuarioId'));

              // Construir el cuerpo de la petición
              const finalData = {
                usuario,
                aparejos,
                datos,
                cargas,
              };

              // Obtener token de acceso para autorización
              const accessToken = await AsyncStorage.getItem('accessToken');
              if (!accessToken) {
                alert('No autorizado. Por favor, inicie sesión nuevamente.');
                return;
              }

              const response = await fetch(getApiUrl('setupIzaje/'), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(finalData),
              });

              const data = await response.json();

              if (response.ok) {
                alert('Plan de izaje guardado exitosamente.');
                setIsSaved(true);
              } else {
                alert(`Error al guardar: ${data.message}`);
              }
            } catch (error) {
              console.error('Error en la petición POST:', error);
              alert('Hubo un error al guardar el plan de izaje.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Components.Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tablas</Text>
      </View>
      <ScrollView style={styles.tableContainer}>
        <Components.Tabla titulo="Aparejos" data={datosTablaPesoAparejos} />
        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Components.Button
          label="Volver"
          onPress={() => navigation.goBack()}
          isCancel={true}
          style={[styles.button, { backgroundColor: 'transparent' }]}
        />
        <Components.Button
          label={isSaved ? 'PDF' : 'Guardar'}
          onPress={isSaved ? handlePDF : handleGuardar}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Tablas;
