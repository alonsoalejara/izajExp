import React from 'react';
import { View } from 'react-native';
import StyledView from '../../../UI/StyledView';

const RuedasPluma = () => (
  <View style={{ position: 'absolute' }}>
    <StyledView
      width={20}
      height={20}
      backgroundColor="#868f74"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={1832}
      right={327}
      transform={[{ rotate: '75deg' }]}
    />
    <StyledView
      width={16}
      height={16}
      backgroundColor="#d7e3bf"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={1834}
      right={328.8}
      transform={[{ rotate: '75deg' }]}
    />
    <StyledView
      width={20}
      height={20}
      backgroundColor="#868f74"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={1824}
      right={345}
      transform={[{ rotate: '75deg' }]}
    />
    <StyledView
      width={16}
      height={16}
      backgroundColor="#d7e3bf"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={1826}
      right={347}
      transform={[{ rotate: '75deg' }]}
    />
  </View>
);

export default RuedasPluma;
