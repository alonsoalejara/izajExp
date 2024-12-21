import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalForma = ({ isVisible, onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);

    return (
      <Modal transparent={true} visible={isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Forma</Text>
            {['Cuadrado', 'Rectángulo', 'Círculo'].map((forma) => (
              <TouchableOpacity
                key={forma}
                style={[
                  styles.optionButton,
                  selected === forma ? styles.selectedOption : null,
                ]}
                onPress={() => setSelected(forma)}
              >
                <Text
                style={[
                  styles.optionText,
                  selected === forma ? styles.selectedOptionText : null, // Cambiar color del texto
                ]}
                >
                {forma}
              </Text>
              </TouchableOpacity>
            ))}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  if (selected) onSelect(selected);
                  onClose();
                }}
              >
                <Text style={styles.buttonText}>Seleccionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
};

export default ModalForma;