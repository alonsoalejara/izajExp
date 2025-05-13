import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import Components from '../components/Components.index';
import styles from '../styles/HomeStyles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/new-grua-home.jpg')}
        style={styles.background}
        imageStyle={styles.image}
      >
        {/* Degradado de fondo */}
        <Svg style={styles.gradient}>
          <LinearGradient id="grad1" x1="20%" y1="91%" x2="20%" y2="0%">
            <Stop offset="24%" stopColor="black" stopOpacity="0.85" />
            <Stop offset="10%" stopColor="red" stopOpacity="0.75" />
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
        <Components.Button
          label="Ingrese aquí"
          onPress={() => navigation.navigate('Login')}
          style={styles.customButton}
        />
      </ImageBackground>
    </View>
  );
}
