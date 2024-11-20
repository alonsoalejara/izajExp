import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg'; 
import LoginStyles from '../styles/LoginStyles';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Lógica de autenticación (aquí iría la validación real)
      navigation.navigate('SetupIzaje');
    } else {
      alert('Por favor, ingrese ambos campos');
    }
  };

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.circleContainer}>
        {/* Imagen recortada por el círculo */}
        <ImageBackground
          source={require('../../assets/grua-home.png')}
          style={LoginStyles.background}
          imageStyle={LoginStyles.image}
        >
          {/* El degradado dentro del círculo */}
          <Svg style={LoginStyles.gradient}>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="10%" stopColor="white" stopOpacity="0.6" />
              <Stop offset="90%" stopColor="red" stopOpacity="0.8" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad1)" />
          </Svg>

          {/* Logotipo dentro del círculo */}
          <Image
            source={require('../../assets/EI-Montajes.png')}
            style={LoginStyles.logo}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>

      {/* Formulario de login (ahora estará encima de la imagen y círculo recortado) */}
      <View style={LoginStyles.formContainer}>
        <Text style={LoginStyles.title}>¡Bienvenido a Izajexp!</Text>
        <TextInput
          style={LoginStyles.input}
          placeholder="Usuario"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={LoginStyles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
          <Text style={LoginStyles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
