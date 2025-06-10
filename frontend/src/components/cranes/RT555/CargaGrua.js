import React from 'react';
import { View } from 'react-native';

export default function CargaGrua() {
  return (
    <View style={{ top: -340, left: -143 }}>
      {/* Cuadrado */}
      <View
        style={{
          position: 'absolute',
          width: 70,
          height: 70,
          backgroundColor: '#888',
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Círculo */}
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            width: 100,
            height: 100,
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderRadius: 100,
          }}
        />
      </View>
    </View>
  );
}