import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ImageBackground, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFetchData } from '../hooks/useFetchData';
import Logic from '../logic/logic.index';
import ModalsAdmin from '../components/modals/ModalAdmin.index';
import Section from '../components/admin/Section.index';
import styles from '../styles/AdminPanelStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

function AdminPanel() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState(null);
  const animations = useRef({});

  const [isAdmin, setIsAdmin] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [gruaSeleccionada, setGruaSeleccionada] = useState(null);
  const [setupIzajeSeleccionado, setSetupIzajeSeleccionado] = useState(null);
  
  const [colaboradoresState, setColaboradoresState] = useState(colaboradores || []);
  const [gruasState, setGruasState] = useState(gruas || []);
  const [setupsState, setSetupsState] = useState(setupIzajes || []);

  const [searchQuery, setSearchQuery] = useState('');

  const [isModalCrearColaboradorVisible, setIsModalCrearColaboradorVisible] = useState(false);
  const [isModalEditarColaboradorVisible, setIsModalEditarColaboradorVisible] = useState(false);
  const [isModalCrearGruaVisible, setIsModalCrearGruaVisible] = useState(false);
  const [isModalEditarGruaVisible, setIsModalEditarGruaVisible] = useState(false);
  const [isModalEditarSetupIzajeVisible, setIsModalEditarSetupIzajeVisible] = useState(false);

  const { data: colaboradores = [], refetch: refetchColaboradores } = useFetchData('user');
  const { data: gruas = [], refetch: refetchGruas } = useFetchData('grua');
  const { data: setupIzajes = [], refetch: refetchSetupIzajes } = useFetchData('setupIzaje');

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
    setColaboradoresState(colaboradores || []);
    setSetupsState(setupIzajes || []);
  }, [gruas, colaboradores, setupIzajes]);


  const handlePress = (section) => {
    setActiveSection(section);
    if (!animations.current[section]) {
      animations.current[section] = new Animated.Value(0);
    } else {
      animations.current[section].setValue(0);
    }
    Animated.timing(animations.current[section], {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleAddColaborador = async (newCollaborator) => {
    try {
      const updatedColaboradores = Logic.adminLogic.addCollaborator(colaboradoresState, newCollaborator);
      setColaboradoresState(updatedColaboradores);
      refetchColaboradores();
      setIsModalCrearColaboradorVisible(false);
    } catch (error) {
      console.error('Error al agregar colaborador:', error);
    }
  };

  const handleEditColaborador = async (colaborador) => {
    try {
      const updatedColaboradores = Logic.colaboradorLogic.editColaborador(colaboradoresState, colaborador);
      setColaboradoresState(updatedColaboradores);
      refetchColaboradores();
      setIsModalEditarColaboradorVisible(false);
    } catch (error) {
      console.error('Error al editar colaborador:', error);
    }
  };

  const handleDeleteColaborador = async (id) => {
    try {
      await Logic.adminLogic.deleteCollaborator(id);
      refetchColaboradores();
      const updatedColaboradores = colaboradoresState.filter(collaborator => collaborator.id !== id);
      setColaboradoresState(updatedColaboradores);
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

  const handleEditGrua = async (grua) => {
    try {
      const updatedGruas = Logic.gruaLogic.editGrua(gruasState, grua);
      setGruasState(updatedGruas);
      refetchGruas();
      setIsModalEditarGruaVisible(false);
    } catch (error) {
      console.error('Error al editar grúa:', error);
    }
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

  const handleEditSetupIzaje = async (setup) => {
    try {
      const updatedSetups = Logic.setupIzajeLogic.editSetupIzaje(setupsState, setup);
      setSetupsState(updatedSetups);
      refetchSetupIzajes();
      setIsModalEditarSetupIzajeVisible(false);
    } catch (error) {
      console.error('Error al editar setup de izaje:', error);
    }
  };

  const handleDeleteSetupIzaje = async (id) => {
    try {
      await Logic.setupIzajeLogic.deleteSetupIzaje(id);
      refetchSetupIzajes();
      const updatedSetups = setupsState.filter(setup => setup._id !== id);
      setSetupsState(updatedSetups);
    } catch (error) {
      console.error('Error al eliminar setup de izaje:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Aquí puedes filtrar los datos según el valor de la búsqueda.
    // Ejemplo: setFilteredData(colaboradoresState.filter(collaborator => collaborator.name.toLowerCase().includes(query.toLowerCase())));
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccessText}>Acceso denegado. Solo los administradores pueden acceder a este panel.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sección superior fija con la imagen, logo y gradiente */}
      <View style={styles.circleContainer}>
        <ImageBackground
          source={require('../../assets/grua-home.png')}
          style={styles.background}
          imageStyle={styles.image}
        >
          <Svg style={styles.gradient}>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="80%" stopColor="white" stopOpacity="0.6" />
              <Stop offset="70%" stopColor="red" stopOpacity="0.8" />
            </LinearGradient>
            <Rect width="100%" height="100%" fill="url(#grad1)" />
          </Svg>
          <Image
            source={require('../../assets/EI-Montajes.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
  
      {/* Sección fija con título, buscador y botones */}
      <View style={styles.fixedHeader}>
        <Text style={styles.sectionTitle}>Panel de Administrador</Text>
  
        {/* Input de búsqueda con icono */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
  
        {/* Botones fijos con animación */}
        <View style={styles.buttonContainer}>
          {['Personal', 'Gruas', 'Planes'].map((section) => {
            if (!animations.current[section]) {
              animations.current[section] = new Animated.Value(0);
            }
  
            const animatedWidth = animations.current[section].interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            });
  
            return (
              <TouchableOpacity
                key={section}
                style={[styles.button, activeSection === section && styles.activeButton]}
                onPress={() => handlePress(section)}
              >
                <Text
                  style={[styles.buttonText, activeSection === section && { color: 'red' }]}
                >
                  {section}
                </Text>
                <Animated.View
                  style={[
                    styles.line,
                    {
                      width: animatedWidth,
                      opacity: activeSection === section ? 1 : 0,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
  
      {/* Contenido desplazable */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {activeSection === 'Personal' && (
          <Section.CollabSection
            colaboradores={colaboradoresState}
            handleAdd={() => setIsModalCrearColaboradorVisible(true)}
            handleEdit={(colaborador) => {
              setColaboradorSeleccionado(colaborador);
              setIsModalEditarColaboradorVisible(true);
            }}
            handleDelete={handleDeleteColaborador}
            setColaboradores={setColaboradoresState}
          />
        )}
  
        {activeSection === 'Gruas' && (
          <Section.CraneSection
            gruas={gruasState}
            handleAdd={() => setIsModalCrearGruaVisible(true)}
            handleEdit={(grua) => {
              setGruaSeleccionada(grua);
              setIsModalEditarGruaVisible(true);
            }}
            handleDelete={handleDeleteGrua}
            setGruas={setGruasState}
          />
        )}
  
        {activeSection === 'Planes' && (
          <Section.SetupIzajeSection
            setupIzaje={setupsState}
            handleEdit={(setup) => {
              setSetupIzajeSeleccionado(setup);
              setIsModalEditarSetupIzajeVisible(true);
            }}
            handleDelete={handleDeleteSetupIzaje}
            setSetups={setSetupsState}
          />
        )}
      </ScrollView>
    </View>
  );
}

export default AdminPanel;
