import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ModalEditColaborador = ({ isVisible, onClose, colaborador }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setTelefono] = useState('');
  const [specialty, setEspecialidad] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.6;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        positionY.setValue(SCREEN_HEIGHT - bottomSheetHeight + gestureState.dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 100) {
        closeBottomSheet();
      } else {
        openBottomSheet();
      }
    },
  });

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

  useEffect(() => {
    if (isVisible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]);

  const openBottomSheet = () => {
    Animated.timing(positionY, {
      toValue: SCREEN_HEIGHT - bottomSheetHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(positionY, {
      toValue: SCREEN_HEIGHT,
      duration: 150,
      useNativeDriver: false,
    }).start(() => onClose());
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: bottomSheetHeight,
            transform: [{ translateY: positionY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Línea de arrastre */}
        <View style={styles.dragLine}></View>

        {/* Encabezado con ícono y título */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closeBottomSheet}>
            <Icon name="keyboard-arrow-left" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.modalTitle,{ left: -10 }]}>Editar Colaborador</Text>
        </View>

        {/* Contenedor de imagen de perfil y nombre */}
        <View style={styles.profileContainer}>
          <Image source={require('../../../assets/blank-user-image.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>Juan Perez</Text>
        </View>

        {/* Contenedor de botones */}
        <View style={styles.roundedButtonContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.topButton]}>
            <View style={styles.buttonContent}>
              <Text style={styles.actionButtonText}>Nombre y apellido</Text>
              <Icon name="keyboard-arrow-right" size={28} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.buttonContent}>
              <Text style={styles.actionButtonText}>Datos personales</Text>
              <Icon name="keyboard-arrow-right" size={28} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.bottomButton]}>
            <View style={styles.buttonContent}>
              <Text style={styles.actionButtonText}>Especialidad</Text>
              <Icon name="keyboard-arrow-right" size={28} color="#666" />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalEditColaborador;