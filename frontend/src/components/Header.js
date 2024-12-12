import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Asegúrate de tener esta librería instalada
import { useNavigation } from '@react-navigation/native';  // Hook para acceder a la navegación

// Header Component
const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Menu Icon on the left */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIconContainer}>
        <Icon name="menu" size={30} color="red" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/EI-Montajes.png')}  // Cambia la ruta al logo si es necesario
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 98, // Ajusta la altura si es necesario
    backgroundColor: '#fff',  // Color de fondo blanco
    flexDirection: 'row', // Alineación horizontal
    alignItems: 'center', // Centrado vertical
    justifyContent: 'flex-start', // Alineación a la izquierda para el logo
    paddingHorizontal: 20, // Espacio alrededor
    borderBottomWidth: 1,  // Bordes inferiores
    borderBottomColor: '#ccc',  // Color del borde
    shadowColor: '#000',  // Sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1,  // Opacidad de la sombra
    shadowRadius: 5,  // Difusión de la sombra
    elevation: 5,  // Sombra en dispositivos Android
  },
  menuIconContainer: {
    marginTop: 30,
    marginRight: 170,  // Ajusta el espacio entre el ícono y el logo
  },
  logo: {
    marginTop: 30,
    marginLeft: 20,
    width: 150,  // Tamaño del logo
    height: 150,  // Tamaño del logo
  },
});

export default Header;