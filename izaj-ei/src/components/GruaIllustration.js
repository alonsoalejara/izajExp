import React from 'react';
import { View } from 'react-native';

export default function GruaIllustration({ brazoAngle }) {
  return (
    <View
      style={{
        position: 'absolute',
        top: -117,
        left: -15,
      }}
    >
      {/* Ilustración del brazo de la grúa */}
      <View
        style={{
          width: 10,
          height: 130,
          backgroundColor: '#ceb737',
          position: 'absolute',
          top: 150, // Ajuste vertical
          left: 93, // Ajuste horizontal
          transform: [
            { rotate: `${brazoAngle}deg` }, // Usar brazoAngle aquí
            { scaleX: 1.0 },
            { scaleY: 1.9 },
            { translateY: -55 },
          ],
          transformOrigin: 'left center', // Define el origen de transformación
        }}
      />
      
      {/* Ilustración de la base del brazo de la grúa */}
      <View
        style={{
          width: 25,
          height: 25,
          backgroundColor: '#af9c31',
          borderRadius: 50,
          position: 'absolute',
          top: 213,
          left: 78,
        }}
      />
      
      {/* Ilustración de la base de la grúa */}
      <View
        style={{
          width: 83,
          height: 43,
          backgroundColor: '#ddc43a',
          position: 'absolute',
          top: 228,
          left: 21,
        }}
      />
      
      {/* Ilustración de las ruedas de la grúa */}
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 50,
          backgroundColor: 'black',
          position: 'absolute',
          top: 261,
          left: 25,
        }}
      />
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 50,
          backgroundColor: 'black',
          position: 'absolute',
          top: 261,
          left: 78,
        }}
      />
    </View>
  );
}
