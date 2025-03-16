import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, ScrollView, Alert } from 'react-native';
import styles from '../styles/ProfileStyles';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import getApiUrl from '../utils/apiUrl';
import Components from '../components/Components.index';
import Section from '../components/admin/sections/Section.index';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [selectedButton, setSelectedButton] = useState('MisDatos');
  const [setupIzaje, setSetups] = useState([]);

  useEffect(() => {
    const fetchSetups = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const response = await fetch(getApiUrl('setupIzaje'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data && data.data) {
          setSetups(data.data);
        }
      } catch (error) {
        console.error('Error al obtener los planes de izaje:', error);
      }
    };

    fetchSetups();
  }, []);

  const animations = useRef({
    MisDatos: new Animated.Value(0),
    MisPlanes: new Animated.Value(0),
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
            setUser(data.data);
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePressButton = (button) => {
    setSelectedButton(button);
  
    const otherButton = button === 'MisDatos' ? 'MisPlanes' : 'MisDatos';
    Animated.timing(animations.current[otherButton], {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  
    Animated.timing(animations.current[button], {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('accessToken');
              navigation.replace('Login');
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

      <Image
        source={user?.profileImage || require('../../assets/blank-user-image.png')}
        style={styles.profileImage}
      />

      <View style={styles.userButtonsContainer}>
        {['MisDatos', 'MisPlanes'].map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.userButton, selectedButton === section && { color: 'red' }]}
            onPress={() => handlePressButton(section)}
          >
            <Text style={[styles.userButtonText, selectedButton === section && { color: 'red' }]}>
              {section === 'MisDatos' ? 'Mis Datos' : 'Mis Planes'}
            </Text>
            <Animated.View
              style={[
                styles.line,
                {
                  width: animations.current[section].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  transform: [
                    {
                      translateX: animations.current[section].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0],
                      }),
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sección  */}
      {selectedButton === 'MisDatos' && (
        <View style={[styles.userDataContainer, { top: -20 }]}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Components.UserDataSection user={user} />
        </View>
      )}

      {selectedButton === 'MisPlanes' && (
        <View style={{ top: 300, flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 310, marginBottom: 20 }}>
            <Section.SetupIzajeSection 
              setupIzaje={setupIzaje} 
              setSetups={setSetups} 
              currentUser={user}
            />
          </ScrollView>
        </View>
      )}

      {/* Botón de cerrar sesión */}
      {selectedButton === 'MisDatos' && (
        <View style={[styles.logoutContainer, { flex: 0, top: -20 }]}>
          <Components.Button label="Cerrar Sesión" onPress={handleSignOut} style={styles.logoutButton} />
        </View>
      )}
    </View>
  );
};

export default Profile;
