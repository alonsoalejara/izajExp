import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, Alert } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Components from '../Components.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSWLL = ({ isVisible, onClose, onSelect, tipoAparejo }) => {
  const [opcionesWLL, setOpcionesWLL] = useState([]);
  const [selectedWLL, setSelectedWLL] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.8;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    // Define opciones según el tipo de aparejo seleccionado
    switch (tipoAparejo) {
      case 'Tubulares de poliester':
        setOpcionesWLL([
          'Violeta',
          'Verde',
          'Amarillo',
          'Gris',
          'Rojo',
          'Café',
          'Azul',
          'Naranja'
        ]);
        break;

      case 'Planas ojo-ojo de poliester':
        setOpcionesWLL([
          'Violeta',
          'Verde',
          'Amarillo',
          'Gris',
          'Rojo',
          'Café',
          'Azul Oscuro',
          'Naranjo'
        ]);
        break;

      case 'Tubulares trenzadas de poliester':
      case 'Tubulares para carga pesada':
        setOpcionesWLL(['Naranja']);
        break;

      default:
        setOpcionesWLL([]);
    }

    // Limpiar selección previa y controlar animación
    setSelectedWLL(null);
    isVisible ? openBottomSheet() : closeBottomSheet();
  }, [isVisible, tipoAparejo]);

  const openBottomSheet = () => {
    Animated.timing(positionY, {
      toValue: SCREEN_HEIGHT - bottomSheetHeight,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(positionY, {
      toValue: SCREEN_HEIGHT,
      duration: 150,
      useNativeDriver: false
    }).start(() => onClose());
  };

  const handleSelect = color => {
    setSelectedWLL(color);
  };

  const handleConfirm = () => {
    if (selectedWLL) {
      onSelect(selectedWLL);
      closeBottomSheet();
    } else {
      Alert.alert('Seleccione una opción', 'Debes elegir un color WLL.');
    }
  };

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <TouchableOpacity style={styles.overlay} onPress={closeBottomSheet} />
      <Animated.View
        style={[
          styles.bottomSheet,
          { height: bottomSheetHeight, transform: [{ translateY: positionY }] }
        ]}>
        <View style={styles.dragLine} />
        <View style={styles.modalHeader}>
          <IconFA
            name="angle-left"
            size={35}
            color="#333"
            style={styles.backIcon}
            onPress={closeBottomSheet}
          />
          <Text style={[styles.modalTitle, { marginLeft: 40 }]}>
            Seleccione WLL
          </Text>
        </View>
        <View style={styles.separatorLine} />
        <ScrollView style={styles.optionsContainer}>
          {opcionesWLL.map(color => (
            <TouchableOpacity
              key={color}
              style={styles.optionButton}
              onPress={() => handleSelect(color)}>
              <View style={styles.optionContent}>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>{color}</Text>
                </View>
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioButton,
                      selectedWLL === color && styles.selectedRadioButton
                    ]}>
                    {selectedWLL === color && <View style={styles.selectedCircle} />}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ flexGrow: 1 }} />
        <Components.Button
          label="Confirmar"
          onPress={handleConfirm}
          style={{ top: -20, left: 10 }}
        />
      </Animated.View>
    </Modal>
  );
};

export default BSWLL;