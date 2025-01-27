import React from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import Button from '../components/Button';
import styles from '../styles/HomeStyles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/grua-home.png')}
        style={styles.background}
        imageStyle={styles.image}
      >
        {/* Degradado de fondo */}
        <Svg style={styles.gradient}>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="30%" stopColor="black" stopOpacity="0.9" />
            <Stop offset="90%" stopColor="red" stopOpacity="0.5" />
          </LinearGradient>
          <Rect width="100%" height="100%" fill="url(#grad1)" />
        </Svg>

        {/* Logotipo centrado */}
        <Image
          source={require('../../assets/EI-Montajes.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Botón de ingreso */}
        <Button
          label="Ingrese aquí"
          onPress={() => navigation.navigate('Login')}
          style={styles.customButton}
        />
      </ImageBackground>
    </View>
  );
}
