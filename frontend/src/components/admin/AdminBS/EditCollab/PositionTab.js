import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUpdateData } from '../../../../hooks/useUpdateData';
import styles from '../../../../styles/BottomSheetStyles';

const PositionTab = ({ id, nombre, apellido, rut, email, phone, position, setPosition, specialty, onBack }) => {
  const [localPosition, setLocalPosition] = useState(position);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { updateData, isUpdating } = useUpdateData(`user/${id}`);

  const handleBack = () => {
    setLocalPosition(position);
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
              position: localPosition,
              specialty,
              roles: ["USER"]
            });

            if (success) {
              setPosition(localPosition);
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
        <Text style={[styles.titleText, { right: 54 }]}>Cargo</Text>
      </View>

      {/* Botón para abrir el modal con el Picker */}
      <TouchableOpacity style={styles.specialityOutput} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.specialitySubtitle}>Cargo:</Text>
        <Text style={styles.specialityText}>{localPosition || 'Seleccionar cargo'}</Text>
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
                selectedValue={localPosition}
                onValueChange={setLocalPosition}
                style={styles.picker}
              >
                <Picker.Item label="Jefe Área" value="Jefe Área" />
                <Picker.Item label="Capataz" value="Capataz" />
                <Picker.Item label="Supervisor" value="Supervisor" />
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

export default PositionTab;