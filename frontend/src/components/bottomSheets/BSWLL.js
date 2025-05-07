import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, Alert } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Components from '../Components.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mapa de colores base a sus valores hex
const colorMap = {
  'Violeta': '#8e44ad',
  'Verde': '#27ae60',
  'Amarillo': '#f1c40f',
  'Gris': '#7f8c8d',
  'Rojo': '#e74c3c',
  'Café': '#8B4513',
  'Azul': '#3498db',
  'Azul Oscuro': '#2c3e50',
  'Naranja': '#e67e22'
};

// Detecta el color base dentro del texto completo
const getColorFromText = (text) => {
  const found = Object.keys(colorMap).find(name =>
    text.toLowerCase().includes(name.toLowerCase())
  );
  return found ? colorMap[found] : '#ccc';
};

const BSWLL = ({ isVisible, onClose, onSelect, tipoAparejo }) => {
  const [opcionesWLL, setOpcionesWLL] = useState([]);
  const [selectedWLL, setSelectedWLL] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.9;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
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
          'Naranja (0°: 11.3 ton)',
          'Naranja (0°: 14.1 ton)',
          'Naranja (0°: 18.1 ton)',
          'Naranja (0°: 24.0 ton)',
          'Naranja (0°: 29.9 ton)',
          'Naranja (0°: 40.8 ton)'
        ]);
        break;

      case 'Planas ojo-ojo de poliester':
        setOpcionesWLL([
          '1" - Violeta',
          '2" - Verde',
          '3" - Amarillo',
          '4" - Gris',
          '5" - Rojo',
          '6" - Café',
          '8" - Azul Oscuro',
          '10" - Naranja',
          '12" - Naranja'
        ]);
        break;

      case 'Tubulares trenzadas de poliester':
        setOpcionesWLL([
            'Naranja (0°: 38.6 ton)',
            'Naranja (0°: 47.8 ton)',
            'Naranja (0°: 62.1 ton)',
            'Naranja (0°: 81.7 ton)',
            'Naranja (0°: 101.8 ton)',
            'Naranja (0°: 138.8 ton)'
        ]);
        break;
      case 'Tubulares para carga pesada':
        setOpcionesWLL([
            'Naranja (0°: 50 ton)',
            'Naranja (0°: 60 ton)',
            'Naranja (0°: 70 ton)',
            'Naranja (0°: 80 ton)',
            'Naranja (0°: 90 ton)',
            'Naranja (0°: 100 ton)',
            'Naranja (0°: 110 ton)',
            'Naranja (0°: 120 ton)',
            'Naranja (0°: 130 ton)',
            'Naranja (0°: 140 ton)',
            'Naranja (0°: 150 ton)'
        ]);
        break;

      default:
        setOpcionesWLL([]);
    }

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

  const handleSelect = (color) => {
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
        ]}
      >
        <View style={styles.dragLine} />
        <View style={styles.modalHeader}>
          <IconFA
            name="angle-left"
            size={35}
            color="#333"
            style={styles.backIcon}
            onPress={closeBottomSheet}
          />
          <Text style={[styles.modalTitle, { marginLeft: 40 }]}>Seleccione WLL</Text>
        </View>
        <View style={styles.separatorLine} />
        <ScrollView style={styles.optionsContainer} contentContainerStyle={{ paddingBottom: 50 }}>
          {opcionesWLL.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionButton}
              onPress={() => handleSelect(option)}
            >
              <View style={styles.optionContent}>
                <View
                  style={{
                    width: 10,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: getColorFromText(option),
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: '#999'
                  }}
                />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>{option}</Text>
                </View>
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioButton,
                      selectedWLL === option && styles.selectedRadioButton
                    ]}
                  >
                    {selectedWLL === option && <View style={styles.selectedCircle} />}
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
