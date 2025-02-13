import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../../styles/AdminSectionStyles';

const CraneSection = ({ gruas }) => {
  return (
    <View style={styles.section}>
      {gruas.map((grua, index) => (
        <View key={grua._id || `grua-${index}`} style={styles.card}>
          <TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={[styles.cardTitle,{ fontSize: 22 }]}>{grua.nombre}</Text>
              <View style={styles.profileCircle}>
                <Image source={require('../../../../assets/blank-crane-image.png')} style={styles.profileImage} />
              </View>            
            </View>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Peso del Equipo: </Text>{grua.pesoEquipo} kg</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Peso del Gancho: </Text>{grua.pesoGancho} kg</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Capacidad de Levante: </Text>{grua.capacidadLevante} kg</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Largo de la Pluma: </Text>{grua.largoPluma} m</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Contrapeso: </Text>{grua.contrapeso} toneladas</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default CraneSection;
