import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/ModalStyles';
import { especialidades } from '../../data/especialidadesData';
import getApiUrl from '../../utils/apiUrl'; // Importa getApiUrl

const ModalEditColaborador = ({ isVisible, onClose, colaborador, onUpdate }) => {
  const [nombre, setNombre] = useState(colaborador.nombre);
  const [apellido, setApellido] = useState(colaborador.apellido);
  const [rut, setRut] = useState(colaborador.rut);
  const [email, setEmail] = useState(colaborador.email);
  const [telefono, setTelefono] = useState(colaborador.telefono);
  const [especialidad, setEspecialidad] = useState(colaborador.especialidad);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setNombre(colaborador.nombre);
    setApellido(colaborador.apellido);
    setRut(colaborador.rut);
    setEmail(colaborador.email);
    setTelefono(colaborador.telefono);
    setEspecialidad(colaborador.especialidad);
  }, [colaborador]);

  const handleUpdate = async () => {
    const updatedColaborador = {
      nombre,
      apellido,
      rut,
      email,
      telefono,
      especialidad,
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        alert('No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }

      const response = await fetch(getApiUrl(`user/${colaborador.id}`), { // Usa getApiUrl para la URL
        method: 'PUT', // Método PUT para actualizar
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedColaborador),
      });

      const data = await response.json();
      if (response.ok) {
        onUpdate(updatedColaborador); // Actualiza el colaborador
        onClose(); // Cierra el modal
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
            value={telefono}
            onChangeText={setTelefono}
          />

          {/* Menú de especialidades */}
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.optionButton}>
            <Text>{especialidad || 'Seleccione especialidad'}</Text>
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
