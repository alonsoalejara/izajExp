import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalAlert = ({ isVisible, onClose, message, children, showCloseButton = true }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { paddingHorizontal: 20 }]}>
          <Text style={[styles.modalTitle, { textAlign: 'center', fontSize: 30 }]}>Aviso</Text>
          <Text style={styles.modalDescription}>{message}</Text>

          {/* Renderiza los botones pasados como children o muestra el botón "Cerrar" si está habilitado */}
          <View style={[styles.modalButtons, { justifyContent: 'space-between' }]}>
            {children}
            {showCloseButton && (
              <TouchableOpacity style={styles.saveButton} onPress={onClose}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
