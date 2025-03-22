import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { grilleteOptions } from '../../data/grilleteData';
import Components from '../Components.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSGrillete = ({ isVisible, onClose, onSelect, maxGrilletes }) => {
  // "cantidades" almacenará la cantidad seleccionada por cada tamaño
  const [cantidades, setCantidades] = useState({});
  const bottomSheetHeight = SCREEN_HEIGHT * 0.7;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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

  const handleChangeCantidad = (pulgada, incremento) => {
    const totalActual = Object.values(cantidades).reduce((sum, value) => sum + value, 0);
    const nuevoTotal = totalActual + incremento;
    if (incremento > 0 && maxGrilletes && nuevoTotal > maxGrilletes) {
      return;
    }
    setCantidades((prevCantidades) => {
      const nuevaCantidad = (prevCantidades[pulgada] || 0) + incremento;
      if (nuevaCantidad < 0) return prevCantidades;
      return { ...prevCantidades, [pulgada]: nuevaCantidad };
    });
  };

  const handleConfirmar = () => {
    onSelect(cantidades);
    closeBottomSheet();
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.bottomSheet, { height: bottomSheetHeight, transform: [{ translateY: positionY }] }]}
      >
        <View style={styles.dragLine}></View>
        <View style={styles.modalHeader}>
          <IconFA
            name="angle-left"
            size={35}
            color="#333"
            style={styles.backIcon}
            onPress={closeBottomSheet}
          />
          <Text style={[styles.modalTitle, { marginLeft: 40 }]}>Seleccionar Grilletes</Text>
        </View>
        <View style={styles.separatorLine}></View>
        <ScrollView style={styles.optionsContainer}>
          {grilleteOptions.map((grillete, index) => (
            <View key={index} style={styles.listaItem}>
              <Text style={styles.textoDiametro}>Grillete de {grillete.pulgada}"</Text>
              <View style={styles.contadorContainer}>
                <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(grillete.pulgada, -1)}>
                  <Text style={styles.botonTexto}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cantidadTexto}>{cantidades[grillete.pulgada] || 0}</Text>
                <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(grillete.pulgada, 1)}>
                  <Text style={styles.botonTexto}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <Components.Button label="Confirmar" onPress={handleConfirmar} style={{ margin: 20, top: -10, left: 10 }} />
      </Animated.View>
    </Modal>
  );
};

export default BSGrillete;
