import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const SelectFiguraModal = ({ visible, onClose }) => {
  const handleClose = () => {
    onClose(null); // Cierra el modal y no selecciona ninguna figura.
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose} // Asegura que el modal se cierre si presionas fuera de él.
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Seleccionar Figura</Text>
              <TouchableOpacity onPress={() => onClose('Cuadrado')}>
                <Text style={styles.buttonText}>Cuadrado</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClose('Rectángulo')}>
                <Text style={styles.buttonText}>Rectángulo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClose('Círculo')}>
                <Text style={styles.buttonText}>Círculo</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SelectFiguraModal;