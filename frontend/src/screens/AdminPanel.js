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
  const [colaboradores, setColaboradores] = useState(Data.collabData);
  const [gruas, setGruas] = useState(Object.values(Data.craneData));
  const [planesDeIzaje, setPlanesDeIzaje] = useState(Data.planData || []);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [colaboradorEditado, setColaboradorEditado] = useState(null);
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [isModalCrearColaboradorVisible, setModalCrearColaboradorVisible] = useState(false);
  const [isModalEditarColaboradorVisible, setModalEditarColaboradorVisible] = useState(false);
  const [isModalCrearGruaVisible, setModalCrearGruaVisible] = useState(false);
  const [planesIzaje, setPlanesIzaje] = useState(Data.planIzajeData); // Agregando planes de izaje
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleButtonPress = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleAdd = (section) => {
    if (section === 'Colaboradores') {
      setModalCrearColaboradorVisible(true);
    } else if (section === 'Gruas') {
      setModalCrearGruaVisible(true);
    } else if (section === 'PlanesDeIzaje') {
      console.log('Agregar un nuevo plan de izaje');
    }
  };

  const handleModalCrearColaboradorClose = () => {
    setModalCrearColaboradorVisible(false);
  };

  const handleModalEditarColaboradorClose = () => {
    setModalEditarColaboradorVisible(false);
  };

  const handleModalCrearGruaClose = () => {
    setModalCrearGruaVisible(false);
  };

  const handleDeletePlan = (index) => {
    setPlanesDeIzaje((prevPlanes) => prevPlanes.filter((_, i) => i !== index));
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

      <ModalsAdmin.ModalAddCollab
        isVisible={isModalCrearColaboradorVisible}
        onClose={handleModalCrearColaboradorClose}
        onSave={(newCollaborator) => {
          setColaboradores((prev) => [...prev, newCollaborator]);
          setModalCrearColaboradorVisible(false);
        }}
      />

      <ModalsAdmin.ModalEditarCollab
        isVisible={isModalEditarColaboradorVisible}
        onClose={handleModalEditarColaboradorClose}
        onSave={(editedCollaborator) => {
          setColaboradores((prev) =>
            prev.map((colaborador) =>
              colaborador.rut === editedCollaborator.rut ? editedCollaborator : colaborador
            )
          );
          setModalEditarColaboradorVisible(false);
        }}
        colaborador={colaboradorEditado}
      />

      <ModalsAdmin.ModalAddCrane
        isVisible={isModalCrearGruaVisible}
        onClose={handleModalCrearGruaClose}
        onSave={(newCrane) => {
          setGruas((prev) => [...prev, newCrane]);
          setModalCrearGruaVisible(false);
        }}
      />

      {activeSection === 'Colaboradores' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colaboradores</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAdd('Colaboradores')}
          >
            <Icon name="add" size={24} color="white" />
          </TouchableOpacity>
          {colaboradores.map((colaborador) => (
            <View key={colaborador.rut} style={styles.collaboratorCard}>
              <Text style={styles.collaboratorName}>{colaborador.nombre}</Text>
              <Text style={styles.collaboratorDetails}>RUT: {colaborador.rut}</Text>
            </View>
          ))}
        </View>
      )}

      {activeSection === 'Gruas' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grúas</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAdd('Gruas')}
          >
            <Icon name="add" size={24} color="white" />
          </TouchableOpacity>
          {gruas.map((grua, index) => (
            <View key={index} style={styles.gruaCard}>
              <Text style={styles.gruaName}>{grua.nombre}</Text>
            </View>
          ))}
        </View>
      )}

    {activeSection === 'PlanesDeIzaje' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Planes de Izaje</Text>
              {planesIzaje.map((plan) => (
                <View key={plan.id} style={styles.planCard}>
                  <TouchableOpacity onPress={() => handlePlanPress(plan.id)}>
                    <Text style={styles.planTitle}>Plan ID: {plan.id}</Text>
                    <View style={styles.planDetails}>
                      <Text style={styles.planDetail}>Largo de Pluma: {plan.datosGenerales.largoPluma} m</Text>
                      <Text style={styles.planDetail}>Contrapeso: {plan.datosGenerales.contrapeso} toneladas</Text>
                    </View>
                  </TouchableOpacity>
                  {selectedPlan === plan.id && (
                    <View style={styles.planExpandedDetails}>
                      <Text style={styles.expandedTitle}>Aparejos:</Text>
                      {plan.aparejos.map((aparejo, index) => (
                        <View key={index} style={styles.aparejoItem}>
                          <Text>Descripción: {aparejo.descripcion}</Text>
                          <Text>Cantidad: {aparejo.cantidad}</Text>
                          <Text>Peso Unitario: {aparejo.pesoUnitario} kg</Text>
                          <Text>Peso Total: {aparejo.pesoTotal} kg</Text>
                        </View>
                      ))}
                      <Text style={styles.expandedTitle}>Cargas:</Text>
                      <Text>Peso Equipo: {plan.cargas.pesoEquipo} kg</Text>
                      <Text>Peso Unitario: {plan.cargas.pesoUnitario} kg</Text>
                      <Text>Peso Total: {plan.cargas.pesoTotal} kg</Text>
                      <Text>Radio Trabajo Máx: {plan.cargas.radioTrabajoMax} m</Text>
                      <Text>Capacidad de Levante: {plan.cargas.capacidadLevante} toneladas</Text>
                      <Text>% Utilización: {plan.cargas.porcentajeUtilizacion}%</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
    </ScrollView>
  );
}
