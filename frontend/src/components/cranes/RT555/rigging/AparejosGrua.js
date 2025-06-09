import React from 'react';
import { View } from 'react-native';

export default function AparejosGrua({ containerWidth = 470, containerHeight = 320 }) {
  // Definimos las proporciones del triángulo y la línea central
  const triangleHeightRatio = 0.93; // 93% de la altura del contenedor
  const triangleBaseWidthRatio = 0.5; // 45% de la mitad del ancho del contenedor (total 90%)
  const centralLineWidthRatio = 0.027; // Aproximadamente 2.7% del ancho del contenedor

  const triangleHeight = containerHeight * triangleHeightRatio;
  const triangleBaseWidth = containerWidth * triangleBaseWidthRatio;
  const centralLineWidth = containerWidth * centralLineWidthRatio;

  const borderWidth = 5; // Grosor del borde del triángulo, permanece fijo

  return (
    <View style={{ top: -340, left: -133 }}>
      {/* Cuadrado base de ilustración (el contenedor elástico) */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: containerWidth, // Usa el ancho de las props
          height: containerHeight, // Usa la altura de las props
          backgroundColor: 'transparent',
        }}
      />

      {/* Triángulo de Borde (negro) */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: (containerWidth / 2) - (triangleBaseWidth + borderWidth),
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: triangleBaseWidth + borderWidth,
          borderRightWidth: triangleBaseWidth + borderWidth,
          borderBottomWidth: triangleHeight + borderWidth,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#000',
        }}
      />

      {/* Triángulo Principal (azul) */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: (containerWidth / 2) - triangleBaseWidth,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: triangleBaseWidth,
          borderRightWidth: triangleBaseWidth,
          borderBottomWidth: triangleHeight,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'white',
        }}
      />

      {/* Linea central */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: (containerWidth / 2) - (centralLineWidth / 2),
          width: centralLineWidth,
          height: triangleHeight,
          backgroundColor: 'black',
          borderRadius: 5,
        }}
      />
    </View>
  );
}