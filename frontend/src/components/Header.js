import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Header Component
const Header = () => {
  return (
    <View style={styles.headerContainer}>
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
    height: 98, // Puedes ajustar la altura según lo que necesites
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
  logo: {
    marginTop: 30,
    marginLeft: 200,
    width: 150,  // Tamaño del logo
    height: 150,  // Tamaño del logo
  },
});

export default Header;