import React from 'react';
import { View, StyleSheet } from 'react-native';

function CablesGrua() {
  return (
    <View style={styles.cablesContainer}>
      <View style={styles.cable} />
      <View style={[styles.cable, { left: -376 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  cablesContainer: {
    position: 'absolute',
    left: 16,
    bottom: 0,
  },
  cable: {
    width: 1.5,
    height: 200,
    backgroundColor: '#0000aa',
    position: 'absolute',
    left: -364,
    bottom: 1630,
  },
});

export default CablesGrua;
