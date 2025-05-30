import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUpdateData } from '../../../../hooks/useUpdateData';
import styles from '../../../../styles/BottomSheetStyles';

const SpecialtyTab = ({ id, nombre, apellido, rut, email, phone, position, specialty, setEspecialidad, onBack }) => {
  const [localSpecialty, setLocalSpecialty] = useState(specialty);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateData, isUpdating } = useUpdateData(`user/${id}`);

  const handleBack = () => {
    setLocalSpecialty(specialty);
    onBack();
  };

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
          onPress: async () => {
            const success = await updateData({
              nombre, 
              apellido,
              rut, 
              email, 
              phone, 
              position,
              specialty: localSpecialty,
              roles: ["USER"]
            });

            if (success) {
              setEspecialidad(localSpecialty);
              console.log('Cambios aplicados');
              onBack();
            } else {
              console.log('Hubo un error al aplicar los cambios');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="keyboard-arrow-left" size={40} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { right: 25 }]}>Especialidad</Text>
      </View>

      {/* Botón para abrir el modal con el Picker */}
      <TouchableOpacity style={styles.specialityOutput} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.specialitySubtitle}>Especialidad:</Text>
        <Text style={styles.specialityText}>{localSpecialty || 'Seleccionar especialidad'}</Text>
      </TouchableOpacity>

      {/* Modal con el Picker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.pickerBackground}>
              <Picker
                selectedValue={localSpecialty}
                onValueChange={setLocalSpecialty}
                style={styles.picker}
              >
                <Picker.Item label="Estructura" value="Estructura" />
                <Picker.Item label="Piping" value="Piping" />
                <Picker.Item label="Obras Civiles" value="Obras Civiles" />
                <Picker.Item label="Mecánica" value="Mecánica" />
                <Picker.Item label="Eléctrica" value="Eléctrica" />
              </Picker>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Botón para aplicar los cambios */}
      <TouchableOpacity
        style={[styles.button, { top: 20 }]}
        onPress={aplicarCambios}
        disabled={isUpdating}
      >
        <Text style={styles.buttonText}>{isUpdating ? 'Guardando...' : 'Aplicar cambios'}</Text>
      </TouchableOpacity>
    </>
  );
};

export default SpecialtyTab;