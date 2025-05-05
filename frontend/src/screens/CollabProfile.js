import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileStyles';
import Section from '../components/admin/sections/Section.index';
import getApiUrl from '../utils/apiUrl';

const CollabProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params || {};

  // Estado para los planes de izaje
  const [setupIzaje, setSetups] = useState([]);
  // Estado para la pestaña seleccionada: 'Datos' o 'Planes'
  const [selectedButton, setSelectedButton] = useState('Datos');
  const animations = useRef({
    Datos: new Animated.Value(1), // por defecto se muestra esta pestaña
    Planes: new Animated.Value(0),
  });

  // Obtención de todos los planes de izaje
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

  // Función para cambiar de pestaña con animación
  const handlePressButton = (button) => {
    setSelectedButton(button);
    const otherButton = button === 'Datos' ? 'Planes' : 'Datos';
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

  return (
    <View style={styles.container}>
      {/* Cabecera con imagen, gradiente y título con ícono para regresar */}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              top: 455,
              left: 272,
              right: 0,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="keyboard-arrow-left" size={40} color="#fff" style={{ right: 150, bottom: 72 }} />
            </TouchableOpacity>
            <Text style={[styles.title, { flex: 1, textAlign: 'center', fontSize: 26 }]}>
              Perfil
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Imagen de perfil */}
      <Image
        source={userData?.profileImage || require('../../assets/blank-user-image.png')}
        style={[styles.profileImage, { top: 186 }]}
      />

      {/* Botones de pestañas */}
      <View style={[styles.userButtonsContainer, { top: 320 }]}>
        {['Datos', 'Planes'].map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.userButton, selectedButton === section && { color: '#cc0000' }]}
            onPress={() => handlePressButton(section)}
          >
            <Text style={[styles.userButtonText, selectedButton === section && { color: '#cc0000' }]}>
              {section}
            </Text>
            <Animated.View
              style={[
                styles.line,
                {
                  width: animations.current[section].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido según la pestaña seleccionada */}
      {selectedButton === 'Datos' && (
        <View style={[styles.roundedInputContainer, { marginTop: 330, paddingHorizontal: 20 }]}>
          <View style={styles.infoContainer}>
            <Icon name="person" size={24} color="#ee0000" style={styles.icon} />
            <Text style={styles.value}>
              {userData?.nombre} {userData?.apellido}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="workspace-premium" size={24} color="#ee0000" style={styles.icon} />
            <Text style={styles.value}>{userData?.position}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="work" size={24} color="#ee0000" style={styles.icon} />
            <Text style={styles.value}>{userData?.specialty}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="fingerprint" size={24} color="#ee0000" style={styles.icon} />
            <Text style={styles.value}>{userData?.rut}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="phone" size={24} color="#ee0000" style={styles.icon} />
            <Text style={styles.value}>{userData?.phone}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Icon name="email" size={24} color="#ee0000" style={styles.icon} />
            <Text style={styles.value}>{userData?.email}</Text>
          </View>
        </View>
      )}

      {selectedButton === 'Planes' && (
        <View style={{ top: 320, flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 450, marginBottom: 20 }}>
            {/* Aquí se pasan:
                - setupIzaje y setSetups (planes de izaje)
                - currentUser con el usuario del perfil para filtrar los setups
                - Un estilo personalizado para el contenedor de botones */}
            <Section.SetupIzajeSection
              setupIzaje={setupIzaje}
              setSetups={setSetups}
              currentUser={userData}
              buttonContainerStyle={{
                marginLeft: -110,
                marginTop: 2,
                marginBottom: -25,
                bottom: 0,
                top: 15,
                left: -5,
              }}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CollabProfile;
