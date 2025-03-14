import React from 'react';
import StyledView from '../../../UI/StyledView';
import { View } from 'react-native';

const GuardaCableado = () => (
  <View style={{ position: 'absolute' }}>
    <StyledView
      width={19}
      height={20}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      borderColor="#000"
      bottom={1824.5}
      right={330}
      transform={[{ rotate: '75deg' }]}
    />
    <StyledView
      width={14}
      height={20}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      borderColor="#000"
      bottom={1823}
      right={340}
      transform={[{ rotate: '75deg' }]}
    />
    <StyledView
      width={15}
      height={16.1}
      backgroundColor="#ffcc00"
      borderWidth={1.1}
      bottom={1826}
      right={333.2}
      transform={[{ rotate: '-75deg' }]}
    />
  </View>
);

export default GuardaCableado;
