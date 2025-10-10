import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Line, Polygon } from 'react-native-svg';
import plumaIndicatorMap from '../../../data/plumaIndicatorMap';
import textoIndicatorMap from '../../../data/textoIndicatorMap';

export default function PlumaIndicator({ largoPluma = '10.5 m', inclinacion = 75 }) {
  const position = plumaIndicatorMap[largoPluma]?.[inclinacion];
  const textoPos = textoIndicatorMap[largoPluma]?.[inclinacion];

  if (!position || !textoPos) return null;

  const { top, left, width } = position;
  const { top: textTop, left: textLeft } = textoPos;

  const scaleFactors = {
    '10.5 m': 1,
    '15.2 m': 1.5,
    '19.8 m': 2.1,
    '24.3 m': 2.55,
    '26.9 m': 3.35,
    '33.5 m': 4,
  };

  const scale = scaleFactors[largoPluma] || 1;

  // 🔹 Nuevo factor para ajustar tamaño de las flechas fácilmente
  const arrowScale = 0.5; // 1 = tamaño original, 0.5 = mitad del tamaño
  const arrowSize = 300 * scale;
  const strokeWidth = 3 * scale;

  return (
    <>
      {/* 🔹 Línea rotada */}
      <View
        style={[
          styles.container,
          { top, left, transform: [{ rotate: `${inclinacion}deg` }] },
        ]}
      >
        <Svg height={40 * scale} width={width + arrowSize * 4}>
          <Line
            x1={arrowSize}
            y1={20 * scale}
            x2={width + arrowSize * 2}
            y2={20 * scale}
            stroke="red"
            strokeWidth={strokeWidth}
          />
          {/* 🔹 Flechas más pequeñas y proporcionales */}
          <Polygon
            points={`${arrowSize},${20 * scale} ${arrowSize + 30 * arrowScale * scale},${10 * arrowScale * scale} ${arrowSize + 30 * arrowScale * scale},${30 * arrowScale * scale}`}
            fill="red"
          />
          <Polygon
            points={`${width + arrowSize * 2},${20 * scale} ${width + arrowSize * 2 - 30 * arrowScale * scale},${10 * arrowScale * scale} ${width + arrowSize * 2 - 30 * arrowScale * scale},${30 * arrowScale * scale}`}
            fill="red"
          />
        </Svg>
      </View>

      {/* 🔹 Texto horizontal */}
      <View style={{ position: 'absolute', top: textTop, left: textLeft }}>
        <Text style={styles.label}>{largoPluma}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'left center',
  },
  label: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 52,
  },
});
