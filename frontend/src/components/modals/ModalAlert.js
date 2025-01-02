import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalAlert = ({ isVisible, onClose, message }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {paddingHorizontal: 20}]}>
          <Text style={[styles.modalTitle, {textAlign: 'center', fontSize: 30 }]}>Aviso</Text>
          <Text style={styles.modalDescription}>{message}</Text>
          <View style={[styles.modalButtons, {justifyContent: 'center'}]}>
            <TouchableOpacity style={styles.saveButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
