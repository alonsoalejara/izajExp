import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ModalStyles';

const ModalGrua = ({ isVisible, onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccionar Grúa</Text>
          {['Terex RT555', 'Grúa 2', 'Grúa 3'].map((grua) => (
            <TouchableOpacity
              key={grua}
              style={[
                styles.optionButton,
                selected === grua ? styles.selectedOption : null,
              ]}
              onPress={() => setSelected(grua)}
            >
              <Text
                style={[
                  styles.optionText,
                  selected === grua ? styles.selectedOptionText : null,
                ]}
              >
                {grua}
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

export default ModalGrua;
