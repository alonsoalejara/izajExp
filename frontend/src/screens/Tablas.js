import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { generarPDF } from '../utils/PDF/PDFGenerator';
import styles from '../styles/TablasStyles.js';
import Components from '../components/Components.index.js';
import { obtenerDatosTablas } from '../data/tablasData';

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

  const handleGuardar = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de guardar este plan de izaje?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log('Guardado') },
      ],
      { cancelable: false }
    );
  };

  const handlePDF = () => {
    console.log('Generando PDF...');
    // Llama a generarPDF con los parámetros necesarios si los tienes
    // generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows);
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
