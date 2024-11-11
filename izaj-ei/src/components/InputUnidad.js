import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useIzaje } from '../hooks/useIzajeForm';
import styles from '../styles/SetupIzajeStyles';

const InputUnidad = () => {
  const { unidades, selectedUnidad, handleUnidadSelect, convertToUnidad } = useIzaje();

  const handleChangeUnidad = (value) => {
    const convertedValue = convertToUnidad(value);
    console.log(`Valor convertido: ${convertedValue}`);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Unidad</Text>
      <TextInput
        style={styles.input}
        value={selectedUnidad}
        onChangeText={handleUnidadSelect}
      />
      <TouchableOpacity style={styles.optionButton} onPress={handleChangeUnidad}>
        <Text style={styles.optionButtonText}>Convertir Unidad</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputUnidad;
