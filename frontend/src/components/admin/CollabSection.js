import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AdminPanelStyles'; 

const CollabSection = ({ colaboradores, handleAdd, handleEdit, handleDelete }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardPress = (rut) => {
    setSelectedCard(selectedCard === rut ? null : rut);
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
      {colaboradores.map((colaborador) => (
        <View key={colaborador.rut} style={styles.card}>
          <TouchableOpacity onPress={() => handleCardPress(colaborador.rut)}>
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

          {selectedCard === colaborador.rut && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEdit(colaborador)}
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDelete(colaborador.rut)}
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
