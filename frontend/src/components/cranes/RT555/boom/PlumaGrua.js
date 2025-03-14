import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledView from '../../UI/StyledView';

const PlumaGrua = () => (
  <View style={styles.container}>
    <StyledView
      width={1680}
      height={25}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      borderColor="#000"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 900,
    right: 40,
    width: 400,
    height: 100,
    transform: [{ rotate: '75deg' }],
    alignItems: 'center',
  },
});

export default PlumaGrua;
