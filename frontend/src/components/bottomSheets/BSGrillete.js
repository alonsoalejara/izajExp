import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { grilleteOptions } from '../../data/grilleteData';
import Components from '../Components.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSGrillete = ({ isVisible, onClose, onSelect }) => {
  const [selectedGrillete, setSelectedGrillete] = useState(null);
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

  const handleSelect = (grillete) => {
    setSelectedGrillete(grillete);
  };

  const handleConfirmar = () => {
    if (!selectedGrillete) {
      Alert.alert('Seleccione un grillete', 'Debes elegir un tamaño de grillete.');
      return;
    }
    onSelect(selectedGrillete);
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
          <Text style={styles.modalTitle}>Seleccionar Grillete</Text>
        </View>
        <View style={styles.separatorLine}></View>
        <ScrollView style={styles.optionsContainer}>
          {grilleteOptions.map((grillete, index) => (
            <TouchableOpacity key={index} style={styles.listaItem} onPress={() => handleSelect(grillete.pulgada)}>
              <Text style={styles.textoDiametro}>Grillete de {grillete.pulgada}"</Text>
              <View style={styles.radioContainer}>
                <View
                  style={[
                    styles.radioButton,
                    selectedGrillete === grillete.pulgada && styles.selectedRadioButton,
                  ]}
                >
                  {selectedGrillete === grillete.pulgada && <View style={styles.selectedCircle} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Components.Button label="Confirmar" onPress={handleConfirmar} style={{ margin: 20, top: -30, left: 10 }} />
      </Animated.View>
    </Modal>
  );
};

export default BSGrillete;