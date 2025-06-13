import React from 'react';
import { View } from 'react-native';

export default function AparejosGrua({ containerWidth = 470, containerHeight = 320 }) {
  const triangleHeightRatio = 0.93;
  const triangleBaseWidthRatio = 0.5;
  const centralLineWidthRatio = 0.027;

  const triangleHeight = containerHeight * triangleHeightRatio;
  const triangleBaseWidth = containerWidth * triangleBaseWidthRatio;
  const centralLineWidth = containerWidth * centralLineWidthRatio;

  const borderWidth = 5;

  return (
    <View>
      {/* Contenedor base */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: containerWidth,
          height: containerHeight,
          backgroundColor: 'transparent',
        }}
      />

      {/* Triángulo negro borde */}
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

      {/* Triángulo blanco interno */}
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

      {/* Línea central */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: (containerWidth / 2) - (centralLineWidth / 2),
          width: centralLineWidth,
          height: triangleHeight,
          backgroundColor: 'transparent',
          borderRadius: 5,
        }}
      />
    </View>
  );
}
