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
  TextInput,
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
  const [activeTab, setActiveTab] = useState('main');

  const [isNavigating, setIsNavigating] = useState(false);
  const [isFocusedNombre, setIsFocusedNombre] = useState(false);
  const [isFocusedApellido, setIsFocusedApellido] = useState(false);

  const bottomSheetHeight = SCREEN_HEIGHT * 0.85;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 150) {
        positionY.setValue(SCREEN_HEIGHT - bottomSheetHeight + gestureState.dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 150) {
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
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(positionY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const handleTabChange = (newTab) => {
    if (isNavigating) return;
    setActiveTab(newTab);
    setTimeout(() => setIsNavigating(false), 300);
  };

  const handleBackPress = () => {
    if (activeTab !== 'main') {
      setActiveTab('main');
    } else {
      closeBottomSheet();
    }
  };

  const handleAplicarCambios = () => {
    // Lógica para aplicar los cambios
    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
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

        {/* Contenido dinámico según la pestaña activa */}
        {activeTab === 'main' ? (
          <>
            {/* Encabezado con ícono y título */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeBottomSheet}>
                <Icon name="keyboard-arrow-left" size={30} color="#000" />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { left: -10 }]}>
                Editar Colaborador
              </Text>
            </View>

            {/* Contenedor de imagen de perfil y nombre */}
            <View style={styles.profileContainer}>
              <Image
                source={require('../../../assets/blank-user-image.png')}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>
                {nombre || apellido ? `${nombre} ${apellido}` : 'Nombre del Usuario'}
              </Text>
            </View>

            {/* Contenedor de botones */}
            <View style={styles.roundedButtonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.topButton]}
                onPress={() => handleTabChange('name')}>
                <View style={styles.buttonContent}>
                  <Text style={styles.actionButtonText}>Nombre del usuario</Text>
                  <Icon name="keyboard-arrow-right" size={28} color="#666" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleTabChange('personal')}>
                <View style={styles.buttonContent}>
                  <Text style={styles.actionButtonText}>Datos personales</Text>
                  <Icon name="keyboard-arrow-right" size={28} color="#666" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.bottomButton]}
                onPress={() => handleTabChange('specialty')}>
                <View style={styles.buttonContent}>
                  <Text style={styles.actionButtonText}>Especialidad</Text>
                  <Icon name="keyboard-arrow-right" size={28} color="#666" />
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : activeTab === 'name' ? (
          <>
            {/* Pestaña de Nombre y Apellido */}
            <View>
              {/* Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleBackPress}>
                  <Icon name="keyboard-arrow-left" size={30} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Contenedor para el título */}
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Nombre</Text>
              </View>
            </View>

            {/* Contenedor de inputs */}
            <View style={styles.roundedInputContainer}>
              {/* Input de Nombre */}
              <View style={[styles.inputWrapper, styles.inputTop]}>
                <Text
                  style={[
                    styles.inputLabel,
                    (nombre || isFocusedNombre)
                      ? styles.inputLabelFloating
                      : styles.inputLabelPlaceholder,
                  ]}
                >
                  Nombre
                </Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    onFocus={() => setIsFocusedNombre(true)}
                    onBlur={() => setIsFocusedNombre(false)}
                    placeholder=""
                    placeholderTextColor="transparent"
                  />
                  {isFocusedNombre && nombre.length > 0 && (
                    <TouchableOpacity onPress={() => setNombre("")} style={styles.clearIcon}>
                      <Icon name="close" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Input de Apellido */}
              <View style={[styles.inputWrapper, styles.inputBottom]}>
                <Text
                  style={[
                    styles.inputLabel,
                    (apellido || isFocusedApellido)
                      ? styles.inputLabelFloating
                      : styles.inputLabelPlaceholder,
                  ]}
                >
                  Apellido
                </Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    value={apellido}
                    onChangeText={setApellido}
                    onFocus={() => setIsFocusedApellido(true)}
                    onBlur={() => setIsFocusedApellido(false)}
                    placeholder=""
                    placeholderTextColor="transparent"
                  />
                  {isFocusedApellido && apellido.length > 0 && (
                    <TouchableOpacity onPress={() => setApellido("")} style={styles.clearIcon}>
                      <Icon name="close" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {/* Botón Aplicar Cambios */}
            <TouchableOpacity style={styles.button} onPress={handleAplicarCambios}>
              <Text style={styles.buttonText}>Aplicar cambios</Text>
            </TouchableOpacity>
          </>
        ) : activeTab === 'personal' ? (
          <>
            {/* Pestaña de Datos Personales */}
            <View>
              {/* Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleBackPress}>
                  <Icon name="keyboard-arrow-left" size={30} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Contenedor para el título */}
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Datos personales</Text>
              </View>
            </View>

            {/* Contenedor de inputs */}
            <View style={styles.roundedInputContainer}>
              {/* Input de RUT */}
              <View style={[styles.inputWrapper, styles.inputTop]}>
                <Text style={styles.inputLabel}>RUT</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    value={rut}
                    onChangeText={setRut}
                    placeholder=""
                    placeholderTextColor="transparent"
                  />
                  {rut.length > 0 && (
                    <TouchableOpacity onPress={() => setRut("")} style={styles.clearIcon}>
                      <Icon name="close" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Input de Teléfono */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Teléfono</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setTelefono}
                    placeholder=""
                    placeholderTextColor="transparent"
                  />
                  {phone.length > 0 && (
                    <TouchableOpacity onPress={() => setTelefono("")} style={styles.clearIcon}>
                      <Icon name="close" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Input de Email */}
              <View style={[styles.inputWrapper, styles.inputBottom]}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder=""
                    placeholderTextColor="transparent"
                  />
                  {email.length > 0 && (
                    <TouchableOpacity onPress={() => setEmail("")} style={styles.clearIcon}>
                      <Icon name="close" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {/* Botón Aplicar Cambios */}
            <TouchableOpacity style={styles.button} onPress={handleAplicarCambios}>
              <Text style={styles.buttonText}>Aplicar cambios</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </Animated.View>
    </Modal>
  );
};

export default ModalEditColaborador;
