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
import Firma from './Firma.js';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [selectedButton, setSelectedButton] = useState('MisDatos');
  const [setupIzaje, setSetups] = useState([]);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSignatureModalVisible, setIsSignatureModalVisible] = useState(false); // Ya no se usa este estado
  const [signatureData, setSignatureData] = useState(null);

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
    MiFirma: new Animated.Value(0),
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
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data && data.data) {
            setUser(data.data);
            setHasSignature(!!data.data.signature);
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

    const otherButtons = ['MisDatos', 'MisPlanes', 'MiFirma'].filter(b => b !== button);
    otherButtons.forEach(otherButton => {
      Animated.timing(animations.current[otherButton], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

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

  const handleAddSignature = () => {
    // Navegar a la pantalla de Firma
    navigation.navigate('Firma', { onSave: handleSaveSignature });
  };

  const handleEditSignature = () => {
    // Navegar a la pantalla de Firma
      navigation.navigate('Firma', { onSave: handleSaveSignature });
  };

  const handleDeleteSignature = async () => {
    Alert.alert(
      "Eliminar Firma",
      "¿Estás seguro de que deseas eliminar tu firma?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('accessToken');
              if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;
                const url = getApiUrl(`user/${userId}/signature`);
                const response = await fetch(url, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });
                if (response.ok) {
                  setHasSignature(false);
                  const userUrl = getApiUrl(`user/${userId}`);
                  const userResponse = await fetch(userUrl, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  const userData = await userResponse.json();
                  if (userData && userData.data) {
                    setUser(userData.data);
                  }
                  Alert.alert("Firma eliminada", "Tu firma ha sido eliminada exitosamente.");
                } else {
                  Alert.alert("Error", "No se pudo eliminar la firma. Inténtalo de nuevo.");
                }
              }
            } catch (error) {
              console.error("Error al eliminar la firma:", error);
              Alert.alert("Error", "Ocurrió un error al eliminar la firma.");
            }
          },
        },
      ]
    );
  };

    const handleSaveSignature = async (signature) => {
        // Aquí guardas la firma (signature) en el backend
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;
                const url = getApiUrl(`user/${userId}/signature`); //  endpoint para guardar la firma
                const response = await fetch(url, {
                    method: 'POST', // o 'PUT' si estás actualizando
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ signature }), // Enviar la firma como parte del cuerpo de la petición
                });

                if (response.ok) {
                    setHasSignature(true); // Actualiza el estado para mostrar que hay firma
                    // Actualizar los datos del usuario
                    const userUrl = getApiUrl(`user/${userId}`);
                    const userResponse = await fetch(userUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const userData = await userResponse.json();
                    if (userData && userData.data) {
                        setUser(userData.data);
                    }
                    Alert.alert("Firma guardada", "Tu firma se ha guardado exitosamente.");
                } else {
                    const errorData = await response.json(); // Intenta obtener un mensaje de error del servidor
                    const errorMessage = errorData?.message || "No se pudo guardar la firma. Inténtalo de nuevo."; //Mensaje
                    Alert.alert("Error", errorMessage);
                }
            }
        } catch (error) {
            console.error("Error al guardar la firma:", error);
            Alert.alert("Error", "Ocurrió un error al guardar la firma.");
        }
       // setIsSignatureModalVisible(false); // Cierra el modal después de guardar <---- No se usa
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
              <Stop offset="70%" stopColor="#ee0000" stopOpacity="0.8" />
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
        {['MisDatos', 'MisPlanes', 'MiFirma'].map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.userButton, selectedButton === section && { color: '#ee0000' }]}
            onPress={() => handlePressButton(section)}
          >
            <Text style={[styles.userButtonText, selectedButton === section && { color: '#ee0000' }]}>
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

      {selectedButton === 'MisDatos' && (
        <View style={[styles.userDataContainer, { top: -25 }]}>
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

      {selectedButton === 'MiFirma' && (
        <View style={[styles.userDataContainer, { top: 300 }]}>
          {hasSignature ? (
            <>
              <Text style={styles.userEmail}>Firma registrada</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <Components.Button label="Editar Firma" onPress={handleEditSignature} style={{ width: '40%' }} />
                <Components.Button label="Eliminar Firma" onPress={handleDeleteSignature} style={{ width: '40%', backgroundColor: '#dc143c' }} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.userName}>No has registrado tu firma</Text>
              <Components.Button label="Agregar Firma" onPress={handleAddSignature} style={{ marginTop: 20 }} />
            </>
          )}
        </View>
      )}

      {selectedButton === 'MisDatos' && (
        <View style={[styles.logoutContainer, { flex: 0, top: -40 }]}>
          <Components.Button label="Cerrar Sesión" onPress={handleSignOut} style={styles.logoutButton} />
        </View>
      )}

      {/* Navegacion a la pantalla de Firma */}
      {/* No se renderiza aqui, se navega con el onPress de los botones */}
    </View>
  );
};

export default Profile;
