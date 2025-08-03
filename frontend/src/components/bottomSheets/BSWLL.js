import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, Alert } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Components from '../Components.index';
import tubularPoliesterData from '../../data/tubularPoliesterData';
import tubularTrenzadasPoliesterData from '../../data/tubularTrenzadasPoliesterData';
import ojoPoliesterData from '../../data/ojoPoliesterData';
import tubularCargaPesadaData from '../../data/tubularCargaPesadaData';
import cableAceroSuperloopData from '../../data/cableAceroSuperloopData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const colorMap = {
  Violeta: '#cba2f0',
  Verde: '#27ae60',
  Amarillo: '#f1c40f',
  Gris: '#7f8c8d',
  Rojo: '#e74c3c',
  Café: '#8B4513',
  Azul: '#3498db',
  'Azul Oscuro': '#2c3e50',
  Naranja: '#e67e22'
};

const colorPorPulgada = {
  '1 pulgada': colorMap.Violeta,
  '2 pulgadas': colorMap.Verde,
  '3 pulgadas': colorMap.Amarillo,
  '4 pulgadas': colorMap.Gris,
  '5 pulgadas': colorMap.Rojo,
  '6 pulgadas': colorMap.Café,
  '8 pulgadas': colorMap.Violeta,
  '10 pulgadas': colorMap.Naranja,
  '12 pulgadas': colorMap.Naranja
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
  cantidadManiobra,
  pesoCarga,
  pesoEquipo
}) => {
  const [opcionesWLL, setOpcionesWLL] = useState([]);
  const [selectedWLL, setSelectedWLL] = useState(null);
  const [showCapas, setShowCapas] = useState(false);
  const [selectedCapa, setSelectedCapa] = useState(null);
  const [capasDisponibles, setCapasDisponibles] = useState([]);

  const bottomSheetHeight = SCREEN_HEIGHT * 0.9;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    const ang = anguloSeleccionado ? parseInt(anguloSeleccionado, 10) : 0;
    let opciones = [];

    if (tipoAparejo === 'Tubulares de poliester') {
      opciones = tubularPoliesterData.map(item => {
        const ton = item.toneladas[ang] !== undefined ? item.toneladas[ang] : item.toneladas[0];
        const capacidadEfectiva = ton * cantidadManiobra;
        const isDisabled = pesoTotalParaWLL !== null && capacidadEfectiva < pesoTotalParaWLL;
        const base = item.nombre.split('(')[0].trim();
        return {
          label: `${base} (${ton} ton)`,
          value: `${base} (${ton} ton)`,
          isDisabled: isDisabled,
          capacidad: capacidadEfectiva
        };
      });
    } else if (tipoAparejo === 'Tubulares trenzadas de poliester') {
      opciones = tubularTrenzadasPoliesterData.map(item => {
        const ton = item.toneladas[ang] !== undefined ? item.toneladas[ang] : item.toneladas[0];
        const capacidadEfectiva = ton * cantidadManiobra;
        const isDisabled = pesoTotalParaWLL !== null && capacidadEfectiva < pesoTotalParaWLL;
        const base = item.nombre.split('(')[0].trim();
        return {
          label: `${base} (${ang}°: ${ton} ton)`,
          value: `${base} (${ang}°: ${ton} ton)`,
          isDisabled: isDisabled
        };
      });
    } else if (tipoAparejo === 'Tubulares para carga pesada') {
      opciones = tubularCargaPesadaData.map(item => {
        const ton = item.toneladas[ang] !== undefined ? item.toneladas[ang] : item.toneladas[0];
        const capacidadEfectiva = ton * cantidadManiobra;
        const isDisabled = pesoTotalParaWLL !== null && capacidadEfectiva < pesoTotalParaWLL;
        const base = item.nombre.split('(')[0].trim();
        return {
          label: `${base} (${ang}°: ${ton} ton)`,
          value: `${base} (${ang}°: ${ton} ton)`,
          isDisabled: isDisabled
        };
      });
    } else if (tipoAparejo === 'Planas ojo-ojo de poliester') {
      if (cantidadManiobra === 1) {
        opciones = Object.keys(ojoPoliesterData).map(pulgada => {
          return { label: `${pulgada}`, value: `${pulgada}`, isDisabled: false };
        });
      } else {
        opciones = [];
        if (selectedWLL && selectedWLL.includes('pulgada')) {
              setSelectedWLL(null);
        }
      }
    } else if (tipoAparejo === 'Cable de Acero Superloop') {
      opciones = cableAceroSuperloopData.map(item => {
        const ton = item.toneladas[ang] !== undefined ? item.toneladas[ang] : item.toneladas[0];
        const capacidadEfectiva = ton * cantidadManiobra;
        const isDisabled = pesoTotalParaWLL !== null && capacidadEfectiva < pesoTotalParaWLL;
        return {
          label: `${item.nombre} (${ton} ton)`,
          value: `${item.nombre} (${ton} ton)`,
          isDisabled: isDisabled
        };
      });
    }

    setOpcionesWLL(opciones);
    setSelectedWLL(null);
    setShowCapas(false);
    setSelectedCapa(null);
    setCapasDisponibles([]);

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
  }, [
    isVisible, 
    tipoAparejo, 
    anguloSeleccionado, 
    cantidadManiobra, 
    pesoCarga, 
    pesoEquipo
  ]);

  const closeBottomSheet = () => {
    Animated.timing(positionY, {
      toValue: SCREEN_HEIGHT,
      duration: 150,
      useNativeDriver: false
    }).start(() => onClose());
  };

  const handleSelect = option => {
    if (option.isDisabled) {
      return;
    }
    setSelectedWLL(option.value);
    if (tipoAparejo === 'Planas ojo-ojo de poliester') {
      const pulgadas = option.value.split('(')[0].trim();
      setCapasDisponibles(ojoPoliesterData[pulgadas] || []);
      setShowCapas(true);
      setSelectedCapa(null);
    } else {
      setShowCapas(false);
      setSelectedCapa(null);
    }
  };

  const handleConfirm = () => {
    if (!selectedWLL) {
      Alert.alert('Seleccione una opción', 'Debes elegir un aparejo por WLL.');
      return;
    }
    if (showCapas && !selectedCapa) {
      Alert.alert('Seleccione una opción', 'Debes elegir la cantidad de capas.');
      return;
    }
    const resultadoFinal = showCapas ? `${selectedWLL} - ${selectedCapa}` : selectedWLL;
    onSelect(resultadoFinal);
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
          <Text style={[styles.modalTitle, { left: 87 }]}>Seleccione WLL</Text>
        </View>
        <View style={styles.separatorLine} />
        <ScrollView
          style={styles.optionsContainer}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {opcionesWLL.map(option => {
            const isOjoOjoPoliester = tipoAparejo === 'Planas ojo-ojo de poliester';
            const optionColor = option.isDisabled ? '#ccc' : (isOjoOjoPoliester ? colorPorPulgada[option.value] : getColorFromText(option.value));
            const textColor = option.isDisabled ? '#999' : '#333';
            
            return (
              <View key={option.value}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    option.isDisabled && { backgroundColor: '#fff' }
                  ]}
                  onPress={() => handleSelect(option)}
                  disabled={option.isDisabled}
                >
                  <View style={styles.optionContent}>
                    <View
                      style={{
                        width: 10,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: optionColor,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: option.isDisabled ? '#ccc' : '#999'
                      }}
                    />
                    <View style={styles.optionTextContainer}>
                      <Text style={[styles.optionText, { color: textColor }]}>{option.label}</Text>
                    </View>
                    <View style={styles.radioContainer}>
                      <View
                        style={[
                          styles.radioButton,
                          selectedWLL === option.value && styles.selectedRadioButton,
                          option.isDisabled && { borderColor: '#fff' }
                        ]}
                      >
                        {selectedWLL === option.value && (
                          <View style={styles.selectedCircle} />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {showCapas && selectedWLL === option.value && (
                  <View style={{ paddingLeft: 35, marginBottom: 10 }}>
                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
                      Seleccione cantidad de capas:
                    </Text>
                    {capasDisponibles.map(capa => (
                      <TouchableOpacity
                        key={capa}
                        style={[
                          styles.optionButton,
                          selectedCapa === capa && styles.selectedRadioButton
                        ]}
                        onPress={() => setSelectedCapa(capa)}
                      >
                        <View style={styles.optionContent}>
                          <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>{capa}</Text>
                          </View>
                          <View style={styles.radioContainer}>
                            <View
                              style={[
                                styles.radioButton,
                                selectedCapa === capa && styles.selectedRadioButton
                              ]}
                            >
                              {selectedCapa === capa && (
                                <View style={styles.selectedCircle} />
                              )}
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
        <View style={{ flexGrow: 1 }} />
        <Components.Button
          label="Confirmar"
          onPress={handleConfirm}
          style={{ top: -30, left: 10 }}
        />
      </Animated.View>
    </Modal>
  );
};

export default BSWLL;
