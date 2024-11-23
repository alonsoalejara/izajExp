import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from "react-native";
import Svg, { LinearGradient, Stop, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginStyles from "../styles/LoginStyles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const { accessToken, refreshToken } = data.data;

          if (accessToken) {
            await AsyncStorage.setItem("accessToken", accessToken);
            if (refreshToken) {
              await AsyncStorage.setItem("refreshToken", refreshToken);
            }
            navigation.navigate("SetupIzaje");
          } else {
            alert("Tokens de autenticación no recibidos correctamente");
          }
        } else {
          alert(data.message || "Error al iniciar sesión");
        }
      } catch (error) {
        console.error("Error al autenticar:", error);
        alert("Error en la conexión con el servidor");
      }
    } else {
      alert("Por favor, ingrese ambos campos");
    }
  };

  return (
    <View style={LoginStyles.container}>
      {/* Interfaz de usuario */}
      <View style={LoginStyles.circleContainer}>
        <ImageBackground
          source={require("../../assets/grua-home.png")}
          style={LoginStyles.background}
          imageStyle={LoginStyles.image}
        >
          <Svg style={LoginStyles.gradient}>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="10%" stopColor="white" stopOpacity="0.6" />
              <Stop offset="90%" stopColor="red" stopOpacity="0.8" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad1)" />
          </Svg>
          <Image source={require("../../assets/EI-Montajes.png")} style={LoginStyles.logo} resizeMode="contain" />
        </ImageBackground>
      </View>

      <View style={LoginStyles.formContainer}>
        <Text style={LoginStyles.title}>¡Bienvenido a Izajexp!</Text>
        <TextInput
          style={LoginStyles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
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