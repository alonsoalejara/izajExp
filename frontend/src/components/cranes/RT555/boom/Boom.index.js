import React from 'react';
import { View } from 'react-native';
import PlumaGrua from './PlumaGrua';
import CableStorage from './cableStorage/cableStorage.index';

const Boom = ({ alturaType = 'altura10', inclinacion = 75 }) => (
  <View>
    <PlumaGrua alturaType={alturaType} inclinacion={inclinacion} />
    <CableStorage alturaType={alturaType} />
  </View>
);

export default Boom;
