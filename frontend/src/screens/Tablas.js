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

  const handlePDF = async () => {
    const rows = datosTablaAparejosIndividuales.flatMap((aparejo, index) => {
      const mainRow = {
        item: aparejo.descripcionPrincipal.item,
        descripcion: aparejo.descripcionPrincipal.descripcion,
        cantidad: 1,
        pesoUnitario: parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0),
        pesoTotal: parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0) + parseFloat(aparejo.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0),
      };
      return mainRow;
    });

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
      `¿Estás seguro de ${planId ? 'actualizar' : 'guardar'} este plan de izaje?`,
      [
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              const distanciaGanchoElementoItem = datosTablaManiobra.find(
                item => item.descripcion === 'Distancia gancho-elemento aprox.'
              );
              const distanciaGanchoElementoValue = distanciaGanchoElementoItem?.cantidad?.valor;

              let alturaParaBackend = '0';
              if (distanciaGanchoElementoValue !== 'N/A' && distanciaGanchoElementoValue !== undefined && distanciaGanchoElementoValue !== null) {
                const parsedHeight = parseFloat(distanciaGanchoElementoValue);
                if (!isNaN(parsedHeight)) {
                  alturaParaBackend = parsedHeight.toFixed(1);
                }
              }

              const aparejos = datosTablaAparejosIndividuales.map(item => {
                let tensionParaBackend = '0';
                const tensionValue = item.detalles.find(d => d.label === 'Tensión')?.valor;
                if (tensionValue !== 'N/A' && tensionValue !== undefined && tensionValue !== null) {
                  const parsedTension = parseFloat(tensionValue.replace(' ton', ''));
                  if (!isNaN(parsedTension)) {
                    tensionParaBackend = parsedTension.toFixed(1);
                  }
                }

                return {
                  descripcion: item.descripcionPrincipal.descripcion,
                  cantidad: 1,
                  pesoUnitario: parseFloat(item.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0),
                  pesoTotal: parseFloat(item.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0) + parseFloat(item.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0),
                  largo: parseFloat(item.detalles.find(d => d.label === 'Largo')?.valor.replace(' m', '') || 0),
                  grillete: item.detalles.find(d => d.label === 'Grillete')?.valor,
                  pesoGrillete: parseFloat(item.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0),
                  tension: tensionParaBackend,
                  altura: alturaParaBackend,
                };
              });

              const datos = {
                largoPluma:
                  parseFloat(combinedData.largoPluma) ||
                  parseFloat(datosTablaGrua.find(item => item.descripcion === 'Largo de pluma')?.cantidad) ||
                  0,
                contrapeso: parseFloat(combinedData.grua?.contrapeso) || 0,
                gradoInclinacion: combinedData.gradoInclinacion || '0°',
              };

              const cargas = {
                pesoEquipo: datosTablaManiobra.find(item => item.descripcion === 'Peso elemento')?.cantidad.valor || 0,
                pesoAparejos: datosTablaManiobra.find(item => item.descripcion === 'Peso aparejos')?.cantidad.valor || 0,
                pesoGancho: datosTablaManiobra.find(item => item.descripcion === 'Peso gancho')?.cantidad.valor || 0,
                pesoCable: datosTablaManiobra.find(item => item.descripcion === 'Peso cable')?.cantidad?.valor || 0,
                pesoTotal: datosTablaManiobra.find(item => item.descripcion === 'Peso total')?.cantidad.valor || 0,
                radioTrabajoMax: datosTablaManiobra.find(item => item.descripcion === 'Radio de trabajo máximo')?.cantidad.valor || 0,
                anguloTrabajo: datosTablaManiobra.find(item => item.descripcion === 'Ángulo de trabajo')?.cantidad || '0°',
                capacidadLevante: datosTablaManiobra.find(item => item.descripcion === 'Capacidad de levante')?.cantidad.valor || 0,
                porcentajeUtilizacion: datosTablaManiobra.find(item => item.descripcion === '% Utilización')?.cantidad.valor || 0,
              };

              const centroGravedad = {
                xAncho: parseFloat(combinedData.ancho) || 0,
                yLargo: parseFloat(combinedData.largo) || 0,
                zAlto: parseFloat(combinedData.alto) || 0,
                xCG: geometry ? parseFloat(geometry.cg.cgX.toFixed(1)) : 0,
                yCG: geometry ? parseFloat(geometry.cg.cgY.toFixed(1)) : 0,
                zCG: geometry ? parseFloat(geometry.cg.cgZ.toFixed(1)) : 0,
                xPR: relX !== null && relX !== 'N/A' ? parseFloat(relX) : 0,
                yPR: relY !== null && relY !== 'N/A' ? parseFloat(relY) : 0,
                zPR: relZ !== null && relZ !== 'N/A' ? parseFloat(relZ) : 0,
              };

              const gruaId = setupGruaData?.grua?._id;

              const finalData = {
                nombreProyecto,
                aparejos,
                datos,
                cargas,
                centroGravedad,
                capataz: planData?.capataz?._id,
                supervisor: planData?.supervisor?._id,
                jefeArea: planData?.jefeArea?._id,
                firmaSupervisor: 'Firma pendiente',
                firmaJefeArea: 'Firma pendiente',
                grua: gruaId,
                version: planId ? currentVersion : 0,
              };

              const accessToken = await AsyncStorage.getItem('accessToken');
              if (!accessToken) {
                alert('No autorizado. Por favor, inicie sesión nuevamente.');
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
                alert(`Plan de izaje ${planId ? 'actualizado' : 'guardado'} exitosamente.`);
                setIsSaved(true);
                if (!planId && data._id) {
                  setPlanId(data._id);
                  if (data.version !== undefined) {
                    setCurrentVersion(data.version);
                  }
                }
              } else {
                alert(`Error al ${planId ? 'actualizar' : 'guardar'}: ${data.message || 'Error desconocido'}`);
              }
            } catch (error) {
              alert('Hubo un error al guardar/actualizar el plan de izaje.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleGoBack = () => {
    if (isSaved) {
      // Navegar a la pestaña 'Perfil' dentro del TabNavigator
      navigation.navigate('Tabs', { screen: 'Perfil' });
    } else {
      navigation.goBack();
    }
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
        <Text style={[styles.sectionTitle, { top: 10, left: 20 }]}>Aparejos</Text>
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