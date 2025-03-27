import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Polygon, Defs, RadialGradient, Stop, Rect, Ellipse, Line } from 'react-native-svg';

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
          {/* Cuadrado con líneas de largo, ancho y alto */}
          <Polygon points="20,20 70,20 90,40 40,40" fill="lightgray" stroke="black" />
          <Polygon points="40,40 90,40 90,90 40,90" fill="gray" stroke="black" />
          <Polygon points="20,20 40,40 40,90 20,70" fill="darkgray" stroke="black" />
          
          {/* Líneas representando dimensiones sin valores numéricos */}
          {renderDimension('Z: Alto', { x1: 25, y1: 11, x2: 70, y2: 11, textX: 10, textY: 75, textStyle: { top: 70, left: 130 } })}
          {renderDimension('X: Ancho', { x1: 100, y1: 40, x2: 100, y2: 90, textX: 75, textY: 19, textStyle: { top: -9, right: 20 } })}
          {renderDimension('Y: Largo', { x1: 3, y1: 68, x2: 25, y2: 90.5, textX: 105, textY: 65, textStyle: { top: 65, right: 60 } })}
        </Svg>
      );

    case 'Rectángulo':
      return (
        <Svg top="-5" height="140" width="180" viewBox="0 0 150 100">
          {/* Rectángulo con líneas de largo, ancho y alto */}
          <Polygon points="20,20 100,20 130,50 50,50" fill="lightgray" stroke="black" />
          <Polygon points="50,50 130,50 130,90 50,90" fill="gray" stroke="black" />
          <Polygon points="20,20 50,50 50,90 20,60" fill="darkgray" stroke="black" />

          {/* Líneas representando dimensiones sin valores numéricos */}
          {renderDimension('Z:Alto', { x1: 140, y1: 50, x2: 140, y2: 91, textX: 10, textY: 75, textStyle: { top: 86, left: 180 } })}
          {renderDimension('X:Ancho', { x1: 100, y1: 10, x2: 20, y2: 10, textX: 45, textY: 55, textStyle: { top: 0, right: 20 } })}
          {renderDimension('Y:Largo', { x1: 3, y1: 68, x2: 25, y2: 90.5, textX: 105, textY: 65, textStyle: { top: 75, right: 60 } })}
        </Svg>
      );

      case 'Cilindro':
        return (
          <Svg height="120" width="100" viewBox="0 0 100 120">
            {/* Definición del gradiente (ya no se usa) */}
            <Defs>
              <RadialGradient id="grad" cx="50%" cy="30%" r="50%" fx="50%" fy="30%">
                <Stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <Stop offset="50%" stopColor="gray" stopOpacity="0.8" />
                <Stop offset="100%" stopColor="black" stopOpacity="1" />
              </RadialGradient>
            </Defs>
      
            {/* Cuerpo del cilindro (gris claro) */}
            <Rect x="10" y="30" width="80" height="60" fill="lightgray" stroke="black" />

            {/* Elipse superior (tapa superior, gris) */}
            <Ellipse cx="50" cy="30" rx="40" ry="15" fill="gray" stroke="black" />
      
            {/* Líneas laterales */}
            <Line x1="10" y1="30" x2="10" y2="90" stroke="black" strokeWidth="1" />
            <Line x1="90" y1="30" x2="90" y2="90" stroke="black" strokeWidth="1" />
      
            {/* Elipse inferior (tapa inferior, gris) */}
            <Ellipse cx="50" cy="90" rx="40" ry="15" fill="gray" stroke="black" />
      
            {/* Líneas de dimensiones */}
            {renderDimension('X&Z: Diametro', { x1: 10, y1: 30, x2: 90, y2: 30, textX: 50, textY: 25, textStyle: { top: -40, left: -85 } })}
            {renderDimension('Y: largo', { x1: 95, y1: 30, x2: 95, y2: 90, textX: 105, textY: 60, textStyle: { top: -20, left: 100 } })}
          </Svg>
        );
      
    default:
      return <View style={{ width: 315, height: 150, backgroundColor: 'transparent', borderRadius: 10 , borderWidth: 1, borderColor: '#ddd' }} />;
  }
};

export default RenderForma;
