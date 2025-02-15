import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../../styles/BottomSheetStyles';

const NameTab = ({ nombre, setNombre, apellido, setApellido, onBack }) => {
  const [localNombre, setLocalNombre] = useState(nombre);
  const [localApellido, setLocalApellido] = useState(apellido);

  const [isFocusedNombre, setIsFocusedNombre] = useState(false);
  const [isFocusedApellido, setIsFocusedApellido] = useState(false);

  const aplicarCambios = () => {
    Alert.alert(
      'Confirmar cambios',
      '¿Estás seguro de que deseas aplicar los cambios?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            setNombre(localNombre);
            setApellido(localApellido);
            console.log('Cambios aplicados');
            onBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleBack = () => {
    setLocalNombre(nombre);
    setLocalApellido(apellido);
    onBack();
  };

  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="keyboard-arrow-left" size={40} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { right: -5 }]}>Nombre y apellido</Text>
      </View>
      <View style={styles.roundedInputContainer}>
        <View style={[styles.inputWrapper, styles.inputTop]}>
          {(isFocusedNombre || localNombre !== '') && (
            <Text style={styles.inputLabelFloating}>Nombre</Text>
          )}
          <TextInput
            style={styles.input}
            value={localNombre}
            onChangeText={setLocalNombre}
            onFocus={() => setIsFocusedNombre(true)}
            onBlur={() => setIsFocusedNombre(false)}
            placeholder={!isFocusedNombre && localNombre === '' ? 'Nombre' : ''}
            placeholderTextColor="#888"
            top={0}
          />
        </View>
        <View style={[styles.inputWrapper, styles.inputBottom]}>
          {(isFocusedApellido || localApellido !== '') && (
            <Text style={styles.inputLabelFloating}>Apellido</Text>
          )}
          <TextInput
            style={styles.input}
            value={localApellido}
            onChangeText={setLocalApellido}
            onFocus={() => setIsFocusedApellido(true)}
            onBlur={() => setIsFocusedApellido(false)}
            placeholder={!isFocusedApellido && localApellido === '' ? 'Apellido' : ''}
            placeholderTextColor="#888"
            top={0}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={aplicarCambios}>
        <Text style={styles.buttonText}>Aplicar cambios</Text>
      </TouchableOpacity>
    </>
  );
};

export default NameTab;
