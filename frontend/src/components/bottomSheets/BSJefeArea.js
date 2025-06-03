import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, PanResponder, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import getApiUrl from '../../utils/apiUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSJefeArea = ({ isVisible, onClose, onSelect }) => {
  const [jefesDeArea, setJefesDeArea] = useState([]);
  const [selected, setSelected] = useState(null);
  const bottomSheetHeight = SCREEN_HEIGHT * 0.55;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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
      fetchJefesDeArea();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]);

  const fetchJefesDeArea = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No se encontró el token de acceso');
        return;
      }

      const apiUrl = getApiUrl('user'); // Endpoint for users
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.state === 'Success') {
        const jefesAreaFiltrados = response.data.data.filter(user =>
          user.position === 'Jefe Área'
        );
        setJefesDeArea(jefesAreaFiltrados);
      } else {
        console.error('No se pudieron obtener los Jefes de Área');
      }
    } catch (error) {
      console.error('Error al obtener los Jefes de Área:', error);
    }
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
        {/* Línea de arrastre */}
        <View style={styles.dragLine}></View>

        {/* Cabecera */}
        <View style={styles.modalHeader}>
          <IconFA
            name="angle-left"
            size={35}
            color="#333"
            style={styles.backIcon}
            onPress={closeBottomSheet}
          />
          <Text style={styles.modalTitle}>Seleccionar Jefe de Área</Text>
        </View>

        <View style={styles.separatorLine}></View>

        {/* Lista de opciones */}
        {jefesDeArea.length === 0 ? (
          <Text>No se encontraron Jefes de Área disponibles.</Text>
        ) : (
          jefesDeArea.map((jefe) => (
            <TouchableOpacity
              key={jefe._id}
              style={styles.optionButton}
              onPress={() => {
                closeBottomSheet();
                setTimeout(() => onSelect(jefe), 150);
              }}
            >
              <View style={styles.optionContent}>
                <IconMC name="account" size={30} color="#333" style={styles.icon} />
                <Text style={styles.optionText}>{jefe.nombre} {jefe.apellido}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </Animated.View>
    </Modal>
  );
};

export default BSJefeArea;
