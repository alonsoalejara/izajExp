import React, { useState, useEffect, useRef } from 'react';
import { Modal,View, Text,TouchableOpacity, Animated, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSForma = ({ isVisible, onClose, onSelect }) => {
  const [formas, setFormas] = useState([]);
  const [selectedForma, setSelectedForma] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.7;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const handleSelectForma = (forma) => {
    setSelectedForma(forma);
    setTimeout(() => {
      onSelect(forma);
      onClose();
    }, 150);
  };

  useEffect(() => {
    if (isVisible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]);

  useEffect(() => {
    setFormas(['Cuadrado', 'Rectángulo', 'Círculo']);
  }, []);

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

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.bottomSheet,
          { height: bottomSheetHeight, transform: [{ translateY: positionY }] },
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
          <Text style={styles.modalTitle}>Seleccionar forma</Text>
        </View>
        <View style={styles.separatorLine}></View>
        <ScrollView style={styles.optionsContainer}>
          {formas.length === 0 ? (
            <Text>No se encontraron formas disponibles.</Text>
          ) : (
            formas.map((forma, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleSelectForma(forma)}
              >
                <View style={styles.optionContent}>
                  <View style={[styles.optionTextContainer, { flex: 0.8 }]}>
                    <IconMC name="shape" size={30} color="#333" style={styles.icon} />
                    <Text style={styles.optionText}>{forma}</Text>
                  </View>
                  <View style={styles.radioContainer}>
                    <View
                      style={[
                        styles.radioButton,
                        selectedForma === forma && styles.selectedRadioButton,
                      ]}
                    >
                      {selectedForma === forma && <View style={styles.selectedCircle} />}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

export default BSForma;
