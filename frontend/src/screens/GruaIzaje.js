import React from 'react';
import { View } from 'react-native';
import GruaIllustration from '../components/GruaIllustration';

export default function GruaIzaje() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Ilustración de la grúa */}
      <GruaIllustration brazoAngle={25} gruaPosX={0} gruaPosY={0} />
    </View>
  );
}
