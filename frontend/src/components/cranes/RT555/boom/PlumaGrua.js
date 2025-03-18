import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledView from '../../UI/StyledView';

// Mapeo de estilos del contenedor según altura y ángulo
const containerDimensionsMap = {
  altura33: {
    "75": { bottom: 900, right: 40 },
    "70": { bottom: 890, right: 85 },
    "60": { bottom: 820, right: 205 },
    "50": { bottom: 720, right: 330 },
    "40": { bottom: 620, right: 425 },
    "30": { bottom: 520, right: 480 },
    "20": { bottom: 370, right: 550 },
    "10": { bottom: 240, right: 550 },
  },
  altura26: {
    "75": { bottom: 850, right: -30 },
    "70": { bottom: 840, right: 35 },
    "60": { bottom: 770, right: 155 },
    "50": { bottom: 670, right: 280 },
    "40": { bottom: 570, right: 375 },
    "30": { bottom: 470, right: 430 },
    "20": { bottom: 340, right: 500 },
    "10": { bottom: 210, right: 460 },
  },
  altura24: {
    "75": { bottom: 660, right: -60 },
    "70": { bottom: 650, right: 15 },
    "60": { bottom: 580, right: 135 },
    "50": { bottom: 530, right: 200 },
    "40": { bottom: 460, right: 255 },
    "30": { bottom: 370, right: 320 },
    "20": { bottom: 280, right: 335 },
    "10": { bottom: 190, right: 350 },
  },
  altura19: {
    "75": { bottom: 570, right: -90 },
    "70": { bottom: 560, right: -15 },
    "60": { bottom: 490, right: 70 },
    "50": { bottom: 440, right: 135 },
    "40": { bottom: 370, right: 190 },
    "30": { bottom: 320, right: 215 },
    "20": { bottom: 250, right: 200 },
    "10": { bottom: 170, right: 255 },
  },
  altura15: {
    "75": { bottom: 450, right: -120 },
    "70": { bottom: 440, right: -45 },
    "60": { bottom: 420, right: 20 },
    "50": { bottom: 380, right: 65 },
    "40": { bottom: 320, right: 110 },
    "30": { bottom: 260, right: 125 },
    "20": { bottom: 200, right: 140 },
    "10": { bottom: 140, right: 155 },
  },
  altura10: {
    "75": { bottom: 350, right: -135 },
    "70": { bottom: 340, right: -90 },
    "60": { bottom: 300, right: -45 },
    "50": { bottom: 280, right: -20 },
    "40": { bottom: 240, right: 5 },
    "30": { bottom: 200, right: 0 },
    "20": { bottom: 150, right: -5 },
    "10": { bottom: 100, right: 20 },
  },
};

// Mapeo de las dimensiones del brazo por altura
const armDimensionsMap = {
  altura33: { width: 1680, height: 25 },
  altura26: { width: 1550, height: 25 },
  altura24: { width: 1150, height: 25 },
  altura19: { width: 960, height: 25 },
  altura15: { width: 730, height: 25 },
  altura10: { width: 520, height: 25 },
};

const PlumaGrua = ({ alturaType = 'altura10', inclinacion = 75 }) => {
  // Convertir el ángulo a string para buscar en el mapa
  const angleKey = String(inclinacion);
  const containerStyle =
    (containerDimensionsMap[alturaType] && containerDimensionsMap[alturaType][angleKey]) ||
    {};
  const armDimensions = armDimensionsMap[alturaType] || { width: 0, height: 0 };

  return (
    <View style={[styles.container, containerStyle, { transform: [{ rotate: `${inclinacion}deg` }] }]}>
      {armDimensions.width ? (
        <StyledView
          width={armDimensions.width}
          height={armDimensions.height}
          backgroundColor="#ffcc00"
          borderWidth={1.1}
          borderColor="#000"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 400,
    height: 100,
    alignItems: 'center',
  },
});

export default PlumaGrua;
