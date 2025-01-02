import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CollabSection = ({ styles, colaboradores, handleAdd }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Colaboradores</Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => handleAdd('Colaboradores')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
      {colaboradores.map((colaborador) => (
        <View key={colaborador.rut} style={styles.collaboratorCard}>
          <Text style={styles.collaboratorName}>{colaborador.nombre} {colaborador.apellido}</Text>
          <Text style={styles.collaboratorDetails}>RUT: {colaborador.rut}</Text>
          <Text style={styles.collaboratorDetails}>Teléfono: {colaborador.phone}</Text>
          <Text style={styles.collaboratorDetails}>Especialidad: {colaborador.specialty}</Text>
          <Text style={styles.collaboratorDetails}>Email: {colaborador.email}</Text>
        </View>
      ))}
    </View>
  );
};

export default CollabSection;