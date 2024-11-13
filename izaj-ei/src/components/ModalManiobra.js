import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const ModalManiobra = ({ isVisible, onClose, onSelectEslinga, onSelectCantidad, onSelect }) => (
  <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Seleccionar Maniobra</Text>
        {['Eslinga', 'Estrobo'].map((item) => (
          <TouchableOpacity key={item} style={styles.option} onPress={() => onSelectEslinga(item)}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
        <Text>¿Cantidad?</Text>
        {[1, 2, 4].map((cantidad) => (
          <TouchableOpacity key={cantidad} style={styles.option} onPress={() => onSelectCantidad(cantidad)}>
            <Text style={styles.optionText}>{cantidad}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onSelect} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Maniobra</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ModalManiobra;
