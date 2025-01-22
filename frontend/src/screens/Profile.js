import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/AdminProfileStyles';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminProfile = () => {
  const [user, setUser] = useState({
    username: '',
    nombre: 'No disponible',
    apellido: '',
    rut: 'No disponible',
    phone: 'No disponible',
    specialty: 'No disponible',
    email: 'No disponible',
    profileImage: require('../../assets/blank-user-image.png'),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('Datos recibidos del usuario logeado:', parsedUser);

          setUser({
            username: parsedUser.username || '',
            nombre: parsedUser.nombre || parsedUser.username || 'No disponible',
            apellido: parsedUser.apellido || '',
            rut: parsedUser.rut || 'No disponible',
            phone: parsedUser.phone || 'No disponible',
            specialty: parsedUser.specialty || 'No disponible',
            email: parsedUser.email || 'No disponible',
            profileImage: parsedUser.profileImage || require('../../assets/blank-user-image.png'),
          });
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    console.log('Cerrar sesión');
    // Aquí puedes manejar la lógica de cierre de sesión si es necesario
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
            <Text style={styles.value}>{user.username}{user.nombre} {user.apellido || ''}</Text>
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
