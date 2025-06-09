import React from 'react';
import { View } from 'react-native';
import GanchoGrua from './GanchoGrua';

const CraneHook = ({ position = { bottom: 301, left: -28 } }) => (
  <View style={[{ position: 'absolute' }, position]}>
    {/* Gancho naranja tamaño normal */}
    <GanchoGrua
      position={{ bottom: 0, left: 0 }}
      containerWidth={40}
      containerHeight={40}
      color="black"
    />

    {/* Gancho negro más pequeño */}
    <GanchoGrua
      position={{ bottom: 1.1, left: -2.4 }}
      containerWidth={35}
      containerHeight={35}
      color="orange"
    />
  </View>
);

export default CraneHook;
