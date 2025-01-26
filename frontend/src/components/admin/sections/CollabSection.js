import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles/AdminSectionStyles'; 
import getApiUrl from '../../../utils/apiUrl';

const CollabSection = ({ colaboradores, handleEdit, setColaboradores }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardPress = (_id) => {
    setSelectedCard(selectedCard === _id ? null : _id);
  };

  const confirmDelete = (_id) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar este colaborador?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => handleDelete(_id) }
      ]
    );
  };

  const handleDelete = async (_id) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('Error', 'No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }
      const response = await fetch(getApiUrl(`user/${_id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Colaborador eliminado con éxito');
        const updatedColaboradores = colaboradores.filter(colaborador => colaborador._id !== _id);
        setColaboradores(updatedColaboradores);
      } else {
        Alert.alert('Error', 'Error al eliminar el colaborador');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const colaboradoresFiltrados = colaboradores.filter(colaborador => !colaborador.roles.includes('admin'));

  return (
    <View style={styles.section}>
      {colaboradoresFiltrados.map((colaborador, index) => (
        <View key={colaborador._id || `colaborador-${index}`} style={styles.card}>
          <TouchableOpacity onPress={() => handleCardPress(colaborador._id)}>
            <Text style={styles.cardTitle}>
              {colaborador.nombre} {colaborador.apellido}
            </Text>
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>RUT: </Text>{colaborador.rut}
            </Text>
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>Teléfono: </Text>{colaborador.phone}
            </Text>
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>Especialidad: </Text>{colaborador.specialty}
            </Text>
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>Email: </Text>{colaborador.email}
            </Text>
          </TouchableOpacity>

          {selectedCard === colaborador._id && (
            <View style={styles.buttonContainerCard}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEdit(colaborador)}
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => confirmDelete(colaborador._id)}
              >
                <Text style={styles.actionButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default CollabSection;
