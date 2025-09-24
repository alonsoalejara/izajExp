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
  const [hasFirma, setHasFirma] = useState(false);

  const ROLES_CON_FIRMA = ['supervisor', 'jefe'];
  const CAPATAZ_ROLE = 'capataz';
  const JEFE_ROLE = 'jefe';

  const extractUserId = (token) => {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json).id;
  };

  useEffect(() => {
    async function fetchSetups() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const res = await fetch(getApiUrl('setupIzaje'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await res.text();

        if (!text) {
          return;
        }

        const json = JSON.parse(text);

        if (json?.data) {
          setSetups(json.data);
        } else {
          // Manejo si json.data no está presente o está vacío
        }
      } catch (e) {
        // Manejo de errores de fetch
      }
    }
    fetchSetups();
  }, []);

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
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();

        if (json?.data) {
          setUser(json.data);
          setHasFirma(!!json.data.firma);

          const userRole = json.data.roles && json.data.roles.length > 0 ? json.data.roles[0] : null;
          const userRoleLowerCase = userRole ? userRole.toLowerCase() : null;

          if (userRoleLowerCase === CAPATAZ_ROLE && selectedButton === 'MiFirma') {
            setSelectedButton('MisDatos');
          }
        }
      } catch (e) {
        // Manejo de errores de fetch
      }
    }
    fetchUser();
  }, [selectedButton]);

  const animations = useRef({
    MisDatos: new Animated.Value(0),
    MisPlanes: new Animated.Value(0),
    MiFirma: new Animated.Value(0),
  });

  const handlePressButton = (button) => {
    const currentUserRole = user?.roles && user.roles.length > 0 ? user.roles[0] : null;
    const userRoleLowerCase = currentUserRole ? currentUserRole.toLowerCase() : null;

    if (userRoleLowerCase === CAPATAZ_ROLE && button === 'MiFirma') {
      return;
    }
    setSelectedButton(button);
    const buttonsToAnimate = ['MisDatos', 'MisPlanes'];

    const rolesConFirmaLowerCase = ROLES_CON_FIRMA.map((role) => role.toLowerCase());

    if (userRoleLowerCase && rolesConFirmaLowerCase.includes(userRoleLowerCase)) {
      buttonsToAnimate.push('MiFirma');
    }

    buttonsToAnimate.forEach((b) => {
      Animated.timing(animations.current[b], {
        toValue: b === button ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleSignOut = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: async () => {
          await AsyncStorage.removeItem('accessToken');
          navigation.replace('Login');
        },
      },
    ]);
  };

  const handleSaveFirma = async (firma) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const userId = extractUserId(token);
      const res = await fetch(getApiUrl(`user/${userId}/firma`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firma }),
      });
      if (res.ok) {
        setHasFirma(true);
        const fresh = await fetch(getApiUrl(`user/${userId}`), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const freshJson = await fresh.json();
        if (freshJson?.data) setUser(freshJson.data);
      }
    } catch (e) {
      Alert.alert('Error', 'Ocurrió un error al guardar la firma.');
    }
  };

  const handleAddFirma = () => navigation.navigate('Firma', { onSave: handleSaveFirma });
  const handleEditFirma = () => navigation.navigate('Firma', { onSave: handleSaveFirma, firma: user.firma });

  const handleDeleteFirma = async () => {
    Alert.alert('Eliminar Firma', '¿Estás seguro de que deseas eliminar tu firma?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('accessToken');
            const userId = extractUserId(token);
            const res = await fetch(getApiUrl(`user/${userId}/firma`), {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            if (res.ok) {
              setHasFirma(false);
              const fresh = await fetch(getApiUrl(`user/${userId}`), {
                headers: { Authorization: `Bearer ${token}` },
              });
              const freshJson = await fresh.json();
              if (freshJson?.data) setUser(freshJson.data);
              Alert.alert('Firma eliminada', 'Tu firma ha sido eliminada exitosamente.');
            }
          } catch (e) {
            Alert.alert('Error', 'Ocurrió un error al eliminar la firma.');
          }
        },
      },
    ]);
  };

  const handleNavigateToCollabTablas = (planData) => {
    if (!user) {
      Alert.alert("Espere", "Los datos del usuario aún se están cargando.");
      return;
    }

    const currentUserRole = user?.roles && user.roles.length > 0 ? user.roles[0].toLowerCase() : '';
    const rolesNecesitanFirma = ROLES_CON_FIRMA.map(role => role.toLowerCase());

    if (rolesNecesitanFirma.includes(currentUserRole) && !user.firma) {
      Alert.alert("Sin firma", "No se encontró una firma para el usuario actual. Por favor, registre su firma para ver los planes.");
      return;
    }

    navigation.navigate('CollabTablas', {
      planData: planData,
      currentUser: user,
    });
  };

  const currentUserRole = user?.roles && user.roles.length > 0 ? user.roles[0] : null;
  const userRoleLowerCase = currentUserRole ? currentUserRole.toLowerCase() : null;
  const rolesConFirmaLowerCase = ROLES_CON_FIRMA.map((role) => role.toLowerCase());

  // Filtrar planes según el rol del usuario
  const filteredSetups = setupIzaje.filter(plan => {
    // Si el usuario es jefe, solo mostrar planes con firmaSupervisor diferente a "Firma pendiente"
    if (userRoleLowerCase === JEFE_ROLE) {
      return plan.firmaSupervisor && plan.firmaSupervisor !== "Firma pendiente";
    }
    // Para otros roles, mostrar todos los planes
    return true;
  });

  const visibleButtons = ['MisDatos', 'MisPlanes'];
  if (userRoleLowerCase && rolesConFirmaLowerCase.includes(userRoleLowerCase)) {
    visibleButtons.push('MiFirma');
  }

  return (
    <View style={styles.container}>
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

      <Image
        source={user?.profileImage || require('../../assets/blank-user-image.png')}
        style={styles.profileImage}
      />

      <View style={styles.userButtonsContainer}>
        {visibleButtons.map((section) => (
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
              {section === 'MisDatos' ? 'Mis Datos' : section === 'MisPlanes' ? 'Mis Planes' : 'Mi Firma'}
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

      {selectedButton === 'MisDatos' && (
        <View style={[styles.userDataContainer, { top: -20 }]}>
          <Text style={styles.userName}>{user?.nombre} {user?.apellido}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Components.UserDataSection user={user} />
          <View style={styles.logoutContainer}>
            <Components.Button label="Cerrar Sesión" onPress={handleSignOut} style={[styles.logoutButton, { top: -3 }]} />
          </View>
        </View>
      )}

      {selectedButton === 'MisPlanes' && (
        <View style={{ top: 300, flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 310, marginBottom: 20 }}>
            <Section.SetupIzajeSection
              setupIzaje={filteredSetups}
              setSetups={setSetups}
              currentUser={user}
              onViewPress={user ? handleNavigateToCollabTablas : () => Alert.alert("Cargando", "Espera a que se carguen tus datos antes de continuar.")}
            />
          </ScrollView>
        </View>
      )}

      {selectedButton === 'MiFirma' && userRoleLowerCase && rolesConFirmaLowerCase.includes(userRoleLowerCase) && (
        <View style={[styles.userDataContainer, { top: 300, alignItems: 'center' }]}>
          {hasFirma && user.firma ? (
            <>
              <View style={{
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
              }}>
                <Image
                  source={{
                    uri: user.firma.startsWith('data:')
                      ? user.firma
                      : `data:image/png;base64,${user.firma}`,
                  }}
                  style={{
                    top: 50,
                    width: '180%',
                    height: '180%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{
                flexDirection: 'row',
                marginTop: 40,
                justifyContent: 'space-between',
                width: 250,
                left: -75,
              }}>
                <Components.Button label="Cambiar" onPress={handleEditFirma} style={{ width: 140 }} />
                <Components.Button label="Eliminar" onPress={handleDeleteFirma} style={{ width: 140, backgroundColor: '#990000', left: -40 }} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.emptyText}>No has registrado tu firma</Text>
              <View style={{ marginTop: 30 }}>
                <Components.Button label="Registrar Firma" onPress={handleAddFirma} style={{ width: 200, left: -25 }} />
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default Profile;