import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../../styles/BottomSheetStyles';

const NameTab = ({ nombre, setNombre, apellido, setApellido, onBack }) => {
  const [isFocusedNombre, setIsFocusedNombre] = useState(false);
  const [isFocusedApellido, setIsFocusedApellido] = useState(false);

  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="keyboard-arrow-left" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Nombre</Text>
      </View>
      <View style={styles.roundedInputContainer}>
        <View style={[styles.inputWrapper, styles.inputTop]}>
          <Text style={[styles.inputLabel, isFocusedNombre ? styles.inputLabelFloating : styles.inputLabelPlaceholder]}>
            Nombre
          </Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            onFocus={() => setIsFocusedNombre(true)}
            onBlur={() => setIsFocusedNombre(false)}
          />
        </View>
        <View style={[styles.inputWrapper, styles.inputBottom]}>
          <Text style={[styles.inputLabel, isFocusedApellido ? styles.inputLabelFloating : styles.inputLabelPlaceholder]}>
            Apellido
          </Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            onFocus={() => setIsFocusedApellido(true)}
            onBlur={() => setIsFocusedApellido(false)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Aplicar cambios</Text>
      </TouchableOpacity>
    </>
  );
};

export default NameTab;
