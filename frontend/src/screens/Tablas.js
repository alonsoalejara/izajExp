import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { generarPDF } from '../utils/PDF/PDFGenerator';
import styles from '../styles/TablasStyles.js';
import Components from '../components/Components.index.js';
// Asegúrate de importar correctamente la función de obtener datos
import { obtenerDatosTablas } from '../data/tablasData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import { calculateGeometry } from '../utils/calculateGeometry';

const Tablas = ({ route, navigation }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [capatazNombre, setCapatazNombre] = useState('N/A');
  const [supervisorNombre, setSupervisorNombre] = useState('');
  const [jefeAreaNombre, setJefeAreaNombre] = useState('');
  const [userId, setUserId] = useState(null);

  const { planData, setupCargaData, setupGruaData, setupAparejosData, setupRadioData } = route.params || {};

  useEffect(() => {
    const fetchUserData = async () => {
      if (planData) {
        setNombreProyecto(planData.nombreProyecto || '');
        setCapatazNombre(planData.capataz?.nombreCompleto || '');
        setSupervisorNombre(planData.supervisor?.nombreCompleto || '');
        setJefeAreaNombre(planData.jefeArea?.nombreCompleto || '');

        const storedUserId = await AsyncStorage.getItem('usuarioId');
        setUserId(storedUserId);
      }
    };

    fetchUserData();
  }, [planData]);

  const combinedData = {
    ...setupCargaData,
    ...setupGruaData,
    ...setupRadioData,
    ...setupAparejosData,
    ...planData,
    pesoEquipo: setupGruaData?.pesoEquipo,
    pesoGancho: setupGruaData?.pesoGancho,
  };

  const geometry = calculateGeometry(
    combinedData.forma,
    combinedData.alto,
    combinedData.forma === 'Cilindro'
      ? combinedData.diametro
      : combinedData.largo,
    combinedData.ancho
  );

  const relX = geometry && combinedData.ancho
    ? ((geometry.cg.cgX / combinedData.ancho) * 100).toFixed(0)
    : null;
  const relY = geometry && combinedData.largo
    ? ((geometry.cg.cgY / combinedData.largo) * 100).toFixed(0)
    : null;
  const relZ = geometry && combinedData.alto
    ? ((geometry.cg.cgZ / combinedData.alto) * 100).toFixed(0)
    : null;

  // Actualiza la desestructuración para obtener la nueva variable
  const { datosTablaManiobra, datosTablaGrua, datosTablaAparejosIndividuales, datosTablaProyecto } = obtenerDatosTablas({
    ...combinedData,
    capatazId: planData?.capataz?._id,
    supervisorId: planData?.supervisor?._id,
    jefeAreaId: planData?.jefeArea?._id,
  });

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

  const handlePDF = async () => {
    // La generación del PDF necesitará ser adaptada para la nueva estructura
    // Por ahora, se mantendrá la lógica de antes pero ten en cuenta que necesitarás ajustarla.
    const rows = datosTablaAparejosIndividuales.flatMap((aparejo, index) => {
      const mainRow = {
        item: aparejo.descripcionPrincipal.item,
        descripcion: aparejo.descripcionPrincipal.descripcion,
        cantidad: 1, // Ya que cada item es una "tabla" individual
        pesoUnitario: parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0),
        pesoTotal: parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0) + parseFloat(aparejo.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0),
      };

      // Si deseas incluir los detalles de Largo, Tensión, etc. en el PDF,
      // deberás agregarlos como filas adicionales o adaptar el generador de PDF.
      return mainRow;
    });

    // Calcular el totalPesoAparejos desde la nueva estructura
    const totalPesoAparejos = datosTablaAparejosIndividuales.reduce(
      (total, aparejo) => total + (
        parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0) +
        parseFloat(aparejo.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0)
      ),
      0
    );

    const cargaRows = datosTablaManiobra.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      valor:
        typeof row.cantidad === 'object'
          ? `${row.cantidad.valor} ${row.cantidad.unidad}`
          : row.cantidad,
    }));

    const datosGruaRows = datosTablaGrua.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      valor: row.cantidad,
    }));

    const selectedGrua = combinedData.grua;

    await generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows, nombreProyecto);
  };

  const handleGuardar = async () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de guardar este plan de izaje?',
      [
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              // Adaptar la estructura de aparejos para guardar en la base de datos
              const aparejos = datosTablaAparejosIndividuales.map(item => ({
                descripcion: item.descripcionPrincipal.descripcion,
                cantidad: 1, // Cada entrada es un aparejo individual
                pesoUnitario: parseFloat(item.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0),
                pesoTotal: parseFloat(item.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0) + parseFloat(item.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0),
                // Aquí puedes agregar otros detalles si la API lo requiere,
                // como largo, tension, tipo de grillete, etc.
                largo: parseFloat(item.detalles.find(d => d.label === 'Largo')?.valor.replace(' m', '') || 0),
                grillete: item.detalles.find(d => d.label === 'Grillete')?.valor,
                pesoGrillete: parseFloat(item.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0),
              }));

              const datos = {
                largoPluma:
                  parseFloat(combinedData.largoPluma) ||
                  parseFloat(datosTablaGrua.find(item => item.descripcion === 'Largo de pluma')?.cantidad) ||
                  0,
                contrapeso: parseFloat(combinedData.grua?.contrapeso) || 0,
              };

              const cargas = {
                pesoEquipo: datosTablaManiobra.find(item => item.descripcion === 'Peso elemento')?.cantidad.valor || 0,
                pesoAparejos: datosTablaManiobra.find(item => item.descripcion === 'Peso aparejos')?.cantidad.valor || 0,
                pesoGancho: datosTablaManiobra.find(item => item.descripcion === 'Peso gancho')?.cantidad.valor || 0,
                pesoCable: datosTablaManiobra.find(item => item.descripcion === 'Peso cable')?.cantidad?.valor || 'N/A',
                pesoTotal: datosTablaManiobra.find(item => item.descripcion === 'Peso total')?.cantidad.valor || 0,
                radioTrabajoMax: datosTablaManiobra.find(item => item.descripcion === 'Radio de trabajo máximo')?.cantidad.valor || 0,
                anguloTrabajo: datosTablaManiobra.find(item => item.descripcion === 'Ángulo de trabajo')?.cantidad || '0°',
                capacidadLevante: datosTablaManiobra.find(item => item.descripcion === 'Capacidad de levante')?.cantidad.valor || 0,
                porcentajeUtilizacion: datosTablaManiobra.find(item => item.descripcion === '% Utilización')?.cantidad.valor || 0,
              };


              const finalData = {
                nombreProyecto,
                aparejos,
                datos,
                cargas,
                capataz: planData?.capataz?._id,
                supervisor: planData?.supervisor?._id,
                jefeArea: planData?.jefeArea?._id,
                grua: setupGruaData?.grua?._id,
              };

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
              console.error('Error al guardar el plan de izaje:', error);
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
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Datos:</Text>
      </View>
      <ScrollView style={styles.tableContainer}>
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
        {/* Renderiza las tablas de aparejos individuales */}
        <Text style={[styles.sectionTitle, { top: 10, left: 20 }]}>Aparejos</Text>
        {datosTablaAparejosIndividuales.map((aparejo, index) => (
          <View key={`aparejo-${index}`}>
            {/* Primera fila: Item y Descripción */}
            <View style={styles.tableSection}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
                <Text style={[styles.headerText, { flex: 2, textAlign: 'left' }]}>Descripción</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 10 }]}>{aparejo.descripcionPrincipal.item}</Text>
                <Text style={[styles.cell, { flex: 2, textAlign: 'left' }]}>{aparejo.descripcionPrincipal.descripcion}</Text>
              </View>
            </View>

            {/* Segunda "tabla" para los detalles del aparejo */}
            <View style={[styles.tableSection, { marginTop: -10 }]}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Largo</Text>
                <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Peso</Text>
                <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 20 }]}>Tensión</Text>
                <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 28 }]}>Grillete</Text>
                <Text style={[styles.headerText, { flex: 2, textAlign: 'right', right: 10 }]}>Peso Grillete</Text>
              </View>
              <View style={styles.row}>
                {aparejo.detalles.map((detail, detailIndex) => (
                  <Text key={`detail-${index}-${detailIndex}`} style={[styles.cell, { flex: 1, right: 12 }]}>
                    {detail.valor}
                  </Text>
                ))}
              </View>
            </View>
            {/* Opcional: Separador visual entre aparejos si se ven muy juntos */}
            <View style={{ marginTop: -10 }} />
          </View>
        ))}
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