import React, { useState, useEffect } from 'react';
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
  const [capatazNombre, setCapataazNombre] = useState('N/A');
  const [supervisorNombre, setSupervisorNombre] = useState('');
  const [jefeAreaNombre, setJefeAreaNombre] = useState('');
  const [userId, setUserId] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [currentVersion, setCurrentVersion] = useState(0);

  const { planData, setupCargaData, setupGruaData, setupAparejosData, setupRadioData, existingPlanId } = route.params || {};

  // Hook para cargar los datos iniciales del plan de izaje
  useEffect(() => {
    const fetchUserData = async () => {
      if (planData) {
        setNombreProyecto(planData.nombreProyecto || '');
        setCapataazNombre(planData.capataz?.nombreCompleto || '');
        setSupervisorNombre(planData.supervisor?.nombreCompleto || '');
        setJefeAreaNombre(planData.jefeArea?.nombreCompleto || '');
        if (planData.version !== undefined) {
          setCurrentVersion(planData.version);
        }
        const storedUserId = await AsyncStorage.getItem('usuarioId');
        setUserId(storedUserId);
      }
      if (existingPlanId) {
        setPlanId(existingPlanId);
        setIsSaved(true);
      }
    };
    fetchUserData();
  }, [planData, existingPlanId]);

  // Se combinan todos los datos de las diferentes etapas en un solo objeto para facilitar el acceso
  const combinedData = {
    ...setupCargaData,
    ...setupGruaData,
    ...setupRadioData,
    ...setupAparejosData,
    ...planData,
    pesoEquipo: setupGruaData?.pesoEquipo,
    pesoGancho: setupGruaData?.pesoGancho,
    diametro: setupCargaData?.diametro,
  };

  // Se calcula la geometría del objeto para el centro de gravedad (CG)
  const geometry = calculateGeometry(
    combinedData.forma,
    combinedData.alto,
    combinedData.largo,
    combinedData.ancho,
    combinedData.diametro
  );

  const altNum = parseFloat(combinedData.alto);
  const diamNum = parseFloat(combinedData.diametro);
  let isCylinderVertical = false;
  if (combinedData.forma === 'Cilindro' && altNum > diamNum) {
    isCylinderVertical = true;
  }

  // Se calculan las posiciones relativas del centro de gravedad
  const relX = geometry
    ? (combinedData.forma === 'Cilindro'
      ? (isCylinderVertical
        ? ((geometry.cg.cgX / altNum) * 100).toFixed(0)
        : ((geometry.cg.cgX / diamNum) * 100).toFixed(0))
      : ((geometry.cg.cgX / parseFloat(combinedData.largo)) * 100).toFixed(0))
    : 'N/A';

  const relY = geometry
    ? (combinedData.forma === 'Cilindro'
      ? (isCylinderVertical
        ? ((geometry.cg.cgY / diamNum) * 100).toFixed(0)
        : ((geometry.cg.cgY / diamNum) * 100).toFixed(0))
      : ((geometry.cg.cgY / parseFloat(combinedData.ancho)) * 100).toFixed(0))
    : 'N/A';

  const relZ = geometry
    ? (combinedData.forma === 'Cilindro'
      ? (isCylinderVertical
        ? ((geometry.cg.cgZ / diamNum) * 100).toFixed(0)
        : ((geometry.cg.cgZ / altNum) * 100).toFixed(0))
      : ((geometry.cg.cgZ / altNum) * 100).toFixed(0))
    : 'N/A';

  // Se obtienen los datos de las tablas finales usando una función de utilidad
  const { datosTablaManiobra, datosTablaGrua, datosTablaAparejosIndividuales, datosTablaProyecto } = obtenerDatosTablas({
    ...combinedData,
    pesoGancho: 0.5,
    pesoCable: 0.3,
    peso: setupCargaData?.peso || 0,
    capataz: planData?.capataz,
    supervisor: planData?.supervisor,
    jefeArea: planData?.jefeArea,
    ancho: setupCargaData?.ancho,
    largo: setupCargaData?.largo,
    alto: setupCargaData?.alto,
    diametro: setupCargaData?.diametro,
    forma: setupCargaData?.forma,
  });

  // Se formatean los datos del centro de gravedad para la tabla de visualización
  const datosTablaXYZ = [
    {
      item: 1,
      descripcion: 'Medidas',
      X: combinedData.forma === 'Cilindro'
        ? (isCylinderVertical ? `${parseFloat(combinedData.diametro).toFixed(1)} m (Diámetro)` : `${parseFloat(combinedData.alto).toFixed(1)} m (Largo)`)
        : (parseFloat(combinedData.largo).toFixed(1) === 'NaN' ? 'N/A' : `${parseFloat(combinedData.largo).toFixed(1)} m`),
      Y: combinedData.forma === 'Cilindro'
        ? (isCylinderVertical ? `${parseFloat(combinedData.diametro).toFixed(1)} m (Diámetro)` : `${parseFloat(combinedData.diametro).toFixed(1)} m (Diámetro)`)
        : (parseFloat(combinedData.ancho).toFixed(1) === 'NaN' ? 'N/A' : `${parseFloat(combinedData.ancho).toFixed(1)} m`),
      Z: combinedData.forma === 'Cilindro'
        ? (isCylinderVertical ? `${parseFloat(combinedData.alto).toFixed(1)} m` : `${parseFloat(combinedData.diametro).toFixed(1)} m (Diámetro)`)
        : (parseFloat(combinedData.alto).toFixed(1) === 'NaN' ? 'N/A' : `${parseFloat(combinedData.alto).toFixed(1)} m`),
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
      X: relX !== 'N/A' ? `${relX} %` : 'N/A',
      Y: relY !== 'N/A' ? `${relY} %` : 'N/A',
      Z: relZ !== 'N/A' ? `${relZ} %` : 'N/A',
    },
  ];

  // Función para generar el PDF
  const handlePDF = async () => {
    // Se mapean los datos de aparejos para el PDF
    const aparejosRows = datosTablaAparejosIndividuales.map((aparejo) => {
      const pesoUnitario = parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0);
      const pesoGrillete = parseFloat(aparejo.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0);
      return {
        item: aparejo.descripcionPrincipal.item,
        descripcion: aparejo.descripcionPrincipal.descripcion,
        cantidad: 1,
        pesoUnitario: pesoUnitario,
        pesoTotal: pesoUnitario + pesoGrillete,
      };
    });

    const totalPesoAparejos = aparejosRows.reduce((total, row) => total + row.pesoTotal, 0);

    const cargaRows = datosTablaManiobra.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      cantidad: typeof row.cantidad === 'object'
        ? `${row.cantidad.valor} ${row.cantidad.unidad}`
        : row.cantidad,
    }));

    const datosGruaRows = datosTablaGrua.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      cantidad: row.cantidad,
    }));

    const pdfData = {
      selectedGrua: combinedData.grua,
      aparejosRows,
      totalPesoAparejos,
      maniobraRows: cargaRows,
      gruaRows: datosGruaRows,
      nombreProyecto,
      datosTablaProyecto,
      datosTablaXYZ,
      aparejosDetailed: datosTablaAparejosIndividuales,
      ilustracionGrua: setupGruaData?.ilustracionGrua || null,
      ilustracionCarga: setupCargaData?.ilustracionCarga || null,
    };

    try {
      await generarPDF(pdfData);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      Alert.alert('Error', 'Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.');
    }
  };

  // Función para guardar o actualizar el plan de izaje
  const handleGuardar = async () => {
    Alert.alert(
      'Confirmar',
      `¿Estás seguro de ${planId ? 'actualizar' : 'guardar'} este plan de izaje?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              // ✅ Recuperar ilustración real desde AsyncStorage si viene guardada
              if (setupGruaData?.ilustracionGrua === 'GuardadaEnAsyncStorage') {
                const storedGruaData = await AsyncStorage.getItem('setupGruaData');
                if (storedGruaData) {
                  const parsed = JSON.parse(storedGruaData);
                  setupGruaData.ilustracionGrua = parsed.ilustracionGrua;
                } else {
                  setupGruaData.ilustracionGrua = 'NoDisponible';
                }
              }

              // --- Extraer valores de la tabla para el payload ---
              const extractValue = (data, description, isNumber = true) => {
                const item = data.find(i => i.descripcion === description);
                if (!item || !item.cantidad) {
                  return isNumber ? 0 : 'N/A';
                }
                const value = typeof item.cantidad === 'object' ? item.cantidad.valor : item.cantidad;
                return isNumber ? parseFloat(value) || 0 : value;
              };

              const alturaParaBackend = String(extractValue(datosTablaManiobra, 'Distancia gancho-elemento aprox.'));

              // --- Mapear los aparejos ---
              const aparejos = datosTablaAparejosIndividuales.map(item => {
                const tensionValue = item.detalles.find(d => d.label === 'Tensión')?.valor;
                const parsedTension = parseFloat(tensionValue?.replace(' ton', '') || 0) || 0;
                const pesoValue = parseFloat(item.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0);
                const pesoGrilleteValue = parseFloat(item.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0);

                return {
                  descripcion: item.descripcionPrincipal.descripcion,
                  cantidad: 1,
                  pesoUnitario: pesoValue,
                  pesoTotal: pesoValue + pesoGrilleteValue,
                  largo: parseFloat(item.detalles.find(d => d.label === 'Largo')?.valor.replace(' m', '') || 0),
                  grillete: item.detalles.find(d => d.label === 'Grillete')?.valor,
                  pesoGrillete: pesoGrilleteValue,
                  tension: String(parsedTension),
                  altura: alturaParaBackend,
                };
              });

              const MAX_BASE64_LENGTH = 50000;

              // --- Procesar ilustración de la grúa ---
              let ilustracionGruaFinal = setupGruaData?.ilustracionGrua;
              if (ilustracionGruaFinal && ilustracionGruaFinal.startsWith('data:image/')) {
                // 🧩 El backend solo acepta base64 puro
                ilustracionGruaFinal = ilustracionGruaFinal.split(',')[1];
                if (ilustracionGruaFinal.length > MAX_BASE64_LENGTH) {
                  ilustracionGruaFinal = 'NoDisponible';
                  console.warn('⚠️ La imagen de la grúa es demasiado grande. Se enviará "NoDisponible".');
                }
              } else if (!ilustracionGruaFinal) {
                ilustracionGruaFinal = 'NoDisponible';
              }

              // --- Procesar ilustración de la carga ---
              let ilustracionCargaFinal = setupCargaData?.ilustracionCarga;
              if (ilustracionCargaFinal && ilustracionCargaFinal.startsWith('data:image/')) {
                // 🧩 El backend solo acepta base64 puro
                ilustracionCargaFinal = ilustracionCargaFinal.split(',')[1];
                if (ilustracionCargaFinal.length > MAX_BASE64_LENGTH) {
                  ilustracionCargaFinal = 'NoDisponible';
                  console.warn('⚠️ La imagen de la carga es demasiado grande. Se enviará "NoDisponible".');
                }
              } else if (!ilustracionCargaFinal) {
                ilustracionCargaFinal = 'NoDisponible';
              }

              // --- Construir el payload para el backend ---
              const finalData = {
                proyecto: planData?.proyecto?._id,
                aparejos,
                grua: setupGruaData?.grua?._id,
                largoPluma: parseFloat(combinedData.largoPluma) || 0,
                gradoInclinacion: combinedData.gradoInclinacion || '0°',

                cargas: {
                  pesoEquipo: extractValue(datosTablaManiobra, 'Peso elemento'),
                  pesoAparejos: extractValue(datosTablaManiobra, 'Peso aparejos'),
                  pesoGancho: extractValue(datosTablaManiobra, 'Peso gancho'),
                  pesoCable: extractValue(datosTablaManiobra, 'Peso cable'),
                  pesoTotal: extractValue(datosTablaManiobra, 'Peso total'),
                  radioTrabajoMax: extractValue(datosTablaManiobra, 'Radio de trabajo máximo'),
                  anguloTrabajo: extractValue(datosTablaManiobra, 'Ángulo de trabajo maniobra', false),
                  capacidadLevante: extractValue(datosTablaManiobra, 'Capacidad de levante'),
                  porcentajeUtilizacion: extractValue(datosTablaManiobra, '% Utilización'),
                },

                centroGravedad: {
                  diametro: parseFloat(combinedData.diametro) || 0,
                  xAncho: parseFloat(combinedData.ancho) || 0,
                  yLargo: parseFloat(combinedData.largo) || 0,
                  zAlto: parseFloat(combinedData.alto) || 0,
                  xCG: geometry ? parseFloat(geometry.cg.cgX.toFixed(1)) : 0,
                  yCG: geometry ? parseFloat(geometry.cg.cgY.toFixed(1)) : 0,
                  zCG: geometry ? parseFloat(geometry.cg.cgZ.toFixed(1)) : 0,
                  xPR: relX !== null && relX !== 'N/A' ? parseFloat(relX) : 0,
                  yPR: relY !== null && relY !== 'N/A' ? parseFloat(relY) : 0,
                  zPR: relZ !== null && relZ !== 'N/A' ? parseFloat(relZ) : 0,
                },

                capataz: planData?.capataz?._id,
                supervisor: planData?.supervisor?._id,
                jefeArea: planData?.jefeArea?._id,
                firmaSupervisor: 'Firma pendiente',
                firmaJefeArea: 'Firma pendiente',
                ilustracionGrua: ilustracionGruaFinal,
                ilustracionForma: ilustracionCargaFinal,
                estado: 'Pendiente',
                observaciones: 'Observación pendiente',
                version: planId ? currentVersion + 1 : 1,
              };

              // --- Enviar al backend ---
              const accessToken = await AsyncStorage.getItem('accessToken');
              if (!accessToken) {
                Alert.alert('No autorizado', 'Por favor, inicie sesión nuevamente.');
                return;
              }

              let apiUrl = getApiUrl('setupIzaje/');
              let httpMethod = 'POST';
              if (planId) {
                apiUrl = `${apiUrl}${planId}`;
                httpMethod = 'PUT';
              }

              const response = await fetch(apiUrl, {
                method: httpMethod,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(finalData),
              });

              const data = await response.json();

              if (response.ok) {
                Alert.alert('Éxito', `Plan de izaje ${planId ? 'actualizado' : 'guardado'} exitosamente.`);
                setIsSaved(true);
                if (!planId && data._id) {
                  setPlanId(data._id);
                  if (data.version !== undefined) {
                    setCurrentVersion(data.version);
                  }
                }
              } else {
                Alert.alert('Error', `Error al ${planId ? 'actualizar' : 'guardar'}: ${data.message || 'Error desconocido'}`);
              }
            } catch (error) {
              console.error('Error al guardar/actualizar el plan de izaje:', error);
              Alert.alert('Error', 'Hubo un error al guardar/actualizar el plan de izaje.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleGoBack = () => {
    if (isSaved) {
      navigation.navigate('Tabs', { screen: 'Perfil' });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Components.Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tablas</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 190, paddingBottom: 30 }}>
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
        <Text style={[styles.sectionTitle, { marginLeft: 20 }]}>Aparejos</Text>
        {datosTablaAparejosIndividuales.map((aparejo, index) => (
          <View key={`aparejo-${index}`}>
              <View style={styles.tableSection}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
                  <Text style={[styles.headerText, { flex: 2, textAlign: 'left' }]}>Descripción</Text>
                </View>
                <View style={[styles.row, { borderBottomWidth: 0 }]}>
                  <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 10 }]}>{aparejo.descripcionPrincipal.item}</Text>
                  <Text style={[styles.cell, { flex: 2, textAlign: 'left' }]}>{aparejo.descripcionPrincipal.descripcion}</Text>
                </View>
              </View>

              <View style={[styles.tableSection, { marginTop: -10 }]}>
                <View style={[styles.tableHeader, { backgroundColor: '#ffeeee' }]}>
                  <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10, color: '#dd0000' }]}>Largo</Text>
                  <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10, color: '#dd0000' }]}>Peso</Text>
                  <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 20, color: '#dd0000' }]}>Tensión</Text>
                  <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 28, color: '#dd0000' }]}>Grillete</Text>
                  <Text style={[styles.headerText, { flex: 2, textAlign: 'right', right: 10, color: '#dd0000' }]}>Peso Grillete</Text>
                </View>
                <View style={[styles.row, { borderBottomWidth: 0 }]}>
                  {aparejo.detalles.map((detail, detailIndex) => (
                    <Text key={`detail-${index}-${detailIndex}`} style={[styles.cell, { flex: 1, right: 12 }]}>
                      {detail.valor}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={{ marginTop: -10 }} />
            </View>
          ))}
        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Components.Button
          label="Volver"
          onPress={handleGoBack}
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
