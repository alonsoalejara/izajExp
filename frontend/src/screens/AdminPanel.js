import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalsAdmin from '../components/modals/ModalAdmin.index';
import Section from '../components/admin/Section.index';
import styles from '../styles/AdminPanelStyles';
import { useFetchData } from '../hooks/useFetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gruaLogic } from '../logic/gruaLogic';
import { adminLogic } from '../logic/adminLogic';

function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [gruaSeleccionada, setGruaSeleccionada] = useState(null);

  const { data: colaboradores, isLoading: isLoadingColaboradores } = useFetchData('user');
  const { data: gruas, isLoading: isLoadingGruas } = useFetchData('grua');
  const { data: setupIzajes, isLoading: isLoadingSetupIzajes } = useFetchData('setupIzaje');

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

  const handleAdd = () => {
    setIsModalCrearColaboradorVisible(true);
  };

  const handleEdit = (collaborator) => {
    setColaboradorSeleccionado(collaborator);
    setIsModalEditarColaboradorVisible(true);
  };

  const handleDelete = (rut) => {
    setColaboradores((prev) => adminLogic.deleteCollaborator(prev, rut));
    console.log('Colaborador eliminado', rut);
  };

  const handleAddGrua = () => {
    setIsModalCrearGruaVisible(true);
  };

  const handleEditGrua = (grua) => {
    setGruaSeleccionada(grua);
    setIsModalEditarGruaVisible(true);
  };

  const handleDeleteGrua = (id) => {
    setGruas((prev) => gruaLogic.deleteGrua(prev, id));
    console.log('Grúa eliminada', id);
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
          setColaboradores((prev) => adminLogic.addCollaborator(prev, newCollaborator));
          setIsModalCrearColaboradorVisible(false);
        }}
      />

      {/* Modal para editar colaborador */}
      <ModalsAdmin.ModalEditCollab
        isVisible={isModalEditarColaboradorVisible}
        onClose={() => setIsModalEditarColaboradorVisible(false)}
        colaborador={colaboradorSeleccionado}
        onUpdate={(editedCollaborator) => {
          setColaboradores((prev) => adminLogic.editCollaborator(prev, editedCollaborator));
          setIsModalEditarColaboradorVisible(false);
        }}
      />

      {/* Modal para agregar grúa */}
      <ModalsAdmin.ModalAddCrane
        isVisible={isModalCrearGruaVisible}
        onClose={() => setIsModalCrearGruaVisible(false)}
        onSave={(newGrua) => {
          setGruas((prev) => gruaLogic.addGrua(prev, newGrua));
          setIsModalCrearGruaVisible(false);
        }}
      />

      {/* Modal para editar grúa */}
      <ModalsAdmin.ModalEditCrane
        isVisible={isModalEditarGruaVisible}
        onClose={() => setIsModalEditarGruaVisible(false)}
        grua={gruaSeleccionada}
        onUpdate={(editedGrua) => {
          setGruas((prev) => gruaLogic.editGrua(prev, editedGrua));
          setIsModalEditarGruaVisible(false);
        }}
      />

      {activeSection === 'Personal' && (
        <Section.CollabSection
          colaboradores={colaboradores}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {activeSection === 'Gruas' && (
        <Section.CraneSection
          gruas={gruas}
          handleAdd={handleAddGrua}
          handleEdit={handleEditGrua}
          handleDelete={handleDeleteGrua}
        />
      )}

      {activeSection === 'Planes' && (
        <Section.SetupIzajeSection
          setupIzaje={setupIzajes}
          handleDelete={handleDelete}
        />
      )}
    </ScrollView>
  );
}

export default AdminPanel;