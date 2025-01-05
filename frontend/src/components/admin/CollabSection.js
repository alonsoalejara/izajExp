import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AdminPanelStyles'; 

const CollabSection = ({ colaboradores, handleAdd, handleEdit, handleDelete }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardPress = (key) => {
    setSelectedCard(selectedCard === key ? null : key);
  };

  console.log("(CollabSection.js) Datos recibidos de colaboradores:", colaboradores);

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
        console.log("(CollabSection.js) Datos del colaborador:", colaborador);
        
        return (
          <View key={colaborador.key} style={styles.card}>
            <TouchableOpacity onPress={() => handleCardPress(colaborador.key)}>
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

            {selectedCard === colaborador.key && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    console.log("(CollabSection.js) Datos enviados a ModalEditCollab:", colaborador);
                    handleEdit(colaborador);
                  }}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(colaborador.key)}
                >
                  <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default CollabSection;
