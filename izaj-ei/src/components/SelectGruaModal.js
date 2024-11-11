import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const SelectGruaModal = ({ visible, onClose }) => {
  const handleClose = () => {
    onClose(null); // Cierra el modal y no selecciona ninguna grúa.
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
              <Text style={styles.title}>Seleccionar Grúa</Text>
              <TouchableOpacity onPress={() => onClose('Grúa A')}>
                <Text style={styles.buttonText}>Grúa A</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClose('Grúa B')}>
                <Text style={styles.buttonText}>Grúa B</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClose('Grúa C')}>
                <Text style={styles.buttonText}>Grúa C</Text>
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

export default SelectGruaModal;
