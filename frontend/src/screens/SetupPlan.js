import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import { validatePlan } from '../utils/validation/validatePlan';
import { useNavigation } from '@react-navigation/native';
import BS from '../components/bottomSheets/BS.index';

const SetupPlan = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [supervisorSeleccionado, setSupervisorSeleccionado] = useState('');
  const [supervisorObjeto, setSupervisorObjeto] = useState(null);
  const [jefeAreaSeleccionado, setJefeAreaSeleccionado] = useState('');
  const [jefeAreaObjeto, setJefeAreaObjeto] = useState(null);
  const [errors, setErrors] = useState({});
  const [isJefeAreaModalVisible, setIsJefeAreaModalVisible] = useState(false);
  const [isSupervisorModalVisible, setIsSupervisorModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleNombreProyectoChange = (text) => {
    setNombreProyecto(text);
  };

  const handleSeleccionarSupervisor = () => {
    setIsSupervisorModalVisible(true);
  };

  const handleSeleccionarJefeArea = () => {
    setIsJefeAreaModalVisible(true);
  };

  const handleContinuar = () => {
    const currentErrors = validatePlan(
      nombreProyecto,
      supervisorSeleccionado,
      jefeAreaSeleccionado,
      [] // Responsables Adicionales ya no se validan
    );

    if (Object.keys(currentErrors).length === 0) {
      const dataToSend = {
        nombreProyecto: nombreProyecto,
        supervisor: supervisorObjeto,
        jefeArea: jefeAreaObjeto,
        responsablesAdicionales: [], // Se envía un array vacío
      };

      // --- CONSOLE.LOG PARA LOS DATOS ENVIADOS A SetupCarga.js ---
      console.log('Datos enviados a SetupCarga.js desde SetupPlan.js:', dataToSend);
      // --- FIN CONSOLE.LOG ---

      navigation.navigate('SetupCarga', dataToSend);
    } else {
      setErrors(currentErrors);
    }
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
            <Text style={[styles.sectionTitle, { top: 5, marginBottom: 20 }]}>Cálculo de maniobras menores</Text>
          </View>
          <View style={styles.container}>
            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.labelText, { top: 5 }]}>Ingrese nombre del proyecto:</Text>
              <Components.NumericInput
                value={nombreProyecto}
                onChangeText={handleNombreProyectoChange}
                placeholder="Nombre del proyecto"
                style={[
                  { width: '100%', top: 25 },
                  errors.nombreProyecto && { borderColor: 'red', borderWidth: 1 },
                ]}
                showControls={false}
                showClearButton={true}
                keyboardType="default"
              />
              {errors.nombreProyecto && (
                <Text style={[styles.errorText, { top: -55 }]}>{errors.nombreProyecto}</Text>
              )}
            </View>

            <View style={{ marginTop: 0 }}>
              <Text style={styles.labelText}>Seleccione al Supervisor:</Text>
              <Components.ConfigButton
                placeholder="Seleccionar Supervisor"
                value={supervisorSeleccionado}
                onPress={handleSeleccionarSupervisor}
                style={{ width: '100%' }}
              />
              {errors.supervisorSeleccionado && (
                <Text style={[styles.errorText, { top: -88 }]}>{errors.supervisorSeleccionado}</Text>
              )}
            </View>

            <View style={{ marginTop: 0 }}>
              <Text style={styles.labelText}>Seleccione al Jefe Área:</Text>
              <Components.ConfigButton
                placeholder="Seleccionar Jefe Área"
                value={jefeAreaSeleccionado}
                onPress={handleSeleccionarJefeArea}
                style={{ width: '100%' }}
              />
              {errors.jefeAreaSeleccionado && (
                <Text style={[styles.errorText, { top: -89 }]}>{errors.jefeAreaSeleccionado}</Text>
              )}
            </View>
          </View>
          {/* Botón Continuar */}
          <View style={styles.continuarButtonContainer}>
            <Components.Button label="Continuar" onPress={handleContinuar} style={styles.continuarButton}/>
          </View>
        </ScrollView>

        {/* Modal para seleccionar Jefe de Área */}
        <BS.BSJefeArea
          isVisible={isJefeAreaModalVisible}
          onClose={() => setIsJefeAreaModalVisible(false)}
          onSelect={handleJefeAreaSelect}
        />
        {/* Modal para seleccionar Supervisor */}
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