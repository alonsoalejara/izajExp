import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';

const EditPlan = () => {
  const navigation = useNavigation();
  const { planData } = useRoute().params;

  useEffect(() => {
    const payload = {
      nombreProyecto: planData.nombreProyecto || '',
      capataz: planData.capataz?._id || '',
      supervisor: planData.supervisor?._id || '',
      jefeArea: planData.jefeArea?._id || '',
      firmaSupervisor: planData.firmaSupervisor || null,
      firmaJefeArea: planData.firmaJefeArea || null,
      aparejos: planData.aparejos?.map(aparejo => ({
        descripcion: aparejo.descripcion || '',
        cantidad: aparejo.cantidad || 0,
        pesoUnitario: aparejo.pesoUnitario || 0,
        pesoTotal: aparejo.pesoTotal || 0,
        largo: aparejo.largo || 0,
        grillete: aparejo.grillete || '',
        pesoGrillete: aparejo.pesoGrillete || 0,
        tension: aparejo.tension || ''
      })) || [],
      grua: planData.grua?._id || '',
      datos: {
        largoPluma: planData.datos?.largoPluma || 0,
        contrapeso: planData.datos?.contrapeso || 0,
        gradoInclinacion: planData.datos?.gradoInclinacion || ''
      },
      cargas: {
        pesoEquipo: planData.cargas?.pesoEquipo || 0,
        pesoAparejos: planData.cargas?.pesoAparejos || 0,
        pesoGancho: planData.cargas?.pesoGancho || 0,
        pesoCable: planData.cargas?.pesoCable || 0,
        pesoTotal: planData.cargas?.pesoTotal || 0,
        radioTrabajoMax: planData.cargas?.radioTrabajoMax || 0,
        anguloTrabajo: planData.cargas?.anguloTrabajo || '',
        capacidadLevante: planData.cargas?.capacidadLevante || 0,
        porcentajeUtilizacion: planData.cargas?.porcentajeUtilizacion || 0
      },
      centroGravedad: {
        xAncho: planData.centroGravedad?.xAncho || 0,
        yLargo: planData.centroGravedad?.yLargo || 0,
        zAlto: planData.centroGravedad?.zAlto || 0,
        xCG: planData.centroGravedad?.xCG || 0,
        yCG: planData.centroGravedad?.yCG || 0,
        zCG: planData.centroGravedad?.zCG || 0,
        xPR: planData.centroGravedad?.xPR || 0,
        yPR: planData.centroGravedad?.yPR || 0,
        zPR: planData.centroGravedad?.zPR || 0
      },
      version: planData.version || 0
    };
    console.log('Cuerpo de la petición PUT (payload):', JSON.stringify(payload, null, 2));
  }, [planData]); // Dependencia planData para asegurar que se ejecuta cuando planData está disponible

  const goToEditCarga = () => {
    navigation.navigate('EditCarga', { planData: planData });
  };

  const goToEditGrua = () => {
    navigation.navigate('EditGrua', { planData: planData });
  };

  const goToEditAparejos = () => {
    navigation.navigate('EditAparejos', { planData: planData });
  };

  const handleSaveChanges = () => {
    // Aquí es donde iría la lógica para enviar la petición PUT real
    // Por ahora, el console.log ya se muestra al cargar la pantalla.
    alert('Guardar cambios generales del plan.');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" size={44} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Plan de Izaje</Text>
      </View>

      <Components.Button
        label="Editar Carga"
        onPress={goToEditCarga}
        style={styles.actionButton}
      />

      <Components.Button
        label="Editar Grúa"
        onPress={goToEditGrua}
        style={styles.actionButton}
      />

      <Components.Button
        label="Editar Aparejos"
        onPress={goToEditAparejos}
        style={styles.actionButton}
      />

      <View style={styles.bottomButtonContainer}>
        <Components.Button
          label="Volver"
          onPress={handleGoBack}
          isCancel={true}
          style={[styles.bottomButton, { backgroundColor: 'transparent'}]}
        />
        <Components.Button
          label="Guardar cambios"
          onPress={handleSaveChanges}
          style={styles.bottomButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 160,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 32,
  },
  actionButton: {
    marginBottom: 10,
    alignSelf: 'center',
    right: 20,
    width: '90%',
    backgroundColor: '#990000',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 290,
    right: 80,
    width: '100%',
  },
  bottomButton: {
    width: '55%',
    marginRight: -70,
  },
});

export default EditPlan;
