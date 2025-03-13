import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Polygon, Defs, RadialGradient, Stop, Circle, Line } from 'react-native-svg';

const RenderForma = ({ forma, dimensiones }) => {
  // Función para renderizar las dimensiones solo con nombre, sin el valor numérico
  const renderDimension = (label, position) => {
    return (
      <>
        <Line x1={position.x1} y1={position.y1} x2={position.x2} y2={position.y2} stroke="black" strokeWidth="1" />
        <Text x={position.textX} y={position.textY} fontSize="10" fill="black" style={position.textStyle}>
          {label}
        </Text>
      </>
    );
  };

  switch (forma) {
    case 'Cuadrado':
      return (
        <Svg top="-5" height="120" width="120" viewBox="0 0 100 100">
          {/* Cuadrado con líneas de largo, ancho y profundidad */}
          <Polygon points="20,20 70,20 90,40 40,40" fill="lightgray" stroke="black" />
          <Polygon points="40,40 90,40 90,90 40,90" fill="gray" stroke="black" />
          <Polygon points="20,20 40,40 40,90 20,70" fill="darkgray" stroke="black" />
          
          {/* Líneas representando dimensiones sin valores numéricos */}
          {renderDimension('Largo', { x1: 20, y1: 11, x2: 70, y2: 11, textX: 10, textY: 75, textStyle: { top: 70, left: 130 } })}
          {renderDimension('Ancho', { x1: 100, y1: 40, x2: 100, y2: 90, textX: 75, textY: 19, textStyle: { top: -9, right: 20 } })}
          {renderDimension('Profundidad', { x1: 3, y1: 68, x2: 25, y2: 90.5, textX: 105, textY: 65, textStyle: { top: 65, right: 60 } })}
        </Svg>
      );

    case 'Rectángulo':
      return (
        <Svg top="-5" height="140" width="180" viewBox="0 0 150 100">
          {/* Rectángulo con líneas de largo, ancho y profundidad */}
          <Polygon points="20,20 100,20 130,50 50,50" fill="lightgray" stroke="black" />
          <Polygon points="50,50 130,50 130,90 50,90" fill="gray" stroke="black" />
          <Polygon points="20,20 50,50 50,90 20,60" fill="darkgray" stroke="black" />

          {/* Líneas representando dimensiones sin valores numéricos */}
          {renderDimension('Largo', { x1: 140, y1: 50, x2: 140, y2: 91, textX: 10, textY: 75, textStyle: { top: 86, left: 180 } })}
          {renderDimension('Ancho', { x1: 100, y1: 10, x2: 20, y2: 10, textX: 45, textY: 55, textStyle: { top: 0, right: 20 } })}
          {renderDimension('Profundidad', { x1: 3, y1: 68, x2: 25, y2: 90.5, textX: 105, textY: 65, textStyle: { top: 75, right: 60 } })}
        </Svg>
      );

    case 'Círculo':
      return (
        <Svg height="100" width="100">
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
              <Stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <Stop offset="50%" stopColor="gray" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="black" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="40" fill="url(#grad)" stroke="black" />

          {/* Líneas representando el diámetro sin valores numéricos */}
          {renderDimension('Diámetro', { x1: 10, y1: 50, x2: 90, y2: 50, textX: 50, textY: 45, textStyle: { top: 41, right: 55 } })}
        </Svg>
      );

    default:
      return <View style={{ width: 315, height: 150, backgroundColor: 'transparent', borderRadius: 10 , borderWidth: 1, borderColor: '#ddd' }} />;
  }
};

export default RenderForma;
