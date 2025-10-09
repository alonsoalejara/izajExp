import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

// 📍 Mapa de posiciones según altura e inclinación
const anglePositionMap = {
  altura10: {
    10: { top: -250, left: -140 },
    20: { top: -260, left: -135 },
    30: { top: -265, left: -130 },
    40: { top: -270, left: -125 },
    50: { top: -275, left: -120 },
    60: { top: -280, left: -115 },
    70: { top: -285, left: -112 },
    75: { top: -290, left: -110 },
  },
  altura15: {
    10: { top: -300, left: -210 },
    30: { top: -310, left: -205 },
    50: { top: -315, left: -200 },
    60: { top: -320, left: -195 },
    70: { top: -325, left: -190 },
    75: { top: -330, left: -185 },
  },
  altura19: {
    30: { top: -330, left: -250 },
    50: { top: -340, left: -245 },
    60: { top: -345, left: -240 },
    70: { top: -350, left: -235 },
    75: { top: -355, left: -230 },
  },
  altura24: {
    40: { top: -380, left: -280 },
    60: { top: -385, left: -270 },
    70: { top: -390, left: -260 },
    75: { top: -395, left: -255 },
  },
  altura26: {
    50: { top: -420, left: -320 },
    60: { top: -425, left: -310 },
    70: { top: -430, left: -300 },
    75: { top: -435, left: -290 },
  },
  altura33: {
    50: { top: -480, left: -380 },
    60: { top: -490, left: -370 },
    70: { top: -500, left: -360 },
    75: { top: -510, left: -350 },
  },
};

export default function AngleIndicator({ alturaType = 'altura10', inclinacion = 75 }) {
  const position = anglePositionMap?.[alturaType]?.[inclinacion] || { top: -290, left: -110 };

  return (
    <View style={[styles.container, position]}>
      <Svg height="110" width="110" viewBox="0 0 100 100">
        <Path d="M10,90 A80,80 0 0,1 90,10" stroke="red" strokeWidth="3" fill="none" />
      </Svg>
      <Text style={styles.text}>{inclinacion}°</Text>
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
    fontSize: 40,
    top: -60,
    left: 20,
  },
});
