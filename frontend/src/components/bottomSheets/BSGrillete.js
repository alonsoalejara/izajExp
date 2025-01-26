import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { grilleteOptions } from '../../data/grilleteData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSGrillete = ({ isVisible, onClose, onSelect }) => {
  const [grilletes, setGrilletes] = useState([]);
  const [selectedGrillete, setSelectedGrillete] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.7;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const handleSelectGrillete = (grillete) => {
    setSelectedGrillete(grillete);
    setTimeout(() => {
      onSelect(grillete.pulgada);
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
    setGrilletes(grilleteOptions);
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
          <Text style={styles.modalTitle}>Seleccionar grillete</Text>
        </View>
        <View style={styles.separatorLine}></View>
        <ScrollView style={styles.optionsContainer}>
          {grilletes.length === 0 ? (
            <Text>No se encontraron grilletes disponibles.</Text>
          ) : (
            grilletes.map((grillete, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleSelectGrillete(grillete)}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionTextContainer}>
                    <IconMC name="hook" size={30} color="#333" style={styles.icon} />
                    <Text style={styles.optionText}>Grillete de {grillete.pulgada}"</Text>
                  </View>
                  {/* Radio button alineado a la derecha */}
                  <View style={styles.radioContainer}>
                    <View
                      style={[
                        styles.radioButton,
                        selectedGrillete && selectedGrillete.pulgada === grillete.pulgada && styles.selectedRadioButton,
                      ]}
                    >
                      {selectedGrillete && selectedGrillete.pulgada === grillete.pulgada && (
                        <View style={styles.selectedCircle} />
                      )}
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

export default BSGrillete;