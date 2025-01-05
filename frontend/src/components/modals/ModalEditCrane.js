import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/ModalStyles';
import getApiUrl from '../../utils/apiUrl';

const ModalEditCrane = ({ isVisible, onClose, grua, onUpdate }) => {
  const [nombre, setNombre] = useState(grua ? grua.nombre : '');
  const [pesoEquipo, setPesoEquipo] = useState(grua ? grua.pesoEquipo : '');
  const [pesoGancho, setPesoGancho] = useState(grua ? grua.pesoGancho : '');
  const [capacidadLevante, setCapacidadLevante] = useState(grua ? grua.capacidadLevante : '');
  const [largoPluma, setLargoPluma] = useState(grua ? grua.largoPluma : '');
  const [contrapeso, setContrapeso] = useState(grua ? grua.contrapeso : '');

  useEffect(() => {
    if (grua) {
      setNombre(grua.nombre);
      setPesoEquipo(grua.pesoEquipo);
      setPesoGancho(grua.pesoGancho);
      setCapacidadLevante(grua.capacidadLevante);
      setLargoPluma(grua.largoPluma);
      setContrapeso(grua.contrapeso);
    }
  }, [grua]);

  const handleUpdate = async () => {
    const updatedCrane = {
      nombre,
      pesoEquipo: Number(pesoEquipo),
      pesoGancho: Number(pesoGancho),
      capacidadLevante: Number(capacidadLevante),
      largoPluma: Number(largoPluma),
      contrapeso: Number(contrapeso),
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
  
      const response = await fetch(getApiUrl(`grua/${grua._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedCrane),
      });
  
      const data = await response.json();
      if (response.ok) {
        onUpdate(updatedCrane);
        onClose();
      } else {
        console.error('Error al actualizar:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar la grúa.');
    }
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

          <Text style={styles.label}>Peso del Equipo (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese peso del equipo"
            value={pesoEquipo}
            onChangeText={setPesoEquipo}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Peso del Gancho (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese peso del gancho"
            value={pesoGancho}
            onChangeText={setPesoGancho}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Capacidad de Levante (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese capacidad de levante"
            value={capacidadLevante}
            onChangeText={setCapacidadLevante}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Largo de la Pluma (m):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese largo de la pluma"
            value={largoPluma}
            onChangeText={setLargoPluma}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Contrapeso (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese contrapeso"
            value={contrapeso}
            onChangeText={setContrapeso}
            keyboardType="numeric"
          />

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
