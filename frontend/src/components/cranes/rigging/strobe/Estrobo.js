import React from 'react';
import { View } from 'react-native';
import BaseEstrobo from './BaseEstrobo';
import GuardacaboEstrobo from './GuardacaboEstrobo';

const Estrobo = () => {
  return (
    <View style={{ position: 'absolute', bottom: 0, left: 20 }}>
      {/* Base del Estrobo */}
      <BaseEstrobo />

      {/* Guardacabo y Casquillos */}
      <GuardacaboEstrobo />
    </View>
  );
};

export default Estrobo;
