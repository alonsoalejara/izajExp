import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/ModalStyles';

const ModalGrillete = ({ isVisible, onClose, onSelectCantidad, onSelectTipo }) => {
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState('');

  const handleGuardar = () => {
    if (cantidad && tipo) {
      // Llamamos a las funciones pasadas como props para actualizar los estados
      onSelectCantidad(cantidad);
      onSelectTipo(tipo);
      onClose(); // Cerramos el modal
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Configuración Grillete</Text>
          
          {/* Usamos la clase label para los textos de instrucciones */}
          <Text style={styles.label}>Ingrese la cantidad de grilletes</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Cantidad de Grilletes"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
          
          <Text style={styles.label}>Ingrese el tipo de grillete (pulg.)</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Tipo (en pulgadas)"
            placeholderTextColor={styles.placeholderText.color}
            value={tipo}
            onChangeText={setTipo}
          />
          
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGrillete;
