import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import Svg, { LinearGradient, Stop, Rect } from "react-native-svg";
import LoginStyles from "../styles/LoginStyles";

export default function AdminOptions({ navigation }) {
  const handleRoleSelection = (role) => {
    // Navegar a diferentes pantallas dependiendo del rol seleccionado
    if (role === "admin") {
      navigation.navigate("AdminScreen"); // Navegar a la pantalla de administrador
    } else if (role === "user") {
      navigation.navigate("UserScreen"); // Navegar a la pantalla de usuario
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
        <Text style={LoginStyles.title}>Seleccione el rol que desea utilizar</Text>
        
        {/* Botones de selección de rol */}
        <TouchableOpacity style={LoginStyles.button} onPress={() => handleRoleSelection("admin")}>
          <Text style={LoginStyles.buttonText}>Administrador</Text>
        </TouchableOpacity>

        <TouchableOpacity style={LoginStyles.button} onPress={() => handleRoleSelection("user")}>
          <Text style={LoginStyles.buttonText}>Usuario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}