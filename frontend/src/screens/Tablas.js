import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { generarPDF } from '../utils/PDF/PDFGenerator';
import styles from '../styles/TablasStyles.js';
import Components from '../components/Components.index.js';
import { obtenerDatosTablas } from '../data/tablasData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import { calculateGeometry } from '../utils/calculateGeometry';

const Tablas = ({ route, navigation }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [nombreProyecto, setNombreProyecto] = useState('');

  // Extraemos los datos recibidos de las pantallas anteriores
  const { setupAparejosData, setupCargaData, setupGruaData, setupRadioData } = route.params || {};

  // Fusionamos todos los datos en un único objeto para que obtenerDatosTablas los lea correctamente
  const combinedData = {
    ...setupCargaData,
    ...setupGruaData,
    ...setupRadioData,
    ...setupAparejosData,
    pesoEquipo: setupGruaData?.pesoEquipo,
    pesoGancho: setupGruaData?.pesoGancho,
  };

  // Recalcular CG con los mismos parámetros que en SetupCarga
  const geometry = calculateGeometry(
    combinedData.forma,
    combinedData.alto,
    combinedData.forma === 'Cilindro'
      ? combinedData.diametro
      : combinedData.largo,
    combinedData.ancho
  );

  // 📌 Cálculo de Posición Relativa (%) para el item 3
  const relX = geometry && combinedData.ancho
    ? ((geometry.cg.cgX / combinedData.ancho) * 100).toFixed(0)
    : null;
  const relY = geometry && combinedData.largo
    ? ((geometry.cg.cgY / combinedData.largo) * 100).toFixed(0)
    : null;
  const relZ = geometry && combinedData.alto
    ? ((geometry.cg.cgZ / combinedData.alto) * 100).toFixed(0)
    : null;

  // Ahora obtenemos las demás tablas…
  const { datosTablaManiobra, datosTablaGrua, datosTablaPesoAparejos } = obtenerDatosTablas(combinedData);

  // Datos para la nueva tabla XYZ
  const datosTablaXYZ = [
    {
      item: 1,
      descripcion: 'Medidas',
      X: `${combinedData.ancho} m`,
      Y: `${combinedData.largo} m`,
      Z: `${combinedData.alto} m`,
    },
    {
      item: 2,
      descripcion: 'CG',
      X: geometry ? `${geometry.cg.cgX.toFixed(1)} m` : 'N/A',
      Y: geometry ? `${geometry.cg.cgY.toFixed(1)} m` : 'N/A',
      Z: geometry ? `${geometry.cg.cgZ.toFixed(1)} m` : 'N/A',
    },
    {
      item: 3,
      descripcion: 'Posic. Relativa',
      X: relX !== null ? `${relX} %` : 'N/A',
      Y: relY !== null ? `${relY} %` : 'N/A',
      Z: relZ !== null ? `${relZ} %` : 'N/A',
    },
  ];

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
      (total, row) => total + parseFloat(row.pesoTotal.replace(' ton', '') || 0),
      0
    );

    // Usamos el objeto grúa recibido en combinedData como selectedGrua
    const selectedGrua = combinedData.grua;

    // Llamamos a la función que genera el PDF, pasando el nombre del proyecto
    await generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows, nombreProyecto);
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
                pesoTotal: parseFloat(item.pesoTotal.replace(' ton', '') || 0),
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
                pesoEquipo: datosTablaManiobra.find(item => item.descripcion === 'Peso elemento')?.cantidad.valor || 0,
                pesoAparejos: datosTablaManiobra.find(item => item.descripcion === 'Peso aparejos')?.cantidad.valor || 0,
                pesoGancho: datosTablaManiobra.find(item => item.descripcion === 'Peso gancho')?.cantidad.valor || 0,
                pesoCable: datosTablaManiobra.find(item => item.descripcion === 'Peso cable')?.cantidad?.valor || 'N/A',
                pesoTotal: datosTablaManiobra.find(item => item.descripcion === 'Peso total')?.cantidad.valor || 0,
                radioTrabajoMax: datosTablaManiobra.find(item => item.descripcion === 'Radio de trabajo máximo')?.cantidad.valor || 0,
                anguloTrabajo: datosTablaManiobra.find(item => item.descripcion === 'Ángulo de trabajo')?.cantidad || 'N/A',
                capacidadLevante: datosTablaManiobra.find(item => item.descripcion === 'Capacidad de levante')?.cantidad.valor || 0,
                porcentajeUtilizacion: 0,
              };

              // Aseguramos que 'usuario' sea un string usando la clave correcta de AsyncStorage
              const usuario =
                (combinedData.usuario && combinedData.usuario.toString()) ||
                (await AsyncStorage.getItem('usuarioId'));

              // Construir el cuerpo de la petición
              const finalData = {
                nombreProyecto,
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
      <View style={{ paddingHorizontal: 20, marginBottom: 10, top: 150 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Ingrese nombre del proyecto:</Text>
        <Components.NumericInput
          value={nombreProyecto}
          onChangeText={setNombreProyecto}
          placeholder="Nombre del proyecto"
          style={{ width: '100%' }}
          showControls={false}
          showClearButton={true}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Datos:</Text>
      </View>
      <ScrollView style={styles.tableContainer}>
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
        <Components.Tabla titulo="Aparejos" data={datosTablaPesoAparejos} />
        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />
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