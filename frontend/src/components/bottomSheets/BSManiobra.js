import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { eslingaData, estroboData } from '../../data/aparejosData';
import Components from '../Components.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSManiobra = ({ isVisible, onClose, onSelect, maxManiobra }) => {
  const [tipoManiobra, setTipoManiobra] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(null); // Para gestionar listas individuales
  const [cantidades, setCantidades] = useState({});

  const bottomSheetHeight = SCREEN_HEIGHT * 0.8;
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

  const handleSelectManiobra = (tipo) => {
    setMostrarLista(prev => prev === tipo ? null : tipo);
    setTipoManiobra(tipo);
  };

  const handleChangeCantidad = (diametro, incremento) => {
    // Calcular el total actual
    const totalActual = Object.values(cantidades).reduce((sum, value) => sum + value, 0);
    const nuevoTotal = totalActual + incremento;
    // Permitir decrementos siempre; para incrementos, validar que no se exceda el máximo
    if (incremento > 0 && nuevoTotal > maxManiobra) {
      return;
    }
    setCantidades((prevCantidades) => {
      const nuevaCantidad = (prevCantidades[diametro] || 0) + incremento;
      if (nuevaCantidad < 0) return prevCantidades;
      return { ...prevCantidades, [diametro]: nuevaCantidad };
    });
  };

  const handleConfirmar = () => {
    // Envía un objeto con el tipo de maniobra y las cantidades seleccionadas
    onSelect({ type: tipoManiobra, cantidades });
    closeBottomSheet();
  };

  const renderLista = (tipo) => {
    if (mostrarLista !== tipo) return null;

    return (
      <ScrollView style={styles.listaContainer} contentContainerStyle={{ flexGrow: 1 }}>
        {tipo === 'Eslinga' && (
          <>
            <Text style={styles.textoGrado}>Grado 8 (80)</Text>
            {eslingaData.grado8.map((diametro) => (
              <View key={`grado8-${diametro}`} style={styles.listaItem}>
                <Text style={styles.textoDiametro}>{diametro} mm</Text>
                <View style={styles.contadorContainer}>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, -1)}>
                    <Text style={styles.botonTexto}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cantidadTexto}>{cantidades[diametro] || 0}</Text>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, 1)}>
                    <Text style={styles.botonTexto}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <Text style={styles.textoGrado}>Grado 10 (100)</Text>
            {eslingaData.grado10.map((diametro) => (
              <View key={`grado10-${diametro}`} style={styles.listaItem}>
                <Text style={styles.textoDiametro}>{diametro} mm</Text>
                <View style={styles.contadorContainer}>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, -1)}>
                    <Text style={styles.botonTexto}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cantidadTexto}>{cantidades[diametro] || 0}</Text>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, 1)}>
                    <Text style={styles.botonTexto}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {tipo === 'Estrobo' &&
          estroboData.map((diametro) => (
            <View key={`estrobo-${diametro}`} style={styles.listaItem}>
              <Text style={styles.textoDiametro}>{diametro} mm</Text>
              <View style={styles.contadorContainer}>
                <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, -1)}>
                  <Text style={styles.botonTexto}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cantidadTexto}>{cantidades[diametro] || 0}</Text>
                <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, 1)}>
                  <Text style={styles.botonTexto}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
    );
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
          <Text style={[styles.modalTitle, { marginLeft: 40 }]}>Seleccionar Tipo de Maniobra</Text>
        </View>
        <View style={styles.separatorLine}></View>
        <ScrollView style={styles.optionsContainer}>
          {['Eslinga', 'Estrobo'].map((tipo) => (
            <View key={tipo}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectManiobra(tipo)}>
                <View style={styles.optionContent}>
                  <View style={styles.optionTextContainer}>
                    <IconMC name="transit-connection" size={30} color="#333" style={styles.icon} />
                    <Text style={styles.optionText}>{tipo}</Text>
                  </View>
                  <View style={styles.radioContainer}>
                    <View style={[styles.radioButton, tipoManiobra === tipo && styles.selectedRadioButton]}>
                      {tipoManiobra === tipo && <View style={styles.selectedCircle} />}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {renderLista(tipo)}
            </View>
          ))}
        </ScrollView>

        <View style={{ flexGrow: 1 }} />
        <Components.Button label="Confirmar" onPress={handleConfirmar} style={{ margin: 20, top: -10, left: 10 }} />
      </Animated.View>
    </Modal>
  );
};

export default BSManiobra;
