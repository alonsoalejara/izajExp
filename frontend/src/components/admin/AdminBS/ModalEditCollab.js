import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import styles from '../../../styles/BottomSheetStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ModalEditColaborador = ({ isVisible, onClose, colaborador }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setTelefono] = useState('');
  const [specialty, setEspecialidad] = useState('');

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (colaborador) {
      setNombre(colaborador.nombre || '');
      setApellido(colaborador.apellido || '');
      setRut(colaborador.rut || '');
      setEmail(colaborador.email || '');
      setTelefono(colaborador.phone || '');
      setEspecialidad(colaborador.specialty || '');
    }
  }, [colaborador]);

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.bottomSheet, { height: SCREEN_HEIGHT * 0.8, top: 180, transform: [{ translateY }] }]}>
        <View style={styles.dragLine}></View>

        {/* Header con flecha y título */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="keyboard-arrow-left" size={40} color="#000" left={-10}/>
          </TouchableOpacity>
          <Text style={[styles.titleText, { fontSize: 18, left: 55 }]}>Editar colaborador</Text>
        </View>

        {/* Foto de perfil y nombre */}
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../../../assets/blank-user-image.png')} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{`${nombre} ${apellido}`}</Text>
        </View>

        {/* Botones */}
        <View style={styles.roundedButtonContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.topButton]}>
            <View style={styles.buttonContent}>
              <Text style={styles.actionButtonText}>Nombre y apellido</Text>
              <Icon name="chevron-right" size={24} color="#333" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.buttonContent}>
              <Text style={styles.actionButtonText}>Datos personales</Text>
              <Icon name="chevron-right" size={24} color="#333" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.bottomButton]}>
            <View style={styles.buttonContent}>
              <Text style={styles.actionButtonText}>Especialidad</Text>
              <Icon name="chevron-right" size={24} color="#333" />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalEditColaborador;
