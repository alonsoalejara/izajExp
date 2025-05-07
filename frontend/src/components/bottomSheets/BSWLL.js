// BSWLL.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Components from '../Components.index';
import tubularPoliesterData from '../../data/tubularPoliesterData';
import tubularTrenzadasPoliesterData from '../../data/tubularTrenzadasPoliesterData';
import tubularCargaPesadaData from '../../data/tubularCargaPesadaData';

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
  anguloSeleccionado,
  cantidadManiobra
}) => {
  const [opcionesWLL, setOpcionesWLL] = useState([]);
  const [selectedWLL, setSelectedWLL] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.9;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    const ang = anguloSeleccionado ?? 0;
    let opciones = [];

    // 1) Tubulares de poliester
    if (tipoAparejo === 'Tubulares de poliester') {
      opciones = tubularPoliesterData.map(item => {
        const ton = item.toneladas[ang] ?? item.toneladas[0];
        const base = item.nombre.split('(')[0].trim();
        return `${base} (${ang}°: ${ton} ton)`;
      });

    // 2) Tubulares trenzadas de poliester
    } else if (tipoAparejo === 'Tubulares trenzadas de poliester') {
      opciones = tubularTrenzadasPoliesterData.map(item => {
        const ton = item.toneladas[ang] ?? item.toneladas[0];
        const base = item.nombre.split('(')[0].trim();
        return `${base} (${ang}°: ${ton} ton)`;
      });

    // 3) Tubulares para carga pesada
    } else if (tipoAparejo === 'Tubulares para carga pesada') {
      opciones = tubularCargaPesadaData.map(item => {
        const ton = item.toneladas[ang] ?? item.toneladas[0];
        const base = item.nombre.split('(')[0].trim();
        return `${base} (${ang}°: ${ton} ton)`;
      });

    // 4) Planas ojo-ojo de poliester — solo si cantidadManiobra === 1
    } else if (
      tipoAparejo === 'Planas ojo-ojo de poliester' &&
      cantidadManiobra === 1
    ) {
      opciones = [
        '1" - Violeta',
        '2" - Verde',
        '3" - Amarillo',
        '4" - Gris',
        '5" - Rojo',
        '6" - Café',
        '8" - Azul Oscuro',
        '10" - Naranja',
        '12" - Naranja'
      ];
    }

    // Aplicar
    setOpcionesWLL(opciones);
    setSelectedWLL(null);

    // Animación de apertura / cierre
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
  }, [isVisible, tipoAparejo, anguloSeleccionado, cantidadManiobra]);

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
