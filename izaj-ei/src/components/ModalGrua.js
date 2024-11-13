import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const ModalGrua = ({ isVisible, onClose, onSelect }) => (
  <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Seleccionar Grúa</Text>
        {['Grúa 1', 'Grúa 2', 'Grúa 3'].map((grua) => (
          <TouchableOpacity key={grua} style={styles.option} onPress={() => onSelect(grua)}>
            <Text style={styles.optionText}>{grua}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ModalGrua;