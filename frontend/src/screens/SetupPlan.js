import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import { validatePlan } from '../utils/validation/validatePlan';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de tener esta librería instalada
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const SetupPlan = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [supervisorSeleccionado, setSupervisorSeleccionado] = useState('');
  const [jefeAreaSeleccionado, setJefeAreaSeleccionado] = useState('');
  const [responsablesAdicionales, setResponsablesAdicionales] = useState([]);
  const [isAddingResponsable, setIsAddingResponsable] = useState(false);
  const [nuevoResponsableNombre, setNuevoResponsableNombre] = useState('');
  const [nuevoResponsableRol, setNuevoResponsableRol] = useState('');
  const [errors, setErrors] = useState({});

  const navigation = useNavigation(); // Inicializa navigation

  const handleNombreProyectoChange = (text) => {
    setNombreProyecto(text);
    const validationErrors = validatePlan(text);
    setErrors(validationErrors);
  };

  const handleSeleccionarSupervisor = () => {
    console.log('Seleccionar Supervisor');
    // Implementa tu lógica de selección aquí
  };

  const handleSeleccionarJefeArea = () => {
    console.log('Seleccionar Jefe de Área');
    // Implementa tu lógica de selección aquí
  };

  const agregarNuevoResponsable = () => {
    setIsAddingResponsable(true);
  };

  const confirmarNuevoResponsable = () => {
    if (nuevoResponsableNombre.trim() && nuevoResponsableRol.trim()) {
      if (responsablesAdicionales.length < 2) { // Máximo 2 responsables adicionales para total 4
        setResponsablesAdicionales([...responsablesAdicionales, { nombre: nuevoResponsableNombre, rol: nuevoResponsableRol }]);
        setNuevoResponsableNombre('');
        setNuevoResponsableRol('');
        setIsAddingResponsable(false);
      } else {
        Alert.alert('Límite alcanzado', 'Solo se pueden agregar hasta 2 responsables adicionales.');
      }
    } else {
      Alert.alert('Campos incompletos', 'Por favor, ingrese nombre y rol del responsable.');
    }
  };

  const cancelarNuevoResponsable = () => {
    setIsAddingResponsable(false);
    setNuevoResponsableNombre('');
    setNuevoResponsableRol('');
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
    // Recopila los datos a enviar
    const dataToSend = {
      nombreProyecto: nombreProyecto,
      supervisor: supervisorSeleccionado,
      jefeArea: jefeAreaSeleccionado,
      responsablesAdicionales: responsablesAdicionales,
    };

    // Navega a SetupCarga.js y envía los datos como parámetros de ruta
    navigation.navigate('SetupCarga', dataToSend);
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
              />
              {errors.nombreProyecto && (
                <Text style={[styles.errorText, { marginTop: 5 }]}>{errors.nombreProyecto}</Text>
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
            </View>

            <View style={{ marginTop: 0 }}>
              <Text style={styles.labelText}>Seleccione al Jefe Área:</Text>
              <Components.ConfigButton
                placeholder="Seleccionar Jefe Área"
                value={jefeAreaSeleccionado}
                onPress={handleSeleccionarJefeArea}
                style={{ width: '100%' }}
              />
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
                      styles.agregarResponsableInput,
                      errors.nuevoResponsableNombre && { borderColor: 'red', borderWidth: 1 },
                    ]}
                    placeholder="Nombre"
                    value={nuevoResponsableNombre}
                    onChangeText={setNuevoResponsableNombre}
                    showControls={false}
                    showClearButton={true}
                  />
                  {errors.nuevoResponsableNombre && (
                    <Text style={styles.errorText}>{errors.nuevoResponsableNombre}</Text>
                  )}
                  <Text style={[styles.labelText, { top: 9, marginTop: 30 }]}>Rol del responsable:</Text>
                  <Components.NumericInput
                    style={[
                      styles.agregarResponsableInput,
                      errors.nuevoResponsableRol && { borderColor: 'red', borderWidth: 1 },
                    ]}
                    placeholder="Rol"
                    value={nuevoResponsableRol}
                    onChangeText={setNuevoResponsableRol}
                    showControls={false}
                    showClearButton={true}
                  />
                  {errors.nuevoResponsableRol && (
                    <Text style={styles.errorText}>{errors.nuevoResponsableRol}</Text>
                  )}
                  <View style={styles.agregarResponsableBotones}>
                    <Components.Button label="Cancelar" onPress={cancelarNuevoResponsable} isCancel style={{ backgroundColor: 'transparent', width: '45%' }} />
                    <Components.Button label="Confirmar" onPress={confirmarNuevoResponsable} style={{ width: '45%', left: -40 }} />
                  </View>
                </View>
              ) : (
                totalResponsables < 4 && (
                  <TouchableOpacity onPress={agregarNuevoResponsable} style={styles.agregarResponsableBoton}>
                    <Icon name="plus-square" size={30} color="green" />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
          {/* Botón Continuar en la parte baja */}
          <View style={styles.continuarButtonContainer}>
            <Components.Button label="Continuar" onPress={handleContinuar} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupPlan;