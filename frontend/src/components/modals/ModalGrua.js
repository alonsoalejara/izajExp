import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, PanResponder, Animated, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles/ModalStyles';
import getApiUrl from '../../utils/apiUrl';
const axios = require('axios/dist/browser/axios.cjs');
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalGrua = ({ isVisible, onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [gruas, setGruas] = useState([]);
  const [modalPosition] = useState(new Animated.Value(30)); // No se necesita objeto, es solo un número
  const [modalOpacity] = useState(new Animated.Value(0)); // Opacidad del fondo
  const modalRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        modalPosition.setValue(gestureState.dy + 30); // Asegúrate de que esto sea solo un número
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 10) {
        onClose();
      } else {
        Animated.spring(modalPosition, {
          toValue: 30, // Asegúrate de que esto sea un número
          useNativeDriver: false,
          stiffness: 80,
          damping: 10,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      modalPosition.setValue(30);

      // Animar la opacidad del fondo cuando se muestra el modal
      Animated.timing(modalOpacity, {
        toValue: 0.7, // Fondo semi-transparente
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animar la opacidad del fondo cuando se cierra el modal
      Animated.timing(modalOpacity, {
        toValue: 0, // Fondo completamente transparente
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    const fetchGruas = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        
        if (!accessToken) {
          console.error('No se encontró el token de acceso');
          return;
        }

        const apiUrl = getApiUrl('grua');
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.state === 'Success') {
          setGruas(response.data.data);
        } else {
          console.error('No se pudieron obtener las grúas');
        }
      } catch (error) {
        console.error('Error al obtener las grúas:', error);
      }
    };

    if (isVisible) {
      fetchGruas();
    }
  }, [isVisible]);

  const handleSelect = () => {
    if (!selected) {
      setError('Debe elegir una grúa para confirmar');
    } else {
      const selectedGrua = gruas.find(grua => grua._id === selected);
      onSelect(selectedGrua);
      setError('');
      onClose();
    }
  };

  // Manejar el toque fuera del modal
  const handleOutsidePress = () => {
    onClose();
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      {/* Agregar TouchableWithoutFeedback para cerrar al hacer clic fuera */}
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <Animated.View style={[styles.modalContainer, { opacity: modalOpacity }]}>
          <View
            style={[
              styles.modalContent,
              { transform: [{ translateY: 30 }] }, // Esto sigue siendo un número
            ]}
            ref={modalRef}
            {...panResponder.panHandlers}
          >
            {/* Línea de arrastre */}
            <View style={styles.dragLine}></View>

            {/* Cabecera del modal */}
            <View style={styles.modalHeader}>
              <IconFA
                name="angle-left"
                size={35}
                color="#333"
                style={styles.backIcon}
                onPress={onClose}
              />
              <Text style={styles.modalTitle}>Seleccionar grúa</Text>
            </View>

            <View style={styles.separatorLine}></View>

            {/* Opciones de grúas */}
            {gruas.length === 0 ? (
              <Text>No se encontraron grúas disponibles.</Text>
            ) : (
              gruas.map((grua) => (
                <TouchableOpacity
                  key={grua._id}
                  style={styles.optionButton}
                  onPress={() => {
                    onSelect(grua);
                    onClose();
                  }}
                >
                  <View style={styles.optionContent}>
                    <IconMC name="crane" size={30} color="#333" style={styles.icon} />
                    <Text style={styles.optionText}>
                      {grua.nombre}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalGrua;

