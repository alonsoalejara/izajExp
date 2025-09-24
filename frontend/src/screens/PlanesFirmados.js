import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';
import getApiUrl from '../utils/apiUrl';
import Section from '../components/admin/sections/Section.index';
import Components from '../components/Components.index';

const PlanesFirmados = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [setupIzaje, setSetups] = useState([]); // Estado para los planes de izaje

  const extractUserId = (token) => {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = atob(base64);
      return JSON.parse(json).id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          Alert.alert("Error de autenticación", "No se encontró token de sesión. Inicia sesión de nuevo.");
          navigation.replace('Login');
          return;
        }

        const userId = extractUserId(token);
        if (!userId) {
          Alert.alert("Error", "No se pudo obtener el ID de usuario del token.");
          return;
        }

        // 1. Obtener los datos del usuario
        const userRes = await fetch(getApiUrl(`user/${userId}`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userRes.json();
        if (userRes.ok && userData?.data) {
          setUser(userData.data);
        } else {
          console.warn('No se pudo cargar los datos del usuario:', userData);
          Alert.alert("Error", "No se pudo cargar la información del usuario.");
        }

        // 2. Obtener todos los planes de izaje
        const setupsRes = await fetch(getApiUrl('setupIzaje'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const setupsText = await setupsRes.text();
        if (!setupsText) {
          console.warn('Respuesta vacía del backend para setups.');
          setSetups([]);
          return;
        }
        const setupsJson = JSON.parse(setupsText);

        if (setupsRes.ok && setupsJson?.data) {
            // *** CAMBIO AQUÍ: Asignamos directamente todos los planes, sin filtrar ***
            setSetups(setupsJson.data);
        } else {
          console.warn('Respuesta JSON sin propiedad "data" para setups o error:', setupsJson);
          Alert.alert("Error", "No se pudieron cargar los planes de izaje.");
        }
      } catch (e) {
        console.error('Error al obtener los datos en PlanesFirmados:', e);
        Alert.alert('Error', 'Ocurrió un error al cargar los planes.');
      }
    }
    fetchData();
  }, []);

  const handleNavigateToCollabTablas = (setup) => {
    if (!user) {
      Alert.alert("Cargando", "Espera a que se carguen tus datos antes de continuar.");
      return;
    }
    if (!user.firma) {
      Alert.alert("Sin firma", "No se encontró una firma para el usuario actual.");
      return;
    }
    navigation.navigate('CollabTablas', {
      setup,
      currentUserFirma: user.firma,
      currentUser: user,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Planes firmados</Text>
      </View>

      <Text style={styles.subtitle}>
        Aquí puedes ver todos los planes disponibles.
      </Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {setupIzaje.length > 0 ? (
          <Section.SetupIzajeSection
            setupIzaje={setupIzaje}
            setSetups={setSetups}
            currentUser={user}
            onViewPress={handleNavigateToCollabTablas}
          />
        ) : (
          <Text style={styles.noPlansText}>No hay planes disponibles aún.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 20,
        marginBottom: 10,
    },
    backButton: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 45
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        left: 10,
        textAlign: 'left',
    },
    scrollViewContent: {
        paddingBottom: 20,
        right: 48,
    },
    noPlansText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#999',
    },
});

export default PlanesFirmados;