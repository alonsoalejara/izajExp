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
    right 
  }) => (
    
  <View
    style={{
      width,
      height,
      backgroundColor,
      borderRadius,
      borderWidth,
      borderColor,
      borderStyle: 'solid',
      position: position || 'absolute',
      left,
      bottom,
      right,
      transform,
    }}
  />
);

// Componente de la Base de la grúa
const BaseGrua = () => {
  return (
    <View style={{ top: 10, left: 10 }}>
      {/* Base de la grúa */}
      <StyledView width={260} height={25} backgroundColor="#ffcc00" borderWidth={1} borderColor="#000" bottom={95} left={-180} />
      <StyledView width={52} height={15} backgroundColor="#6ed08f" borderWidth={1} borderColor="#000" bottom={95} left={-87} />
      <StyledView width={44} height={8} backgroundColor="#8f44ee" borderRadius={2} borderWidth={1} borderColor="#000" bottom={119.1} left={-83} />

      {/* Esquina Trasera */}
      <View style={{ position: 'absolute', left: 4 }}>
        <StyledView width={30} height={40} backgroundColor="#ffcc00" borderWidth={1} borderColor="#000" bottom={80} left={49.1} />
        <StyledView width={16} height={38} backgroundColor="#ffcc00" transform={[{ rotate: '-45deg' }]} bottom={80.5} left={33.1} />
        <StyledView width={1.5} height={30} backgroundColor="#000" transform={[{ rotate: '-45deg' }]} bottom={76.5} left={38} />
        <StyledView width={10} height={38} backgroundColor="#ffcc00" transform={[{ rotate: '-45deg' }]} bottom={78.2} left={64} />
        <StyledView width={10} height={38} backgroundColor="#ffcc00" transform={[{ rotate: '45deg' }]} bottom={84} left={64} />
        <StyledView width={12} height={25} backgroundColor="#ffcc00" transform={[{ rotate: '180deg' }]} bottom={87.4} left={74} />
        <StyledView width={40} height={1.5} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '90deg' }]} bottom={99.5} left={29.3} />
        <StyledView width={29} height={1.5} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '90deg' }]} bottom={105} left={24.2} />
        <StyledView width={35} height={37} backgroundColor="#ffcc00" borderRadius={15} transform={[{ rotate: '180deg' }]} bottom={82} left={50} />
        <StyledView width={10} height={11} backgroundColor="#ffcc00" transform={[{ rotate: '45deg' }]} bottom={82.3} left={73} />
        <StyledView width={10} height={11} backgroundColor="#ffcc00" transform={[{ rotate: '-45deg' }]} bottom={106.3} left={73.4} />
        <StyledView width={11} height={1.6} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '43deg' }]} bottom={115} left={77} />
        <StyledView width={11} height={1.6} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '-43deg' }]} bottom={83} left={77} />
        <StyledView width={26} height={1.5} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '90deg' }]} bottom={100} left={73} />
      </View>

      {/* Esquina Delantera */}
      <View style={{ position: 'absolute', right: 25 }}>
        <StyledView width={30} height={40} backgroundColor="#ffcc00" borderWidth={1} borderColor="#000" bottom={80} right={149.5} />
        <StyledView width={30.2} height={33} backgroundColor="#dcc938" borderWidth={1} borderColor="#000" bottom={80} right={149.5} />
        <StyledView width={16} height={38} backgroundColor="#ffcc00" transform={[{ rotate: '45deg' }]} bottom={80.5} right={133.7} />
        <StyledView width={10} height={38} backgroundColor="#dcc938" transform={[{ rotate: '45deg' }]} bottom={78.2} right={165} />
        <StyledView width={10} height={38} backgroundColor="#ffcc00" transform={[{ rotate: '-45deg' }]} bottom={84} right={165} />
        <StyledView width={13} height={23} backgroundColor="#dcc938" bottom={80} right={149.5} />
        <StyledView width={12} height={25} backgroundColor="#dcc938" transform={[{ rotate: '180deg' }]} bottom={87.4} right={175} />
        <StyledView width={26} height={36} backgroundColor="#dcc938" transform={[{ rotate: '90deg' }]} bottom={81.5} right={154.4} />
        <StyledView width={37.4} height={1.5} backgroundColor="#a6b746" borderRadius={15} transform={[{ rotate: '180deg' }]} bottom={112.5} right={149.5} />
        <StyledView width={33} height={1.5} backgroundColor="#a6b746" borderRadius={15} transform={[{ rotate: '90deg' }]} bottom={96} right={133} />
        <StyledView width={31} height={1.5} backgroundColor="#000" borderRadius={15} bottom={80} right={149} />
        <StyledView width={11} height={1.5} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '45deg' }]} bottom={84} right={177.6} />
        <StyledView width={11} height={1.5} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '-45deg' }]} bottom={115} right={177.6} />
        <StyledView width={25} height={1.5} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '90deg' }]} bottom={100} right={174} />
        <StyledView width={25} height={1.5} backgroundColor="#000" borderRadius={15} transform={[{ rotate: '-45deg' }]} bottom={88} right={128} />
      </View>
      
      {/* Base de Ruedas */}
      <View style={{ position: 'absolute' }}>
        <StyledView width={54.5} height={8.9} borderWidth={0} borderColor="#000" backgroundColor="#ffcc00" bottom={120.4} left={-153.2} />
        <StyledView width={45} height={5} borderWidth={1} borderColor="#000" backgroundColor="#ffcc00" bottom={130} left={-148} />
        <StyledView width={30} height={5} borderWidth={1} borderColor="#000" backgroundColor="#ffcc00" transform={[{ rotate: '-55deg' }]} bottom={119} right={140} />
        <StyledView width={30} height={5} borderWidth={1} borderColor="#000" backgroundColor="#ffcc00" transform={[{ rotate: '55deg' }]} bottom={119} right={82} />
        <StyledView width={44.4} height={3.3} borderWidth={0} borderColor="#000" backgroundColor="#ffcc00" bottom={131} left={-148} />
      </View>
      <View style={{ position: 'absolute', left: 129 }}>
        <StyledView width={54.5} height={8.9} borderWidth={0} borderColor="#000" backgroundColor="#ffcc00" bottom={120.4} left={-153.2} />
        <StyledView width={45} height={5} borderWidth={1} borderColor="#000" backgroundColor="#ffcc00" bottom={130} left={-148} />
        <StyledView width={30} height={5} borderWidth={1} borderColor="#000" backgroundColor="#ffcc00" transform={[{ rotate: '-55deg' }]} bottom={119} right={140} />
        <StyledView width={30} height={5} borderWidth={1} borderColor="#000" backgroundColor="#ffcc00" transform={[{ rotate: '55deg' }]} bottom={119} right={82} />
        <StyledView width={44.4} height={3.3} borderWidth={0} borderColor="#000" backgroundColor="#ffcc00" bottom={131} left={-148} />
      </View>
    </View>
  );
};

export default BaseGrua;