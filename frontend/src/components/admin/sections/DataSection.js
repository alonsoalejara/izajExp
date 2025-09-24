import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFetchData } from '../../../hooks/useFetchData';

const DataSection = () => {
  const { data: setupIzajes = [] } = useFetchData('setupIzaje');
  const { data: users = [] } = useFetchData('user');
  const [stats, setStats] = useState({ totalPlans: 0, especialidadBreakdown: {} });

  useEffect(() => {
    if (setupIzajes.length > 0 && users.length > 0) {
      const totalPlans = setupIzajes.length;

      const userEspecialidadMap = new Map();
      users.forEach(user => {
        if (user._id && user.especialidad) {
          userEspecialidadMap.set(user._id, user.especialidad);
        }
      });

      const expectedEspecialidades = {
        'estructura': 'Estructura',
        'obras civiles': 'Obras Civiles',
        'piping': 'Piping',
        'mecanica': 'Mecánica',
        'mecánica': 'Mecánica',
        'electrica': 'Eléctrica',
        'eléctrica': 'Eléctrica',
      };

      const especialidadBreakdown = {
        Estructura: 0,
        'Obras Civiles': 0,
        Piping: 0,
        Mecánica: 0,
        Eléctrica: 0,
        Otros: 0
      };

      setupIzajes.forEach(plan => {
        let planEspecialidad = 'Otros';
        let associatedUserId = null;
        if (plan.capataz?._id) {
          associatedUserId = plan.capataz._id;
        } else if (plan.supervisor?._id) {
          associatedUserId = plan.supervisor._id;
        } else if (plan.jefeArea?._id) {
          associatedUserId = plan.jefeArea._id;
        }

        if (associatedUserId) {
          const rawEspecialidad = userEspecialidadMap.get(associatedUserId);
          if (rawEspecialidad) {
            const normalizedEspecialidadKey = rawEspecialidad.toLowerCase().trim();
            const mappedEspecialidad = expectedEspecialidades[normalizedEspecialidadKey];
            if (mappedEspecialidad) {
              planEspecialidad = mappedEspecialidad;
            }
          }
        }

        especialidadBreakdown[planEspecialidad] += 1;
      });

      setStats({ totalPlans, especialidadBreakdown });
    }
  }, [setupIzajes, users]);
  return (
    <View style={styles.dataSectionContainer}>
      <Text style={styles.dataSectionTitle}>Especialidades</Text>
      <Text style={styles.statItem}><Text style={styles.boldText}>Total de planes:</Text> {stats.totalPlans}</Text>
      <Text style={[styles.statItem, styles.boldText, { marginTop: 10 }]}>Desglose por especialidad:</Text>
      {Object.entries(stats.especialidadBreakdown)
        .sort((a, b) => b[1] - a[1])
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