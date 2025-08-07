import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Components from '../Components.index';
import styles from '../../styles/BottomSheetStyles';
import GruaIllustration from '../../components/cranes/UI/GruaIllustration';
import { getGruaIllustrationStyle } from '../../utils/gruaStyles';
import { getAlturaType } from '../../logic/alturaLogic';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSIlustracionGrua = ({
  isVisible,
  onClose,
  craneName,
  alturaType,
  inclinacion: propInclinacion = '75°',
  radioTrabajoMaximo,
}) => {
  const largoPluma = alturaType ? `${alturaType} m` : '';

  const numericInclinacion = parseFloat(String(propInclinacion).replace('°', '')) || 75;

  const bottomSheetHeight = SCREEN_HEIGHT * 0.82;
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

        <View style={localStyles.visualizationGruaContainer}>
          {!craneName ? (
            <Text style={[styles.labelText, { color: '#ccc' }]}>
              Debe seleccionar una grúa para visualizar.
            </Text>
          ) : craneName === 'Terex RT555' ? (
            <View style={{ flex: 1, position: 'relative' }}>
              <GruaIllustration
                alturaType={getAlturaType(largoPluma)} 
                inclinacion={numericInclinacion}
                radioTrabajoMaximo={radioTrabajoMaximo}
                style={getGruaIllustrationStyle(largoPluma)}
              />
            </View>
          ) : (
            <Text style={styles.labelText}>No disponible</Text>
          )}
        </View>
        
        <Components.Button
          label="Cerrar"
          onPress={closeBottomSheet}
          style={{ marginTop: 30, alignSelf: 'center', right: 26 }}
        />
      </Animated.View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  visualizationGruaContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    minHeight: 250,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 70,
  },
});

export default BSIlustracionGrua;
