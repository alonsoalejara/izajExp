import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Data from '../data/data.index';
import styles from '../styles/AdminPanelStyles';
import ModalsAdmin from '../components/modals/ModalAdmin.index';

export default function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [colaboradores, setColaboradores] = useState(Data.collabData); // Usando los datos de Data
  const [gruas, setGruas] = useState(Object.values(Data.craneData)); // Usando los datos de Data
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [colaboradorEditado, setColaboradorEditado] = useState(null);
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [isModalCrearColaboradorVisible, setModalCrearColaboradorVisible] = useState(false);
  const [isModalEditarColaboradorVisible, setModalEditarColaboradorVisible] = useState(false); // Modal de edición
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

  const handleModalEditarColaboradorClose = () => {
    setModalEditarColaboradorVisible(false); // Cerrar el modal de edición
  };

  const handleModalCrearGruaClose = () => {
    setModalCrearGruaVisible(false);
  };

  const handleEdit = (item) => {
    console.log('Editar:', item);
    setColaboradorEditado(item);  // Asigna el colaborador a editar al estado
    setModalEditarColaboradorVisible(true); // Abre el modal para editar
  };

  const handleDelete = (item, type) => {
    console.log('Eliminar:', item);
    if (type === 'colaborador') {
      setColaboradores((prevColaboradores) =>
        prevColaboradores.filter((colaborador) => colaborador.rut !== item.rut) // Filtrar por rut
      );
    } else if (type === 'grua') {
      setGruas((prevGruas) => prevGruas.filter((grua) => grua !== item));
    }
  };

  const handleSaveCollaborator = (newCollaborator) => {
    setColaboradores((prevColaboradores) => [...prevColaboradores, newCollaborator]);
    setModalCrearColaboradorVisible(false);
  };

  const handleSaveEditedCollaborator = (editedCollaborator) => {
    setColaboradores((prevColaboradores) =>
      prevColaboradores.map((colaborador) =>
        colaborador.rut === editedCollaborator.rut ? editedCollaborator : colaborador // Actualiza el colaborador correcto
      )
    );
    setModalEditarColaboradorVisible(false); // Cerrar el modal después de guardar
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

      {/* Modal para Crear Colaborador */}
      <ModalsAdmin.ModalAddCollab
        isVisible={isModalCrearColaboradorVisible}
        onClose={handleModalCrearColaboradorClose}
        onSave={handleSaveCollaborator}
      />

      {/* Modal para Editar Colaborador */}
      <ModalsAdmin.ModalEditarCollab
        isVisible={isModalEditarColaboradorVisible}
        onClose={handleModalEditarColaboradorClose}
        onSave={handleSaveEditedCollaborator}
        colaborador={colaboradorEditado}  // Pasa el colaborador a editar
      />

      {/* Modal para Crear Grua */}
      <ModalsAdmin.ModalAddCrane
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
          {colaboradores.map((colaborador) => (
            <View key={colaborador.rut} style={styles.collaboratorCard}>
              <TouchableOpacity onPress={() => handleCollaboratorPress(colaborador.rut)}>
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
              {selectedCollaborator === colaborador.rut && (
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(colaborador)}
                  >
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(colaborador, 'colaborador')}
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
                    onPress={() => handleDelete(grua, 'grua')}
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