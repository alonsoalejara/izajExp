import React from 'react';
import { View } from 'react-native';

const StyledView = ({
  width,
  height,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  transform,
  position,
  left,
  bottom,
  right,
}) => (
  <View
    style={{
      width,
      height,
      backgroundColor,
      borderRadius,
      borderWidth,
      borderColor,
      position: position || 'absolute',
      left,
      bottom,
      right,
      transform,
    }}
  />
);

export default StyledView;