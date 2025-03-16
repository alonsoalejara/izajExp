import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUpdateData } from '../../../../hooks/useUpdateData';
import styles from '../../../../styles/BottomSheetStyles';

const PersonalTab = ({ id, nombre, apellido, rut, setRut, email, setEmail, phone, setTelefono, position, specialty, onBack }) => {
  const [localRut, setLocalRut] = useState(rut);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(phone);
  const { updateData, isUpdating } = useUpdateData(`user/${id}`);

  const aplicarCambios = () => {
    Alert.alert(
      'Confirmar cambios',
      '¿Estás seguro de que deseas aplicar los cambios?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            const success = await updateData({ 
              nombre, 
              apellido, 
              rut: localRut, 
              email: localEmail, 
              phone: localPhone,
              position, 
              specialty,
              roles: ["USER"]
            });
  
            if (success) {
              setRut(localRut);
              setEmail(localEmail);
              setTelefono(localPhone);
              onBack();
            }
          }
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
          <Text style={styles.inputLabelFloating}>RUT</Text>
          <TextInput
            style={styles.input}
            value={localRut}
            onChangeText={setLocalRut}
            placeholder="RUT"
            placeholderTextColor="#888"
            top={2}
          />
        </View>

        <View style={[styles.inputWrapper, styles.inputMiddle]}>
          <Text style={styles.inputLabelFloating}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            value={localEmail}
            onChangeText={setLocalEmail}
            placeholder="Correo Electrónico"
            placeholderTextColor="#888"
            top={2}
          />
        </View>

        <View style={[styles.inputWrapper, styles.inputBottom]}>
          <Text style={styles.inputLabelFloating}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={localPhone}
            onChangeText={setLocalPhone}
            placeholder="Teléfono"
            placeholderTextColor="#888"
            top={2}
          />
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { top: 190 }]} onPress={aplicarCambios} disabled={isUpdating}>
        <Text style={styles.buttonText}>{isUpdating ? 'Guardando...' : 'Aplicar cambios'}</Text>
      </TouchableOpacity>
    </>
  );
};

export default PersonalTab;
