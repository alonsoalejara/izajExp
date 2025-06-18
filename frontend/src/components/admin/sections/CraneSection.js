import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../../styles/AdminSectionStyles';

const CraneSection = ({ gruas }) => {
  // Filtrar solo la grúa que queremos mostrar
  const gruasFiltradas = gruas.filter(grua => grua.nombre === "Terex RT555");

  return (
    <View style={styles.section}>
      {gruasFiltradas.map((grua, index) => (
        <View key={grua._id || `grua-${index}`} style={styles.card}>
          <TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={[styles.cardTitle, { fontSize: 22 }]}>{grua.nombre}</Text>
              <View style={styles.profileCircle}>
                <Image source={require('../../../../assets/blank-crane-image.png')} style={styles.profileImage} />
              </View>            
            </View>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Largos de la Pluma:</Text></Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}></Text>10.5 m</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}></Text>15.4 m</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}></Text>19.8 m</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}></Text>24.3 m</Text>                      
            <Text style={styles.cardDetail}><Text style={styles.labelText}></Text>26.9 m</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}></Text>33.5 m</Text>
            <Text style={styles.cardDetail}><Text style={styles.labelText}>Contrapeso: </Text>{grua.contrapeso} toneladas</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default CraneSection;
