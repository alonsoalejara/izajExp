import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFetchData } from '../../../hooks/useFetchData';

const DataSection = () => {
  const { data: setupIzajes = [] } = useFetchData('setupIzaje');
  const [stats, setStats] = useState({ totalPlans: 0, specialtyBreakdown: {} });

  useEffect(() => {
    if (setupIzajes.length > 0) {
      const totalPlans = setupIzajes.length;
      const specialtyBreakdown = { Estructura: 0, 'Obras Civiles': 0, Piping: 0, Mecánica: 0, Eléctrica: 0, Otros: 0 };
      
      setupIzajes.forEach(plan => {
        const specialty = plan.usuario?.specialty || 'Otros';
        if (specialtyBreakdown.hasOwnProperty(specialty)) {
          specialtyBreakdown[specialty] += 1;
        } else {
          specialtyBreakdown['Otros'] += 1;
        }
      });

      setStats({ totalPlans, specialtyBreakdown });
    }
  }, [setupIzajes]);

  return (
    <View style={styles.dataSectionContainer}>
      <Text style={styles.dataSectionTitle}>Especialidades</Text>
      <Text style={styles.statItem}><Text style={styles.boldText}>Total de planes:</Text> {stats.totalPlans}</Text>
      <Text style={[styles.statItem, styles.boldText, { marginTop: 10 }]}>Desglose por especialidad:</Text>
      {Object.entries(stats.specialtyBreakdown)
        .sort((a, b) => b[1] - a[1]) // Ordena en orden descendente por cantidad de planes
        .map(([key, value]) => (
          <Text key={key} style={styles.statItem}>
            - <Text style={styles.boldText}>{key}:</Text> {value}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dataSectionContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'left',
  },
  dataSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    alignItems: 'left',
  },
  statItem: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 5,
    color: '#666',
  },
  boldText: {
    fontWeight: '600',
    color: '#666',
  },
});

export default DataSection;
