import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, ScrollView, Alert } from 'react-native';
import styles from '../styles/ProfileStyles';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { decode as atob } from 'base-64';
import getApiUrl from '../utils/apiUrl';
import Components from '../components/Components.index';
import Section from '../components/admin/sections/Section.index';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [selectedButton, setSelectedButton] = useState('MisDatos');
  const [setupIzaje, setSetups] = useState([]);
  const [hasSignature, setHasSignature] = useState(false);

  // Extrae userId del JWT sin jwt-decode
  const extractUserId = (token) => {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json).id;
  };

  // Fetch setups
  useEffect(() => {
    async function fetchSetups() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const res = await fetch(getApiUrl('setupIzaje'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });

        const text = await res.text(); // primero leemos como texto

        console.log('Status:', res.status);
        console.log('Raw response from setupIzaje:', text);

        if (!text) {
          console.warn('Respuesta vacía del backend.');
          return;
        }

        const json = JSON.parse(text); // intentamos parsear si hay contenido

        if (json?.data) {
          setSetups(json.data);
        } else {
          console.warn('Respuesta JSON sin propiedad "data":', json);
        }
      } catch (e) {
        console.error('Error al obtener los planes de izaje:', e);
      }
    }

    fetchSetups();
  }, []);

  // Fetch user data
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;
        const userId = extractUserId(token);
        const res = await fetch(getApiUrl(`user/${userId}`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });
        const json = await res.json();
        if (json?.data) {
          setUser(json.data);
          setHasSignature(!!json.data.signature);
        }
      } catch (e) {
        console.error('Error al obtener los datos del usuario:', e);
      }
    }
    fetchUser();
  }, []);

  // Button animations
  const animations = useRef({
    MisDatos: new Animated.Value(0),
    MisPlanes: new Animated.Value(0),
    MiFirma: new Animated.Value(0),
  });
  const handlePressButton = (button) => {
    setSelectedButton(button);
    ['MisDatos', 'MisPlanes', 'MiFirma'].forEach((b) => {
      Animated.timing(animations.current[b], {
        toValue: b === button ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  // Actions
  const handleSignOut = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: async () => {
          await AsyncStorage.removeItem('accessToken');
          navigation.replace('Login');
        }
      },
    ]);
  };

  const handleSaveSignature = async (signature) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const userId = extractUserId(token);
      const res = await fetch(getApiUrl(`user/${userId}/signature`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ signature }),
      });
      if (res.ok) {
        setHasSignature(true);
        const fresh = await fetch(getApiUrl(`user/${userId}`), {
          headers: { Authorization: `Bearer ${token}` }
        });
        const freshJson = await fresh.json();
        if (freshJson?.data) setUser(freshJson.data);
      }
    } catch (e) {
      console.error('Error al guardar firma:', e);
      Alert.alert('Error', 'Ocurrió un error al guardar la firma.');
    }
  };

  const handleAddSignature = () =>
    navigation.navigate('Firma', { onSave: handleSaveSignature });
  const handleEditSignature = () =>
    navigation.navigate('Firma', {
    onSave: handleSaveSignature,
    signature: user.signature
  });


  const handleDeleteSignature = async () => {
    Alert.alert('Eliminar Firma', '¿Estás seguro de que deseas eliminar tu firma?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('accessToken');
            const userId = extractUserId(token);
            const res = await fetch(getApiUrl(`user/${userId}/signature`), {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            });
            if (res.ok) {
              setHasSignature(false);
              const fresh = await fetch(getApiUrl(`user/${userId}`), {
                headers: { Authorization: `Bearer ${token}` }
              });
              const freshJson = await fresh.json();
              if (freshJson?.data) setUser(freshJson.data);
              Alert.alert('Firma eliminada', 'Tu firma ha sido eliminada exitosamente.');
            }
          } catch (e) {
            console.error(e);
            Alert.alert('Error', 'Ocurrió un error al eliminar la firma.');
          }
        }
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.circleContainer}>
        <ImageBackground
          source={require('../../assets/capataz.png')}
          style={styles.background}
          imageStyle={styles.image}
        >
          <Svg style={styles.gradient}>
            <LinearGradient id="grad1" x1="0%" y1="95%" x2="0%" y2="0%">
              <Stop offset="24%" stopColor="#ff0000" stopOpacity="0.75" />
              <Stop offset="10%" stopColor="#880000" stopOpacity="0.9" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad1)" />
          </Svg>
          <Text style={styles.title}>MI PERFIL</Text>
        </ImageBackground>
      </View>

      {/* Profile Image */}
      <Image
        source={
          user?.profileImage ||
          require('../../assets/blank-user-image.png')
        }
        style={styles.profileImage}
      />

      {/* Tabs */}
      <View style={styles.userButtonsContainer}>
        {['MisDatos', 'MisPlanes', 'MiFirma'].map((section) => (
          <TouchableOpacity
            key={section}
            onPress={() => handlePressButton(section)}
            style={styles.userButton}
          >
            <Text
              style={[
                styles.userButtonText,
                selectedButton === section && { color: '#ee0000' },
              ]}
            >
              {section === 'MisDatos'
                ? 'Mis Datos'
                : section === 'MisPlanes'
                ? 'Mis Planes'
                : 'Mi Firma'}
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

      {/* Content */}
      {selectedButton === 'MisDatos' && (
        <View style={[styles.userDataContainer, { top: -20 }]}>
          <Text style={styles.userName}>
            {user?.nombre} {user?.apellido}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Components.UserDataSection user={user} />
          <View style={styles.logoutContainer}>
            <Components.Button
              label="Cerrar Sesión"
              onPress={handleSignOut}
              style={styles.logoutButton}
            />
          </View>
        </View>
      )}

      {selectedButton === 'MisPlanes' && (
        <View style={{ top: 300, flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 310, marginBottom: 20 }}
          >
            <Section.SetupIzajeSection
              setupIzaje={setupIzaje}
              setSetups={setSetups}
              currentUser={user}
            />
          </ScrollView>
        </View>
      )}

      {selectedButton === 'MiFirma' && (
        <View
          style={[styles.userDataContainer, { top: 300, alignItems: 'center' }]}
        >
          {hasSignature && user.signature ? (
            <>
              <View
                style={{
                  width: 300,
                  height: 150,
                  top: 20,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Image
                  source={{
                    uri: user.signature.startsWith('data:')
                      ? user.signature
                      : `data:image/png;base64,${user.signature}`,
                  }}
                  style={{
                    top: 50,
                    width: '180%',  // Ajustar aquí el tamaño de la imagen dentro del contenedor
                    height: '180%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 40,
                  justifyContent: 'space-between',
                  width: 250,
                  left: -75,    
                }}
              >
                <Components.Button
                  label="Cambiar Firma"
                  onPress={handleEditSignature}
                  style={{ width: 140 }}
                />
                <Components.Button
                  label="Eliminar Firma"
                  onPress={handleDeleteSignature}
                  style={{ width: 140, backgroundColor: '#999', left: -40 }}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.emptyText}>No has registrado tu firma</Text>
              <View style={{ marginTop: 30 }}>
                <Components.Button
                  label="Registrar Firma"
                  onPress={handleEditSignature}
                  style={{ width: 200, left: -25 }}
                />
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default Profile;