import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import TablasStyles from '../styles/TablasStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import BS from '../components/bottomSheets/BS.index';
import { generarPDF } from '../utils/PDF/PDFGenerator';

const CollabTablas = ({ route }) => {
  const { planData } = route.params || {};

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isElementoBottomSheetVisible, setIsElementoBottomSheetVisible] = useState(false);
  const [currentSetup, setCurrentSetup] = useState(planData);
  const navigation = useNavigation();
  const [showSmallButtons, setShowSmallButtons] = useState(true);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const [appliedSupervisorFirma, setAppliedSupervisorFirma] = useState(
    planData?.firmaSupervisor && planData.firmaSupervisor !== 'Firma pendiente'
      ? planData.firmaSupervisor
      : null
  );
  const [appliedJefeAreaFirma, setAppliedJefeAreaFirma] = useState(
    planData?.firmaJefeArea && planData.firmaJefeArea !== 'Firma pendiente'
      ? planData.firmaJefeArea
      : null
  );

  useEffect(() => {
    if (route.params.planData) {
      setCurrentSetup(route.params.planData);
      setAppliedSupervisorFirma(
        route.params.planData.firmaSupervisor && route.params.planData.firmaSupervisor !== 'Firma pendiente'
          ? route.params.planData.firmaSupervisor
          : null
      );
      setAppliedJefeAreaFirma(
        route.params.planData.firmaJefeArea && route.params.planData.firmaJefeArea !== 'Firma pendiente'
          ? route.params.planData.firmaJefeArea
          : null
      );
    }
  }, [route.params.planData]);

  const [currentUserWithFirma, setCurrentUserWithFirma] = useState(null);
  const { currentUser } = route.params || {};
  const userRole = currentUser?.roles?.[0]?.toLowerCase() || currentUser?.position?.toLowerCase();
  const userId = currentUser?._id;

  const fetchUserWithFirma = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token || !currentUser?._id) return;

      const response = await fetch(getApiUrl(`user/${currentUser._id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setCurrentUserWithFirma(userData.data);
      }
    } catch (error) {
      console.log('Error fetching user with signature:', error);
    }
  };

  useEffect(() => {
    if (currentUser) fetchUserWithFirma();
  }, [currentUser]);

  const supervisorId = currentSetup?.supervisor?._id;
  const jefeAreaId = currentSetup?.jefeArea?._id;
  const capatazId = currentSetup?.capataz?._id;

  const getFullName = (person) => {
    if (!person) return 'N/A';
    if (person.nombre && person.apellido) return `${person.nombre} ${person.apellido}`;
    if (person.username) return person.username;
    return 'N/A';
  };

  const hasUserSigned = () => {
    if (userRole === 'supervisor' && userId === supervisorId) {
      return appliedSupervisorFirma && appliedSupervisorFirma !== 'Firma pendiente';
    }
    if ((userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') && userId === jefeAreaId) {
      return appliedJefeAreaFirma && appliedJefeAreaFirma !== 'Firma pendiente';
    }
    return false;
  };

  const canSign =
    ((userRole === 'supervisor' && userId === supervisorId) ||
      ((userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') && userId === jefeAreaId)) &&
    !hasUserSigned();

  const isCapataz = userRole === 'capataz' && userId === capatazId;

  if (!currentSetup) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ee0000" />
        <Text style={{ marginTop: 10 }}>Cargando datos del plan...</Text>
      </View>
    );
  }

  // --- Tablas de datos (idénticas a tu versión)
  const datosTablaProyecto = [
    { item: 1, descripcion: 'Nombre Proyecto', nombre: currentSetup?.proyecto?.nombre || 'N/A' },
    { item: 2, descripcion: 'Capataz', nombre: getFullName(currentSetup?.capataz) },
    { item: 3, descripcion: 'Supervisor', nombre: getFullName(currentSetup?.supervisor) },
    { item: 4, descripcion: 'Jefe Área', nombre: getFullName(currentSetup?.jefeArea) },
    { item: 5, descripcion: 'Versión', nombre: String(currentSetup?.version) || 'N/A' },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: currentSetup?.grua?.nombre || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: currentSetup?.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: currentSetup?.gradoInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${currentSetup?.grua?.contrapeso || 0} ton` },
  ];

  const datosTablaAparejosIndividuales = currentSetup?.aparejos?.map((aparejo, index) => ({
    descripcionPrincipal: {
      item: index + 1,
      descripcion: aparejo.descripcion,
    },
    detalles: [
      { label: 'Largo', valor: `${aparejo.largo || 'N/A'} m` },
      { label: 'Peso', valor: `${aparejo.pesoUnitario || 'N/A'} ton` },
      { label: 'Tensión', valor: aparejo.tension || 'N/A' },
      { label: 'Grillete', valor: aparejo.grillete || 'N/A' },
      { label: 'Peso Grillete', valor: `${aparejo.pesoGrillete || 'N/A'} ton` },
    ],
  })) || [];

  const datosTablaManiobra = [
    { descripcion: 'Peso elemento', cantidad: `${currentSetup?.cargas?.pesoEquipo || 0} ton` },
    { descripcion: 'Peso aparejos', cantidad: `${currentSetup?.cargas?.pesoAparejos || 0} ton` },
    { descripcion: 'Peso gancho', cantidad: `${currentSetup?.cargas?.pesoGancho || 0} ton` },
    { descripcion: 'Peso cable', cantidad: `${currentSetup?.cargas?.pesoCable || 0} ton` },
    { descripcion: 'Peso total', cantidad: `${currentSetup?.cargas?.pesoTotal || 0} ton` },
    { descripcion: 'Radio de trabajo máximo', cantidad: `${currentSetup?.cargas?.radioTrabajoMax || 0} m` },
    { descripcion: 'Ángulo de trabajo maniobra', cantidad: `${currentSetup?.cargas?.anguloTrabajo || 0}` },
    { descripcion: 'Capacidad de levante', cantidad: `${currentSetup?.cargas?.capacidadLevante || 0} ton` },
    { descripcion: '% Utilización', cantidad: `${currentSetup?.cargas?.porcentajeUtilizacion || 0} %` },
  ];

  const datosTablaXYZ = currentSetup?.centroGravedad
    ? [
        {
          item: 1,
          descripcion: 'Medidas',
          X: `${currentSetup?.centroGravedad?.xAncho?.toFixed?.(2) || 'N/A'} m`,
          Y: `${currentSetup?.centroGravedad?.yLargo?.toFixed?.(2) || 'N/A'} m`,
          Z: `${currentSetup?.centroGravedad?.zAlto?.toFixed?.(2) || 'N/A'} m`,
        },
        {
          item: 2,
          descripcion: 'CG',
          X: `${currentSetup?.centroGravedad?.xCG?.toFixed?.(2) || 'N/A'} m`,
          Y: `${currentSetup?.centroGravedad?.yCG?.toFixed?.(2) || 'N/A'} m`,
          Z: `${currentSetup?.centroGravedad?.zCG?.toFixed?.(2) || 'N/A'} m`,
        },
        {
          item: 3,
          descripcion: 'Posic. Relativa',
          X: `${currentSetup?.centroGravedad?.xPR?.toFixed?.(2) || 'N/A'} %`,
          Y: `${currentSetup?.centroGravedad?.yPR?.toFixed?.(2) || 'N/A'} %`,
          Z: `${currentSetup?.centroGravedad?.zPR?.toFixed?.(2) || 'N/A'} %`,
        },
      ]
    : [];

  const handleEnviarPdf = async () => {
    if (isLoadingPdf) return;

    setIsLoadingPdf(true);
    try {
      const aparejosRows = datosTablaAparejosIndividuales.map((aparejo, index) => {
        const pesoUnitario = parseFloat(aparejo.detalles.find(d => d.label === 'Peso')?.valor.replace(' ton', '') || 0);
        const pesoGrillete = parseFloat(aparejo.detalles.find(d => d.label === 'Peso Grillete')?.valor.replace(' ton', '') || 0);
        return {
          item: index + 1,
          descripcion: aparejo.descripcionPrincipal.descripcion,
          cantidad: 1,
          pesoUnitario,
          pesoTotal: pesoUnitario + pesoGrillete,
        };
      });

      const totalPesoAparejos = aparejosRows.reduce((total, a) => total + a.pesoTotal, 0);

      const ilustracionGruaBase64 =
        currentSetup?.ilustracionGrua && currentSetup.ilustracionGrua !== 'NoDisponible'
          ? (currentSetup.ilustracionGrua.startsWith('data:image')
              ? currentSetup.ilustracionGrua
              : `data:image/png;base64,${currentSetup.ilustracionGrua}`)
          : null;

      const ilustracionCargaBase64 =
        currentSetup?.ilustracionForma && currentSetup.ilustracionForma !== 'NoDisponible'
          ? (currentSetup.ilustracionForma.startsWith('data:image')
              ? currentSetup.ilustracionForma
              : `data:image/png;base64,${currentSetup.ilustracionForma}`)
          : null;

      const pdfData = {
        selectedGrua: currentSetup?.grua,
        aparejosRows,
        totalPesoAparejos,
        maniobraRows: datosTablaManiobra,
        gruaRows: datosTablaGrua,
        datosTablaProyecto,
        datosTablaXYZ,
        aparejosDetailed: datosTablaAparejosIndividuales,
        ilustracionGrua: ilustracionGruaBase64,
        ilustracionCarga: ilustracionCargaBase64,
      };

      await generarPDF(pdfData);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      Alert.alert('Error', 'Ocurrió un error al generar el PDF.');
    } finally {
      setIsLoadingPdf(false);
    }
  };

  return (
    <View style={[TablasStyles.container, { backgroundColor: '#fff' }]}>
      <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}>
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </Pressable>

      <View style={[TablasStyles.titleContainer, { top: 50 }]}>
        <Text style={TablasStyles.title}>Detalles del plan de izaje</Text>
      </View>

      <ScrollView style={[TablasStyles.tableContainer, { top: -40, paddingHorizontal: 5 }]}>
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />
      </ScrollView>

      {showSmallButtons && !isCapataz ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%', position: 'absolute', bottom: 60, left: -26 }}>
          {canSign && (
            <Components.Button label="Firmar Plan" onPress={() => handleFirmarPlan()} style={{ width: '48%' }} />
          )}
          <Components.Button
            label={isLoadingPdf ? 'Generando...' : 'Enviar PDF'}
            onPress={handleEnviarPdf}
            style={{ width: canSign ? '48%' : '100%', left: 20 }}
            disabled={isLoadingPdf}
          />
        </View>
      ) : (
        <Components.Button
          label={isLoadingPdf ? 'Generando...' : 'Enviar PDF'}
          onPress={handleEnviarPdf}
          style={[TablasStyles.button, { width: '90%', position: 'absolute', bottom: 60, left: -33 }]}
          disabled={isLoadingPdf}
        />
      )}

      <BS.BSIlustracionGrua
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        craneName={currentSetup?.grua?.nombre || 'N/A'}
        alturaType={currentSetup?.datos?.largoPluma}
        inclinacion={currentSetup?.datos?.gradoInclinacion}
        radioTrabajoMaximo={currentSetup?.cargas?.radioTrabajoMax}
      />

      <BS.BSFormaElemento
        isVisible={isElementoBottomSheetVisible}
        onClose={() => setIsElementoBottomSheetVisible(false)}
        ancho={currentSetup?.centroGravedad?.xAncho || 0}
        largo={currentSetup?.centroGravedad?.yLargo || 0}
        alto={currentSetup?.centroGravedad?.zAlto || 0}
        diametro={currentSetup?.centroGravedad?.diametro || 0}
        forma={currentSetup?.formaCarga || 'Rectángulo'}
      />

      {isLoadingPdf && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 20,
          }}
        >
          <ActivityIndicator size="large" color="#ee0000" />
        </View>
      )}
    </View>
  );
};

export default CollabTablas;
