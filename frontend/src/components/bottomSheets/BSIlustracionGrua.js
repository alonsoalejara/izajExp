import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Components from '../Components.index';
import styles from '../../styles/BottomSheetStyles';
import GruaIllustration from '../../components/cranes/UI/GruaIllustration';
import { getGruaIllustrationStyle } from '../../utils/gruaStyles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSIlustracionGrua = ({
  isVisible,
  onClose,
  craneName,
  alturaType,
  inclinacion = 75,
  radioTrabajoMaximo,
}) => {
  // Crea la variable largoPluma, asegurando que tenga el formato 'X.X m'
  // Esto es necesario para que el switch en getGruaIllustrationStyle funcione.
  const largoPluma = alturaType ? `${alturaType} m` : 'N/A';

  // useEffect para registrar los valores de las props cuando cambian
  useEffect(() => {
    if (isVisible) {
      console.log("Valores recibidos en BSIlustracionGrua:");
      console.log("largoPluma (obtenido de alturaType y formateado):", largoPluma);
      console.log("alturaType (sin formato):", alturaType);
      console.log("inclinacion:", inclinacion);
      console.log("radioTrabajoMaximo:", radioTrabajoMaximo);
    }
  }, [isVisible, largoPluma, alturaType, inclinacion, radioTrabajoMaximo]);

  const bottomSheetHeight = SCREEN_HEIGHT * 0.9;
  const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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

  useEffect(() => {
    if (isVisible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]);

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
        <View style={styles.dragLine} />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{craneName}</Text>
        </View>
        <GruaIllustration
          // Ahora pasamos la variable formateada a GruaIllustration
          alturaType={largoPluma} 
          inclinacion={inclinacion}
          radioTrabajoMaximo={radioTrabajoMaximo}
          style={getGruaIllustrationStyle(largoPluma)}
        />
        <Components.Button
          label="Cerrar"
          onPress={closeBottomSheet}
          style={{ marginTop: 30, alignSelf: 'center', right: 26 }}
        />
      </Animated.View>
    </Modal>
  );
};

export default BSIlustracionGrua;