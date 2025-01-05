import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalsAdmin from '../components/modals/ModalAdmin.index'; // Verifica que este archivo exporte correctamente los modales
import Section from '../components/admin/Section.index'; // Verifica que este archivo exporte correctamente la sección
import styles from '../styles/AdminPanelStyles';
import getApiUrl from '../utils/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios/dist/browser/axios.cjs');

const adminLogic = {
  addCollaborator: (collaborators, newCollaborator) => [...collaborators, newCollaborator],
  editCollaborator: (collaborators, editedCollaborator) =>
    collaborators.map((collaborator) =>
      collaborator.rut === editedCollaborator.rut ? editedCollaborator : collaborator
    ),
  deleteCollaborator: (collaborators, rutToDelete) =>
    collaborators.filter((collaborator) => collaborator.rut !== rutToDelete),
};

function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [colaboradores, setColaboradores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalCrearColaboradorVisible, setIsModalCrearColaboradorVisible] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [isModalEditarColaboradorVisible, setIsModalEditarColaboradorVisible] = useState(false);

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
          const apiUrl = getApiUrl("user");
          const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
  
          console.log('(AdminPanel.js) Datos rescatados de la API:', response.data);
  
          const collaborators = response.data.data
            .filter((collab) => collab.roles.includes('user'));
  
          console.log('(AdminPanel.js) Colaboradores filtrados por rol "user":', collaborators);
  
          const mappedCollaborators = collaborators.map((collab) => ({
            key: collab._id,
            _id: collab._id, // Asegúrate de pasar el _id como propiedad
            nombre: collab.nombre || collab.username,
            apellido: collab.apellido || '',
            rut: collab.rut || '',
            phone: collab.phone || '',
            specialty: collab.specialty || '',
            email: collab.email,
            roles: collab.roles,
          }));
  
          console.log('(AdminPanel.js) Colaboradores después de mapear:', mappedCollaborators);
  
          setColaboradores(mappedCollaborators);
        } else {
          console.error('(AdminPanel.js) No se encontró el token de acceso');
        }
      } catch (error) {
        console.error('(AdminPanel.js) Error al obtener los colaboradores:', error);
      }
    };
    fetchCollaborators();
  }, []);

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
        onUpdate={(editedCollaborator) => {  // Ahora sí coincide con la prop utilizada
            setColaboradores((prev) => adminLogic.editCollaborator(prev, editedCollaborator));
            setIsModalEditarColaboradorVisible(false);
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
    </ScrollView>
  );
}

export default AdminPanel;
