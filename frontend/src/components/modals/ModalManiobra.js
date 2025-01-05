import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalManiobra = ({ isVisible, onClose, onSelect }) => {
  const [cantidad, setCantidad] = useState(null);
  const [tipoManiobra, setTipoManiobra] = useState(null);
  const [errorCantidad, setErrorCantidad] = useState('');
  const [errorTipo, setErrorTipo] = useState('');

  const handleGuardar = () => {
    let hasError = false;

    if (!cantidad) {
      setErrorCantidad('Debe seleccionar la cantidad.');
      hasError = true;
    } else {
      setErrorCantidad('');
    }

    if (!tipoManiobra) {
      setErrorTipo('Debe seleccionar el tipo.');
      hasError = true;
    } else {
      setErrorTipo('');
    }

    if (!hasError) {
      onSelect({ cantidad, tipo: tipoManiobra });
      onClose();
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Configuración Maniobra</Text>

          {/* Texto para seleccionar la cantidad de maniobras */}
          <Text style={styles.label}>Seleccionar Cantidad de Maniobras</Text>
          {errorCantidad ? <Text style={{ color: '#ff0000', marginBottom: 10 }}>{errorCantidad}</Text> : null}
          <View style={styles.maniobrasContainer}>
            {[1, 2, 4].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.optionButton,
                  cantidad === num && styles.selectedOption,
                ]}
                onPress={() => {
                  setCantidad(num);
                  setErrorCantidad(''); 
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    cantidad === num && styles.selectedOptionText,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Texto para seleccionar el tipo de maniobra */}
          <Text style={styles.label}>Seleccionar Tipo de Maniobra</Text>
          {errorTipo ? <Text style={{ color: '#ff0000', marginBottom: 10 }}>{errorTipo}</Text> : null}
          {['Eslinga', 'Estrobo'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                styles.optionButton,
                tipoManiobra === tipo && styles.selectedOption,
              ]}
              onPress={() => {
                setTipoManiobra(tipo);
                setErrorTipo('');
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  tipoManiobra === tipo && styles.selectedOptionText,
                ]}
              >
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalManiobra;