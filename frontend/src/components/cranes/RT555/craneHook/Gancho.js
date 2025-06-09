import React from 'react';
import { View, StyleSheet } from 'react-native';

// Dimensiones originales del gancho
const ORIGINAL_CONTAINER_WIDTH = 150;
const ORIGINAL_CONTAINER_HEIGHT = 150;

// Especificaciones originales de cada parte del gancho
const HOOK_PARTS_ORIGINAL_SPECS = {
  top: { bottom: 50.3, left: 62, width: 28, height: 100 },
  right: { bottom: 14, right: 28, width: 90, height: 80 },
  left: { bottom: 50, left: 89, width: 60, height: 100, rotate: '-16deg' },
  center: { bottom: 0, left: 12, width: 130, height: 110 },
};

export default function Gancho({
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
              borderRadius: 100,
            },
          ]}
        />
        {/* Parche centro */}
        <View
          style={[
            styles.absolutePosition,
            {
              backgroundColor: 'white',
              bottom: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.right.bottom),
              right: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.right.right),
              width: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.right.width),
              height: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.right.height),
              borderRadius: 100,
            },
          ]}
        />
        {/* Parche forma de gancho */}
        <View
          style={[
            styles.absolutePosition,
            {
              backgroundColor: 'white',
              bottom: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.left.bottom),
              left: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.left.left),
              width: scaleValueX(HOOK_PARTS_ORIGINAL_SPECS.left.width),
              height: scaleValueY(HOOK_PARTS_ORIGINAL_SPECS.left.height),
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
