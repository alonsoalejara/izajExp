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

  // Filtramos para excluir a usuarios con rol "admin"
  const colaboradoresFiltrados = colaboradores.filter(colaborador => !colaborador.roles.includes('admin'));

  return (
    <View style={styles.section}>
      {colaboradoresFiltrados.map((colaborador, index) => (
        <View key={colaborador._id || `colaborador-${index}`} style={[styles.card, { marginBottom: 10 }]}>
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
            <View style={[styles.buttonContainerCard, { marginLeft: -110, marginTop: -10, marginBottom: -70, bottom: 0, top: 15, left: 0 }]}>
              {/* Botón "Ver": envía los datos del colaborador y la bandera fromCollab */}
              <Components.Button
                label="Ver"
                onPress={() => {
                  console.log('Datos pasados a CollabProfile:', colaborador);
                  navigation.push('CollabProfile', { userData: colaborador, fromCollab: true });
                }}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', width: '0%', height: '42%', marginHorizontal: -53 }]}
              />
              <Components.Button
                label="Editar"
                onPress={() => handleEdit(colaborador)}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', width: '0%', height: '42%', marginHorizontal: -53 }]}
              />
              <Components.Button
                label="Eliminar"
                onPress={() => confirmDelete(colaborador._id)}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', width: '0%', height: '42%', marginHorizontal: -53 }]}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default CollabSection;
