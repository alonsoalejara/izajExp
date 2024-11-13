import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación

import styles from '../styles/PlanIzajeStyles';

export default function Main() {
  const navigation = useNavigation(); // Hook para acceder a la navegación

  const [radioInicial, setRadioInicial] = useState('');
  const [longitudInicial, setLongitudInicial] = useState('');
  const [capacidadInicial, setCapacidadInicial] = useState('');
  const [radioFinal, setRadioFinal] = useState('');
  const [longitudFinal, setLongitudFinal] = useState('');
  const [capacidadFinal, setCapacidadFinal] = useState('');
  const [pesoGancho, setPesoGancho] = useState('');
  const [pesoHerramientas, setPesoHerramientas] = useState('');
  const [pesoCarga, setPesoCarga] = useState('');
  const [otrosPesos, setOtrosPesos] = useState('');

  const cargaBruta = Number(pesoGancho) + Number(pesoHerramientas) + Number(pesoCarga) + Number(otrosPesos);
  const capacidadBrutaMenor = Math.min(Number(capacidadInicial), Number(capacidadFinal));
  const porcentajeCapacidad = capacidadBrutaMenor ? ((cargaBruta / capacidadBrutaMenor) * 100).toFixed(2) : 'N/A';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Sección 1: Plan de Izaje */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PLAN DE IZAJE</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Radio de Izaje (m)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={radioInicial} onChangeText={setRadioInicial} />

        <Text style={styles.label}>Longitud Inicial (m)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={longitudInicial} onChangeText={setLongitudInicial} />

        <Text style={styles.label}>Capacidad Inicial (kg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={capacidadInicial} onChangeText={setCapacidadInicial} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Radio de Montaje (m)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={radioFinal} onChangeText={setRadioFinal} />

        <Text style={styles.label}>Longitud Final (m)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={longitudFinal} onChangeText={setLongitudFinal} />

        <Text style={styles.label}>Capacidad Final (kg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={capacidadFinal} onChangeText={setCapacidadFinal} />
      </View>

      {/* Sección 2: Análisis de Carga */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ANÁLISIS DE CARGA</Text>
        <Text style={styles.label}>Peso Gancho (kg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={pesoGancho} onChangeText={setPesoGancho} />

        <Text style={styles.label}>Peso Herramientas (kg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={pesoHerramientas} onChangeText={setPesoHerramientas} />

        <Text style={styles.label}>Peso de la Carga (kg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={pesoCarga} onChangeText={setPesoCarga} />

        <Text style={styles.label}>Otros Pesos (kg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={otrosPesos} onChangeText={setOtrosPesos} />

        <Text style={styles.result}>Carga Bruta: {cargaBruta} kg</Text>
      </View>

      {/* Sección 3: Análisis de Capacidad */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ANÁLISIS DE CAPACIDAD</Text>
        <Text style={styles.result}>Capacidad Bruta Menor: {capacidadBrutaMenor} kg</Text>
        <Text style={styles.result}>Carga Bruta: {cargaBruta} kg</Text>
        <Text style={styles.result}>% Capacidad: {porcentajeCapacidad}%</Text>
        <Text style={styles.formula}>Fórmula: % capacidad = (Carga Bruta / Capacidad Menor) x 100%</Text>
      </View>

      {/* Botón para navegar a GruaIzaje */}
      <View style={styles.section}>
        <Button title="Ir a Grua de Izaje" onPress={() => navigation.navigate('GruaIzaje')} />
      </View>

    </ScrollView>
  );
}
