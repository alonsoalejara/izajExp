import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/AdminProfileStyles';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminProfile = () => {
  const user = {
    name: 'Juan',
    lastName: 'Pérez',
    rut: '12.345.678-9',
    email: 'juan.perez@example.com',
    specialty: 'Estructura',
    phone: '987654321',
    profileImage: require('../../assets/blank-user-image.png'),
  };

  const handleSignOut = () => {
    console.log('Cerrar sesión');
  };

  return (
    <View style={styles.container}>
      {/* Sección superior fija con la imagen, logo y gradiente */}
      <View style={styles.circleContainer}>
        <ImageBackground
          source={require('../../assets/grua-home.png')}
          style={styles.background}
          imageStyle={styles.image}
        >
          <Svg style={styles.gradient}>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="80%" stopColor="white" stopOpacity="0.6" />
              <Stop offset="70%" stopColor="red" stopOpacity="0.8" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad1)" />
          </Svg>
          <Text style={styles.title}>Mi Perfil</Text>
        </ImageBackground>
      </View>
  
      {/* Imagen de perfil fuera del contenedor */}
      <Image source={user.profileImage} style={styles.profileImage} />
  
      {/* Contenedor agrupado */}
      <View style={styles.userInfoContainer}>
        <View>
            <View style={styles.infoContainer}>
                <Icon name="person-2" size={30} color="#ff0000" style={styles.icon} />
                <Text style={styles.value}>{user.name} {user.lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="credit-card" size={30} color="#ff0000" style={styles.icon} />
                <Text style={styles.value}>{user.rut}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="email" size={32} color="#ff0000" style={styles.icon} />
                <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="grade" size={30} color="#ff0000" style={styles.icon} />
                <Text style={styles.value}>{user.specialty}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Icon name="phone-iphone" size={30} color="#ff0000" style={styles.icon} />
                <Text style={styles.value}>{user.phone}</Text>
            </View>
        </View>
       </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminProfile;
