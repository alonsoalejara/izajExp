import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import { validatePlan } from '../utils/validation/validatePlan';
import { useNavigation } from '@react-navigation/native';
import BS from '../components/bottomSheets/BS.index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import { decode as atob } from 'base-64';

const SetupPlan = () => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
  const [proyectoObjeto, setProyectoObjeto] = useState(null);

  const [supervisorSeleccionado, setSupervisorSeleccionado] = useState('');
  const [supervisorObjeto, setSupervisorObjeto] = useState(null);

  const [jefeAreaSeleccionado, setJefeAreaSeleccionado] = useState('');
  const [jefeAreaObjeto, setJefeAreaObjeto] = useState(null);

  const [capatazId, setCapatazId] = useState(null);
  const [capatazNombre, setCapatazNombre] = useState('');
  const [capatazObjeto, setCapatazObjeto] = useState(null);

  const [errors, setErrors] = useState({});

  const [isProyectoModalVisible, setIsProyectoModalVisible] = useState(false);
  const [isJefeAreaModalVisible, setIsJefeAreaModalVisible] = useState(false);
  const [isSupervisorModalVisible, setIsSupervisorModalVisible] = useState(false);

  const navigation = useNavigation();

  const extractUserId = (token) => {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = atob(base64);
      return JSON.parse(json).id;
    } catch (error) {
      console.error("Error al decodificar el token JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchCapatazData() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.warn('No se encontró token de acceso.');
          return;
        }

        const userId = extractUserId(token);
        if (!userId) {
          console.warn('No se pudo extraer el ID de usuario del token.');
          return;
        }
        setCapatazId(userId);

        const response = await fetch(getApiUrl(`user/${userId}`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData && userData.data) {
            const capataz = userData.data;
            setCapatazObjeto(capataz);
            setCapatazNombre(`${capataz.nombre} ${capataz.apellido}`);
          } else {
            setCapatazNombre('N/A');
          }
        }
      } catch (error) {
        console.error('Error en fetchCapatazData:', error);
        setCapatazNombre('N/A');
      }
    }
    fetchCapatazData();
  }, []);

  const handleSeleccionarProyecto = () => {
    setIsProyectoModalVisible(true);
  };

  const handleSeleccionarSupervisor = () => {
    setIsSupervisorModalVisible(true);
  };

  const handleSeleccionarJefeArea = () => {
    setIsJefeAreaModalVisible(true);
  };

  const handleContinuar = () => {
    const currentErrors = validatePlan(
      proyectoSeleccionado,
      supervisorSeleccionado,
      jefeAreaSeleccionado,
      []
    );

    if (Object.keys(currentErrors).length === 0) {
      const dataToSend = {
        proyecto: proyectoObjeto,
        nombreProyecto: proyectoObjeto?.nombre || '',
        supervisor: supervisorObjeto,
        jefeArea: jefeAreaObjeto,
        capataz: capatazObjeto,
      };

      navigation.navigate('SetupCarga', dataToSend);
    } else {
      setErrors(currentErrors);
    }
  };

  const handleProyectoSelect = (proyecto) => {
    setProyectoSeleccionado(proyecto.nombre);
    setProyectoObjeto(proyecto);
    setIsProyectoModalVisible(false);
  };

  const handleJefeAreaSelect = (jefe) => {
    const nombreCompleto = `${jefe.nombre} ${jefe.apellido || ''}`;
    setJefeAreaSeleccionado(nombreCompleto);
    setJefeAreaObjeto(jefe);
    setIsJefeAreaModalVisible(false);
  };

  const handleSupervisorSelect = (supervisor) => {
    const nombreCompleto = `${supervisor.nombre} ${supervisor.apellido || ''}`;
    setSupervisorSeleccionado(nombreCompleto);
    setSupervisorObjeto(supervisor);
    setIsSupervisorModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { top: 5, marginBottom: 20 }]}>
              Cálculo de maniobras menores
            </Text>
          </View>

          <View style={styles.container}>
            {/* Proyecto */}
            <View style={{ marginTop: 0, marginBottom: 0 }}>
              <Text style={styles.labelText}>Seleccione el Proyecto:</Text>
              <Components.ConfigButton
                placeholder="Seleccionar Proyecto"
                value={proyectoSeleccionado}
                onPress={handleSeleccionarProyecto}
                style={{ width: '100%' }}
              />
              {errors.proyectoSeleccionado && (
                <Text style={[styles.errorText, { top: -55 }]}>
                  {errors.proyectoSeleccionado}
                </Text>
              )}
            </View>

            {/* Supervisor */}
            <View style={{ marginTop: 0 }}>
              <Text style={styles.labelText}>Seleccione al Supervisor:</Text>
              <Components.ConfigButton
                placeholder="Seleccionar Supervisor"
                value={supervisorSeleccionado}
                onPress={handleSeleccionarSupervisor}
                style={{ width: '100%' }}
              />
              {errors.supervisorSeleccionado && (
                <Text style={[styles.errorText, { top: -88 }]}>
                  {errors.supervisorSeleccionado}
                </Text>
              )}
            </View>

            {/* Jefe Área */}
            <View style={{ marginTop: 0 }}>
              <Text style={styles.labelText}>Seleccione al Jefe Área:</Text>
              <Components.ConfigButton
                placeholder="Seleccionar Jefe Área"
                value={jefeAreaSeleccionado}
                onPress={handleSeleccionarJefeArea}
                style={{ width: '100%' }}
              />
              {errors.jefeAreaSeleccionado && (
                <Text style={[styles.errorText, { top: -89 }]}>
                  {errors.jefeAreaSeleccionado}
                </Text>
              )}
            </View>
          </View>

          {/* Botón Continuar */}
          <View style={styles.continuarButtonContainer}>
            <Components.Button
              label="Continuar"
              onPress={handleContinuar}
              style={styles.continuarButton}
            />
          </View>
        </ScrollView>

        {/* Modal Proyecto */}
        <BS.BSProyecto
          isVisible={isProyectoModalVisible}
          onClose={() => setIsProyectoModalVisible(false)}
          onSelect={handleProyectoSelect}
        />

        {/* Modal Jefe de Área */}
        <BS.BSJefeArea
          isVisible={isJefeAreaModalVisible}
          onClose={() => setIsJefeAreaModalVisible(false)}
          onSelect={handleJefeAreaSelect}
        />

        {/* Modal Supervisor */}
        <BS.BSSupervisor
          isVisible={isSupervisorModalVisible}
          onClose={() => setIsSupervisorModalVisible(false)}
          onSelect={handleSupervisorSelect}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupPlan;
