import React from 'react';
import { View, StyleSheet } from 'react-native';

// Dimensiones originales del gancho
const ORIGINAL_CONTAINER_WIDTH = 150;
const ORIGINAL_CONTAINER_HEIGHT = 150;

// Especificaciones originales de cada parte del gancho
const HOOK_PARTS_ORIGINAL_SPECS = {
  top: { bottom: 100, left: 4, width: 146, height: 40 },
  right: { bottom: 20, right: 12, width: 60, height: 100, rotate: '16deg' },
  left: { bottom: 22, left: 15, width: 60, height: 100, rotate: '-16deg' },
  bottom: { bottom: 15, left: 33, width: 90, height: 70 },
  center: { bottom: 30, left: 30, width: 90, height: 90 },
};

export default function GanchoGrua({
  position,
  containerWidth = ORIGINAL_CONTAINER_WIDTH,
  containerHeight = ORIGINAL_CONTAINER_HEIGHT,
  color = 'orange', // Color dinámico
}) {
  // Escalado proporcional
  const scaleX = containerWidth / ORIGINAL_CONTAINER_WIDTH;
  const scaleY = containerHeight / ORIGINAL_CONTAINER_HEIGHT;

  const scaleValueX = (value) => value * scaleX;
  const scaleValueY = (value) => value * scaleY;

  return (
    <View style={[{ position: 'absolute' }, position]}>
      <View
        style={[
          styles.containerBase,
          {
            width: containerWidth,
            height: containerHeight,
            bottom: 110,
            right: 60,
          },
        ]}
      >
        {/* Parte superior */}
        <View
          style={[
            styles.absolutePosition,
            {
              backgroundColor: color,
              bottom: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.top.bottom),
              left: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.top.left),
              width: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.top.width),
              height: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.top.height),
            },
          ]}
        />
        {/* Lado derecho */}
        <View
          style={[
            styles.absolutePosition,
            {
              backgroundColor: color,
              bottom: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.right.bottom),
              right: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.right.right),
              width: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.right.width),
              height: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.right.height),
              transform: [{ rotate: HOOK_PARTS_ORIGINAL_SPECS.right.rotate }],
            },
          ]}
        />
        {/* Lado izquierdo */}
        <View
          style={[
            styles.absolutePosition,
            {
              backgroundColor: color,
              bottom: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.left.bottom),
              left: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.left.left),
              width: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.left.width),
              height: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.left.height),
              transform: [{ rotate: HOOK_PARTS_ORIGINAL_SPECS.left.rotate }],
            },
          ]}
        />
        {/* Parte baja */}
        <View
          style={[
            styles.absolutePosition,
            {
              backgroundColor: color,
              bottom: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.bottom.bottom),
              left: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.bottom.left),
              width: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.bottom.width),
              height: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.bottom.height),
            },
          ]}
        />
        {/* Parte centro */}
        <View
          style={[
            styles.absolutePosition,
            {
              backgroundColor: color,
              bottom: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.center.bottom),
              left: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.center.left),
              width: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.center.width),
              height: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.center.height),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBase: {
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolutePosition: {
    position: 'absolute',
  },
});
