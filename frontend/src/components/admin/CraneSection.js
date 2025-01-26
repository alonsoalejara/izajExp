import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/AdminSectionStyles'; 
import getApiUrl from '../../utils/apiUrl';

const CraneSection = ({ gruas, handleEdit, setGruas }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardPress = (_id) => {
    setSelectedCard(selectedCard === _id ? null : _id);
  };

  const confirmDelete = (_id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta grúa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => handleDelete(_id) },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = async (_id) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('Error', 'No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }
      const response = await fetch(getApiUrl(`grua/${_id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Grúa eliminada con éxito');
        const updatedGruas = gruas.filter(grua => grua._id !== _id);
        setGruas(updatedGruas);
      } else {
        Alert.alert('Error', 'Error al eliminar la grúa');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Ocurrió un error al intentar eliminar la grúa');
    }
  };

  return (
    <View style={styles.section}>
      {gruas.map((grua, index) => (
        <View key={grua._id || `grua-${index}`} style={styles.card}>
          <TouchableOpacity onPress={() => handleCardPress(grua._id)}>
            <Text style={styles.cardTitle}>{grua.nombre}</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Peso del Equipo: </Text>{grua.pesoEquipo} kg</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Peso del Gancho: </Text>{grua.pesoGancho} kg</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Capacidad de Levante: </Text>{grua.capacidadLevante} kg</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Largo de la Pluma: </Text>{grua.largoPluma} m</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Contrapeso: </Text>{grua.contrapeso} toneladas</Text>
          </TouchableOpacity>

          {selectedCard === grua._id && (
            <View style={styles.buttonContainerCard}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEdit(grua)}
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => confirmDelete(grua._id)}
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

export default CraneSection;
