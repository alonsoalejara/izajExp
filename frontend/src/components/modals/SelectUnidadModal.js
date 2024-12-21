import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useIzaje } from '../../hooks/useIzajeForm';
import styles from '../../styles/SetupIzajeStyles';

const SelectUnidadModal = ({ visible, onClose }) => {
  const { unidades, handleUnidadSelect } = useIzaje();

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Seleccionar Unidad</Text>
          {unidades.map((unidad) => (
            <TouchableOpacity
              key={unidad}
              onPress={() => {
                handleUnidadSelect(unidad); // Llama a handleUnidadSelect con la unidad seleccionada
                onClose(); // Cierra el modal
              }}
              style={{ paddingVertical: 10 }}
            >
              <Text style={{ fontSize: 16 }}>{unidad}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectUnidadModal;
