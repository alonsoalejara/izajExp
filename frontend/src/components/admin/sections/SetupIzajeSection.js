import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles/AdminSectionStyles';
import getApiUrl from '../../../utils/apiUrl';
import Components from '../../../components/Components.index';

const SetupIzajeSection = ({
  setupIzaje = [],
  setSetups,
  currentUser,
  isAdminPanel,
  buttonContainerStyle,
  onViewPress,
}) => {
  const navigation = useNavigation();
  const [selectedSetup, setSelectedSetup] = useState(null);

  const userRole = currentUser?.roles?.[0]; // extrae el primer rol
  console.log('Rol del usuario:', userRole);
  console.log('Todos los capataces:', setupIzaje.map(s => s.capataz?._id));

  const filteredSetups = currentUser
    ? setupIzaje.filter((setup) => {
        if (userRole === 'capataz') {
          return setup.capataz && setup.capataz._id === currentUser._id;
        } else if (userRole === 'supervisor') {
          return setup.supervisor && setup.supervisor._id === currentUser._id;
        } else if (userRole === 'jefe') {
          return setup.jefeArea && setup.jefeArea._id === currentUser._id;
        }
        return false;
      })
    : setupIzaje;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} a las ${hours}:${minutes} hrs`;
  };

  const confirmDelete = (_id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este plan de izaje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => handleDelete(_id) },
      ]
    );
  };

  const handleDelete = async (_id) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        alert('No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }
      const response = await fetch(getApiUrl(`setupIzaje/${_id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        alert('Plan de izaje eliminado con éxito');
        setSetups((prevSetups) => prevSetups.filter((setup) => setup._id !== _id));
      } else {
        alert('Error al eliminar el plan de izaje');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.section}>
      {filteredSetups && filteredSetups.length > 0 ? (
        filteredSetups.map((setup) => (
          <View key={setup._id} style={styles.card}>
            <TouchableOpacity
              onPress={() => setSelectedSetup(selectedSetup === setup._id ? null : setup._id)}
            >
              <Text style={[styles.cardTitle, { fontWeight: '700' }]}>
                Proyecto:{' '}
                <Text style={{ fontWeight: '400' }}>
                  {setup.nombreProyecto || 'Sin nombre'}
                </Text>
              </Text>
              <Text style={[styles.cardDetail, { fontWeight: '700', color: '#777' }]}>
                Fecha:{' '}
                <Text style={{ fontWeight: '400' }}>
                  {setup.createdAt ? formatDate(setup.createdAt) : 'No disponible'}
                </Text>
              </Text>
            </TouchableOpacity>

            {selectedSetup === setup._id && (
              <View style={styles.cardExpandedDetails}>
                <View style={styles.buttonContainerCard}>
                  <Components.Button
                    label="Ver"
                    onPress={() => onViewPress(setup)}
                    isCancel={true}
                    style={styles.button}
                  />

                  {/* Mostrar Editar/Eliminar solo si NO es capataz y NO es adminPanel */}
                  {!isAdminPanel && userRole !== 'capataz' && (
                    <View style={styles.multiButtonContainer}>
                      <Components.Button
                        label="Editar"
                        onPress={() => console.log('Editar presionado')}
                        isCancel={true}
                        style={[styles.button, { right: 60 }]}
                      />
                      <Components.Button
                        label="Eliminar"
                        onPress={() => confirmDelete(setup._id)}
                        isCancel={true}
                        style={[styles.button, { right: 120 }]}
                      />
                    </View>
                  )}

                  {/* Mostrar Eliminar en adminPanel sin restricciones */}
                  {isAdminPanel && (
                    <Components.Button
                      label="Eliminar"
                      onPress={() => confirmDelete(setup._id)}
                      isCancel={true}
                      style={styles.button}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No hay planes de izaje que mostrar.</Text>
      )}
    </View>
  );
};

export default SetupIzajeSection;
