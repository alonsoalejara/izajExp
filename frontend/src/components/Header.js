import React from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';

const Header = () => {
  const styles = StyleSheet.create({
    circleContainer: {
      width: 600,
      height: 550,
      borderRadius: 0, // Mantenemos borderRadius en 0
      position: 'absolute',
      bottom: '82%',
      left: '38%',
      transform: [{ translateX: -250 }],
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      zIndex: 1, // Aseguramos que el contenedor esté por encima de otros elementos si es necesario
    },
    background: {
      flex: 1,
      width: '100%',
      height: '200%',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '62%',
      height: '62%',
      top: 310,
      left: 110,
      resizeMode: 'cover',
    },
    gradient: {
      position: 'absolute',
      top: 50,
      left: 100,
      width: 565,
      height: '100%',
      zIndex: 0,
    },
    logo: {
      position: 'absolute',
      top: '82%',
      left: '58.4%',
      transform: [{ translateX: -165 }],
      width: 200,
      height: 80,
      zIndex: 0,
    },
    overlayCircle: {
      position: 'absolute',
      top: 540, // Ajusta la posición vertical para que quede por encima
      left: '23%',
      transform: [{ translateX: -100 }], // Centra el círculo horizontalmente
      width: 530, // Diámetro del círculo
      height: 300, // Diámetro del círculo
      borderRadius: 100, // La mitad del ancho/alto para hacerlo un círculo
      backgroundColor: 'white',
      zIndex: 2, // Asegura que el círculo esté por encima del contenido existente
    },
  });

  return (
    <View style={styles.circleContainer}>
      <View style={styles.overlayCircle} />
      <ImageBackground
        source={require('../../assets/plan.png')}
        style={styles.background}
        imageStyle={styles.image}
      >
        <Svg style={styles.gradient}>
          <LinearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset="14%" stopColor="#ff0000" stopOpacity="0.75" />
            <Stop offset="9%" stopColor="black" stopOpacity="0.8" />
          </LinearGradient>
          <Rect width="100%" height="100%" fill="url(#grad1)" />
        </Svg>
        <Image
          source={require('../../assets/EI-Montajes-blanco.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};

export default Header;