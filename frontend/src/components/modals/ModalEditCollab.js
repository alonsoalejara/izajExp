import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/ModalStyles';
import { especialidades } from '../../data/especialidadesData';
import getApiUrl from '../../utils/apiUrl';

const ModalEditColaborador = ({ isVisible, onClose, colaborador, onUpdate }) => {
  const [nombre, setNombre] = useState(colaborador ? colaborador.nombre : '');
  const [apellido, setApellido] = useState(colaborador ? colaborador.apellido : '');
  const [rut, setRut] = useState(colaborador ? colaborador.rut : '');
  const [email, setEmail] = useState(colaborador ? colaborador.email : '');
  const [phone, setTelefono] = useState(colaborador ? colaborador.phone : '');
  const [specialty, setEspecialidad] = useState(colaborador ? colaborador.specialty : '');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (colaborador) {
      setNombre(colaborador.nombre);
      setApellido(colaborador.apellido);
      setRut(colaborador.rut);
      setEmail(colaborador.email);
      setTelefono(colaborador.phone);
      setEspecialidad(colaborador.specialty);
      console.log('(ModalEditCollab.js) Datos antes de editar:', colaborador);
    }
  }, [colaborador]);

  const handleUpdate = async () => {
    const updatedColaborador = {
      nombre,
      apellido,
      rut,
      email,
      phone,
      specialty,
      roles: colaborador.roles,
    };

    console.log('(ModalEditCollab.js) Datos actualizados luego de presionar Guardar:', updatedColaborador);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        alert('No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }
      console.log('(ModalEditCollab.js) ID del colaborador:', colaborador._id);
      if (!colaborador._id) {
        alert('Error: ID del colaborador no válido.');
        return;
    }
      const response = await fetch(getApiUrl(`user/${colaborador._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedColaborador),
      });

      const data = await response.json();
      if (response.ok) {
        onUpdate(updatedColaborador);
        onClose();
      } else {
        console.error('Error al actualizar:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar el colaborador.');
    }
  };

  const handleEspecialidadSelect = (item) => {
    setEspecialidad(item.label);
    setShowMenu(false);
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Colaborador</Text>

          <Text style={styles.label}>Nombre(s):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese nombre(s)"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Apellido(s):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese apellido(s)"
            value={apellido}
            onChangeText={setApellido}
          />

          <Text style={styles.label}>RUT:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese RUT"
            value={rut}
            onChangeText={setRut}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese teléfono"
            value={phone}
            onChangeText={setTelefono}
          />

          <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.optionButton}>
            <Text>{specialty || 'Seleccione especialidad'}</Text>
          </TouchableOpacity>
          {showMenu && (
            <FlatList
              data={especialidades}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleEspecialidadSelect(item)}>
                  <Text style={styles.optionButton}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value}
            />
          )}

          <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditColaborador;
