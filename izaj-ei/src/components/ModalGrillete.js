import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/ModalStyles';

const ModalGrillete = ({ isVisible, onClose, onSelectCantidad, onSelectTipo }) => {
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState('');

  const handleGuardar = () => {
    onSelectCantidad(cantidad);
    onSelectTipo(tipo);
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Configurar Grillete</Text>

          <Text style={styles.label}>Cantidad de grilletes:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
            value={cantidad}
            onChangeText={(text) => setCantidad(text.replace(/[^0-9]/g, ''))} // Solo permite números
          />

          <Text style={styles.label}>Tipo de grillete (en pulgadas):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: 1 pulgada, 2 pulgadas"
            value={tipo}
            onChangeText={setTipo}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGuardar} style={styles.saveButton}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGrillete;
