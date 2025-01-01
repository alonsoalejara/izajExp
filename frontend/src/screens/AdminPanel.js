import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import collabData from '../data/collabData';
import craneData from '../data/craneData';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/AdminPanelStyles';
import ModalCrearColaborador from '../components/modals/ModalAddCollab';
import ModalCrearGrua from '../components/modals/ModalAddCrane';

export default function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [colaboradores, setColaboradores] = useState(collabData);
  const [gruas, setGruas] = useState(Object.values(craneData)); // Convertir a array de valores
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [isModalCrearColaboradorVisible, setModalCrearColaboradorVisible] = useState(false);
  const [isModalCrearGruaVisible, setModalCrearGruaVisible] = useState(false);

  const handleButtonPress = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleCollaboratorPress = (index) => {
    setSelectedCollaborator((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCranePress = (index) => {
    setSelectedCrane((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAdd = (section) => {
    if (section === 'Colaboradores') {
      setModalCrearColaboradorVisible(true);
    } else if (section === 'Gruas') {
      setModalCrearGruaVisible(true);
    }
  };

  const handleModalCrearColaboradorClose = () => {
    setModalCrearColaboradorVisible(false);
  };

  const handleModalCrearGruaClose = () => {
    setModalCrearGruaVisible(false);
  };

  const handleEdit = (item) => {
    console.log('Editar:', item);
    // Lógica para editar
  };

  const handleDelete = (item) => {
    console.log('Eliminar:', item);
    // Lógica para eliminar
  };

  const handleSaveCollaborator = (newCollaborator) => {
    setColaboradores((prevColaboradores) => [...prevColaboradores, newCollaborator]);
    setModalCrearColaboradorVisible(false);
  };

  const handleSaveCrane = (newCrane) => {
    setGruas((prevGruas) => [...prevGruas, newCrane]);
    setModalCrearGruaVisible(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PANEL DE ADMINISTRADOR</Text>
      </View>

      <View style={styles.buttonContainer}>
        {['Colaboradores', 'PlanesDeIzaje', 'Gruas'].map((section) => (
          <TouchableOpacity
            key={section}
            style={styles.button}
            onPress={() => handleButtonPress(section)}
          >
            <Text style={styles.buttonText}>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ModalCrearColaborador
        isVisible={isModalCrearColaboradorVisible}
        onClose={handleModalCrearColaboradorClose}
        onSave={handleSaveCollaborator}
      />

      <ModalCrearGrua
        isVisible={isModalCrearGruaVisible}
        onClose={handleModalCrearGruaClose}
        onSave={handleSaveCrane}
      />

      {activeSection === 'Colaboradores' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colaboradores</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAdd('Colaboradores')}
            >
              <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {colaboradores.map((colaborador, index) => (
            <View key={index} style={styles.collaboratorCard}>
              <TouchableOpacity onPress={() => handleCollaboratorPress(index)}>
                <Text style={styles.collaboratorName}>
                  {colaborador.nombre} {colaborador.apellido}
                </Text>
                <Text style={styles.collaboratorDetails}>
                  RUT: {colaborador.rut}{'\n'}
                  Teléfono: {colaborador.phone}{'\n'}
                  Email: {colaborador.email}{'\n'}
                  Especialidad: {colaborador.specialty}
                </Text>
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

      {activeSection === 'Gruas' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grúas</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAdd('Gruas')}
            >
              <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {gruas.map((grua, index) => (
            <View key={index} style={styles.gruaCard}>
              <TouchableOpacity onPress={() => handleCranePress(index)}>
                <Text style={styles.gruaName}>{grua.nombre}</Text>
                <View style={styles.gruaDetails}>
                  <Text style={styles.gruaDetail}>Peso del equipo: {grua.pesoEquipo} kg</Text>
                  <Text style={styles.gruaDetail}>Peso del gancho: {grua.pesoGancho} kg</Text>
                  <Text style={styles.gruaDetail}>Capacidad de levante: {grua.capacidadLevante} kg</Text>
                  <Text style={styles.gruaDetail}>Largo de la pluma: {grua.largoPluma} m</Text>
                  <Text style={styles.gruaDetail}>Contrapeso: {grua.contrapeso} toneladas</Text>
                </View>
              </TouchableOpacity>
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
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
