import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import { validatePlan } from '../utils/validation/validatePlan';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import BS from '../components/bottomSheets/BS.index';

const SetupPlan = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [supervisorSeleccionado, setSupervisorSeleccionado] = useState('');
  const [supervisorObjeto, setSupervisorObjeto] = useState(null);
  const [jefeAreaSeleccionado, setJefeAreaSeleccionado] = useState('');
  const [jefeAreaObjeto, setJefeAreaObjeto] = useState(null);
  const [responsablesAdicionales, setResponsablesAdicionales] = useState([]);
  const [isAddingResponsable, setIsAddingResponsable] = useState(false);
  const [nuevoResponsableNombre, setNuevoResponsableNombre] = useState('');
  const [nuevoResponsableRol, setNuevoResponsableRol] = useState('');
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

  const agregarNuevoResponsable = () => {
    setIsAddingResponsable(true);
  };

  const confirmarNuevoResponsable = () => {
    let nuevosErrores = {};
    let hayErrores = false;

    if (!nuevoResponsableNombre.trim()) {
      nuevosErrores.nuevoResponsableNombre = 'Nombre del responsable es requerido';
      hayErrores = true;
    }
    if (!nuevoResponsableRol.trim()) {
      nuevosErrores.nuevoResponsableRol = 'Rol del responsable es requerido';
      hayErrores = true;
    }
    if (nuevoResponsableNombre.length > 100) {
      nuevosErrores.nuevoResponsableNombre = 'El nombre no puede tener más de 100 caracteres';
      hayErrores = true;
    }

    if (nuevoResponsableRol.length > 30) {
      nuevosErrores.nuevoResponsableRol = 'El rol no puede tener más de 30 caracteres';
      hayErrores = true;
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(prevErrors => ({ ...prevErrors, ...nuevosErrores }));
      return;
    }

    if (nuevoResponsableNombre.trim() && nuevoResponsableRol.trim() && !hayErrores) {
      if (responsablesAdicionales.length < 2) {
        setResponsablesAdicionales([...responsablesAdicionales, { nombre: nuevoResponsableNombre, rol: nuevoResponsableRol }]);
        setNuevoResponsableNombre('');
        setNuevoResponsableRol('');
        setIsAddingResponsable(false);
        setErrors({});
      } else {
        Alert.alert('Límite alcanzado', 'Solo se pueden agregar hasta 2 responsables adicionales.');
      }
    }
  };

  const cancelarNuevoResponsable = () => {
    setIsAddingResponsable(false);
    setNuevoResponsableNombre('');
    setNuevoResponsableRol('');
    setErrors({});
  };

  const eliminarResponsableAdicional = (index) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar a este responsable?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            const nuevosResponsables = responsablesAdicionales.filter((_, i) => i !== index);
            setResponsablesAdicionales(nuevosResponsables);
          },
        },
      ]
    );
  };

  const totalResponsables = 2 + responsablesAdicionales.length;

  const handleContinuar = () => {
    const currentErrors = validatePlan(
      nombreProyecto,
      supervisorSeleccionado,
      jefeAreaSeleccionado,
      responsablesAdicionales
    );

    if (Object.keys(currentErrors).length === 0) {
      const dataToSend = {
        nombreProyecto: nombreProyecto,
        supervisor: supervisorObjeto,
        jefeArea: jefeAreaObjeto,
        responsablesAdicionales: responsablesAdicionales,
      };
      console.log('Datos a enviar a SetupCarga:', dataToSend);
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

            <View style={styles.responsablesAdicionalesContainer}>
              <Text style={styles.labelText}>Responsables Adicionales:</Text>
              {responsablesAdicionales.map((responsable, index) => (
                <View key={index} style={styles.responsableAdicionalItem}>
                  <View style={styles.responsableAdicionalInfo}>
                    <Text style={styles.responsableAdicionalNombre}>{responsable.nombre}</Text>
                    <Text style={styles.responsableAdicionalRol}>{responsable.rol}</Text>
                  </View>
                  <TouchableOpacity onPress={() => eliminarResponsableAdicional(index)}>
                    <Icon name="trash" size={20} color="red" style={styles.eliminarIcon} />
                  </TouchableOpacity>
                </View>
              ))}

              {isAddingResponsable ? (
                <View style={styles.agregarResponsableInputContainer}>
                  <Text style={[styles.labelText, { top: 9 }]}>Nombre completo del responsable:</Text>
                  <Components.NumericInput
                    style={[
                      { width: '100%', top: 25 },
                      errors.nuevoResponsableNombre && { borderColor: 'red', borderWidth: 1 },
                    ]}
                    placeholder="Nombre"
                    value={nuevoResponsableNombre}
                    onChangeText={setNuevoResponsableNombre}
                    showControls={false}
                    showClearButton={true}
                    keyboardType="default" 
                  />
                  {errors.nuevoResponsableNombre && (
                    <Text style={[styles.errorText, { top: -55 }]}>{errors.nuevoResponsableNombre}</Text>
                  )}
                  <Text style={[styles.labelText, { top: 9, marginTop: 30 }]}>Rol del responsable:</Text>
                  <Components.NumericInput
                    style={[
                      { width: '100%', top: 25 },
                      errors.nuevoResponsableRol && { borderColor: 'red', borderWidth: 1 },
                    ]}
                    placeholder="Rol"
                    value={nuevoResponsableRol}
                    onChangeText={setNuevoResponsableRol}
                    showControls={false}
                    showClearButton={true}
                    keyboardType="default" 
                  />
                  {errors.nuevoResponsableRol && (
                    <Text style={[styles.errorText, { top: -55 }]}>{errors.nuevoResponsableRol}</Text>
                  )}
                  <View style={styles.agregarResponsableBotones}>
                    <Components.Button label="Cancelar" onPress={cancelarNuevoResponsable} isCancel style={{ backgroundColor: 'transparent', width: '45%' }} />
                    <Components.Button label="Confirmar" onPress={confirmarNuevoResponsable} style={{ width: '45%', left: -40 }} />
                  </View>
                </View>
              ) : (
                totalResponsables < 4 && (
                  <TouchableOpacity onPress={agregarNuevoResponsable} style={styles.agregarResponsableBoton}>
                    <Icon name="plus-square" size={30} color="green" top={5} left={10} />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
          {/* Botón Continuar */}
          <View style={styles.continuarButtonContainer}>
            <Components.Button label="Continuar" onPress={handleContinuar} />
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