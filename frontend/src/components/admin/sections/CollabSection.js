import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles/AdminSectionStyles';
import getApiUrl from '../../../utils/apiUrl';
import Components from '../../../components/Components.index';
import { useNavigation } from '@react-navigation/native';

const CollabSection = ({ colaboradores, handleEdit, setColaboradores }) => {
  const navigation = useNavigation();
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

  const colaboradoresFiltrados = colaboradores.filter(colaborador =>
    !["admin", "admin2", "user"].includes(colaborador.username)
  );

  return (
    <View style={styles.section}>
      {colaboradoresFiltrados.map((colaborador, index) => (
        <View key={colaborador._id || `colaborador-${index}`} style={[styles.card, { marginBottom: 0, top: 0 }]}>
          <TouchableOpacity onPress={() => handleCardPress(colaborador._id)}>
            <View style={styles.titleContainer}>
              <Text style={[styles.cardTitle, { fontSize: 22 }]}>
                {colaborador.nombre} {colaborador.apellido}
              </Text>
              <View style={styles.profileCircle}>
                <Image
                  source={require('../../../../assets/blank-user-image.png')}
                  style={[styles.profileImage, { top: 6 }]}
                />
              </View>
            </View>
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>RUT: </Text>{colaborador.rut}
            </Text>
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>Cargo: </Text>{colaborador.cargo}
            </Text>
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>Especialidad: </Text>{colaborador.especialidad}
            </Text>
          </TouchableOpacity>

        {selectedCard === colaborador._id && (
            <View style={styles.buttonContainerCard}>
              {/* Botón "Ver" se muestra siempre */}
              <Components.Button
                label="Ver"
                onPress={() => {
                  navigation.push('CollabProfile', { userData: colaborador, fromCollab: true });
                }}
                isCancel={true}
                style={styles.button}
              />
              {/* Si el usuario NO tiene rol 'jefe', se muestran Editar y Eliminar */}
              {!(colaborador.roles && colaborador.roles.includes('jefe')) && (
                <View style={styles.multiButtonContainer}>
                  <Components.Button
                    label="Editar"
                    onPress={() => navigation.push('EditCollab', { userData: colaborador })}
                    isCancel={true}
                    style={[styles.button, { left: -62 }]}
                  />
                  <Components.Button
                    label="Eliminar"
                    onPress={() => confirmDelete(colaborador._id)}
                    isCancel={true}
                    style={[styles.button, { left: -119 }]}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default CollabSection;