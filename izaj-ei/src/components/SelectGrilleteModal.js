import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useIzaje } from '../hooks/useIzajeForm';
import styles from '../styles/SetupIzajeStyles';

const SelectGrilleteModal = ({ visible, onClose }) => {
  const { grilas, handleGrilleteSelect } = useIzaje();

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecciona el Grillete</Text>

          {grilas.map((grillete) => (
            <TouchableOpacity key={grillete} style={styles.option} onPress={() => handleGrilleteSelect(grillete)}>
              <Text style={styles.optionText}>{grillete}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectGrilleteModal;
