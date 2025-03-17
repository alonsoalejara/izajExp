import React from 'react';
import { View } from 'react-native';
import PlumaGrua from './PlumaGrua';
import CableStorage from './cableStorage/cableStorage.index';

const Boom = () => (
  <View>
    <PlumaGrua alturaType="altura10" />
    <CableStorage alturaType="altura10" />
  </View>
);

export default Boom;