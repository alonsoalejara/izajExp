import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import TablasStyles from '../styles/TablasStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';

const CollabTablas = ({ route }) => {
  const [currentSetup, setCurrentSetup] = useState(route.params.setup);
  const navigation = useNavigation();
  const [showSmallButtons, setShowSmallButtons] = useState(true);

  const [appliedSupervisorSignature, setAppliedSupervisorSignature] = useState(
    currentSetup.firmaSupervisor && currentSetup.firmaSupervisor !== 'Firma pendiente' ? currentSetup.firmaSupervisor : null
  );
  const [appliedJefeAreaSignature, setAppliedJefeAreaSignature] = useState(
    currentSetup.firmaJefeArea && currentSetup.firmaJefeArea !== 'Firma pendiente' ? currentSetup.firmaJefeArea : null
  );

  useEffect(() => {
    if (route.params.setup) {
      setCurrentSetup(route.params.setup);
      setAppliedSupervisorSignature(route.params.setup.firmaSupervisor && route.params.setup.firmaSupervisor !== 'Firma pendiente' ? route.params.setup.firmaSupervisor : null);
      setAppliedJefeAreaSignature(route.params.setup.firmaJefeArea && route.params.setup.firmaJefeArea !== 'Firma pendiente' ? route.params.setup.firmaJefeArea : null);
    }
  }, [route.params.setup]);


  const { currentUser } = route.params;
  const userRole = currentUser?.roles?.[0]?.toLowerCase() || currentUser?.position?.toLowerCase();
  const userId = currentUser?._id;

  const supervisorId = currentSetup?.supervisor?._id;
  const jefeAreaId = currentSetup?.jefeArea?._id;
  const capatazId = currentSetup?.capataz?._id;

  const getFullName = (person) => {
    if (!person) return 'N/A';
    const tieneNombre = person.nombre && person.nombre.trim() !== '';
    const tieneApellido = person.apellido && person.apellido.trim() !== '';

    if (tieneNombre && tieneApellido) {
      return `${person.nombre} ${person.apellido}`;
    }
    if (person.username && person.username.trim() !== '') {
      return person.username;
    }
    return 'N/A';
  };

  const datosTablaProyecto = [
    { item: 1, descripcion: 'Nombre Proyecto', nombre: currentSetup.nombreProyecto || 'N/A' },
    { item: 2, descripcion: 'Capataz', nombre: getFullName(currentSetup.capataz) },
    { item: 3, descripcion: 'Supervisor', nombre: getFullName(currentSetup.supervisor) },
    { item: 4, descripcion: 'Jefe Área', nombre: getFullName(currentSetup.jefeArea) },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: currentSetup.grua?.nombre || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: currentSetup.datos?.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: currentSetup.datos?.gradoInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${currentSetup.datos?.contrapeso || 0} ton` },
  ];

  const datosTablaAparejosIndividuales = currentSetup.aparejos?.map((aparejo, index) => ({
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

  const alturaDespeje = 1; // metros (H_despeje)
  const alturaGanchoBloque = 1.6; // metros (H_gancho, para Terex RT555)

  const formaCarga = currentSetup.centroGravedad?.forma?.toLowerCase() || '';
  const diametroCarga = parseFloat(currentSetup.centroGravedad?.diametro) || 0;
  const altoCarga = parseFloat(currentSetup.centroGravedad?.zAlto) || 0;

  let anchoCarga = parseFloat(currentSetup.centroGravedad?.xAncho);
  let largoCarga = parseFloat(currentSetup.centroGravedad?.yLargo);
  let yCG = parseFloat(currentSetup.centroGravedad?.yCG);
  let yPR = parseFloat(currentSetup.centroGravedad?.yPR);

  if (formaCarga === 'cilindro') {
    if (!anchoCarga || anchoCarga === 0) anchoCarga = diametroCarga;
    if (!largoCarga || largoCarga === 0) largoCarga = diametroCarga;
    if (!yCG || yCG === 0) yCG = diametroCarga / 2;
    if (!yPR || yPR === 0) yPR = diametroCarga / 2;
  }

  const cantidadManiobra = currentSetup.aparejos?.length || 0;
  const anguloEslingaStr = currentSetup.cargas?.anguloTrabajo || '0°';
  const anguloEnGrados = parseFloat(anguloEslingaStr.replace('°', '')) || 0;
  const anguloEnRadianes = (anguloEnGrados * Math.PI) / 180;

  let distanciaGanchoElementoCalculated = 'N/A';

  if (cantidadManiobra === 1) {
    const hCargaValida = altoCarga > 0 ? altoCarga : 0;
    const calculatedLength = (hCargaValida + alturaDespeje) - alturaGanchoBloque;
    distanciaGanchoElementoCalculated = calculatedLength > 0 ? calculatedLength.toFixed(1) : 'N/A';
  } else if (cantidadManiobra > 1 && anguloEnGrados > 0 && anguloEnGrados < 90) {
    let dimensionMayorCarga = 0;
    if (formaCarga === 'Cuadrado' || formaCarga === 'Rectangulo') {
      dimensionMayorCarga = Math.max(anchoCarga, largoCarga);
    } else if (formaCarga === 'Cilindro') {
      dimensionMayorCarga = diametroCarga;
    } else {
      dimensionMayorCarga = Math.max(anchoCarga, largoCarga);
    }

    if (dimensionMayorCarga > 0) {
      const ladoAdyacenteParaAltura = dimensionMayorCarga / 2;
      distanciaGanchoElementoCalculated = (Math.tan(anguloEnRadianes) * ladoAdyacenteParaAltura).toFixed(1);
    }
  }

  const datosTablaManiobra = [
    { descripcion: 'Peso elemento', cantidad: `${currentSetup.cargas?.pesoEquipo || 0} ton` },
    { descripcion: 'Peso aparejos', cantidad: `${currentSetup.cargas?.pesoAparejos || 0} ton` },
    { descripcion: 'Peso gancho', cantidad: `${currentSetup.cargas?.pesoGancho || 0} ton` },
    { descripcion: 'Peso cable', cantidad: `${currentSetup.cargas?.pesoCable || 0} ton` },
    { descripcion: 'Peso total', cantidad: `${currentSetup.cargas?.pesoTotal || 0} ton` },
    { descripcion: 'Radio de trabajo máximo', cantidad: `${currentSetup.cargas?.radioTrabajoMax || 0} m` },
    { descripcion: 'Distancia gancho-elemento aprox.', cantidad: `${distanciaGanchoElementoCalculated} m` },
    { descripcion: 'Ángulo de trabajo', cantidad: `${currentSetup.cargas?.anguloTrabajo || 0}` },
    { descripcion: 'Capacidad de levante', cantidad: `${currentSetup.cargas?.capacidadLevante || 0} ton` },
    { descripcion: '% Utilización', cantidad: `${currentSetup.cargas?.porcentajeUtilizacion || 0} %` },
  ];

  const formatNumber = (num, unit = '') =>
    (num !== undefined && num !== null) ? `${num} ${unit}` : `N/A${unit ? ' ' + unit : ''}`;

  const datosTablaXYZ = [
    {
      item: 1,
      descripcion: 'Medidas',
      X: formatNumber(anchoCarga, 'm'),
      Y: formatNumber(largoCarga, 'm'),
      Z: formatNumber(altoCarga, 'm'),
    },
    {
      item: 2,
      descripcion: 'CG',
      X: formatNumber(currentSetup.centroGravedad?.xCG ?? yCG, 'm'),
      Y: formatNumber(yCG, 'm'),
      Z: formatNumber(currentSetup.centroGravedad?.zCG, 'm'),
    },
    {
      item: 3,
      descripcion: 'Posic. Relativa',
      X: formatNumber(currentSetup.centroGravedad?.xPR ?? yPR, '%'),
      Y: formatNumber(yPR, '%'),
      Z: formatNumber(currentSetup.centroGravedad?.zPR, '%'),
    },
  ];

  const handleFirmarPlan = () => {
    let signatureToUse = currentUser?.signature;

    if (!signatureToUse) {
      Alert.alert("Error de Firma", "No se encontró una firma para el usuario actual. Asegúrate de tener una firma registrada en tu perfil.");
      return;
    }

    const isSupervisorSigned = appliedSupervisorSignature && appliedSupervisorSignature !== 'Firma pendiente';
    const isJefeAreaSigned = appliedJefeAreaSignature && appliedJefeAreaSignature !== 'Firma pendiente';

    if (userRole === 'supervisor' && userId === supervisorId && isSupervisorSigned) {
      Alert.alert("Ya Firmado", "El supervisor ya ha aplicado una firma a este plan.");
      return;
    }
    if ((userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') && userId === jefeAreaId && isJefeAreaSigned) {
      Alert.alert("Ya Firmado", "El jefe de área ya ha aplicado una firma a este plan.");
      return;
    }

    Alert.alert(
      "Confirmar Firma",
      "¿Deseas aplicar tu firma a este plan de izaje?",
      [
        { text: "Cancelar", style: "cancel", onPress: () => {} },
        {
          text: "Firmar",
          onPress: async () => {
            setShowSmallButtons(false);

            const payload = JSON.parse(JSON.stringify(currentSetup));

            if (payload.capataz && typeof payload.capataz === 'object') {
              payload.capataz = payload.capataz._id;
            }
            if (payload.supervisor && typeof payload.supervisor === 'object') {
              payload.supervisor = payload.supervisor._id;
            }
            if (payload.jefeArea && typeof payload.jefeArea === 'object') {
              payload.jefeArea = payload.jefeArea._id;
            }
            if (payload.grua && typeof payload.grua === 'object') {
              payload.grua = payload.grua._id;
            }

            if (Array.isArray(payload.aparejos)) {
              payload.aparejos = payload.aparejos.map(aparejo => {
                const { _id, ...rest } = aparejo;
                return rest;
              });
            }

            if (userRole === 'supervisor' && userId === supervisorId) {
                payload.firmaSupervisor = signatureToUse;
            } else if ((userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') && userId === jefeAreaId) {
                payload.firmaJefeArea = signatureToUse;
            } else {
                Alert.alert("Error de Rol", "Tu rol o ID de usuario no coincide con los asignados para firmar este plan.");
                setShowSmallButtons(true);
                return;
            }

            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (!accessToken) {
                    Alert.alert('Error de Autenticación', 'No autorizado. Por favor, inicie sesión nuevamente.');
                    setShowSmallButtons(true);
                    return;
                }

                const apiUrl = getApiUrl(`setupIzaje/${currentSetup._id}`);
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errorResponseText = await response.text();
                    let errorMessage = 'Error desconocido al firmar.';
                    try {
                        const errorData = JSON.parse(errorResponseText);
                        errorMessage = errorData.message || errorMessage;
                    } catch (e) {
                        errorMessage = `Error del servidor: ${errorResponseText.substring(0, 100)}...`;
                    }
                    Alert.alert('Error al firmar', errorMessage);
                    setShowSmallButtons(true);
                    return;
                }

                const data = await response.json();

                Alert.alert('Firma Exitosa', 'Tu firma ha sido aplicada al plan de izaje.');

                if (data && data.updatedSetupIzaje) {
                    setCurrentSetup(data.updatedSetupIzaje);
                    navigation.setParams({ setup: data.updatedSetupIzaje });
                }
                setShowSmallButtons(true);
            } catch (error) {
                Alert.alert('Error de Conexión', 'No se pudo conectar con el servidor para firmar el plan.');
                setShowSmallButtons(true);
            }
          }
        }
      ]
    );
  };

  const handleEnviarPdf = () => {
    Alert.alert("PDF", "Se está enviando el PDF...");
  };

  const canSign = (userRole === 'supervisor' && userId === supervisorId) ||
                  ((userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') && userId === jefeAreaId);

  const isCapataz = userRole === 'capataz' && userId === capatazId;

  return (
    <View style={[TablasStyles.container, { backgroundColor: '#fff' }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}
      >
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </Pressable>

      <View style={[TablasStyles.titleContainer, { top: 50 }]}>
        <Text style={TablasStyles.title}>Detalles del plan de izaje</Text>
      </View>

      <ScrollView style={[TablasStyles.tableContainer, { top: -40, paddingHorizontal: 5 }]}>
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />

        <Text style={[TablasStyles.sectionTitle, { left: 20 }]}>Aparejos</Text>
        {datosTablaAparejosIndividuales.map((aparejo, index) => (
          <View key={`aparejo-${index}`} style={TablasStyles.tableSection}>
            <View style={TablasStyles.tableHeader}>
              <Text style={[TablasStyles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
              <Text style={[TablasStyles.headerText, { flex: 2, textAlign: 'left' }]}>Descripción</Text>
            </View>
            <View style={[TablasStyles.row, { borderBottomWidth: 0 }]}>
              <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'left', left: 10 }]}>{String(aparejo.descripcionPrincipal.item)}</Text>
              <Text style={[TablasStyles.cell, { flex: 2, textAlign: 'left' }]}>{String(aparejo.descripcionPrincipal.descripcion)}</Text>
            </View>

            <View style={[TablasStyles.tableSection, { marginTop: 10, marginHorizontal: 0 }]}>
              <View style={[TablasStyles.tableHeader, { backgroundColor: '#ffeeee' }]}>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 10 }]}>Largo</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 15 }]}>Peso</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 20 }]}>Tensión</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 30 }]}>Grillete</Text>
                <Text style={[TablasStyles.headerText, { flex: 2, color: '#dd0000', textAlign: 'right', right: 10 }]}>Peso Grillete</Text>
              </View>
              <View style={[TablasStyles.row, { borderBottomWidth: 0 }]}>
                {aparejo.detalles.map((detail, detailIndex) => (
                  <Text key={`detail-${index}-${detailIndex}`} style={[TablasStyles.cell, { flex: 1, right: 5 }]}>
                    {String(detail.valor)}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        ))}

        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 30,
          paddingHorizontal: 10,
          marginBottom: 20,
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 5,
              color: '#555',
            }}>Firma Supervisor</Text>
            <View style={{
              width: 150,
              height: 80,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              backgroundColor: '#f9f9f9',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
              {appliedSupervisorSignature && appliedSupervisorSignature !== 'Firma pendiente' ? (
                <Image
                  source={{
                    uri: appliedSupervisorSignature.startsWith('data:')
                      ? appliedSupervisorSignature
                      : `data:image/png;base64,${appliedSupervisorSignature}`,
                  }}
                  style={{
                    top: 32,
                    left: 30,
                    width: '200%',
                    height: '200%',
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <Text style={{ fontSize: 12, color: '#888' }}>[Firma pendiente]</Text>
              )}
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 5,
              color: '#555',
            }}>Firma Jefe de Área</Text>
            <View style={{
              width: 150,
              height: 80,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              backgroundColor: '#f9f9f9',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
              {appliedJefeAreaSignature && appliedJefeAreaSignature !== 'Firma pendiente' ? (
                <Image
                  source={{
                    uri: appliedJefeAreaSignature.startsWith('data:')
                      ? appliedJefeAreaSignature
                      : `data:image/png;base64,${appliedJefeAreaSignature}`,
                  }}
                  style={{
                    top: 23,
                    left: 0,
                    width: '150%',
                    height: '150%',
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <Text style={{ fontSize: 12, color: '#888' }}>[Firma pendiente]</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {showSmallButtons && !isCapataz ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%', position: 'absolute', bottom: 60, left: '-26' }}>
          {canSign && (
            <Components.Button
              label="Firmar Plan"
              onPress={handleFirmarPlan}
              style={{ width: '48%' }}
            />
          )}
          <Components.Button
            label="Enviar PDF"
            onPress={handleEnviarPdf}
            style={{ width: canSign ? '48%' : '90%' }}
          />
        </View>
      ) : (
        <Components.Button
          label="Enviar PDF"
          onPress={handleEnviarPdf}
          style={[TablasStyles.button, { width: '90%', position: 'absolute', bottom: 60, left: -33 }]}
        />
      )}
    </View>
  );
};

export default CollabTablas;
