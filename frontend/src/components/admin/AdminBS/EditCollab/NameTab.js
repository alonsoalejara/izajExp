import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUpdateData } from '../../../../hooks/useUpdateData'; 
import styles from '../../../../styles/BottomSheetStyles';

const NameTab = ({ id, nombre, setNombre, apellido, setApellido, rut, email, phone, position, specialty, onBack }) => {
  console.log("Props recibidos en NameTab:", JSON.stringify({ id, nombre, apellido, rut, email, phone, position, specialty }, null, 2));
  const [localNombre, setLocalNombre] = useState(nombre);
  const [localApellido, setLocalApellido] = useState(apellido);
  
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
            const payload = { 
              nombre: localNombre, 
              apellido: localApellido,
              rut, 
              email, 
              phone,
              position,
              specialty, 
              roles: ["USER"] // Asegúrate de usar el formato esperado (en mayúsculas)
            };
  
            console.log("Payload a actualizar:", JSON.stringify(payload, null, 2));
  
            const success = await updateData(payload);
  
            if (success) {
              setNombre(localNombre);
              setApellido(localApellido);
              onBack();
            }
          }
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
          <Text style={styles.inputLabelFloating}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={localNombre}
            onChangeText={setLocalNombre}
            placeholder="Nombre"
            placeholderTextColor="#888"
          />
        </View>
        <View style={[styles.inputWrapper, styles.inputBottom]}>
          <Text style={styles.inputLabelFloating}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={localApellido}
            onChangeText={setLocalApellido}
            placeholder="Apellido"
            placeholderTextColor="#888"
            top={0}
          />
        </View>
      </View>
      {/* Si deseas mostrar o editar el cargo, puedes agregar otro input o selector para position */}
      <TouchableOpacity style={styles.button} onPress={aplicarCambios} disabled={isUpdating}>
        <Text style={styles.buttonText}>{isUpdating ? 'Guardando...' : 'Aplicar cambios'}</Text>
      </TouchableOpacity>
    </>
  );
};

export default NameTab;
