import React from 'react';
import { View } from 'react-native';

export default function WheelLayer({ position }) {
  return (
    <View style={{ position: 'absolute', ...position }}>
      <View
        style={{
          width: 68,
          height: 68,
          borderRadius: 75,
          backgroundColor: '#939393',
          borderWidth: 1,
          borderColor: '#000',
          position: 'absolute',
          bottom: 110,
          left: 0,
        }}
      />
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 67,
          backgroundColor: '#a09f92',
          borderWidth: 1,
          borderColor: '#000',
          position: 'absolute',
          bottom: 114,
          left: 4,
        }}
      />
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 32,
          backgroundColor: '#939393',
          borderWidth: 1,
          borderColor: '#000',
          position: 'absolute',
          bottom: 129,
          left: 18,
        }}
      />
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 30,
          backgroundColor: '#afb78d',
          borderWidth: 1,
          borderColor: '#000',
          position: 'absolute',
          bottom: 131.5,
          left: 21,
        }}
      />
      <View
        style={{
          width: 13,
          height: 13,
          borderRadius: 15,
          backgroundColor: '#e8e3c7',
          borderWidth: 1,
          borderColor: '#000',
          position: 'absolute',
          bottom: 137,
          left: 27,
        }}
      />
    </View>
  );
}