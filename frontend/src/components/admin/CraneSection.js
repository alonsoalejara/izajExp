import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CraneSection = ({ styles, gruas, handleAdd }) => {
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
        <View key={index} style={styles.gruaCard}>
          <Text style={styles.gruaName}>{grua.nombre}</Text>
          <Text style={styles.gruaDetails}>Peso del Equipo: {grua.pesoEquipo} kg</Text>
          <Text style={styles.gruaDetails}>Peso del Gancho: {grua.pesoGancho} kg</Text>
          <Text style={styles.gruaDetails}>Capacidad de Levante: {grua.capacidadLevante} kg</Text>
          <Text style={styles.gruaDetails}>Largo de la Pluma: {grua.largoPluma} m</Text>
          <Text style={styles.gruaDetails}>Contrapeso: {grua.contrapeso} toneladas</Text>
        </View>
      ))}
    </View>
  );
};

export default CraneSection;