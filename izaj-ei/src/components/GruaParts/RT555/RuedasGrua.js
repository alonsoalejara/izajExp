import React from 'react';
import { View } from 'react-native';
import WheelLayer from '../../Common/WheelLayer';

export default function RuedasGrua() {
  return (
    <View style={{ top: 100, left: 10 }}>
      {/* Ruedas traseras */}
      <WheelLayer position={{ bottom: 40.2, left: -30.6 }} />
      {/* Ruedas delanteras */}
      <WheelLayer position={{ bottom: 40.2, left: -160 }} />
    </View>
  );
}