import React from 'react';
import StyledView from '../../UI/StyledView';
import { View } from 'react-native';

const RuedasPluma = () => (
  <View style={{ position: 'absolute' }}>
    <StyledView
      width={16}
      height={16}
      backgroundColor="#868f74"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={832}
      right={327}
      transform={[{ rotate: '62deg' }]}
    />
    <StyledView
      width={12}
      height={12}
      backgroundColor="#d7e3bf"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={834}
      right={328.8}
      transform={[{ rotate: '62deg' }]}
    />
    <StyledView
      width={16}
      height={16}
      backgroundColor="#868f74"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={824}
      right={345}
      transform={[{ rotate: '62deg' }]}
    />
    <StyledView
      width={12}
      height={12}
      backgroundColor="#d7e3bf"
      borderRadius={50}
      borderWidth={1.1}
      borderColor="#000"
      bottom={826}
      right={347}
      transform={[{ rotate: '62deg' }]}
    />
  </View>
);

export default RuedasPluma;
