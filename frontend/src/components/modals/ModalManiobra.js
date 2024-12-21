import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalManiobra = ({ isVisible, onClose, onSelect }) => {
  const [cantidad, setCantidad] = useState(null); // Estado para la cantidad de maniobras seleccionada
  const [tipoManiobra, setTipoManiobra] = useState(null); // Estado para el tipo de maniobra seleccionada

  const handleSeleccionarCantidad = (cantidadSeleccionada) => {
    setCantidad(cantidadSeleccionada); // Actualiza el estado con la cantidad seleccionada
  };

  const handleSeleccionarTipo = (tipo) => {
    setTipoManiobra(tipo); // Actualiza el estado con el tipo de maniobra seleccionada
  };

  const handleGuardar = () => {
    if (cantidad && tipoManiobra) {
      onSelect({ cantidad, tipo: tipoManiobra }); // Pasa la información seleccionada al componente padre
      onClose(); // Cierra el modal
    } else {
      alert("Por favor, seleccione la cantidad de maniobras y el tipo."); // Si no se han seleccionado ambos
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Configuración Maniobra</Text>

          {/* Texto para seleccionar la cantidad de maniobras */}
          <Text style={styles.label}>Seleccionar Cantidad de Maniobras</Text>

          {/* Contenedor para los botones de selección de cantidad de maniobras */}
          <View style={styles.maniobrasContainer}>
            {[1, 2, 4].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.optionButton,
                  cantidad === num && styles.selectedOption, // Resalta la opción seleccionada
                ]}
                onPress={() => handleSeleccionarCantidad(num)}
              >
                <Text
                  style={[
                    styles.optionText,
                    cantidad === num && styles.selectedOptionText, // Cambiar color del texto seleccionado
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Texto para seleccionar el tipo de maniobra */}
          <Text style={styles.label}>Seleccionar Tipo de Maniobra</Text>

          {/* Contenedor para los botones de selección de tipo de maniobra */}
          {['Eslinga', 'Estrobo'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                styles.optionButton,
                tipoManiobra === tipo && styles.selectedOption, // Resalta la opción seleccionada
              ]}
              onPress={() => handleSeleccionarTipo(tipo)}
            >
              <Text
                style={[
                  styles.optionText,
                  tipoManiobra === tipo && styles.selectedOptionText, // Cambiar color del texto seleccionado
                ]}
              >
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.modalButtons}>
            {/* Botón de cancelar */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
            {/* Botón de seleccionar */}
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
