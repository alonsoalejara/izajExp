import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import TablasStyles from '../styles/TablasStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';

const CollabTablas = ({ route }) => {
  const { setup, currentUser } = route.params;
  const navigation = useNavigation();
  const [showSmallButtons, setShowSmallButtons] = useState(true);
  const [appliedSupervisorSignature, setAppliedSupervisorSignature] = useState(
    setup.firmaSupervisor && setup.firmaSupervisor !== 'Firma pendiente' ? setup.firmaSupervisor : null
  );
  const [appliedJefeAreaSignature, setAppliedJefeAreaSignature] = useState(
    setup.firmaJefeArea && setup.firmaJefeArea !== 'Firma pendiente' ? setup.firmaJefeArea : null
  );

  const userRole = currentUser?.roles?.[0]?.toLowerCase() || currentUser?.position?.toLowerCase();
  const userId = currentUser?._id;
  const supervisorId = setup?.supervisor?._id;
  const jefeAreaId = setup?.jefeArea?._id;

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
    { item: 1, descripcion: 'Nombre Proyecto', nombre: setup.nombreProyecto || 'N/A' },
    { item: 2, descripcion: 'Capataz', nombre: getFullName(setup.capataz) },
    { item: 3, descripcion: 'Supervisor', nombre: getFullName(setup.supervisor) },
    { item: 4, descripcion: 'Jefe Área', nombre: getFullName(setup.jefeArea) },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: setup.grua?.nombre || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: setup.datos?.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: setup.datos?.gradoInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${setup.datos?.contrapeso || 0} ton` },
  ];

  const datosTablaAparejosIndividuales = setup.aparejos?.map((aparejo, index) => ({
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
    { descripcion: 'Peso elemento', cantidad: `${setup.cargas?.pesoEquipo || 0} ton` },
    { descripcion: 'Peso aparejos', cantidad: `${setup.cargas?.pesoAparejos || 0} ton` },
    { descripcion: 'Peso gancho', cantidad: `${setup.cargas?.pesoGancho || 0} ton` },
    { descripcion: 'Peso cable', cantidad: `${setup.cargas?.pesoCable || 0} ton` },
    { descripcion: 'Peso total', cantidad: `${setup.cargas?.pesoTotal || 0} ton` },
    { descripcion: 'Radio de trabajo máximo', cantidad: `${setup.cargas?.radioTrabajoMax || 0} m` },
    { descripcion: 'Ángulo de trabajo', cantidad: `${setup.cargas?.anguloTrabajo || 0}` },
    { descripcion: 'Capacidad de levante', cantidad: `${setup.cargas?.capacidadLevante || 0} ton` },
    { descripcion: '% Utilización', cantidad: `${setup.cargas?.porcentajeUtilizacion || 0} %` },
  ];

  const datosTablaXYZ = [
    {
      item: 1,
      descripcion: 'Medidas',
      X: `${setup.centroGravedad?.xAncho || 'N/A'} m`,
      Y: `${setup.centroGravedad?.yLargo || 'N/A'} m`,
      Z: `${setup.centroGravedad?.zAlto || 'N/A'} m`,
    },
    {
      item: 2,
      descripcion: 'CG',
      X: `${setup.centroGravedad?.xCG || 'N/A'} m`,
      Y: `${setup.centroGravedad?.yCG || 'N/A'} m`,
      Z: `${setup.centroGravedad?.zCG || 'N/A'} m`,
    },
    {
      item: 3,
      descripcion: 'Posic. Relativa',
      X: `${setup.centroGravedad?.xPR || 'N/A'} %`,
      Y: `${setup.centroGravedad?.yPR || 'N/A'} %`,
      Z: `${setup.centroGravedad?.zPR || 'N/A'} %`,
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

            // Crear una copia profunda del setup para evitar mutaciones directas
            const payload = JSON.parse(JSON.stringify(setup));

            // Asegurarse de que los IDs referenciados sean solo los IDs y no objetos completos
            payload.capataz = setup.capataz?._id;
            payload.supervisor = setup.supervisor?._id;
            payload.jefeArea = setup.jefeArea?._id;
            payload.grua = setup.grua?._id;
            payload.aparejos = setup.aparejos?.map(aparejo => {
                const { _id, ...rest } = aparejo;
                return rest;
            }) || [];


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

                const apiUrl = getApiUrl(`setupIzaje/${setup._id}`);
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
                    setAppliedSupervisorSignature(data.updatedSetupIzaje.firmaSupervisor);
                    setAppliedJefeAreaSignature(data.updatedSetupIzaje.firmaJefeArea);
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
  
  const isCapataz = userRole === 'capataz' && userId === setup.capataz?._id;

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