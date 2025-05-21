import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, Alert } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Components from '../Components.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSTipoManiobra = ({ isVisible, onClose, onSelect, tipoManiobra }) => {
  const [tipoAparejoSeleccionado, setTipoAparejoSeleccionado] = useState(null);
  const [opcionesTipoAparejo, setOpcionesTipoAparejo] = useState([]);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.8;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (tipoManiobra === 'Estrobo') {
      // *** CAMBIO CLAVE AQUÍ ***
      setOpcionesTipoAparejo(['Cable de Acero Superloop']); // Capitalización correcta
      setTipoAparejoSeleccionado('Cable de Acero Superloop'); // Capitalización correcta
      if (isVisible) {
        openBottomSheet();
      } else {
        closeBottomSheet();
      }
    } else if (tipoManiobra === 'Eslinga') {
      setOpcionesTipoAparejo([
        'Tubulares de poliester',
        'Planas ojo-ojo de poliester',
        'Tubulares trenzadas de poliester',
        'Tubulares para carga pesada',
      ]);
      setTipoAparejoSeleccionado(null);
      if (isVisible) {
        openBottomSheet();
      } else {
        closeBottomSheet();
      }
    } else {
      setOpcionesTipoAparejo([]);
      setTipoAparejoSeleccionado(null);
      if (isVisible) {
        openBottomSheet();
      } else {
        closeBottomSheet();
      }
    }
  }, [isVisible, tipoManiobra]);

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

  const handleSeleccionarTipo = (tipo) => {
    setTipoAparejoSeleccionado(tipo);
  };

  const handleConfirmar = () => {
    if (tipoAparejoSeleccionado) {
      onSelect(tipoAparejoSeleccionado);
      closeBottomSheet();
    } else if (tipoManiobra === 'Eslinga') {
      Alert.alert("Selecciona un tipo", "Debes elegir un tipo de eslinga.");
    } else {
      closeBottomSheet();
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableOpacity onPress={closeBottomSheet} style={styles.overlay} />
      <Animated.View
        style={[styles.bottomSheet, { height: bottomSheetHeight, transform: [{ translateY: positionY }] }]}
      >
        <View style={styles.dragLine}></View>
        <View style={styles.modalHeader}>
          <IconFA name="angle-left" size={35} color="#333" style={styles.backIcon} onPress={closeBottomSheet} />
          <Text style={[styles.modalTitle, { left: 50 }]}>Seleccionar Tipo de Aparejo</Text>
        </View>
        <View style={styles.separatorLine}></View>
        <ScrollView style={styles.optionsContainer}>
          {opcionesTipoAparejo.map((tipo) => (
            <TouchableOpacity key={tipo} style={styles.optionButton} onPress={() => handleSeleccionarTipo(tipo)}>
              <View style={styles.optionContent}>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>{tipo}</Text>
                </View>
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioButton,
                      tipoAparejoSeleccionado === tipo && styles.selectedRadioButton,
                    ]}
                  >
                    {tipoAparejoSeleccionado === tipo && <View style={styles.selectedCircle} />}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ flexGrow: 1 }} />
        <Components.Button label="Confirmar" onPress={handleConfirmar} style={{ top: -20, left: 10 }} />
      </Animated.View>
    </Modal>
  );
};

export default BSTipoManiobra;