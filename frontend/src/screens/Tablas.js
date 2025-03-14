import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { generarPDF } from '../utils/PDF/PDFGenerator';
import styles from '../styles/TablasStyles.js';
import Components from '../components/Components.index.js';
import { obtenerDatosTablas } from '../data/tablasData';

const Tablas = ({ route, navigation }) => {
  const [isSaved, setIsSaved] = useState(false);
  const datosRecibidos = route.params || {};
  console.log('Tablas: Datos recibidos desde SetupCarga:', datosRecibidos);
  const { datosTablaManiobra, datosTablaGrua, datosTablaPesoAparejos } = obtenerDatosTablas(datosRecibidos);

  const handleGuardar = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de guardar este plan de izaje?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
        { text: 'Confirmar', onPress: handleConfirmar },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ backgroundColor: '#fff' ,flex: 1 }}>
      <Components.Header />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tablas</Text>
      </View>

      <ScrollView style={styles.tableContainer}>
        {/* Usar el componente Tabla para cada tabla */}
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
          onPress={isSaved ? () => {
            console.log('Generando PDF...');
            generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows);
          } : handleGuardar}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Tablas;
