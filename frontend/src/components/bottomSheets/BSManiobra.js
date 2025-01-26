import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSManiobra = ({ isVisible, onClose, onSelect }) => {
  const [tipoManiobra, setTipoManiobra] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.3;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const handleSelectManiobra = (tipo) => {
    setTipoManiobra(tipo);
    setTimeout(() => {
      onSelect(tipo);
      onClose();
    }, 150);
  };

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

  React.useEffect(() => {
    if (isVisible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]);

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableOpacity onPress={closeBottomSheet} style={styles.overlay} />
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: bottomSheetHeight,
            transform: [{ translateY: positionY }],
          },
        ]}
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
          <Text style={[styles.modalTitle, { marginLeft: 40 }]}>Seleccionar Tipo de Maniobra</Text>
        </View>
        <View style={styles.separatorLine}></View>
        <ScrollView style={styles.optionsContainer}>
          {/* Opciones de maniobra (Eslinga / Estrobo) */}
          {['Eslinga', 'Estrobo'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={styles.optionButton}
              onPress={() => handleSelectManiobra(tipo)}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionTextContainer}>
                  <IconMC name="transit-connection" size={30} color="#333" style={styles.icon} />
                  <Text style={styles.optionText}>{tipo}</Text>
                </View>
                {/* Radio button alineado a la derecha */}
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioButton,
                      tipoManiobra === tipo && styles.selectedRadioButton,
                    ]}
                  >
                    {tipoManiobra === tipo && <View style={styles.selectedCircle} />}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

export default BSManiobra;