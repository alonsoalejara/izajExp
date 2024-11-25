import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/SetupIzajeStyles';
import ModalForma from '../components/ModalForma';
import ModalGrua from '../components/ModalGrua';
import ModalManiobra from '../components/ModalManiobra';
import ModalGrillete from '../components/ModalGrillete';

const modals = {
  forma: ModalForma,
  grua: ModalGrua,
  maniobra: ModalManiobra,
  grillete: ModalGrillete,
};

const ConfigModal = ({ type, isVisible, onClose, onSelect, buttonText, selectedValue }) => {
  const ModalComponent = modals[type];

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