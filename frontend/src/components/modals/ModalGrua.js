import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalGrua = ({ isVisible, onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(''); // Estado para manejar el mensaje de error

  const handleSelect = () => {
    if (!selected) {
      setError('Debe elegir una grúa para confirmar'); // Mostrar mensaje de error
    } else {
      onSelect(selected);
      setError(''); // Limpiar el mensaje de error
      onClose();
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccionar Grúa</Text>
          {error ? <Text style={{ color: '#ff0000', marginTop: -10 }}>{error}</Text> : null}
          {['Terex RT555', 'Grúa 2', 'Grúa 3'].map((grua) => (
            <TouchableOpacity
              key={grua}
              style={[
                styles.optionButton,
                selected === grua ? styles.selectedOption : null,
              ]}
              onPress={() => {
                setSelected(grua);
                setError('');
              }}
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
            <TouchableOpacity style={styles.saveButton} onPress={handleSelect}>
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGrua;
