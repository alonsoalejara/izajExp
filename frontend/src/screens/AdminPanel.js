import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalsAdmin from '../components/modals/ModalAdmin.index';
import Section from '../components/admin/Section.index';
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

const gruaLogic = {
  addGrua: (gruas, newGrua) => [...gruas, newGrua],
  editGrua: (gruas, editedGrua) =>
    gruas.map((grua) =>
      grua._id === editedGrua._id ? editedGrua : grua
    ),
  deleteGrua: (gruas, idToDelete) =>
    gruas.filter((grua) => grua._id !== idToDelete),
};

function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const [colaboradores, setColaboradores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalCrearColaboradorVisible, setIsModalCrearColaboradorVisible] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [isModalEditarColaboradorVisible, setIsModalEditarColaboradorVisible] = useState(false);
  const [gruas, setGruas] = useState([]);
  const [isModalCrearGruaVisible, setIsModalCrearGruaVisible] = useState(false);
  const [gruaSeleccionada, setGruaSeleccionada] = useState(null);
  const [isModalEditarGruaVisible, setIsModalEditarGruaVisible] = useState(false);
  const [setupIzajes, setSetupIzaje] = useState([]);

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
          const collaborators = response.data.data
            .filter((collab) => collab.roles.includes('user'));
          const mappedCollaborators = collaborators.map((collab) => ({
            key: collab._id,
            _id: collab._id,
            nombre: collab.nombre || collab.username,
            apellido: collab.apellido || '',
            rut: collab.rut || '',
            phone: collab.phone || '',
            specialty: collab.specialty || '',
            email: collab.email,
            roles: collab.roles,
          }));
    
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

  useEffect(() => {
    const fetchGruas = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const apiUrl = getApiUrl("grua");
          const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const mappedGruas = response.data.data.map((grua) => ({
            key: grua._id,
            _id: grua._id,
            nombre: grua.nombre || '',
            pesoEquipo: grua.pesoEquipo || '',
            pesoGancho: grua.pesoGancho || '',
            capacidadLevante: grua.capacidadLevante || '',
            largoPluma: grua.largoPluma || '',
            contrapeso: grua.contrapeso || '',
          }));
  
          setGruas(mappedGruas);
        } else {
          console.error('(AdminPanel.js) No se encontró el token de acceso');
        }
      } catch (error) {
        console.error('(AdminPanel.js) Error al obtener las grúas:', error);
      }
    };
    
    fetchGruas();
  }, []);
  
  useEffect(() => {
    const fetchSetupIzaje = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const apiUrl = getApiUrl("setupIzaje");
          const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          
          if (response.data && response.data.data) {
            const mappedSetupIzaje = response.data.data.map((setup) => ({
              key: setup._id,
              _id: setup._id,
              datos: {
                largoPluma: setup.datos.largoPluma || '',
                contrapeso: setup.datos.contrapeso || ''
              },
              cargas: {
                pesoEquipo: setup.cargas.pesoEquipo || '',
                pesoAparejos: setup.cargas.pesoAparejos || '',
                pesoGancho: setup.cargas.pesoGancho || '',
                pesoTotal: setup.cargas.pesoTotal || '',
                radioTrabajoMax: setup.cargas.radioTrabajoMax || '',
                capacidadLevante: setup.cargas.capacidadLevante || '',
                porcentajeUtilizacion: setup.cargas.porcentajeUtilizacion || ''
              },
              usuario: {
                _id: setup.usuario._id,
                nombre: setup.usuario.nombre || '',
                apellido: setup.usuario.apellido || '',
                email: setup.usuario.email || ''
              },
              aparejos: setup.aparejos.map(aparejo => ({
                descripcion: aparejo.descripcion || '',
                cantidad: aparejo.cantidad || '',
                pesoUnitario: aparejo.pesoUnitario || '',
                pesoTotal: aparejo.pesoTotal || '',
                _id: aparejo._id
              }))
            }));

            setSetupIzaje(mappedSetupIzaje);
          } else {
            console.error('Respuesta inesperada al obtener los planes de izaje:', response);
          }
        } else {
          console.error('(AdminPanel.js) No se encontró el token de acceso');
        }
      } catch (error) {
        console.error('(AdminPanel.js) Error al obtener los planes de izaje:', error);
      }
    };

    fetchSetupIzaje();
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
