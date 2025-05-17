import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles/AdminSectionStyles';
import getApiUrl from '../../../utils/apiUrl';
import Components from '../../../components/Components.index';

const SetupIzajeSection = ({ setupIzaje = [], setSetups, currentUser, isAdminPanel, buttonContainerStyle }) => {
  const navigation = useNavigation();
  const [selectedSetup, setSelectedSetup] = useState(null);
  
  // Filtramos verificando que setup.usuario exista
  const filteredSetups = currentUser
    ? setupIzaje.filter(setup => setup.usuario && setup.usuario._id === currentUser._id)
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
      {(filteredSetups && Array.isArray(filteredSetups) && filteredSetups.length > 0) ? (
        filteredSetups.map((setup) => (
          <View key={setup._id} style={styles.card}>
            <TouchableOpacity onPress={() => setSelectedSetup(selectedSetup === setup._id ? null : setup._id)}>
              <Text style={[styles.cardTitle, { fontWeight: '700' }]}>
                Supervisor: <Text style={{ fontWeight: '400' }}>
                  {setup.usuario?.nombre && setup.usuario?.apellido
                    ? `${setup.usuario.nombre} ${setup.usuario.apellido}`
                    : 'No disponible'}
                </Text>
              </Text>
              <Text style={[styles.cardDetail, { fontWeight: '700', color: '#777' }]}>
                Especialidad: <Text style={{ fontWeight: '400' }}>
                  {setup.usuario?.specialty || 'No disponible'}
                </Text>
              </Text>
              <View>
                <Text style={[styles.labelText, { top: 8, fontWeight: 'bold', fontSize: 16, color: '#777' }]}>
                  Fecha: <Text style={{ fontWeight: '400' }}>
                    {setup.createdAt ? formatDate(setup.createdAt) : 'No disponible'}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
            {selectedSetup === setup._id && (
             <View style={styles.cardExpandedDetails}>
              <View style={styles.buttonContainerCard}>
                <Components.Button
                  label="Ver"
                  onPress={() => navigation.navigate('CollabTablas', { setup })}
                  isCancel={true}
                  style={styles.button}
                />
                {/* Si el usuario NO es administrador, se muestran Editar y Eliminar */}
                {!isAdminPanel && (
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
                {/* Si el usuario ES administrador, solo se muestra el botón Eliminar */}
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
