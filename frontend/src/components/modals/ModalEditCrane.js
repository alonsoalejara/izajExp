import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/ModalStyles';
import { gruas } from '../../data/craneData';
import getApiUrl from '../../utils/apiUrl';

const ModalEditCrane = ({ isVisible, onClose, grua, onUpdate }) => {
  const [nombre, setNombre] = useState(grua ? grua.nombre : '');
  const [modelo, setModelo] = useState(grua ? grua.modelo : '');
  const [capacidad, setCapacidad] = useState(grua ? grua.capacidad : '');
  const [ubicacion, setUbicacion] = useState(grua ? grua.ubicacion : '');
  const [tipo, setTipo] = useState(grua ? grua.tipo : '');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (grua) {
      setNombre(grua.nombre);
      setModelo(grua.modelo);
      setCapacidad(grua.capacidad);
      setUbicacion(grua.ubicacion);
      setTipo(grua.tipo);
    }
  }, [grua]);

  const handleUpdate = async () => {
    const updatedGrua = {
      nombre,
      modelo,
      capacidad,
      ubicacion,
      tipo,
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        alert('No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }
      if (!grua._id) {
        alert('Error: ID de la grúa no válido.');
        return;
      }
      const response = await fetch(getApiUrl(`crane/${grua._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedGrua),
      });

      const data = await response.json();
      if (response.ok) {
        onUpdate(updatedGrua);
        onClose();
      } else {
        console.error('Error al actualizar:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar la grúa.');
    }
  };

  const handleTipoSelect = (item) => {
    setTipo(item.label);
    setShowMenu(false);
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Grúa</Text>

          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Modelo:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese modelo"
            value={modelo}
            onChangeText={setModelo}
          />

          <Text style={styles.label}>Capacidad (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese capacidad"
            value={capacidad}
            onChangeText={setCapacidad}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Ubicación:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese ubicación"
            value={ubicacion}
            onChangeText={setUbicacion}
          />

          <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.optionButton}>
            <Text>{tipo || 'Seleccione tipo de grúa'}</Text>
          </TouchableOpacity>
          {showMenu && (
            <FlatList
              data={gruas}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleTipoSelect(item)}>
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

export default ModalEditCrane;
