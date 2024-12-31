import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colaboradores from '../components/data/collabData';
import craneData from '../components/data/craneData';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/AdminPanelStyles';

export default function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [selectedCrane, setSelectedCrane] = useState(null);

  const handleButtonPress = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleCollaboratorPress = (index) => {
    setSelectedCollaborator((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCranePress = (index) => {
    setSelectedCrane((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEdit = (item) => {
    console.log('Editar:', item);
    // Navegar a una pantalla de edición o realizar la acción de edición
  };

  const handleDelete = (item) => {
    console.log('Eliminar:', item);
    // Mostrar una confirmación y realizar la acción de eliminación
  };

  const handleAdd = () => {
    console.log('Añadir nuevo colaborador o grúa');
    // Lógica para agregar nuevo colaborador o grúa
  };

  const handleSearch = () => {
    console.log('Buscar colaborador o grúa');
    // Lógica para buscar un colaborador o grúa
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

      {/* Sección de Colaboradores */}
      {activeSection === 'Colaboradores' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colaboradores</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAdd}>
              <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSearch}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {colaboradores.map((colaborador, index) => (
            <View key={index} style={styles.collaboratorCard}>
              <TouchableOpacity onPress={() => handleCollaboratorPress(index)}>
                <Text style={styles.collaboratorName}>{colaborador.username}</Text>
                <Text style={styles.collaboratorDetails}>Email: {colaborador.email}</Text>
                <Text style={styles.collaboratorDetails}>Teléfono: {colaborador.phone}</Text>
                <Text style={styles.collaboratorDetails}>Especialidad: {colaborador.especialidad}</Text>
              </TouchableOpacity>
              {selectedCollaborator === index && (
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(colaborador)}
                  >
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(colaborador)}
                  >
                    <Text style={styles.actionButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Sección de Planes de Izaje */}
      {activeSection === 'PlanesDeIzaje' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planes de Izaje</Text>
          <Text>Contenido de los planes de izaje.</Text>
        </View>
      )}

      {/* Sección de Grúas */}
      {activeSection === 'Gruas' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grúas</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAdd}>
              <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSearch}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {Object.keys(craneData).map((grua, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gruaCard}
              onPress={() => handleCranePress(index)}
            >
              <Text style={styles.gruaName}>{grua}</Text>
              <Text style={styles.gruaDetail}>Peso del equipo: {craneData[grua].pesoEquipo} kg</Text>
              <Text style={styles.gruaDetail}>Peso del gancho: {craneData[grua].pesoGancho} kg</Text>
              <Text style={styles.gruaDetail}>Capacidad de levante: {craneData[grua].capacidadLevante} kg</Text>
              <Text style={styles.gruaDetail}>Largo de la pluma: {craneData[grua].largoPluma} m</Text>
              <Text style={styles.gruaDetail}>Contrapeso: {craneData[grua].contrapeso} t</Text>
              {selectedCrane === index && (
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(grua)}
                  >
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(grua)}
                  >
                    <Text style={styles.actionButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
