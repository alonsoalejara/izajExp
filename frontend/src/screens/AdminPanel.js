import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalsAdmin from '../components/modals/ModalAdmin.index';
import Section from '../components/admin/Section.index';
import styles from '../styles/AdminPanelStyles';
import { useFetchData } from '../hooks/useFetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logic from '../logic/logic.index'; // Importa el objeto Logic que contiene todas las lógicas

function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [gruaSeleccionada, setGruaSeleccionada] = useState(null);
  const [setupIzajeSeleccionado, setSetupIzajeSeleccionado] = useState(null);

  // Modal visibility states
  const [isModalCrearColaboradorVisible, setIsModalCrearColaboradorVisible] = useState(false);
  const [isModalEditarColaboradorVisible, setIsModalEditarColaboradorVisible] = useState(false);
  const [isModalCrearGruaVisible, setIsModalCrearGruaVisible] = useState(false);
  const [isModalEditarGruaVisible, setIsModalEditarGruaVisible] = useState(false);
  const [isModalEditarSetupIzajeVisible, setIsModalEditarSetupIzajeVisible] = useState(false);

  const { data: colaboradores, isLoading: isLoadingColaboradores } = useFetchData('user');
  const { data: gruas, isLoading: isLoadingGruas } = useFetchData('grua');
  const { data: setupIzajes, isLoading: isLoadingSetupIzajes } = useFetchData('setupIzaje');

  const colaboradoresUser = colaboradores.filter(collaborator => collaborator.roles.includes('user'));
  const [collabs, setCollabs] = useState([]);
  const [cranes, setGruas] = useState([]);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const roles = await AsyncStorage.getItem('roles');
        setIsAdmin(accessToken && roles?.includes('admin'));
        if (!accessToken || !roles?.includes('admin')) {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error al verificar el rol del usuario:', error);
        navigation.navigate('Login');
      }
    };
    checkUserRole();
  }, [navigation]);

  const handleAdd = (newCollaborator) => {
    setCollabs((prev) => Logic.adminLogic.addCollaborator(prev, newCollaborator));
  };

  const handleEdit = (collaborator) => {
    setColaboradorSeleccionado(collaborator);
    setIsModalEditarColaboradorVisible(true);
  };

  const handleDelete = (_id) => {
    setCollabs((prev) => prev.filter((collaborator) => collaborator._id !== _id));
  };

  const handleAddGrua = () => {
    setIsModalCrearGruaVisible(true);
  };

  const handleEditGrua = (grua) => {
    setGruaSeleccionada(grua);
    setIsModalEditarGruaVisible(true);
  };

  const handleDeleteGrua = (id) => {
    setGruas((prev) => Logic.gruaLogic.deleteGrua(prev, id));
  };

  // Manejo de editar y eliminar planes de izaje
  const handleEditSetupIzaje = (setup) => {
    setSetupIzajeSeleccionado(setup);
    setIsModalEditarSetupIzajeVisible(true);
  };

  const handleDeleteSetupIzaje = (id) => {
    setSetupIzajes((prev) => Logic.setupIzajeLogic.deleteSetupIzaje(prev, id));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PANEL DE ADMINISTRADOR</Text>
      </View>

      <View style={styles.buttonContainer}>
        {['Personal', 'Gruas', 'Planes'].map((section) => (
          <TouchableOpacity key={section} style={styles.button} onPress={() => setActiveSection((prev) => (prev === section ? null : section))}>
            <Text style={styles.buttonText}>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal para agregar colaborador */}
      <ModalsAdmin.ModalAddCollab
        isVisible={isModalCrearColaboradorVisible}
        onClose={() => setIsModalCrearColaboradorVisible(false)}
        onSave={(newCollaborator) => {
          // Asegúrate de que 'newCollaborator' tenga los campos necesarios
          if (newCollaborator) {
            setCollabs((prev) => Logic.adminLogic.addCollaborator(prev, newCollaborator));
          }
          setIsModalCrearColaboradorVisible(false);
        }}
      />

      {/* Modal para editar colaborador */}
      <ModalsAdmin.ModalEditCollab
        isVisible={isModalEditarColaboradorVisible}
        onClose={() => setIsModalEditarColaboradorVisible(false)}
        colaborador={colaboradorSeleccionado}
        onUpdate={(editedCollaborator) => {
          setCollabs((prev) => Logic.adminLogic.editCollaborator(prev, editedCollaborator));
          setIsModalEditarColaboradorVisible(false);
        }}
      />

      {/* Modal para agregar grúa */}
      <ModalsAdmin.ModalAddCrane
        isVisible={isModalCrearGruaVisible}
        onClose={() => setIsModalCrearGruaVisible(false)}
        onSave={(newGrua) => {
          setGruas((prev) => Logic.gruaLogic.addGrua(prev, newGrua));
          setIsModalCrearGruaVisible(false);
        }}
      />

      {/* Modal para editar grúa */}
      <ModalsAdmin.ModalEditCrane
        isVisible={isModalEditarGruaVisible}
        onClose={() => setIsModalEditarGruaVisible(false)}
        grua={gruaSeleccionada}
        onUpdate={(editedGrua) => {
          setGruas((prev) => Logic.gruaLogic.editGrua(prev, editedGrua));
          setIsModalEditarGruaVisible(false);
        }}
      />

      {/* Modal para editar plan de izaje */}
      <ModalsAdmin.ModalEditSetupIzaje
        isVisible={isModalEditarSetupIzajeVisible}
        onClose={() => setIsModalEditarSetupIzajeVisible(false)}
        setupIzaje={setupIzajeSeleccionado}
        onUpdate={(editedSetupIzaje) => {
          setSetupIzajes((prev) => Logic.setupIzajeLogic.editSetupIzaje(prev, editedSetupIzaje));
          setIsModalEditarSetupIzajeVisible(false);
        }}
      />

      {activeSection === 'Personal' && (
        <Section.CollabSection
          colaboradores={colaboradoresUser}
          handleAdd={() => setIsModalCrearColaboradorVisible(true)}
          handleEdit={(collaborator) => handleEdit(collaborator)}
          handleDelete={(_id) => handleDelete(_id)}
        />
      )}

      {activeSection === 'Gruas' && (
        <Section.CraneSection
          gruas={gruas}
          handleAdd={handleAddGrua}
          handleEdit={(grua) => handleEditGrua(grua)}
          handleDelete={(id) => handleDeleteGrua(id)}
        />
      )}

      {activeSection === 'Planes' && (
        <Section.SetupIzajeSection
          setupIzaje={setupIzajes}
          handleEdit={(setup) => handleEditSetupIzaje(setup)}
          handleDelete={(id) => handleDeleteSetupIzaje(id)}
        />
      )}
    </ScrollView>
  );
}

export default AdminPanel;