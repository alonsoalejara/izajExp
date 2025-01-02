import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AdminPanelStyles';

const CraneSection = ({ gruas, handleAdd }) => {
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
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{grua.nombre}</Text>
          <Text style={styles.cardDetail}>
            <Text style={styles.labelText}>Peso del Equipo: </Text>{grua.pesoEquipo} kg
          </Text>
          <Text style={styles.cardDetail}>
            <Text style={styles.labelText}>Peso del Gancho: </Text>{grua.pesoGancho} kg
          </Text>
          <Text style={styles.cardDetail}>
            <Text style={styles.labelText}>Capacidad de Levante: </Text>{grua.capacidadLevante} kg
          </Text>
          <Text style={styles.cardDetail}>
            <Text style={styles.labelText}>Largo de la Pluma: </Text>{grua.largoPluma} m
          </Text>
          <Text style={styles.cardDetail}>
            <Text style={styles.labelText}>Contrapeso: </Text>{grua.contrapeso} toneladas
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CraneSection;
