import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const InputUnidad = ({ selectedUnidad, handleUnidadSelect, handleChangeUnidad }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Unidad</Text>
      <TextInput
        style={styles.input}
        value={selectedUnidad}
        onChangeText={handleUnidadSelect}
      />
      <TouchableOpacity style={styles.optionButton} onPress={() => handleChangeUnidad(selectedUnidad)}>
        <Text style={styles.optionButtonText}>Convertir Unidad</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputUnidad;