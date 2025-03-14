import React from 'react';
import { View } from 'react-native';
import GuardaCableado from './Guardacableado';
import RuedasPluma from './RuedasPluma';
import CableGrua from './CableGrua';

const CableStorage = () => (
  <View style={{ position: 'absolute', top: 65, right: 95 }}>
    <GuardaCableado />
    <RuedasPluma />
    <CableGrua />
  </View>
);

export default CableStorage;
