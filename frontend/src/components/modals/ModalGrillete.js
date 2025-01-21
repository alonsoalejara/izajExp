import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, Animated, TouchableWithoutFeedback, Dimensions, PanResponder } from 'react-native';
import BottomSheetStyles from '../../styles/BottomSheetStyles';
import { grilleteOptions } from '../../data/grilleteData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ModalGrillete = ({ isVisible, onClose, onSelectCantidad, onSelectTipo }) => {
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState('');
  const [peso, setPeso] = useState(null);
  const [errorCantidad, setErrorCantidad] = useState('');
  const [errorTipo, setErrorTipo] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  
  const bottomSheetHeight = SCREEN_HEIGHT * 0.55;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // PanResponder para controlar el movimiento del bottom sheet
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

  const handleGuardar = () => {
    let hasError = false;

    if (!cantidad) {
      setErrorCantidad('Ingrese un valor');
      hasError = true;
    }

    if (!tipo) {
      setErrorTipo('Seleccione un diámetro para grillete');
      hasError = true;
    }

    if (!hasError) {
      onSelectCantidad(cantidad);
      onSelectTipo({ tipo: tipo, peso: peso });
      onClose();
    }
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={[BottomSheetStyles.optionButton, tipo === item.pulgada ? BottomSheetStyles.selectedMenuItem : {}]}
      onPress={() => {
        setTipo(item.pulgada);
        setPeso(item.peso);
        setErrorTipo('');
        setShowMenu(false);
      }}
    >
      <Text
        style={[BottomSheetStyles.optionText, tipo === item.pulgada ? BottomSheetStyles.selectedMenuText : {}]}
      >
        {item.pulgada}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={BottomSheetStyles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[BottomSheetStyles.bottomSheet, {
          height: bottomSheetHeight,
          transform: [{ translateY: positionY }]
        }]}
        {...panResponder.panHandlers}
      >
        {/* Línea de arrastre */}
        <View style={BottomSheetStyles.dragLine}></View>

        {/* Cabecera */}
        <View style={BottomSheetStyles.modalHeader}>
          <Text style={BottomSheetStyles.modalTitle}>Configuración Grillete</Text>
        </View>

        <View style={BottomSheetStyles.separatorLine}></View>

        {/* Formulario de cantidad */}
        <Text style={BottomSheetStyles.optionText}>Ingrese la cantidad de grilletes</Text>
        <TextInput
          style={[BottomSheetStyles.optionButton, { borderColor: errorCantidad ? '#ff0000' : '#ccc' }]}
          placeholder="Cantidad de Grilletes"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={(value) => {
            setCantidad(value);
            setErrorCantidad('');
          }}
        />
        {errorCantidad && <Text style={{ color: '#ff0000', fontSize: 14 }}>{errorCantidad}</Text>}

        {/* Selección de tipo de grillete */}
        <Text style={BottomSheetStyles.optionText}>Seleccione el tipo de grillete (pulg.)</Text>
        <TouchableOpacity
          style={[BottomSheetStyles.optionButton, { borderColor: errorTipo ? '#ff0000' : '#ccc' }]}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Text>{tipo || 'Seleccione el diámetro'}</Text>
        </TouchableOpacity>
        {errorTipo && <Text style={{ color: '#ff0000', fontSize: 14 }}>{errorTipo}</Text>}

        {showMenu && (
          <View style={BottomSheetStyles.menuContainerGrillete}>
            <FlatList
              data={grilleteOptions}
              renderItem={renderOption}
              keyExtractor={(item) => item.pulgada}
            />
          </View>
        )}

        {/* Botones */}
        <View style={BottomSheetStyles.modalButtons}>
          <TouchableOpacity style={BottomSheetStyles.closeButton} onPress={onClose}>
            <Text style={BottomSheetStyles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={BottomSheetStyles.saveButton} onPress={handleGuardar}>
            <Text style={BottomSheetStyles.buttonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalGrillete;