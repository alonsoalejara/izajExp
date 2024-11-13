import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const ModalFigura = ({ isVisible, onClose, onSelect }) => (
  <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Seleccionar Figura</Text>
        {['Cuadrado', 'Rectángulo', 'Círculo'].map((figura) => (
          <TouchableOpacity key={figura} style={styles.option} onPress={() => onSelect(figura)}>
            <Text style={styles.optionText}>{figura}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ModalFigura;