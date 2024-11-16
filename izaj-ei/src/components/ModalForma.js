import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const ModalForma = ({ isVisible, onClose, onSelect }) => (
  <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Seleccionar Forma</Text>
        {['Cuadrado', 'Rectángulo', 'Círculo'].map((forma) => (
          <TouchableOpacity key={forma} style={styles.option} onPress={() => onSelect(forma)}>
            <Text style={styles.optionText}>{forma}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ModalForma;