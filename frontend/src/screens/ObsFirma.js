import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Components from '../components/Components.index';
import TablasStyles from '../styles/TablasStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import { decode as atob } from 'base-64';
import { cleanSetupPayload } from '../utils/cleanSetupPayload';

const ObsFirma = ({ route }) => {
  const navigation = useNavigation();
  const {
    planData: currentSetup,
    currentUser,
    userRole,
    userId,
    supervisorId,
    jefeAreaId,
    appliedSupervisorFirma,
    appliedJefeAreaFirma,
    userFirma
  } = route.params;

  const [estado, setEstado] = useState(null);
  const [observaciones, setObservaciones] = useState('');
  const [errorEstado, setErrorEstado] = useState('');
  const [showSmallButtons, setShowSmallButtons] = useState(true);

  // Función para extraer userId del token
  const extractUserIdFromToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = atob(base64);
      return JSON.parse(json).id;
    } catch (error) {
      console.log('Error extrayendo userId:', error);
      return null;
    }
  };

  const handleFirmar = async () => {
    if (!estado) {
      setErrorEstado('Debes seleccionar un estado antes de firmar.');
      return;
    } else {
      setErrorEstado('');
    }

    let firmaToUse = userFirma;

    // Si no llegó por parámetros, obtenerla directamente del servidor
    if (!firmaToUse) {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          Alert.alert('Error', 'No se pudo verificar la autenticación');
          return;
        }

        const userIdToFetch = currentUser?._id || extractUserIdFromToken(token);

        if (userIdToFetch) {
          const response = await fetch(getApiUrl(`user/${userIdToFetch}`), {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            firmaToUse = userData.data?.firma;
            console.log('Firma obtenida del servidor:', firmaToUse ? 'EXISTE' : 'NO EXISTE');
          } else {
            console.log('Error en respuesta del servidor:', response.status);
          }
        }
      } catch (error) {
        console.log('Error obteniendo firma:', error);
      }
    }

    if (!firmaToUse) {
      firmaToUse = currentUser?.firma || currentUser?.data?.firma;
    }

    if (!firmaToUse) {
      Alert.alert(
        "Error de Firma",
        "No se encontró una firma para el usuario actual. Por favor:\n\n1. Ve a tu perfil\n2. Registra tu firma\n3. Vuelve a intentar"
      );
      return;
    }

    // Validar firmas previas
    const isSupervisorSigned = appliedSupervisorFirma && appliedSupervisorFirma !== 'Firma pendiente';
    const isJefeAreaSigned = appliedJefeAreaFirma && appliedJefeAreaFirma !== 'Firma pendiente';

    if (userRole === 'supervisor' && userId === supervisorId && isSupervisorSigned) {
      Alert.alert("Ya Firmado", "El supervisor ya ha aplicado una firma a este plan.");
      return;
    }
    if (
      (userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') &&
      userId === jefeAreaId &&
      isJefeAreaSigned
    ) {
      Alert.alert("Ya Firmado", "El jefe de área ya ha aplicado una firma a este plan.");
      return;
    }

    Alert.alert(
      "Confirmar Firma",
      "¿Deseas aplicar tu firma a este plan de izaje?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Firmar",
          onPress: async () => {
            setShowSmallButtons(false);

            // Limpiar el plan antes de enviarlo
            const payload = cleanSetupPayload(currentSetup);

            // Asigna la firma según el rol
            if (userRole === 'supervisor' && userId === supervisorId) {
              payload.firmaSupervisor = firmaToUse;
            } else if (
              (userRole === 'jefe' || userRole === 'jefe_area' || userRole === 'jefe de área') &&
              userId === jefeAreaId
            ) {
              payload.firmaJefeArea = firmaToUse;
            } else {
              Alert.alert("Error de Rol", "Tu rol o ID de usuario no coincide con los asignados para firmar este plan.");
              setShowSmallButtons(true);
              return;
            }

            // Estado y observaciones
            payload.estado = estado;
            payload.observaciones = observaciones;

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

              Alert.alert('Firma Exitosa', 'Tu firma ha sido aplicada al plan de izaje.');
              navigation.pop(2);
            } catch (error) {
              Alert.alert('Error de Conexión', 'No se pudo conectar con el servidor para firmar el plan.');
              setShowSmallButtons(true);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[TablasStyles.container, { backgroundColor: '#fff', paddingBottom: 300, paddingHorizontal: 20 }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 60, left: 20, zIndex: 10 }}
      >
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </Pressable>

      <View style={[TablasStyles.titleContainer, { top: 65 }]}>
        <Text style={TablasStyles.title}>Observaciones y Firma</Text>
      </View>

      <ScrollView style={[TablasStyles.tableContainer, { top: -30, paddingHorizontal: 10 }]}>
        <Text style={[TablasStyles.sectionTitle, { marginBottom: 10 }]}>Estado</Text>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
            onPress={() => setEstado('Aprobado')}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ee0000',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
              }}
            >
              {estado === 'Aprobado' && (
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ee0000' }} />
              )}
            </View>
            <Text>Aprobado</Text>
          </Pressable>

          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setEstado('Rechazado')}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ee0000',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
              }}
            >
              {estado === 'Rechazado' && (
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ee0000' }} />
              )}
            </View>
            <Text>Rechazado</Text>
          </Pressable>
        </View>

        {errorEstado ? <Text style={{ color: 'red', top: 1 }}>{errorEstado}</Text> : null}

        <Text style={[TablasStyles.sectionTitle, { top: 0, marginBottom: 10 }]}>Observaciones</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            height: 100,
            textAlignVertical: 'top',
            marginBottom: 30,
            backgroundColor: '#f9f9f9',
          }}
          multiline
          placeholder="Escribe tus observaciones aquí..."
          value={observaciones}
          onChangeText={setObservaciones}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10, left: -60 }}>
          <Components.Button
            label="Volver"
            onPress={() => navigation.goBack()}
            style={{ width: '45%', backgroundColor: 'transparent' }}
            isCancel={true}
          />
          <Components.Button label="Firmar plan" onPress={handleFirmar} style={{ width: '45%', left: -25 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ObsFirma;
