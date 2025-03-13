import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledView from '../../UI/StyledView';

const PlumaGrua = () => (
  <View style={styles.container}>
    <StyledView
      width={730}
      height={18}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      borderColor="#000"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 438,
    right: 1,
    width: 400,
    height: 100,
    transform: [{ rotate: '62deg' }],
    alignItems: 'center',
  },
});

export default PlumaGrua;
