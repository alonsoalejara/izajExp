import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useFetchData } from '../hooks/useFetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logic from '../logic/logic.index';
import Components from '../components/Components.index';
import ModalsAdmin from '../components/admin/AdminBS/ModalAdmin.index';
import Section from '../components/admin/sections/Section.index';
import styles from '../styles/AdminPanelStyles';

function AdminPanel() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeSection, setActiveSection] = useState(null);
  const animations = useRef({});

  const [isAdmin, setIsAdmin] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);
  const [isModalEditarGruaVisible, setIsModalEditarGruaVisible] = useState(false);
  const [gruaSeleccionada, setGruaSeleccionada] = useState(null);
  const [isModalEditarSetupIzajeVisible, setIsModalEditarSetupIzajeVisible] = useState(false);
  const [setupIzajeSeleccionado, setSetupIzajeSeleccionado] = useState(null);
  const [isModalEditarColaboradorVisible, setIsModalEditarColaboradorVisible] = useState(false);

  const { data: colaboradores = [], refetch: refetchColaboradores } = useFetchData('user');
  const { data: gruas = [], refetch: refetchGruas } = useFetchData('grua');
  const { data: setupIzajes = [], refetch: refetchSetupIzajes } = useFetchData('setupIzaje');

  const [colaboradoresState, setColaboradoresState] = useState(colaboradores);
  const [gruasState, setGruasState] = useState(gruas);
  const [setupsState, setSetupsState] = useState(setupIzajes);

  const [searchQuery, setSearchQuery] = useState('');
  const [originalColaboradoresState, setOriginalColaboradoresState] = useState(colaboradores);
  const [originalGruasState, setOriginalGruasState] = useState(gruas);
  const [originalSetupsState, setOriginalSetupsState] = useState(setupIzajes);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const rolesString = await AsyncStorage.getItem('roles');

        const roles = JSON.parse(rolesString);
        const isAdminUser = roles && Array.isArray(roles) && roles.includes('jefe');

        setIsAdmin(accessToken && isAdminUser);

        if (!accessToken || !isAdminUser) {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error al verificar el rol del usuario:', error);
        navigation.navigate('Login');
      }
    };
    checkUserRole();
  }, [navigation]);

  // Usar useFocusEffect para recargar datos cuando la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const refreshData = async () => {
        try {
          // Debounce para evitar múltiples llamadas rápidas
          await new Promise(resolve => setTimeout(resolve, 300));
          
          if (!isActive) return;

          const [colaboradoresRes, gruasRes, setupsRes] = await Promise.all([
            refetchColaboradores(),
            refetchGruas(),
            refetchSetupIzajes()
          ]);

          // Solo actualizar estados si el componente sigue montado
          if (isActive) {
            setColaboradoresState(colaboradoresRes.data || []);
            setGruasState(gruasRes.data || []);
            setSetupsState(setupsRes.data || []);
          }
        } catch (error) {
          console.error('Error refreshing data:', error);
        }
      };

      refreshData();

      return () => {
        isActive = false; // Cleanup para evitar updates en componente desmontado
      };
    }, [refetchColaboradores, refetchGruas, refetchSetupIzajes])
  );


  useEffect(() => {
    setGruasState(gruas || []);
    setColaboradoresState(colaboradores || []);
    setSetupsState(setupIzajes || []);
  }, [gruas, colaboradores, setupIzajes]);

  useEffect(() => {
    setColaboradoresState(colaboradores);
    setOriginalColaboradoresState(colaboradores);
  }, [colaboradores]);

  useEffect(() => {
    setGruasState(gruas);
    setOriginalGruasState(gruas);
  }, [gruas]);

  useEffect(() => {
    setSetupsState(setupIzajes);
    setOriginalSetupsState(setupIzajes);
  }, [setupIzajes]);

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccessText}>Acceso denegado. Solo los administradores pueden acceder a este panel.</Text>
      </View>
    );
  }

  const handlePressButton = (section) => {
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

  const getButtonLabel = (section) => {
    switch (section) {
      case 'Personal':
        return 'Crear usuario';
      case 'Gruas':
        return 'Crear grúa';
      case 'Planes':
        return 'Crear plan';
      default:
        return 'Crear';
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text) {
      setColaboradoresState(originalColaboradoresState);
      setGruasState(originalGruasState);
      setSetupsState(originalSetupsState);
      return;
    }

    const lowerText = text.toLowerCase();
    setColaboradoresState(originalColaboradoresState.filter(colaborador =>
      colaborador?.nombre?.toLowerCase().includes(lowerText) ||
      colaborador?.apellido?.toLowerCase().includes(lowerText)
    ));
    setGruasState(originalGruasState.filter(grua =>
      grua?.nombre?.toLowerCase().includes(lowerText)
    ));
    setSetupsState(originalSetupsState.filter(setup =>
      setup?.nombreProyecto?.toLowerCase().includes(lowerText) ||
      setup?.capataz?.nombre?.toLowerCase().includes(lowerText) ||
      setup?.capataz?.apellido?.toLowerCase().includes(lowerText) ||
      setup?.supervisor?.nombre?.toLowerCase().includes(lowerText) ||
      setup?.supervisor?.apellido?.toLowerCase().includes(lowerText) ||
      setup?.jefeArea?.nombre?.toLowerCase().includes(lowerText) ||
      setup?.jefeArea?.apellido?.toLowerCase().includes(lowerText)
    ));
  };

  const handleViewPlan = (planData) => {
    navigation.navigate('CollabTablas', { planData: planData });
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

  return (
    <View style={styles.container}>
      <Components.Header />

      <View style={styles.fixedHeader}>
        <Text style={styles.sectionTitle}>Panel de Administrador</Text>
        <Components.SearchInput
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <View style={styles.buttonContainer}>
          {['Personal', 'Gruas', 'Planes', 'Datos'].map((section) => {
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
                onPress={() => handlePressButton(section)}
              >
                <Text
                  style={[styles.buttonText, activeSection === section && { color: '#ee0000' }]}
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

      {(activeSection === 'Personal') && (
        <View style={styles.createButtonContainer}>
          <Components.Button
            label={getButtonLabel(activeSection)}
            onPress={() => {
              if (activeSection === 'Personal') {
                navigation.navigate('AddCollabName');
              }
            }}
            style={{ width: '100%', left: -59 }}
          />
        </View>
      )}

      <ModalsAdmin.ModalEditCollab
        isVisible={isModalEditarColaboradorVisible}
        onClose={() => setIsModalEditarColaboradorVisible(false)}
        colaborador={colaboradorSeleccionado}
        onUpdate={handleEditColaborador}
      />

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {activeSection === 'Personal' && (
          <Section.CollabSection
            colaboradores={colaboradoresState}
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
            onViewPress={handleViewPlan}
            handleEdit={(setup) => {
              setSetupIzajeSeleccionado(setup);
              setIsModalEditarSetupIzajeVisible(true);
            }}
            handleDelete={handleDeleteSetupIzaje}
            setSetups={setSetupsState}
            isAdminPanel={true}
          />
        )}

        {activeSection === 'Datos' && <Section.DataSection />}
      </ScrollView>
    </View>
  );
}

export default AdminPanel;
