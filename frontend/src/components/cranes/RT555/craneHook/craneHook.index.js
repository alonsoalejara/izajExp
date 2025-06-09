import React from 'react';
import { View } from 'react-native';
import BaseGancho from './BaseGancho';
import Gancho from './Gancho';

const CraneHook = ({ position = { bottom: 301, left: -28 } }) => (
  <View style={[{ position: 'absolute' }, position]}>
    {/* Base gancho naranja tamaño normal */}
    <BaseGancho
      position={{ bottom: 11, left: -5 }}
      containerWidth={30}
      containerHeight={30}
      color="black"
    />

    {/* Borde negro de la base */}
    <BaseGancho
      position={{ bottom: 13, left: -7 }}
      containerWidth={25}
      containerHeight={25}
      color="orange"
    />

    {/* Gancho naranja tamaño normal */}
    <Gancho
      position={{ bottom: -16, left: -7 }}
      containerWidth={25}
      containerHeight={30}
      color="orange"
    />
  </View>
);

export default CraneHook;
