import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from "react-native";
import Svg, { LinearGradient, Stop, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import LoginStyles from "../styles/LoginStyles";
import getApiUrl from "../utils/apiUrl";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
        try {
            const apiUrl = getApiUrl("auth/login");
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data && data.data) {
                    const { accessToken, refreshToken, roles } = data.data;

                    if (accessToken) {
                        await AsyncStorage.setItem("accessToken", accessToken);

                        // ✅ Decodificar el token y extraer el usuarioId
                        const decodedToken = jwtDecode(accessToken);
                        const usuarioId = decodedToken.id;

                        if (usuarioId) {
                            await AsyncStorage.setItem("usuarioId", usuarioId.toString());
                        } else {
                            console.warn("No se pudo extraer el usuarioId del token.");
                        }

                        if (refreshToken) {
                            await AsyncStorage.setItem("refreshToken", refreshToken);
                        }

                        if (Array.isArray(roles) && roles.length > 0) {
                            await AsyncStorage.setItem("roles", JSON.stringify(roles));
                        }

                        // ✅ Navegación basada en el rol
                        const role = roles[0];
                        if (role === "user") {
                            navigation.navigate("SetupIzaje");
                        } else if (role === "admin") {
                            navigation.navigate("AdminTabs");
                        } else {
                            Alert.alert("Error", "Rol de usuario no reconocido");
                        }
                    } else {
                        Alert.alert("Error", "Tokens de autenticación no recibidos correctamente");
                    }
                } else {
                    Alert.alert("Error", "Error en la respuesta del servidor: datos no disponibles");
                }
            } else {
                Alert.alert("Error", data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error al autenticar:", error);
            Alert.alert("Error", "Error en la conexión con el servidor");
        }
    } else {
        Alert.alert("Error", "Por favor, ingrese ambos campos");
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
