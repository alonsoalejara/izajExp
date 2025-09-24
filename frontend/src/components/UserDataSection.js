import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import getApiUrl from '../utils/apiUrl';
import styles from '../styles/ProfileStyles';

const UserDataSection = () => {
  const [user, setUser] = useState({
    username: '',
    nombre: 'No disponible',
    apellido: '',
    cargo: 'No disponible',
    especialidad: 'No disponible',
    rut: 'No disponible',
    telefono: 'No disponible',
    email: 'No disponible',
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
              cargo: data.data.cargo || 'No disponible',
              especialidad: data.data.especialidad || 'No disponible',
              rut: data.data.rut || 'No disponible',
              telefono: data.data.telefono || 'No disponible',
              email: data.data.email || 'No disponible',
            });
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={styles.userInfoContainer}>
      <View>
        <View style={styles.infoContainer}>
          <Icon name="person-2" size={25} color="#ee0000" style={styles.icon} />
          <Text style={styles.value}>{user.username} {user.nombre} {user.apellido || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="workspace-premium" size={25} color="#ee0000" style={styles.icon} />
          <Text style={styles.value}>{user.cargo}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="work" size={25} color="#ee0000" style={styles.icon} />
          <Text style={styles.value}>{user.especialidad}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="credit-card" size={25} color="#ee0000" style={styles.icon} />
          <Text style={styles.value}>{user.rut}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="email" size={26} color="#ee0000" style={styles.icon} />
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={[styles.infoContainer, { borderBottomWidth: 0 }]}>
          <Icon name="phone-iphone" size={25} color="#ee0000" style={styles.icon} />
          <Text style={styles.value}>{user.telefono}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDataSection;