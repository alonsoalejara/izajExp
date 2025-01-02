import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Data from '../data/data.index';
import ModalsAdmin from '../components/modals/ModalAdmin.index';
import Section from '../components/admin/Section.index'; 
import styles from '../styles/AdminPanelStyles';

// Lógica de adminLogic integrada
const adminLogic = {
  addCollaborator: (collaborators, newCollaborator) => {
    return [...collaborators, newCollaborator];
  },
  editCollaborator: (collaborators, editedCollaborator) => {
    return collaborators.map((colaborador) =>
      colaborador.rut === editedCollaborator.rut ? editedCollaborator : colaborador
    );
  },
  deletePlan: (plans, index) => {
    return plans.filter((_, i) => i !== index);
  },
  togglePlanSelection: (selectedPlan, planId) => {
    return selectedPlan === planId ? null : planId;
  },
};

// Hook useModal integrado
function useModal() {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);
  return { isVisible, openModal, closeModal };
}

export default function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [colaboradores, setColaboradores] = useState(Data.collabData);
  const [gruas, setGruas] = useState(Object.values(Data.craneData));
  const [planesDeIzaje, setPlanesDeIzaje] = useState(Data.planIzajeData || []);
  const [colaboradorEditado, setColaboradorEditado] = useState(null);
  const { isVisible: isModalCrearColaboradorVisible, openModal: openModalCrearColaborador, closeModal: closeModalCrearColaborador } = useModal();
  const { isVisible: isModalEditarColaboradorVisible, openModal: openModalEditarColaborador, closeModal: closeModalEditarColaborador } = useModal();
  const { isVisible: isModalCrearGruaVisible, openModal: openModalCrearGrua, closeModal: closeModalCrearGrua } = useModal();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleButtonPress = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleAdd = (section) => {
    if (section === 'Colaboradores') {
      openModalCrearColaborador();
    } else if (section === 'Gruas') {
      openModalCrearGrua();
    } else if (section === 'PlanesDeIzaje') {
      console.log('Agregar un nuevo plan de izaje');
    }
  };

  const handleDeletePlan = (index) => {
    setPlanesDeIzaje((prevPlanes) => adminLogic.deletePlan(prevPlanes, index));
  };

  const handlePlanPress = (planId) => {
    console.log('Plan presionado, ID:', planId); // Verificar qué plan se presiona
    setSelectedPlan(adminLogic.togglePlanSelection(selectedPlan, planId));
    console.log('SelectedPlan después de toggle:', selectedPlan); // Verificar el valor actualizado
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PANEL DE ADMINISTRADOR</Text>
      </View>

      <View style={styles.buttonContainer}>
        {['Colaboradores', 'Gruas', 'Planes'].map((section) => (
          <TouchableOpacity
            key={section}
            style={styles.button}
            onPress={() => handleButtonPress(section)}
          >
            <Text style={styles.buttonText}>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ModalsAdmin.ModalAddCollab
        isVisible={isModalCrearColaboradorVisible}
        onClose={closeModalCrearColaborador}
        onSave={(newCollaborator) => {
          setColaboradores((prev) => adminLogic.addCollaborator(prev, newCollaborator));
          closeModalCrearColaborador();
        }}
      />

      <ModalsAdmin.ModalEditarCollab
        isVisible={isModalEditarColaboradorVisible}
        onClose={closeModalEditarColaborador}
        onSave={(editedCollaborator) => {
          setColaboradores((prev) => adminLogic.editCollaborator(prev, editedCollaborator));
          closeModalEditarColaborador();
        }}
        colaborador={colaboradorEditado}
      />

      <ModalsAdmin.ModalAddCrane
        isVisible={isModalCrearGruaVisible}
        onClose={closeModalCrearGrua}
        onSave={(newCrane) => {
          setGruas((prev) => [...prev, newCrane]);
          closeModalCrearGrua();
        }}
      />

      {activeSection === 'Colaboradores' && (
        <Section.CollabSection
          styles={styles}
          colaboradores={colaboradores}
          handleAdd={handleAdd}
        />
      )}

      {activeSection === 'Gruas' && (
        <Section.CraneSection
          styles={styles}
          gruas={gruas}
          handleAdd={handleAdd}
        />
      )}

      {activeSection === 'Planes' && (
        <>
          <Section.PlanIzajeSection
            styles={styles}
            planesIzaje={planesDeIzaje}
            handlePlanPress={handlePlanPress}
            selectedPlan={selectedPlan}
          />
        </>
      )}
    </ScrollView>
  );
}