import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AdminPanelStyles'; 
import ModalAlert from '../modals/ModalAlert';
import getApiUrl from '../../utils/apiUrl';

const CollabSection = ({ colaboradores, handleAdd, handleEdit }) => {
  const [selectedCard, setSelectedCard] = useState(null);  // Selección de tarjeta
  const [isModalVisible, setModalVisible] = useState(false);
  const [colaboradorToDelete, setColaboradorToDelete] = useState(null);

  const handleCardPress = (_id) => {
    // Si la tarjeta ya está seleccionada, deseleccionamos, de lo contrario la seleccionamos
    setSelectedCard(selectedCard === _id ? null : _id);
  };

  const confirmDelete = (_id) => {
    setColaboradorToDelete(_id);
    setModalVisible(true);
  };

  const handleDelete = async (_id) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        alert('No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }
      const response = await fetch(getApiUrl(`user/${_id}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        alert('Colaborador eliminado con éxito');
      } else {
        alert('Error al eliminar el colaborador');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal</Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => handleAdd('Colaboradores')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>

      {colaboradores.map((colaborador) => {
        return (
          <View key={colaborador._id} style={styles.card}>
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
              <View style={styles.buttonContainer}>
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
        );
      })}

      <ModalAlert
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        message="¿Estás seguro de que deseas eliminar este colaborador?"
        showCloseButton={false} 
      >
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(colaboradorToDelete)}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </ModalAlert>
    </View>
  );
};

export default CollabSection;