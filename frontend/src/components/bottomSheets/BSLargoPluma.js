import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, PanResponder, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import plumas from '../../data/plumaData';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSLargoPluma = ({ isVisible, onClose, onSelect, isInputsDisabled }) => {
  const [selected, setSelected] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.6;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const terexRT555 = plumas.terexRT555;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        positionY.setValue(SCREEN_HEIGHT - bottomSheetHeight + gestureState.dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 100) {
        closeBottomSheet();
      } else {
        openBottomSheet();
      }
    },
  });

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

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: bottomSheetHeight,
            transform: [{ translateY: positionY }],
          },
        ]}
        {...panResponder.panHandlers}
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
          <Text style={[styles.modalTitle, { right: 30 }]}>Seleccionar Largo de Pluma</Text>
        </View>

        <View style={styles.separatorLine}></View>

        {terexRT555.map((value) => (
          <TouchableOpacity
            key={value}
            style={styles.optionButton}
            onPress={() => {
              if (!isInputsDisabled) {
                closeBottomSheet();
                setTimeout(() => onSelect(`${value} m`), 150);
              }
            }}
            disabled={isInputsDisabled}
          >
            <View style={styles.optionContent}>
              <IconMC name="boom-gate-up" size={24} color="#000" style={styles.icon} />
              <Text style={styles.optionText}>{`${value} m`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Modal>
  );
};

export default BSLargoPluma;