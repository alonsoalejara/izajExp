import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useFetchData } from '../../../hooks/useFetchData';

const screenWidth = Dimensions.get('window').width;

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

export default function DataSection() {
  const { data: setupIzajes = [] } = useFetchData('setupIzaje');
  const { data: users = [] } = useFetchData('user');
  const [stats, setStats] = useState({
    especialidadBreakdown: {},
    duracionPromedio: [],
    estadoBreakdown: {},
  });

  useEffect(() => {
    if (setupIzajes.length > 0 && users.length > 0) {
      // 📊 1. Uso de la aplicación por especialidad
      const especialidadCount = {};
      const userEspecialidadMap = new Map();
      users.forEach(u => userEspecialidadMap.set(u._id, u.especialidad));

      setupIzajes.forEach(plan => {
        const userId = plan.capataz?._id || plan.supervisor?._id || plan.jefeArea?._id;
        const esp = userEspecialidadMap.get(userId) || 'Otros';
        especialidadCount[esp] = (especialidadCount[esp] || 0) + 1;
      });

      // ⏱️ 2. Tiempo promedio de duración (en horas)
      const duraciones = setupIzajes.map(plan => {
        const start = new Date(plan.createdAt);
        const end = new Date(plan.updatedAt);
        const duracionHoras = (end - start) / (1000 * 60 * 60);
        return duracionHoras > 0 ? duracionHoras : 0;
      });

      const promedio = duraciones.length > 0
        ? duraciones.reduce((a, b) => a + b, 0) / duraciones.length
        : 0;

      const duracionPromedio = [
        { name: 'Promedio', value: Number(promedio.toFixed(2)) },
        { name: 'Máximo', value: Math.max(...duraciones).toFixed(2) },
        { name: 'Mínimo', value: Math.min(...duraciones).toFixed(2) },
      ];

      // ✅ 3. Métrica de éxito y aprobación de planes
      const estadoCount = { Aprobado: 0, Pendiente: 0, Rechazado: 0 };
      setupIzajes.forEach(plan => {
        const estado = plan.estado || 'Pendiente';
        if (estadoCount[estado] !== undefined) {
          estadoCount[estado]++;
        }
      });

      setStats({
        especialidadBreakdown: especialidadCount,
        duracionPromedio,
        estadoBreakdown: estadoCount,
      });
    }
  }, [setupIzajes, users]);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    labelColor: () => '#333',
    barPercentage: 0.5,
    style: { borderRadius: 16 },
  };

  const chartWidth = screenWidth * 0.85;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      {/* CARD 1 - Uso por especialidad */}
      <Card>
        <Text style={styles.title}>👷‍♂️ Uso de la App por Especialidad</Text>
        {Object.keys(stats.especialidadBreakdown).length > 0 ? (
          <PieChart
            data={Object.entries(stats.especialidadBreakdown).map(([name, value], i) => ({
              name,
              population: Number(value) || 0,
              color: ['#ff4d4d', '#ff9933', '#ffcc00', '#66cc66', '#3399ff', '#999999'][i % 6],
              legendFontColor: '#333',
              legendFontSize: 13,
            }))}
            width={chartWidth}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            chartConfig={chartConfig}
            absolute
          />
        ) : (
          <Text style={styles.noData}>No hay datos suficientes</Text>
        )}
      </Card>

      {/* CARD 2 - Tiempo promedio de duración */}
      <Card>
        <Text style={styles.title}>⏱️ Duración Promedio de Planes (Horas)</Text>
        {stats.duracionPromedio.length > 0 ? (
          <BarChart
            data={{
              labels: stats.duracionPromedio.map(d => d.name),
              datasets: [{ data: stats.duracionPromedio.map(d => Number(d.value)) }],
            }}
            width={chartWidth}
            height={220}
            fromZero
            yAxisSuffix="h"
            chartConfig={{
              ...chartConfig,
              decimalPlaces: 2,
            }}
          />
        ) : (
          <Text style={styles.noData}>No hay datos suficientes</Text>
        )}
      </Card>

      {/* CARD 3 - Métrica de éxito/aprobación */}
      <Card>
        <Text style={styles.title}>✅ Métrica de Aprobación de Planes</Text>
        {Object.keys(stats.estadoBreakdown).length > 0 ? (
          <PieChart
            data={Object.entries(stats.estadoBreakdown).map(([name, value], i) => ({
              name,
              population: Number(value) || 0,
              color: ['#4CAF50', '#FFC107', '#F44336'][i % 3],
              legendFontColor: '#333',
              legendFontSize: 13,
            }))}
            width={chartWidth}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            chartConfig={chartConfig}
            absolute
          />
        ) : (
          <Text style={styles.noData}>No hay datos suficientes</Text>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    marginVertical: 10,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 15,
  },
});
