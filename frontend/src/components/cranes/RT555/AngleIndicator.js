import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

// 📍 Mapa de posiciones según altura e inclinación
const anglePositionMap = {
  altura10: {
    10: { top: -290, left: -450 },
    20: { top: -290, left: -395 },
    30: { top: -295, left: -270 },
    40: { top: -290, left: -200 },
    50: { top: -280, left: -200 },
    60: { top: -280, left: -190 },
    64: { top: -280, left: -115 },
    75: { top: -290, left: -110 },
  },
  altura15: {
    10: { top: -300, left: -590 },
    20: { top: -300, left: -405 },
    25: { top: -300, left: -335 },
    30: { top: -300, left: -295 },
    40: { top: -300, left: -230 },
    45: { top: -300, left: -195 },
    50: { top: -305, left: -190 },
    57: { top: -300, left: -175 },
    60: { top: -300, left: -150 },
    63: { top: -300, left: -150 },
    70: { top: -295, left: -155 },
    72: { top: -295, left: -115 },
    75: { top: -300, left: -100 },
  },
  altura19: {
    10: { top: -300, left: -530 },
    20: { top: -300, left: -380 },
    30: { top: -300, left: -290 },
    32: { top: -300, left: -270 },
    36: { top: -300, left: -250 },
    40: { top: -300, left: -260 },
    46: { top: -300, left: -180 },
    50: { top: -300, left: -185 },
    54: { top: -300, left: -160 },
    56: { top: -300, left: -160 },
    60: { top: -300, left: -170 },
    67: { top: -300, left: -120 },
    70: { top: -300, left: -140 },
    75: { top: -300, left: -90 },
  },
  altura24: {
    10: { top: -300, left: -450 },
    20: { top: -300, left: -420 },
    22: { top: -300, left: -380 },
    30: { top: -300, left: -310 },
    35: { top: -300, left: -250 },
    40: { top: -300, left: -250 },
    42: { top: -300, left: -200 },
    46: { top: -300, left: -215 },
    50: { top: -300, left: -195 },
    53: { top: -300, left: -175 },
    56: { top: -300, left: -175 },
    60: { top: -300, left: -155 },
    62: { top: -300, left: -155 },
    64: { top: -300, left: -145 },
    67: { top: -300, left: -145 },
    70: { top: -300, left: -130 },
    72: { top: -300, left: -130 },
    75: { top: -300, left: -105 },
  },
  altura26: {
    10: { top: -300, left: -470 },
    20: { top: -300, left: -470 },
    25: { top: -300, left: -380 },
    30: { top: -300, left: -280 },
    33: { top: -300, left: -310 },
    37: { top: -300, left: -260 },
    40: { top: -300, left: -230 },
    43: { top: -300, left: -230 },
    47: { top: -300, left: -230 },
    50: { top: -300, left: -190 },
    52: { top: -300, left: -190 },
    55: { top: -300, left: -180 },
    58: { top: -300, left: -180 },
    60: { top: -300, left: -150 },
    61: { top: -300, left: -150 },
    63: { top: -300, left: -120 },
    65: { top: -300, left: -130 },
    68: { top: -300, left: -120 },
    70: { top: -300, left: -140 },
    73: { top: -300, left: -110 },
    75: { top: -300, left: -105 },
  },
  altura33: {
    10: { top: -300, left: -570 },
    12: { top: -300, left: -660 },
    16: { top: -300, left: -530 },
    18: { top: -300, left: -470 },
    22: { top: -300, left: -380 },
    28: { top: -300, left: -280 },
    32: { top: -300, left: -250 },
    37: { top: -300, left: -240 },
    39: { top: -300, left: -220 },
    42: { top: -300, left: -210 },
    43: { top: -300, left: -230 },
    44: { top: -300, left: -210 },
    47: { top: -300, left: -190 },
    48: { top: -300, left: -190 },
    50: { top: -300, left: -180 },
    54: { top: -300, left: -170 },
    56: { top: -300, left: -160 },
    58: { top: -300, left: -160 },
    60: { top: -300, left: -140 },
    62: { top: -300, left: -140 },
    64: { top: -300, left: -120 },
    66: { top: -300, left: -130 },
    68: { top: -300, left: -120 },
    69: { top: -300, left: -120 },
    72: { top: -300, left: -110 },
    75: { top: -300, left: -105 },
  },
};

export default function AngleIndicator({ alturaType = 'altura10', inclinacion = 75 }) {
  const position = anglePositionMap?.[alturaType]?.[inclinacion] || { top: -290, left: -110 };

  // 🎯 Solo cambia el tamaño del arco si el ángulo es 10°
  const radius = inclinacion === 10 ? 45 : 80;
  const pathData = `M10,90 A${radius},${radius} 0 0,1 ${radius + 10},${100 - radius}`;

  // 🔽 Si es 10°, bajamos un poco el texto
  const textOffset = inclinacion === 10 ? 10 : 0;

  return (
    <View style={[styles.container, position]}>
      <Svg height="110" width="110" viewBox="0 0 100 100">
        <Path d={pathData} stroke="red" strokeWidth="3" fill="none" />
      </Svg>
      <Text style={[styles.text, { top: -55 + textOffset }]}>{inclinacion}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 52,
    left: 20,
  },
});
