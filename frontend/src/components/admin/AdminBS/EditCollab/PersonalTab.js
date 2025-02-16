import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../../styles/BottomSheetStyles';

const PersonalTab = ({ id, nombre, apellido, rut, setRut, email, setEmail, phone, setTelefono, specialty, onBack }) => {
  const [localRut, setLocalRut] = useState(rut);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(phone);

  const [isFocusedRut, setIsFocusedRut] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);

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
            setRut(localRut);
            setEmail(localEmail);
            setTelefono(localPhone);
            console.log('Cambios aplicados');
            onBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleBack = () => {
    setLocalRut(rut);
    setLocalEmail(email);
    setLocalPhone(phone);
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
        <Text style={styles.titleText}>Datos personales</Text>
      </View>
      <View style={styles.roundedInputContainer}>
        <View style={[styles.inputWrapper, styles.inputTop]}>
          {(isFocusedRut || localRut !== '') && (
            <Text style={styles.inputLabelFloating}>RUT</Text>
          )}
          <TextInput
            style={styles.input}
            value={localRut}
            onChangeText={setLocalRut}
            onFocus={() => setIsFocusedRut(true)}
            onBlur={() => setIsFocusedRut(false)}
            placeholder={!isFocusedRut && localRut === '' ? 'RUT' : ''}
            placeholderTextColor="#888"
            top={2}
          />
        </View>

        <View style={[styles.inputWrapper, styles.inputMiddle]}>
          {(isFocusedEmail || localEmail !== '') && (
            <Text style={styles.inputLabelFloating}>Correo Electrónico</Text>
          )}
          <TextInput
            style={styles.input}
            value={localEmail}
            onChangeText={setLocalEmail}
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}
            placeholder={!isFocusedEmail && localEmail === '' ? 'Correo Electrónico' : ''}
            placeholderTextColor="#888"
            top={2}
          />
        </View>

        <View style={[styles.inputWrapper, styles.inputBottom]}>
          {(isFocusedPhone || localPhone !== '') && (
            <Text style={styles.inputLabelFloating}>Teléfono</Text>
          )}
          <TextInput
            style={styles.input}
            value={localPhone}
            onChangeText={setLocalPhone}
            onFocus={() => setIsFocusedPhone(true)}
            onBlur={() => setIsFocusedPhone(false)}
            placeholder={!isFocusedPhone && localPhone === '' ? 'Teléfono' : ''}
            placeholderTextColor="#888"
            top={2}
          />
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { bottom: 60 }]} onPress={aplicarCambios}>
        <Text style={styles.buttonText}>Aplicar cambios</Text>
      </TouchableOpacity>
    </>
  );
};

export default PersonalTab;
