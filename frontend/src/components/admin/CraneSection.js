import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AdminPanelStyles';
import ModalAlert from '../modals/ModalAlert';
import getApiUrl from '../../utils/apiUrl';

const CraneSection = ({ gruas, handleAdd, handleEdit, setGruas }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [gruaToDelete, setGruaToDelete] = useState(null);

  const handleCardPress = (_id) => {
    setSelectedCard(selectedCard === _id ? null : _id);
  };

  const confirmDelete = (_id) => {
    setGruaToDelete(_id);
    setModalVisible(true);
  };

  const handleDelete = async (_id) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            alert('No autorizado. Por favor, inicie sesión nuevamente.');
            return;
        }
        const response = await fetch(getApiUrl(`grua/${_id}`), {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            alert('Grúa eliminada con éxito');
            const updatedGruas = gruas.filter(grua => grua._id !== _id);
            setGruas(updatedGruas);
            setModalVisible(false);
        } else {
            alert('Error al eliminar la grúa');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Grúas</Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => handleAdd('Gruas')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>

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
              <View style={styles.buttonContainer}>
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

      <ModalAlert
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        message="¿Estás seguro de que deseas eliminar esta grúa?"
        showCloseButton={false} 
      >
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(gruaToDelete)}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </ModalAlert>
    </View>
  );
};

export default CraneSection;