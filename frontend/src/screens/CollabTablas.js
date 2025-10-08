import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Components from '../components/Components.index';
import TablasStyles from '../styles/TablasStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import BS from '../components/bottomSheets/BS.index';
import { generarPDF } from '../utils/PDF/PDFGenerator';
import { cleanSetupPayload } from '../utils/cleanSetupPayload';

const CollabTablas = ({ route }) => {
  const { planData } = route.params || {};
  const navigation = useNavigation();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isElementoBottomSheetVisible, setIsElementoBottomSheetVisible] = useState(false);
  const [currentSetup, setCurrentSetup] = useState(planData);
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

  const [currentUserWithFirma, setCurrentUserWithFirma] = useState(null);
  const { currentUser } = route.params || {};
  const userRole = currentUser?.roles?.[0]?.toLowerCase() || currentUser?.position?.toLowerCase();
  const userId = currentUser?._id;

  // 🔄 Refrescar plan automáticamente al volver
  useFocusEffect(
    useCallback(() => {
      const fetchUpdatedPlan = async () => {
        try {
          if (!currentSetup?._id) return;
          const token = await AsyncStorage.getItem('accessToken');
          if (!token) return;

          const response = await fetch(getApiUrl(`setupIzaje/${currentSetup._id}`), {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            if (data?.data) {
              setCurrentSetup(data.data);
              setAppliedSupervisorFirma(
                data.data.firmaSupervisor && data.data.firmaSupervisor !== 'Firma pendiente'
                  ? data.data.firmaSupervisor
                  : null
              );
              setAppliedJefeAreaFirma(
                data.data.firmaJefeArea && data.data.firmaJefeArea !== 'Firma pendiente'
                  ? data.data.firmaJefeArea
                  : null
              );
            }
          }
        } catch (error) {
          console.log('Error actualizando plan:', error);
        }
      };

      fetchUpdatedPlan();

      if (route.params?.refresh) {
        navigation.setParams({ refresh: false });
        fetchUpdatedPlan();
      }
    }, [route.params?.refresh])
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

  // Tablas
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

  // ✍️ Firmar plan
  const handleFirmarPlan = () => {
    if (userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') {
      navigation.navigate('ObsFirma', {
        planData: currentSetup,
        currentUser: currentUserWithFirma || currentUser,
        userRole,
        userId,
        supervisorId,
        jefeAreaId,
        appliedSupervisorFirma,
        appliedJefeAreaFirma,
        userFirma: currentUserWithFirma?.firma || currentUser?.firma,
      });
      return;
    }

    if (userRole === 'supervisor' && userId === supervisorId) {
      if (hasUserSigned()) {
        Alert.alert('Ya Firmado', 'El supervisor ya ha aplicado una firma a este plan.');
        return;
      }

      Alert.alert(
        'Confirmar Firma',
        '¿Deseas aplicar tu firma a este plan de izaje?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Firmar', onPress: () => firmarSupervisor() },
        ]
      );
    }
  };

  const firmarSupervisor = async () => {
    const payload = cleanSetupPayload(currentSetup);
    payload.firmaSupervisor = currentUser?.firma;

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('Error de Autenticación', 'No autorizado. Por favor, inicia sesión nuevamente.');
        return;
      }

      const response = await fetch(getApiUrl(`setupIzaje/${currentSetup._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        Alert.alert('Error al firmar', errorText.substring(0, 100));
        return;
      }

      const data = await response.json();

      if (data?.updatedSetupIzaje) {
        const updated = data.updatedSetupIzaje;
        setCurrentSetup(updated);
        setAppliedSupervisorFirma(updated.firmaSupervisor || null);
        setAppliedJefeAreaFirma(updated.firmaJefeArea || null);

        Alert.alert(
          'Firma aplicada',
          'Tu firma fue registrada exitosamente.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate({
                  name: 'CollabTablas',
                  params: { refresh: true },
                  merge: true,
                });

                setTimeout(() => {
                  navigation.goBack();
                }, 150);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log('Error al firmar:', error);
      Alert.alert('Error de Conexión', 'No se pudo conectar con el servidor.');
    }
  };


  // 📄 Generar PDF
  const handleEnviarPdf = async () => {
    if (isLoadingPdf) return;
    if (!currentSetup) {
      Alert.alert('Error', 'No hay datos del plan cargados para generar el PDF.');
      return;
    }

    setIsLoadingPdf(true);
    try {
      const pdfData = {
        selectedGrua: currentSetup?.grua || {},
        maniobraRows: Array.isArray(datosTablaManiobra) ? datosTablaManiobra : [],
        gruaRows: Array.isArray(datosTablaGrua) ? datosTablaGrua : [],
        datosTablaProyecto: Array.isArray(datosTablaProyecto) ? datosTablaProyecto : [],
        datosTablaXYZ: Array.isArray(datosTablaXYZ) ? datosTablaXYZ : [],
        ilustracionGrua: currentSetup?.ilustracionGrua || null,
        ilustracionCarga: currentSetup?.ilustracionForma || null,
      };

      // 🚨 Validación: si algo viene vacío, detenemos la ejecución
      if (
        !pdfData.maniobraRows.length ||
        !pdfData.gruaRows.length ||
        !pdfData.datosTablaProyecto.length
      ) {
        Alert.alert(
          'Datos incompletos',
          'No se puede generar el PDF porque faltan datos del plan. Revisa que todo esté completado.'
        );
        setIsLoadingPdf(false);
        return;
      }

      await generarPDF(pdfData);
    } catch (error) {
      console.log('Error generando el PDF:', error);
      Alert.alert('Error', 'Ocurrió un error al generar el PDF.');
    } finally {
      setIsLoadingPdf(false);
    }
  };

  return (
    <View style={[TablasStyles.container, { backgroundColor: '#fff' }]}>
      <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 56, left: 20, zIndex: 20 }}>
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </Pressable>

      <View style={[TablasStyles.titleContainer, { top: 50, left: 10, paddingTop: 20 }]}>
        <Text style={TablasStyles.title}>Detalles del plan de izaje</Text>
      </View>

      <ScrollView
        style={[TablasStyles.tableContainer, { top: 0, paddingHorizontal: 5 }]}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
        <View style={{ marginBottom: 10, alignItems: 'left', right: 35 }}>
          <Components.Button label="Ver grúa" onPress={() => setIsBottomSheetVisible(true)} style={{ width: 150, height: 47 }} />
        </View>

        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <View style={{ marginBottom: 10, alignItems: 'left', right: 35 }}>
          <Components.Button label="Ver elemento" onPress={() => setIsElementoBottomSheetVisible(true)} style={{ width: 150, height: 47 }} />
        </View>

        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />

        {/* Estado y observaciones */}
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={[TablasStyles.sectionTitle, { left: 20, marginBottom: 10 }]}>Evaluación:</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingHorizontal: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>Estado:</Text>
            <Text
              style={{
                fontSize: 16,
                color:
                  currentSetup?.estado === 'Aprobado'
                    ? 'green'
                    : currentSetup?.estado === 'Rechazado'
                    ? 'red'
                    : 'gray',
                fontWeight: 'bold',
              }}
            >
              {currentSetup?.estado || 'Pendiente'}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Observaciones:</Text>
            <View
              style={{
                backgroundColor: '#f9f9f9',
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 5,
                padding: 15,
                minHeight: 80,
              }}
            >
              <Text style={{ fontSize: 14, lineHeight: 20 }}>
                {currentSetup?.observaciones || 'No hay observaciones registradas.'}
              </Text>
            </View>
          </View>
        </View>

        {/* Firmas */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 20,
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#555' }}>Firma Supervisor</Text>
            <View
              style={{
                width: 150,
                height: 80,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                backgroundColor: '#f9f9f9',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {appliedSupervisorFirma && appliedSupervisorFirma !== 'Firma pendiente' ? (
                <Image
                  source={{
                    uri: appliedSupervisorFirma.startsWith('data:')
                      ? appliedSupervisorFirma
                      : `data:image/png;base64,${appliedSupervisorFirma}`,
                  }}
                  style={{ width: '150%', height: '150%', resizeMode: 'contain' }}
                />
              ) : (
                <Text style={{ fontSize: 12, color: '#888' }}>[Firma pendiente]</Text>
              )}
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#555' }}>Firma Jefe de Área</Text>
            <View
              style={{
                width: 150,
                height: 80,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                backgroundColor: '#f9f9f9',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {appliedJefeAreaFirma && appliedJefeAreaFirma !== 'Firma pendiente' ? (
                <Image
                  source={{
                    uri: appliedJefeAreaFirma.startsWith('data:')
                      ? appliedJefeAreaFirma
                      : `data:image/png;base64,${appliedJefeAreaFirma}`,
                  }}
                  style={{ width: '150%', height: '150%', resizeMode: 'contain' }}
                />
              ) : (
                <Text style={{ fontSize: 12, color: '#888' }}>[Firma pendiente]</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botones inferiores */}
      {!isCapataz && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '75%',
            position: 'absolute',
            bottom: 30,
            left: -26,
          }}
        >
          {canSign && <Components.Button label="Firmar Plan" onPress={handleFirmarPlan} style={{ width: '48%' }} />}
          <Components.Button
            label={isLoadingPdf ? 'Generando...' : 'Enviar PDF'}
            onPress={handleEnviarPdf}
            style={{ width: canSign ? '48%' : '100%', left: 20 }}
            disabled={isLoadingPdf}
          />
        </View>
      )}

      {/* Bottom Sheets */}
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
