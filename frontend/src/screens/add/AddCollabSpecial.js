import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/AddStyles';
import getApiUrl from '../../utils/apiUrl';
import Components from '../../components/Components.index';

const AddCollabSpecial = ({ navigation, route }) => {
  const { nombre, apellido, rut, phone, email } = route.params;
  const [position, setPosition] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPositionVisible, setModalPositionVisible] = useState(false);
  const [specialtyError, setSpecialtyError] = useState('');
  const [positionError, setPositionError] = useState('');

  const handlePickerChange = (itemValue) => {
    setSpecialty(itemValue);
    if (itemValue) setSpecialtyError('');
  };

  const handlePositionChange = (itemValue) => {
    setPosition(itemValue);
    if (itemValue) setPositionError('');
  };

  const generarPassword = () => {
    return `${nombre.charAt(0).toUpperCase()}${apellido.charAt(0).toUpperCase()}${rut.replace('-', '').substring(0, 4)}`;
  };

  const handleFinalize = async () => {
    if (!position) {
      setPositionError('Por favor, seleccione un cargo.');
      return;
    }
    if (!specialty) {
      setSpecialtyError('Por favor, seleccione una especialidad.');
      return;
    }

    const finalData = {
      nombre,
      apellido,
      rut,
      phone,
      position,
      specialty,
      email,
      roles: 
        position === "Jefe Área" ? ['jefe'] :
        position === "Supervisor" ? ['supervisor'] :
        ['capataz'],
      password: generarPassword(),
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        alert('No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }

      const response = await fetch(getApiUrl('user/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Colaborador creado exitosamente.');
        
        navigation.replace('Tabs');
      } else {
        alert(`Error al guardar: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al guardar el colaborador.');
    }
  };

  const handleCancel = () => {
    navigation.replace('Tabs');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="keyboard-arrow-left" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>¿Cuál será su cargo y especialidad?</Text>
      <Text style={styles.subtitle}>Selecciona un cargo y especialidad.</Text>
      {positionError ? <Text style={styles.errorText}>{positionError}</Text> : null}
      <TouchableOpacity 
        style={[styles.specialityOutput, positionError ? styles.errorInput : {}]} 
        onPress={() => setModalPositionVisible(true)}
      >
        <Text style={styles.specialitySubtitle}>Cargo del colaborador:</Text>
        <Text style={styles.specialityText}>{position ? position : "Seleccionar cargo"}</Text>
      </TouchableOpacity>

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
                onValueChange={handlePositionChange}
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

      {specialtyError ? <Text style={styles.errorText}>{specialtyError}</Text> : null}
      <TouchableOpacity 
        style={[styles.specialityOutput, specialtyError ? styles.errorInput : {}]} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.specialitySubtitle}>Especialidad del colaborador:</Text>
        <Text style={styles.specialityText}>{specialty ? specialty : "Seleccionar especialidad"}</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.pickerBackground}>
              <Picker
                selectedValue={specialty}
                onValueChange={handlePickerChange}
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

      <Components.Button
        label="Finalizar"
        onPress={handleFinalize}
        style={{ width: '100%', marginTop: 5, right: 55 }}
      />

      <Components.Button
        label="Cancelar inscripción"
        onPress={handleCancel}
        isCancel={true}
        style={{ backgroundColor: 'transparent', marginTop: 395, left: -12 }}
      />
    </View>
  );
};

export default AddCollabSpecial;