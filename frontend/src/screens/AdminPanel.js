import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/AdminPanelStyles';

const colaboradores = [
  {
    username: 'jose.morales',
    email: 'jose.morales@gmail.com',
    roles: ['USER'],
    phone: '+56912345678',
    especialidad: 'Estructura',
  },
  {
    username: 'carolina.vera',
    email: 'carolina.vera@gmail.com',
    roles: ['USER'],
    phone: '+56987654321',
    especialidad: 'Obras Civiles (OOCC)',
  },
  {
    username: 'pablo.nunez',
    email: 'pablo.nunez@gmail.com',
    roles: ['USER'],
    phone: '+56923456789',
    especialidad: 'Piping',
  },
  {
    username: 'ana.ramirez',
    email: 'ana.ramirez@gmail.com',
    roles: ['USER'],
    phone: '+56998765432',
    especialidad: 'Mecánica',
  },
  {
    username: 'felipe.soto',
    email: 'felipe.soto@gmail.com',
    roles: ['USER'],
    phone: '+56945678901',
    especialidad: 'Eléctrica',
  },
];

export default function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);

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
          <Text>Contenido de las grúas.</Text>
        </View>
      )}
    </ScrollView>
  );
}
