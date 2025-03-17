import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledView from '../../UI/StyledView';

// Mapeo de dimensiones para cada tipo de altura
const dimensionsMap = {
  altura33:  {
    arm: { width: 1680, height: 25 },
    container: { bottom: 900, right: 40 },
  },
  altura26: {
    arm: { width: 1550, height: 25 },
    container: { bottom: 850, right: -30 },
  },
  altura24: {
    arm: { width: 1150, height: 25 },
    container: { bottom: 660, right: -60 },
  },
  altura19: {
    arm: { width: 960, height: 25 },
    container: { bottom: 570, right: -90 },
  },
  altura15: {
    arm: { width: 730, height: 25 },
    container: { bottom: 450, right:  -120 },
  },
  altura10: {
    arm: { width: 520, height: 25 },
    container: { bottom: 350, right: -135 },
  },
};

const PlumaGrua = ({ alturaType = 'altura10' }) => {
  const { arm, container } = dimensionsMap[alturaType] || dimensionsMap.altura10;

  return (
    <View style={[styles.container, container]}>
      <StyledView
        width={arm.width}
        height={arm.height}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 400,
    height: 100,
    transform: [{ rotate: '75deg' }],
    alignItems: 'center',
  },
});

export default PlumaGrua;

