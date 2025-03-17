import React from 'react';
import { View, StyleSheet } from 'react-native';
import GuardaCableado from './Guardacableado';
import RuedasPluma from './RuedasPluma';
import CableGrua from './CableGrua';

// Mapeo de posiciones para cada tipo de altura (valores de ejemplo, ajústalos según tus necesidades)
const storagePositions = {
  altura33: { top: 80, right: 100 },
  altura26: { top: 180, right: 10 },
  altura24: { top: 555, right: -70 },
  altura19: { top: 740, right: -130 },
  altura15: { top: 970, right: -190 },
  altura10: { top: 1170, right: -230 },
};

const CableStorage = ({ alturaType = 'altura10' }) => {
  // Se selecciona el estilo según el tipo recibido, con un valor por defecto
  const positions = storagePositions[alturaType] || storagePositions.altura10;

  return (
    <View style={[styles.container, positions]}>
      <GuardaCableado />
      <RuedasPluma />
      <CableGrua />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default CableStorage;
