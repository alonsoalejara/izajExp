import React from 'react';
import { View } from 'react-native';
import PlumaGrua from './PlumaGrua';
import CableStorage from './cableStorage/cableStorage.index';

const Boom = ({ alturaType = 'altura10', inclinacion = 75, radioTrabajoMaximo }) => (
  <View>
    <PlumaGrua alturaType={alturaType} inclinacion={inclinacion} radioTrabajoMaximo={radioTrabajoMaximo} />
    <CableStorage alturaType={alturaType} inclinacion={inclinacion} />
  </View>
);

export default Boom;
