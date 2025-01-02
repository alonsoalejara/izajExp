import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AdminPanelStyles'; 

const CollabSection = ({ colaboradores, handleAdd }) => {
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
        </View>
      ))}
    </View>
  );
};

export default CollabSection;
