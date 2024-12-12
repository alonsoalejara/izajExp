import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/SetupIzajeStyles';
import Modals from '../components/Modal.index';  // Importa modals desde el index

const ConfigModal = ({ type, isVisible, onClose, onSelect, buttonText, selectedValue }) => {
  const ModalComponent = Modals[type];

  if (!ModalComponent) {
    console.warn(`Modal of type "${type}" not found.`);
    return null;
  }

  return (
    <View>
      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      {/* Texto de selección */}
      <Text style={styles.selectedText}>Seleccionado: {selectedValue || 'Ninguno'}</Text>

      {/* Modal */}
      <ModalComponent isVisible={isVisible} onClose={onClose} onSelect={onSelect} />
    </View>
  );
};

export default ConfigModal;