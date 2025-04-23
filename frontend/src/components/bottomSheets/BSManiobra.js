import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, Alert } from 'react-native';
import styles from '../../styles/BottomSheetStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { eslingaData, estroboData } from '../../data/aparejosData';
import Components from '../Components.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSManiobra = ({ isVisible, onClose, onSelect, maxManiobra }) => {
  const [tipoManiobra, setTipoManiobra] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(null);
  const [cantidades, setCantidades] = useState({});
  const [errorCantidad, setErrorCantidad] = useState('');

  const bottomSheetHeight = SCREEN_HEIGHT * 0.8;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isVisible) {
      // Reiniciar los estados al abrir el BottomSheet
      setTipoManiobra(null);
      setMostrarLista(null);
      setCantidades({});
      setErrorCantidad('');
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
    setMostrarLista((prev) => (prev === tipo ? null : tipo));
    setTipoManiobra(tipo);
    setCantidades({}); // Resetear cantidades al cambiar el tipo
    setErrorCantidad('');
  };

  const handleChangeCantidad = (diametro, incrementoBase, grado = null) => {
    const key = grado ? `${diametro}-${grado}` : diametro;
    const cantidadActual = cantidades[key] || 0;
    let incremento = incrementoBase;

    if (maxManiobra === 4) {
      incremento = 2 * incrementoBase;
    }

    const nuevoTotal = Object.values(cantidades).reduce((sum, value) => sum + value, 0) + incremento;

    if (cantidadActual + incremento < 0) return;

    if (maxManiobra === 1) {
      if (nuevoTotal > 1) return;
    } else if (maxManiobra === 2) {
      if (nuevoTotal > 2) return;
    } else if (maxManiobra === 4) {
      if (nuevoTotal > 4) return;
    } else if (parseInt(maxManiobra, 10) > 0 && nuevoTotal > parseInt(maxManiobra, 10)) {
      return;
    }

    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [key]: cantidadActual + incremento,
    }));
  };

  const handleConfirmar = () => {
    const totalAparejos = Object.values(cantidades).reduce((sum, value) => sum + value, 0);
    const tiposSeleccionados = Object.keys(cantidades).filter(key => cantidades[key] > 0).length;

    if (maxManiobra === '1') {
      if (totalAparejos !== 1) {
        setErrorCantidad("Debes seleccionar exactamente 1 aparejo.");
        return;
      }
    } else if (maxManiobra === '2') {
      if (totalAparejos !== 2) {
        setErrorCantidad("Debes seleccionar exactamente 2 aparejos.");
        return;
      }
      const cantidadesSeleccionadas = Object.values(cantidades).filter(qty => qty > 0);
      if (cantidadesSeleccionadas.length > 2 || (cantidadesSeleccionadas.length === 2 && cantidadesSeleccionadas.some(q => q !== 1) && cantidadesSeleccionadas.every(q => q !== 2))) {
        setErrorCantidad("Para 2 maniobras, puedes seleccionar 2 del mismo tipo o 1 de cada tipo.");
        return;
      }
    } else if (maxManiobra === '4') {
      if (totalAparejos !== 4) {
        setErrorCantidad("Debes seleccionar exactamente 4 aparejos.");
        return;
      }
      const cantidadesPositivas = Object.values(cantidades).filter(q => q > 0);
      const numeroDeTiposSeleccionados = Object.keys(cantidades).filter(key => cantidades[key] > 0).length;

      if (numeroDeTiposSeleccionados > 2) {
        setErrorCantidad("Para 4 maniobras, solo puedes seleccionar un máximo de dos tipos de aparejos.");
        return;
      }

      const cantidadesPorTipo = Object.values(cantidades).filter(q => q > 0);
      if (numeroDeTiposSeleccionados === 2 && (!cantidadesPorTipo.every(q => q === 2))) {
        setErrorCantidad("Para 4 maniobras con dos tipos, debes seleccionar 2 de cada tipo.");
        return;
      }

      if (numeroDeTiposSeleccionados === 1 && cantidadesPorTipo[0] !== 4) {
        setErrorCantidad("Para 4 maniobras con un solo tipo, debes seleccionar 4 de ese tipo.");
        return;
      }
    } else if (parseInt(maxManiobra, 10) > 0 && totalAparejos !== parseInt(maxManiobra, 10)) {
      setErrorCantidad(`Debes seleccionar exactamente ${maxManiobra} aparejos.`);
      return;
    } else if (maxManiobra === '0' && totalAparejos > 0) {
      setErrorCantidad("La cantidad de maniobras debe ser 0.");
      return;
    }

    onSelect({ type: tipoManiobra, cantidades });
    closeBottomSheet();
  };

  const renderLista = (tipo) => {
    if (mostrarLista !== tipo) return null;

    const grado8Diametros = eslingaData.grado8.diametros.sort((a, b) => parseInt(a) - parseInt(b));
    const grado10Diametros = eslingaData.grado10.diametros.sort((a, b) => parseInt(a) - parseInt(b));
    const estroboDiametros = estroboData.diametros.sort((a, b) => parseInt(a) - parseInt(b));

    return (
      <ScrollView style={styles.listaContainer} contentContainerStyle={{ flexGrow: 1 }}>
        {tipo === 'Eslinga' && (
          <>
            {grado8Diametros.length > 0 && <Text style={styles.textoGrado}>Grado 8 (80)</Text>}
            {grado8Diametros.map((diametro) => (
              <View key={`grado8-${diametro}`} style={styles.listaItem}>
                <Text style={styles.textoDiametro}>{diametro} mm</Text>
                <View style={styles.contadorContainer}>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, -1, 'grado8')}>
                    <Text style={styles.botonTexto}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cantidadTexto}>{cantidades[`${diametro}-grado8`] || 0}</Text>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, 1, 'grado8')}>
                    <Text style={styles.botonTexto}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {grado10Diametros.length > 0 && <Text style={styles.textoGrado}>Grado 10 (100)</Text>}
            {grado10Diametros.map((diametro) => (
              <View key={`grado10-${diametro}`} style={styles.listaItem}>
                <Text style={styles.textoDiametro}>{diametro} mm</Text>
                <View style={styles.contadorContainer}>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, -1, 'grado10')}>
                    <Text style={styles.botonTexto}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cantidadTexto}>{cantidades[`${diametro}-grado10`] || 0}</Text>
                  <TouchableOpacity style={styles.botonContador} onPress={() => handleChangeCantidad(diametro, 1, 'grado10')}>
                    <Text style={styles.botonTexto}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {tipo === 'Estrobo' &&
          estroboDiametros.map((diametro) => (
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
          ))}
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

        {errorCantidad && <Text style={styles.errorText}>{errorCantidad}</Text>}

        <View style={{ flexGrow: 1 }} />
        <Components.Button label="Confirmar" onPress={handleConfirmar} style={{ margin: 20, top: -10, left: 10 }} />
      </Animated.View>
    </Modal>
  );
};

export default BSManiobra;