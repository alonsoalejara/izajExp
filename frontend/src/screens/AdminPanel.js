import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colaboradores from '../components/data/collabData';
import styles from '../styles/AdminPanelStyles';

export default function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);

  // Datos de las grúas
  const gruasData = {
    'Terex RT555': {
      pesoEquipo: 12000,
      pesoGancho: 450,
      capacidadLevante: 17800,
      largoPluma: 19.8,
      contrapeso: 6.4,
    },
    'Grúa 2': {
      pesoEquipo: 15000,
      pesoGancho: 500,
      capacidadLevante: 20000,
      largoPluma: 21.5,
      contrapeso: 7.2,
    },
    'Grúa 3': {
      pesoEquipo: 10000,
      pesoGancho: 400,
      capacidadLevante: 15000,
      largoPluma: 18.0,
      contrapeso: 5.5,
    },
  };

  const handleButtonPress = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Título */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PANEL DE ADMINISTRADOR</Text>
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Colaboradores')}
        >
          <Text style={styles.buttonText}>Colaboradores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('PlanesDeIzaje')}
        >
          <Text style={styles.buttonText}>Planes de Izaje</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Gruas')}
        >
          <Text style={styles.buttonText}>Grúas</Text>
        </TouchableOpacity>
      </View>

      {/* Sección dinámica */}
      {activeSection === 'Colaboradores' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colaboradores</Text>
          {colaboradores.map((colaborador, index) => (
            <View key={index} style={styles.collaboratorCard}>
              <Text style={styles.collaboratorName}>{colaborador.username}</Text>
              <Text style={styles.collaboratorDetails}>Email: {colaborador.email}</Text>
              <Text style={styles.collaboratorDetails}>Teléfono: {colaborador.phone}</Text>
              <Text style={styles.collaboratorDetails}>Especialidad: {colaborador.especialidad}</Text>
            </View>
          ))}
        </View>
      )}

      {activeSection === 'PlanesDeIzaje' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planes de Izaje</Text>
          <Text>Contenido de los planes de izaje.</Text>
        </View>
      )}

      {activeSection === 'Gruas' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grúas</Text>
          {Object.keys(gruasData).map((grua, index) => (
            <View key={index} style={styles.gruaCard}>
              <Text style={styles.gruaName}>{grua}</Text>
              <Text style={styles.gruaDetail}>Peso del equipo: {gruasData[grua].pesoEquipo} kg</Text>
              <Text style={styles.gruaDetail}>Peso del gancho: {gruasData[grua].pesoGancho} kg</Text>
              <Text style={styles.gruaDetail}>Capacidad de levante: {gruasData[grua].capacidadLevante} kg</Text>
              <Text style={styles.gruaDetail}>Largo de la pluma: {gruasData[grua].largoPluma} m</Text>
              <Text style={styles.gruaDetail}>Contrapeso: {gruasData[grua].contrapeso} t</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
