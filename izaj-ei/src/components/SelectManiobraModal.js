import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const SelectManiobraModal = ({ visible, onClose, tipo }) => {
  const handleClose = () => {
    onClose(null); // Cierra el modal sin seleccionar ninguna maniobra
  };

  // Determina las opciones según el tipo
  const opciones = tipo === "Numero" ? ['1', '2', '4'] : ['Eslinga', 'Estrobo'];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{tipo === "Numero" ? 'Número de Maniobras' : 'Tipo de Maniobra'}</Text>
              {opciones.map((opcion, index) => (
                <TouchableOpacity key={index} onPress={() => onClose(opcion)}>
                  <Text style={styles.buttonText}>{opcion}</Text>
                </TouchableOpacity>
              ))}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default SelectManiobraModal;
