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
  const [setupIzaje, setSetups] = useState([]);
  const [selectedButton, setSelectedButton] = useState('Datos');
  const animations = useRef({
    Datos: new Animated.Value(1), 
    Planes: new Animated.Value(0),
  });

  // Obtención de todos los planes de izaje
  useEffect(() => {
    const fetchSetups = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.warn('No se encontró token de acceso para la petición.');
          setSetups([]);
          return;
        }

        const response = await fetch(getApiUrl('setupIzaje'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data) {
          if (Array.isArray(data.data)) {
            const userRole = userData?.roles?.[0];
            const filteredData = data.data.filter((setup) => {
              if (!userData || !userRole) return false; // Si no hay userData o rol, no mostrar nada

              if (userRole === 'capataz') {
                return setup.capataz && setup.capataz._id === userData._id;
              } else if (userRole === 'supervisor') {
                return setup.supervisor && setup.supervisor._id === userData._id;
              } else if (userRole === 'jefe') {
                return setup.jefeArea && setup.jefeArea._id === userData._id;
              }
              return false;
            });
            setSetups(filteredData); // Establecer los planes filtrados
          } else if (
            data.data === null ||
            data.data === undefined ||
            (typeof data.data === 'string' && data.data.trim() === '')
          ) {
            console.warn('Respuesta vacía del backend.');
            setSetups([]);
          } else {
            console.warn('La respuesta del backend no contiene un array válido:', data.data);
            setSetups([]);
          }
        } else {
          console.warn('Respuesta vacía del backend.');
          setSetups([]);
        }
      } catch (error) {
        console.warn('Error al obtener los planes de izaje:', error.message || error);
        setSetups([]);
      }
    };

    fetchSetups();
  }, [userData]);

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

  const handleViewPlan = (planData) => {
    navigation.navigate('CollabTablas', { planData: planData });
  };

  return (
    <View style={styles.container}>
      {/* Cabecera con imagen, gradiente y título con ícono para regresar */}
      <View style={styles.circleContainer}>
        <ImageBackground
          source={require('../../assets/capataz.png')}
          style={styles.background}
          imageStyle={styles.image}
        >
          <Svg style={styles.gradient}>
            <LinearGradient id="grad1" x1="0%" y1="98%" x2="0%" y2="0%">
              <Stop offset="24%" stopColor="#880000" stopOpacity="0.7" />
              <Stop offset="10%" stopColor="#ff0000" stopOpacity="0.8" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad1)" />
          </Svg>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              top: 455,
              left: 245,
              right: 0,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="keyboard-arrow-left" size={40} color="#fff" style={{ right: 120, bottom: 75 }} />
            </TouchableOpacity>
            <Text style={[styles.title, { left: 0, bottom: 2 }]}>
              PERFIL
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
            style={[styles.userButton, selectedButton === section && { color: '#ee0000' }]}
            onPress={() => handlePressButton(section)}
          >
            <Text style={[styles.userButtonText, selectedButton === section && { color: '#ee0000' }]}>
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
              onViewPress={handleViewPlan}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CollabProfile;
