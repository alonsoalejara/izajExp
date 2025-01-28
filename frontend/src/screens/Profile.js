import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import styles from '../styles/ProfileStyles';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import getApiUrl from '../utils/apiUrl';
import Button from '../components/Button';

const Profile = () => {
  const navigation = useNavigation();
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
        const token = await AsyncStorage.getItem('accessToken');
  
        if (token) {
          const decodedToken = jwtDecode(token);  
          const userId = decodedToken.id;
          const url = getApiUrl(`user/${userId}`);
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();  
          if (data && data.data) {
            setUser({
              username: data.data.username || '',
              nombre: data.data.nombre || (data.data.username ? '' : 'No disponible'),
              apellido: data.data.apellido || '',
              rut: data.data.rut || 'No disponible',
              phone: data.data.phone || 'No disponible',
              specialty: data.data.specialty || 'No disponible',
              email: data.data.email || 'No disponible',
              profileImage: data.data.profileImage || require('../../assets/blank-user-image.png'),
            });
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  const handleSignOut = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('accessToken');
              navigation.navigate('Home');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          }
        }
      ]
    );
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
            <Text style={styles.value}>{user.username} {user.nombre} {user.apellido || ''}</Text>
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

      {/* Usamos el componente Button para cerrar sesión */}
      <Button label="Cerrar Sesión" onPress={handleSignOut} style={{ width: '88%', right: 30 }} />
    </View>
  );
};

export default Profile;
