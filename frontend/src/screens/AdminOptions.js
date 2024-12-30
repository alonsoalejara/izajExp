import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import Svg, { LinearGradient, Stop, Rect } from "react-native-svg";
import AdminOptionsStyles from "../styles/AdminOptionsStyles";

export default function AdminOptions({ navigation }) {
  const handleRoleSelection = (role) => {
    // Navegar a diferentes pantallas dependiendo del rol seleccionado
    if (role === "admin") {
      navigation.navigate("AdminPanel"); // Navegar a la pantalla de administrador
    } else if (role === "user") {
      navigation.navigate("SetupIzaje"); // Navegar a la pantalla de usuario
    }
  };

  return (
    <View style={AdminOptionsStyles.container}>
      {/* Interfaz de usuario */}
      <View style={AdminOptionsStyles.circleContainer}>
        <ImageBackground
          source={require("../../assets/grua-home.png")}
          style={AdminOptionsStyles.background}
          imageStyle={AdminOptionsStyles.image}
        >
          <Svg style={AdminOptionsStyles.gradient}>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="10%" stopColor="white" stopOpacity="0.6" />
              <Stop offset="90%" stopColor="red" stopOpacity="0.8" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad1)" />
          </Svg>
          <Image source={require("../../assets/EI-Montajes.png")} style={AdminOptionsStyles.logo} resizeMode="contain" />
        </ImageBackground>
      </View>

      <View style={AdminOptionsStyles.formContainer}>
        <Text style={AdminOptionsStyles.title}>Seleccione el rol que desea utilizar</Text>
        
        {/* Botones de selección de rol */}
        <TouchableOpacity style={AdminOptionsStyles.button} onPress={() => handleRoleSelection("admin")}>
          <Text style={AdminOptionsStyles.buttonText}>Administrador</Text>
        </TouchableOpacity>

        <TouchableOpacity style={AdminOptionsStyles.button} onPress={() => handleRoleSelection("user")}>
          <Text style={AdminOptionsStyles.buttonText}>Usuario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}