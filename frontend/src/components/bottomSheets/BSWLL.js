// BSWLL.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, Alert } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Components from '../Components.index';
import tubularPoliesterData from '../../data/tubularPoliesterData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mapa de colores base a sus valores hex
const colorMap = {
  Violeta: '#8e44ad',
  Verde: '#27ae60',
  Amarillo: '#f1c40f',
  Gris: '#7f8c8d',
  Rojo: '#e74c3c',
  Café: '#8B4513',
  Azul: '#3498db',
  'Azul Oscuro': '#2c3e50',
  Naranja: '#e67e22'
};

const getColorFromText = text => {
  const found = Object.keys(colorMap).find(name =>
    text.toLowerCase().includes(name.toLowerCase())
  );
  return found ? colorMap[found] : '#ccc';
};

const BSWLL = ({
  isVisible,
  onClose,
  onSelect,
  tipoAparejo,
  anguloSeleccionado
}) => {
  const [opcionesWLL, setOpcionesWLL] = useState([]);
  const [selectedWLL, setSelectedWLL] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.9;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    // 1) Calcular las opciones dependiendo del tipo de aparejo
    if (tipoAparejo === 'Tubulares de poliester') {
      const ang = anguloSeleccionado || 0;
      setOpcionesWLL(
           tubularPoliesterData.map(item => {
             const ton = item.toneladas[ang] ?? item.toneladas[0];
             // extraer el nombre antes de cualquier paréntesis, p.ej. "Naranja"
             const base = item.nombre.split('(')[0].trim();
             // formatear siempre con el ángulo y tonelaje, incluso para 0°
             return `${base} (${ang}°: ${ton} ton)`;
           })
         );
        
    } else {
      // otros casos
      switch (tipoAparejo) {
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
    }

    // 2) Resetear selección
    setSelectedWLL(null);

    // 3) Animar apertura o cierre
    if (isVisible) {
      Animated.timing(positionY, {
        toValue: SCREEN_HEIGHT - bottomSheetHeight,
        duration: 300,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(positionY, {
        toValue: SCREEN_HEIGHT,
        duration: 150,
        useNativeDriver: false
      }).start(() => onClose());
    }
  }, [isVisible, tipoAparejo, anguloSeleccionado]);

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

  const handleSelect = option => setSelectedWLL(option);

  const handleConfirm = () => {
    if (!selectedWLL) {
      Alert.alert('Seleccione una opción', 'Debes elegir un color WLL.');
      return;
    }
    onSelect(selectedWLL);
    closeBottomSheet();
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
          <Text style={[styles.modalTitle, { marginLeft: 40 }]}>
            Seleccione WLL
          </Text>
        </View>

        <View style={styles.separatorLine} />

        <ScrollView
          style={styles.optionsContainer}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {opcionesWLL.map(option => (
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
                    {selectedWLL === option && (
                      <View style={styles.selectedCircle} />
                    )}
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
