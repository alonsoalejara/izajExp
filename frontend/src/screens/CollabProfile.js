import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import Components from '../components/Components.index';
import Section from '../components/admin/sections/Section.index';
import styles from '../styles/ProfileStyles';
import IconFA from 'react-native-vector-icons/FontAwesome';

const CollabProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params;
  const [user, setUser] = useState(userData);
  console.log('Datos en estado "user" en CollabProfile:', user);
  const [selectedButton, setSelectedButton] = useState('Datos');
  const [setupIzaje, setSetups] = useState([]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]); 

  useEffect(() => {
    if (route.params?.userData) {
      console.log('Cambio en userData:', route.params.userData);
      setUser(route.params.userData);
    }
  }, [route.params?.userData]);

  useEffect(() => {
    const fetchSetups = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token || !userData) return;

        const response = await fetch(getApiUrl(`setupIzaje?userId=${userData._id}`), {
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
  }, [userData]);

  const animations = useRef({
    Datos: new Animated.Value(0),
    Plan: new Animated.Value(0),
  });

  const handlePressButton = (button) => {
    setSelectedButton(button);
    const otherButton = button === 'Datos' ? 'Plan' : 'Datos';
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
          <Text style={[styles.title, { bottom: '17%' }]}>Perfil</Text>
            {/* Botón de regresar con FontAwesome */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <IconFA name="angle-left" size={40} color="white" top="100" right="150"/>
            </TouchableOpacity>
        </ImageBackground>
      </View>

      <Image
        source={user?.profileImage || require('../../assets/blank-user-image.png')}
        style={styles.profileImage}
        top="170"
      />

      <View style={styles.userButtonsContainer}>
        {['Datos', 'Plan'].map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.userButton, selectedButton === section && { color: 'red' }]}
            onPress={() => handlePressButton(section)}
          >
            <Text style={[styles.userButtonText, selectedButton === section && { color: 'red' }]}>
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

      {selectedButton === 'Datos' && (
        <View style={[styles.userDataContainer, { top: -20 }]}>
          <Text style={styles.userName}>{user?.nombre || user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Components.UserDataSection user={user} />
        </View>
      )}

      {selectedButton === 'Plan' && (
        <View style={{ top: 300, flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 310 }}>
            <Section.SetupIzajeSection setupIzaje={setupIzaje} setSetups={setSetups} />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CollabProfile;
