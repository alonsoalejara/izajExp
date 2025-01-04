import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalsAdmin from '../components/modals/ModalAdmin.index';
import Section from '../components/admin/Section.index';
import styles from '../styles/AdminPanelStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios/dist/browser/axios.cjs');

const adminLogic = {
  addCollaborator: (collaborators, newCollaborator) => [...collaborators, newCollaborator],
  editCollaborator: (collaborators, editedCollaborator) =>
    collaborators.map((colaborador) =>
      colaborador.rut === editedCollaborator.rut ? editedCollaborator : colaborador
    ),
  deletePlan: (plans, index) => plans.filter((_, i) => i !== index),
  togglePlanSelection: (selectedPlan, planId) => (selectedPlan === planId ? null : planId),
};

function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [colaboradores, setColaboradores] = useState([]);
  const [gruas, setGruas] = useState([]);
  const [planesDeIzaje, setPlanesDeIzaje] = useState([]);
  const [colaboradorEditado, setColaboradorEditado] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalCrearColaboradorVisible, setIsModalCrearColaboradorVisible] = useState(false);
  const [isModalEditarColaboradorVisible, setIsModalEditarColaboradorVisible] = useState(false);
  const [isModalCrearGruaVisible, setIsModalCrearGruaVisible] = useState(false);

  const openModalCrearColaborador = () => setIsModalCrearColaboradorVisible(true);
  const closeModalCrearColaborador = () => setIsModalCrearColaboradorVisible(false);
  const openModalEditarColaborador = () => setIsModalEditarColaboradorVisible(true);
  const closeModalEditarColaborador = () => setIsModalEditarColaboradorVisible(false);
  const openModalCrearGrua = () => setIsModalCrearGruaVisible(true);
  const closeModalCrearGrua = () => setIsModalCrearGruaVisible(false);

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
    const fetchCollaborators = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const response = await axios.get(getApiUrl(), {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const collaborators = response.data.data
            .filter(collab => collab.roles.includes('user'))
            .map((collab, index) => ({
              key: `${collab.rut || 'no_rut'}-${index}`,
              nombre: collab.nombre || collab.username,
              apellido: collab.apellido || '',
              rut: collab.rut || '',
              phone: collab.phone || '',
              specialty: collab.specialty || '',
              email: collab.email,
              roles: collab.roles,
            }));
          setColaboradores(collaborators);
        } else {
          console.error('No se encontró el token de acceso');
        }
      } catch (error) {
        console.error('Error al obtener los colaboradores:', error);
      }
    };
    fetchCollaborators();
  }, []);

  const getApiUrl = () => (Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/user/' : 'http://192.168.1.84:3000/api/user/');

  if (!isAdmin) {
    return (
      <View>
        <Text>No tienes permisos para acceder a este panel.</Text>
      </View>
    );
  }

  const handleButtonPress = (section) => setActiveSection((prev) => (prev === section ? null : section));

  const handleAdd = (section) => {
    if (section === 'Personal') openModalCrearColaborador();
    else if (section === 'Gruas') openModalCrearGrua();
    else if (section === 'PlanesDeIzaje') console.log('Agregar nuevo plan de izaje');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PANEL DE ADMINISTRADOR</Text>
      </View>

      <View style={styles.buttonContainer}>
        {['Personal', 'Gruas', 'Planes'].map((section) => (
          <TouchableOpacity key={section} style={styles.button} onPress={() => handleButtonPress(section)}>
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

      {activeSection === 'Personal' && (
        <Section.CollabSection styles={styles} colaboradores={colaboradores} handleAdd={handleAdd} />
      )}

      {activeSection === 'Gruas' && <Section.CraneSection styles={styles} gruas={gruas} handleAdd={handleAdd} />}

      {activeSection === 'Planes' && <Section.PlanIzajeSection styles={styles} planesIzaje={planesDeIzaje} />}
    </ScrollView>
  );
}

export default AdminPanel;
