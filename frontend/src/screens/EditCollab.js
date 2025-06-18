import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import styles from '../styles/ProfileStyles';
import Components from '../components/Components.index';
import validationUser from '../utils/validation/validationUser';

const EditCollab = () => {
  const navigation = useNavigation();
  const { userData } = useRoute().params;

  // Estados para inputs (valores iniciales del colaborador)
  const [nombre, setNombre] = useState(userData?.nombre || '');
  const [apellido, setApellido] = useState(userData?.apellido || '');
  const [rut, setRut] = useState(userData?.rut || '');
  const [phone, setPhone] = useState(userData?.phone || '');
  const [email, setEmail] = useState(userData?.email || '');

  // Estados para cargo y especialidad (Picker)
  const [position, setPosition] = useState(userData?.position || '');
  const [specialty, setSpecialty] = useState(userData?.specialty || '');

  // Estados para errores
  const [nombreError, setNombreError] = useState('');
  const [apellidoError, setApellidoError] = useState('');
  const [rutError, setRutError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [positionError, setPositionError] = useState('');
  const [specialtyError, setSpecialtyError] = useState('');

  // Estados para modales de Picker
  const [modalPositionVisible, setModalPositionVisible] = useState(false);
  const [modalSpecialtyVisible, setModalSpecialtyVisible] = useState(false);

  const handleSave = () => {
    let hasError = false;
  
    // Validación de Nombre
    if (!nombre.trim() || nombre.startsWith(' ')) {
      setNombreError('El nombre no puede estar vacío ni iniciar con espacios.');
      hasError = true;
    } else {
      const namePattern = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/;
      if (!namePattern.test(nombre.trim())) {
        setNombreError('No se aceptan números o caracteres especiales.');
        hasError = true;
      } else {
        setNombreError('');
      }
    }
  
    // Validación de Apellido
    if (!apellido.trim() || apellido.startsWith(' ')) {
      setApellidoError('El apellido no puede estar vacío ni iniciar con espacios.');
      hasError = true;
    } else {
      const lastNamePattern = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/;
      if (!lastNamePattern.test(apellido.trim())) {
        setApellidoError('No se aceptan números o caracteres especiales.');
        hasError = true;
      } else {
        setApellidoError('');
      }
    }
  
    // Validación de Cargo y Especialidad
    if (!position) {
      setPositionError('El cargo es requerido.');
      hasError = true;
    } else {
      setPositionError('');
    }
    if (!specialty) {
      setSpecialtyError('La especialidad es requerida.');
      hasError = true;
    } else {
      setSpecialtyError('');
    }
  
    // Validación de RUT
    const rutPattern = /^\d{7,8}-[0-9Kk]{1}$/;
    if (!rutPattern.test(rut)) {
      setRutError('El RUT no tiene el formato correcto (ej: 12345678-K)');
      hasError = true;
    } else {
      setRutError('');
    }
  
    // Validación de Teléfono
    const phonePattern = /^\+569\d{8}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError('Usar formato +569XXXXXXXX');
      hasError = true;
    } else {
      setPhoneError('');
    }
  
    // Validación de Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError('El correo electrónico no tiene el formato correcto');
      hasError = true;
    } else {
      setEmailError('');
    }
  
    if (hasError) return;
  
    // Mostrar alerta de confirmación antes de guardar los cambios
    Alert.alert(
      "Confirmar cambios",
      "¿Estás seguro de que deseas guardar los cambios?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Guardar",
          onPress: async () => {
            try {
              // Preparar los datos finales para enviar
              const finalData = {
                nombre,
                apellido,
                rut,
                phone,
                email,
                position,
                specialty,
                roles: position === "Jefe Área" ? ['jefe'] : ['capataz'],
              };
  
              const accessToken = await AsyncStorage.getItem('accessToken');
              if (!accessToken) {
                Alert.alert("Error", "No autorizado. Por favor, inicie sesión nuevamente.");
                return;
              }
  
              // Realizar petición PUT para actualizar el colaborador
              const response = await fetch(getApiUrl(`user/${userData._id}`), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(finalData),
              });
  
              const data = await response.json();
              if (response.ok) {
                Alert.alert("Éxito", "Cambios guardados correctamente");
                navigation.goBack();
              } else {
                Alert.alert("Error", `Error al guardar: ${data.message}`);
              }
            } catch (error) {
              console.error('Error:', error);
              Alert.alert("Error", "Hubo un error al guardar el colaborador.");
            }
          },
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Header con botón de regreso y título */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 40 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" size={40} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 66 }}>Editar usuario</Text>
      </View>
  
      {/* Input: Nombre */}
      <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
        {nombreError ? <Text style={styles.errorText}>{nombreError}</Text> : null}
        <View style={styles.infoContainer}>
          <Icon name="person" size={24} color="#ee0000" style={styles.icon} />
          <TextInput
            style={[styles.value, nombreError ? styles.errorInput : {}]}
            value={nombre}
            onChangeText={(text) => validationUser.validarNombre(text, setNombre, setNombreError)}
            placeholder="Nombre"
          />
        </View>
      </View>
  
      {/* Input: Apellido */}
      <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
        {apellidoError ? <Text style={styles.errorText}>{apellidoError}</Text> : null}
        <View style={styles.infoContainer}>
          <Icon name="person" size={24} color="#ee0000" style={styles.icon} />
          <TextInput
            style={[styles.value, apellidoError ? styles.errorInput : {}]}
            value={apellido}
            onChangeText={(text) => validationUser.validarApellido(text, setApellido, setApellidoError)}
            placeholder="Apellido"
          />
        </View>
      </View>
  
      {/* Input: RUT */}
      <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
        {rutError ? <Text style={styles.errorText}>{rutError}</Text> : null}
        <View style={styles.infoContainer}>
          <Icon name="fingerprint" size={24} color="#ee0000" style={styles.icon} />
          <TextInput
            style={[styles.value, rutError ? styles.errorInput : {}]}
            value={rut}
            onChangeText={(text) => validationUser.validarRut(text, setRut, setRutError)}
            placeholder="RUT"
          />
        </View>
      </View>
  
      {/* Input: Teléfono */}
      <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        <View style={styles.infoContainer}>
          <Icon name="phone" size={24} color="#ee0000" style={styles.icon} />
          <TextInput
            style={[styles.value, phoneError ? styles.errorInput : {}]}
            value={phone}
            onChangeText={(text) => validationUser.validarTelefono(text, setPhone, setPhoneError)}
            placeholder="Teléfono"
            keyboardType="phone-pad"
          />
        </View>
      </View>
  
      {/* Input: Correo electrónico */}
      <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={styles.infoContainer}>
          <Icon name="email" size={24} color="#ee0000" style={styles.icon} />
          <TextInput
            style={[styles.value, emailError ? styles.errorInput : {}]}
            value={email}
            onChangeText={(text) => validationUser.validarEmail(text, setEmail, setEmailError)}
            placeholder="Correo electrónico"
            keyboardType="email-address"
          />
        </View>
      </View>
  
      {/* Container para ambos Pickers */}
      <View style={{ marginTop: -30, marginBottom: 10, paddingHorizontal: 0 }}>
        {/* Picker: Cargo */}
        <View style={{ marginBottom: -10 }}>
          {positionError ? <Text style={styles.errorText}>{positionError}</Text> : null}
          <TouchableOpacity 
            style={[styles.specialityOutput, positionError ? styles.errorInput : {}]} 
            onPress={() => setModalPositionVisible(true)}
          >
            <Text style={styles.specialitySubtitle}>Cargo del colaborador:</Text>
            <Text style={styles.specialityText}>{position ? position : "Seleccionar cargo"}</Text>
          </TouchableOpacity>
        </View>
  
        {/* Picker: Especialidad */}
        <View style={{ marginBottom: 10 }}>
          {specialtyError ? <Text style={styles.errorText}>{specialtyError}</Text> : null}
          <TouchableOpacity 
            style={[styles.specialityOutput, specialtyError ? styles.errorInput : {}]} 
            onPress={() => setModalSpecialtyVisible(true)}
          >
            <Text style={styles.specialitySubtitle}>Especialidad del colaborador:</Text>
            <Text style={styles.specialityText}>{specialty ? specialty : "Seleccionar especialidad"}</Text>
          </TouchableOpacity>
        </View>
      </View>
  
      {/* Modal para Cargo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPositionVisible}
        onRequestClose={() => setModalPositionVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalPositionVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.pickerBackground}>
              <Picker
                selectedValue={position}
                onValueChange={(itemValue) => {
                  setPosition(itemValue);
                  setPositionError('');
                  setModalPositionVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Jefe Área" value="Jefe Área" />
                <Picker.Item label="Capataz" value="Capataz" />
                <Picker.Item label="Supervisor" value="Supervisor" />
              </Picker>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  
      {/* Modal para Especialidad */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSpecialtyVisible}
        onRequestClose={() => setModalSpecialtyVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalSpecialtyVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.pickerBackground}>
              <Picker
                selectedValue={specialty}
                onValueChange={(itemValue) => {
                  setSpecialty(itemValue);
                  setSpecialtyError('');
                  setModalSpecialtyVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Estructura" value="Estructura" />
                <Picker.Item label="Piping" value="Piping" />
                <Picker.Item label="Obras Civiles" value="Obras Civiles" />
                <Picker.Item label="Mecánica" value="Mecánica" />
                <Picker.Item label="Eléctrica" value="Eléctrica" />
              </Picker>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  
      {/* Botón de Guardar */}
      <TouchableOpacity onPress={handleSave} style={[styles.userButton, { marginTop: -10, left: -13, width: '102%' }]}>
        <Components.Button label="Guardar" onPress={handleSave} style={styles.logoutButton} />
      </TouchableOpacity>
    </View>
  );
};

export default EditCollab;
