import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalCrearGrua = ({ isVisible, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [pesoEquipo, setPesoEquipo] = useState('');
  const [pesoGancho, setPesoGancho] = useState('');
  const [capacidadLevante, setCapacidadLevante] = useState('');
  const [largoPluma, setLargoPluma] = useState('');
  const [contrapeso, setContrapeso] = useState('');

  const handleSave = () => {
    if (
      nombre &&
      pesoEquipo &&
      pesoGancho &&
      capacidadLevante &&
      largoPluma &&
      contrapeso
    ) {
      const nuevaGrua = {
        nombre,
        pesoEquipo: parseFloat(pesoEquipo),
        pesoGancho: parseFloat(pesoGancho),
        capacidadLevante: parseFloat(capacidadLevante),
        largoPluma: parseFloat(largoPluma),
        contrapeso: parseFloat(contrapeso),
      };
      onSave(nuevaGrua); // Llama a la función onSave para agregar la grúa
      onClose(); // Cierra el modal
    } else {
      alert('Por favor, complete todos los campos con valores válidos.');
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Nueva Grúa</Text>

          <Text style={styles.label}>Nombre de la grúa:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese el nombre de la grúa"
            placeholderTextColor={styles.placeholderText.color}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Peso del equipo (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese el peso del equipo"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="numeric"
            value={pesoEquipo}
            onChangeText={setPesoEquipo}
          />

          <Text style={styles.label}>Peso del gancho (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese el peso del gancho"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="numeric"
            value={pesoGancho}
            onChangeText={setPesoGancho}
          />

          <Text style={styles.label}>Capacidad de levante (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese la capacidad de levante"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="numeric"
            value={capacidadLevante}
            onChangeText={setCapacidadLevante}
          />

          <Text style={styles.label}>Largo de la pluma (metros):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese el largo de la pluma"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="numeric"
            value={largoPluma}
            onChangeText={setLargoPluma}
          />

          <Text style={styles.label}>Contrapeso (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese el contrapeso"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="numeric"
            value={contrapeso}
            onChangeText={setContrapeso}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar nueva grúa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCrearGrua;
