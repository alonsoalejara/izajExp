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
  position,
  left,
  bottom,
  right,
  transform,
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

// Componente CabinaGrua
export default function CabinaGrua() {
  return (
    <View>
      {/* Cabina */}
      {/* Conector Cabina y Pluma */}
      <StyledView
        width={50}
        height={30}
        backgroundColor="#ffcc00"
        borderTopLeftRadius={20}
        borderWidth={1.1}
        borderColor="#000"
        bottom={127}
        left={-34}
        transform={[{ rotate: '-25deg' }]}
      />

      {/* Parte trasera */}
      <StyledView
        width={35}
        height={60}
        backgroundColor="#ffcc00"
        borderRadius={5}
        borderWidth={1}
        borderColor="#000"
        bottom={125}
        left={-55}
      />
      
      {/* Parte delantera */}
      <StyledView
        width={50}
        height={60}
        backgroundColor="#ffcc00"
        borderTopLeftRadius={70}
        borderTopRightRadius={70}
        borderBottomLeftRadius={50}
        borderBottomRightRadius={50}
        borderWidth={1.1}
        borderColor="#000"
        bottom={125.1}
        left={-79}
      />

      {/* Parte central */}
      <StyledView
        width={34}
        height={59}
        backgroundColor="#ffcc00"
        borderRadius={10}
        bottom={125.3}
        left={-58}
      />

      {/* Base de cabina */}
      <StyledView
        width={45}
        height={13}
        backgroundColor="#ffcc00"
        borderWidth={0.5}
        borderColor="#000"
        bottom={115}
        left={-70}
      />

      {/* Guia Angulo Frontal */}
      <StyledView
        width={45}
        height={3}
        backgroundColor="#1c6f23"
        borderWidth={0.5}
        borderColor="#000"
        bottom={125}
        right={54}
      />

      {/* Ventara Trasera */}
      <StyledView
        width={18}
        height={25}
        backgroundColor="#1180c4"
        borderWidth={0.5}
        borderColor="#000"
        bottom={154}
        left={-44}
      />

      {/* Parche Ventana Trasera */}
      <StyledView
        width={10}
        height={25}
        backgroundColor="#ffcc00"
        bottom={138}
        left={-42}
        transform={[{ rotate: '80deg' }]}
      />

      {/* Parche Linea Ventana Trasera */}
      <StyledView
        width={0.6}
        height={17.6}
        backgroundColor="#000"
        bottom={147}
        left={-35.2}
        transform={[{ rotate: '80deg' }]}
      />

      {/* Ventana Delantera */}
      <StyledView
        width={28}
        height={25}
        backgroundColor="#1180c4"
        borderTopLeftRadius={20}
        borderWidth={0.5}
        borderColor="#000"
        bottom={154}
        left={-74}
      />

      {/* Conector Pluma, Cabina y Contrapeso */}
      <StyledView
        width={50}
        height={20}
        backgroundColor="#ffcc00"
        borderWidth={1}
        borderColor="#000"
        bottom={154.5}
        left={-14}
        transform={[{ rotate: '90deg' }]}
      />

      {/* Parche -> Conector Cabina y Pluma */}
      <StyledView
        width={40}
        height={20}
        backgroundColor="#ffcc00"
        borderRadius={10}
        bottom={140}
        left={-17}
        transform={[{ rotate: '-30deg' }]}
      />

      {/* Parche 2 -> Conector Cabina y Pluma */}
      <StyledView
        width={40}
        height={20}
        backgroundColor="#ffcc00"
        borderRadius={10}
        bottom={141}
        left={-18}
        transform={[{ rotate: '-30deg' }]}
      />

      {/* Parche 3 -> Conector Cabina y Pluma */}
      <StyledView
        width={20}
        height={20}
        backgroundColor="#ffcc00"
        borderRadius={10}
        borderWidth={0}
        bottom={144}
        left={1}
        transform={[{ rotate: '-90deg' }]}
      />

      {/* Parche 4 -> Conector Cabina y Pluma */}
      <StyledView
        width={20}
        height={20}
        backgroundColor="#ffcc00"
        borderRadius={4}
        borderWidth={0}
        bottom={137}
        left={-1}
        transform={[{ rotate: '75deg' }]}
      />

      {/* Conector Pluma, Cabina y Contrapeso */}
      <StyledView
        width={50}
        height={20}
        backgroundColor="#ffcc00"
        borderWidth={1.1}
        borderColor="#000"
        bottom={154.5}
        left={20.5}
        transform={[{ rotate: '180deg' }]}
      />

      {/* Contrapeso */}
      <StyledView
        width={35}
        height={35}
        backgroundColor="#ffcc00"
        borderWidth={1}
        borderColor="#000"
        bottom={147}
        left={60}
        transform={[{ rotate: '90deg' }]}
      />

      {/* Diseño Contrapeso */}
      <StyledView
        width={35}
        height={13}
        backgroundColor="#6d2295"
        borderWidth={1}
        borderColor="#000"
        bottom={157.5}
        left={70.7}
        transform={[{ rotate: '90deg' }]}
      />

      {/* Parche 5 -> Conector Cabina y Pluma */}
      <StyledView
        width={22}
        height={1.1}
        backgroundColor="#000"
        bottom={153}
        left={9.7}
        transform={[{ rotate: '-90deg' }]}
      />

    </View>
  );
}
