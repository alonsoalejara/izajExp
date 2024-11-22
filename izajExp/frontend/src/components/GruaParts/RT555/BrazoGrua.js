import React from 'react';
import { View } from 'react-native';

// Componente para los estilos comunes
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

// Componente BrazoGrua
export default function BrazoGrua() {
  return (
    <View>
      {/* Pluma de la grúa */}
      <StyledView
        width={400}
        height={20}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
        bottom={330}
        right={-124}
        transform={[{ rotate: '62deg' }]}
      />
      <StyledView
        width={170}
        height={19}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
        bottom={582}
        right={125}
        transform={[{ rotate: '62deg' }]}
      />
      <StyledView
        width={90}
        height={17}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
        bottom={698}
        right={226}
        transform={[{ rotate: '62deg' }]}
      />
      <StyledView
        width={90}
        height={16}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
        bottom={778.2}
        right={267.9}
        transform={[{ rotate: '62deg' }]}
      />
      {/* Cuerda y rueda trasera */}
      <StyledView
        width={16}
        height={16}
        backgroundColor="#868f74"
        borderRadius={50}
        borderWidth={1.1}
        borderColor="#000"
        bottom={832}
        right={327}
        transform={[{ rotate: '62deg' }]}
      />
      <StyledView
        width={12}
        height={12}
        backgroundColor="#d7e3bf"
        borderRadius={50}
        borderWidth={1.1}
        borderColor="#000"
        bottom={834}
        right={328.8}
        transform={[{ rotate: '62deg' }]}
      />
      {/* Cuerda y rueda delantera */}
      <StyledView
        width={16}
        height={16}
        backgroundColor="#868f74"
        borderRadius={50}
        borderWidth={1.1}
        borderColor="#000"
        bottom={824}
        right={345}
        transform={[{ rotate: '62deg' }]}
      />
      <StyledView
        width={12}
        height={12}
        backgroundColor="#d7e3bf"
        borderRadius={50}
        borderWidth={1.1}
        borderColor="#000"
        bottom={826}
        right={347}
        transform={[{ rotate: '62deg' }]}
      />

      {/* Guarda Cableado */}
      <StyledView
        width={15}
        height={16}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
        bottom={824.5}
        right={330}
        transform={[{ rotate: '62deg' }]}
      />        
      <StyledView
        width={10}
        height={16}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
        bottom={823}
        right={340}
        transform={[{ rotate: '62deg' }]}
      />
      <StyledView
        width={11}
        height={12.1}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        bottom={826}
        right={333.2}
        transform={[{ rotate: '-27deg' }]}
      />
      
    </View>
  );
}