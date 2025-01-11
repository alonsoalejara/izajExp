import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalsAdmin from '../components/modals/ModalAdmin.index';
import Section from '../components/admin/Section.index';
import styles from '../styles/AdminPanelStyles';
import { useFetchData } from '../hooks/useFetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logic from '../logic/logic.index';
import getApiUrl from '../utils/apiUrl';

function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [gruaSeleccionada, setGruaSeleccionada] = useState(null);
  const [setupIzajeSeleccionado, setSetupIzajeSeleccionado] = useState(null);
  const [gruasState, setGruasState] = useState(gruas || []);

  const [isModalCrearColaboradorVisible, setIsModalCrearColaboradorVisible] = useState(false);
  const [isModalEditarColaboradorVisible, setIsModalEditarColaboradorVisible] = useState(false);
  const [isModalCrearGruaVisible, setIsModalCrearGruaVisible] = useState(false);
  const [isModalEditarGruaVisible, setIsModalEditarGruaVisible] = useState(false);
  const [isModalEditarSetupIzajeVisible, setIsModalEditarSetupIzajeVisible] = useState(false);

  const { data: colaboradores, refetch: refetchColaboradores } = useFetchData('user');
  const { data: gruas = [], refetch: refetchGruas } = useFetchData('grua');
  const { data: setupIzajes, refetch: refetchSetupIzajes } = useFetchData('setupIzaje');

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

  useEffect(() => {
    setGruasState(gruas || []);
  }, [gruas]);

  const handleAddColaborador = async (newCollaborator) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      if (!accessToken) {
        alert('No se encontró el token de acceso');
        return;
      }
  
      const response = await fetch(getApiUrl('user/'), { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newCollaborator),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        refetchColaboradores();
        setIsModalCrearColaboradorVisible(false);
      } else {
        console.error('Error al guardar:', data);
        alert('Hubo un error al guardar el colaborador.');
      }
    } catch (error) {
      console.error('Error al agregar colaborador:', error);
      alert('Hubo un error al agregar el colaborador.');
    }
  };
  
  

  const handleEditColaborador = (collaborator) => {
    setColaboradorSeleccionado(collaborator);
    setIsModalEditarColaboradorVisible(true);
  };

  const handleDeleteColaborador = async (_id) => {
    try {
      await Logic.adminLogic.deleteCollaborator(_id);
      refetchColaboradores();
    } catch (error) {
      console.error('Error al eliminar colaborador:', error);
    }
  };

  const handleAddGrua = async (newGrua) => {
    try {
      const updatedGruas = Logic.gruaLogic.addGrua(gruasState, newGrua);
      setGruasState(updatedGruas);
      refetchGruas();
      setIsModalCrearGruaVisible(false);
    } catch (error) {
      console.error('Error al agregar grúa:', error);
    }
  };

  const handleEditGrua = (grua) => {
    setGruaSeleccionada(grua);
    setIsModalEditarGruaVisible(true);
  };

  const handleDeleteGrua = async (id) => {
    try {
      await Logic.gruaLogic.deleteGrua(id);
      refetchGruas();
      const updatedGruas = gruasState.filter(grua => grua._id !== id);
      setGruasState(updatedGruas);
    } catch (error) {
      console.error('Error al eliminar grúa:', error);
    }
  };
  
  const handleEditSetupIzaje = (setup) => {
    setSetupIzajeSeleccionado(setup);
    setIsModalEditarSetupIzajeVisible(true);
  };

  const handleDeleteSetupIzaje = async (id) => {
    try {
      await Logic.setupIzajeLogic.deleteSetupIzaje(id);
      refetchSetupIzajes();
    } catch (error) {
      console.error('Error al eliminar setup de izaje:', error);
    }
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccessText}>Acceso denegado. Solo los administradores pueden acceder a este panel.</Text>
      </View>
    );
  }

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

      <ModalsAdmin.ModalAddCollab
        isVisible={isModalCrearColaboradorVisible}
        onClose={() => setIsModalCrearColaboradorVisible(false)}
        onSave={handleAddColaborador}
      />
      <ModalsAdmin.ModalEditCollab
        isVisible={isModalEditarColaboradorVisible}
        onClose={() => setIsModalEditarColaboradorVisible(false)}
        colaborador={colaboradorSeleccionado}
        onUpdate={handleEditColaborador}
      />
      <ModalsAdmin.ModalAddCrane
        isVisible={isModalCrearGruaVisible}
        onClose={() => setIsModalCrearGruaVisible(false)}
        onSave={handleAddGrua}
      />
      <ModalsAdmin.ModalEditCrane
        isVisible={isModalEditarGruaVisible}
        onClose={() => setIsModalEditarGruaVisible(false)}
        grua={gruaSeleccionada}
        onUpdate={handleEditGrua}
      />
      <ModalsAdmin.ModalEditSetupIzaje
        isVisible={isModalEditarSetupIzajeVisible}
        onClose={() => setIsModalEditarSetupIzajeVisible(false)}
        setupIzaje={setupIzajeSeleccionado}
        onUpdate={handleEditSetupIzaje}
      />

      {activeSection === 'Personal' && (
        <Section.CollabSection
          colaboradores={colaboradores}
          handleAdd={() => setIsModalCrearColaboradorVisible(true)}
          handleEdit={handleEditColaborador}
          fetchColaboradores={refetchColaboradores}  
        />
      )}

      {activeSection === 'Gruas' && (
        <Section.CraneSection
          gruas={gruasState} 
          handleAdd={() => setIsModalCrearGruaVisible(true)}
          handleEdit={handleEditGrua}
          handleDelete={handleDeleteGrua}
          setGruas={setGruasState}
        />
      )}

      {activeSection === 'Planes' && (
        <Section.SetupIzajeSection
          setupIzaje={setupIzajes}
          handleEdit={handleEditSetupIzaje}
          handleDelete={handleDeleteSetupIzaje}
        />
      )}
    </ScrollView>
  );
}

export default AdminPanel;
