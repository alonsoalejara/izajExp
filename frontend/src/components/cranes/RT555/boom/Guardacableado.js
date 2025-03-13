import React from 'react';
import StyledView from '../../UI/StyledView';
import { View } from 'react-native';

const GuardaCableado = () => (
  <View style={{ position: 'absolute' }}>
    <StyledView
      width={15}
      height={16}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      borderColor="#000"
      bottom={824.5}
      right={330}
      transform={[{ rotate: '62deg' }]}
    />
    <StyledView
      width={10}
      height={16}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      borderColor="#000"
      bottom={823}
      right={340}
      transform={[{ rotate: '62deg' }]}
    />
    <StyledView
      width={11}
      height={12.1}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      bottom={826}
      right={333.2}
      transform={[{ rotate: '-27deg' }]}
    />
  </View>
);

export default GuardaCableado;
