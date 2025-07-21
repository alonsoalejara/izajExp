import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import Components from '../components/Components.index';

const EditPlan = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [editablePlan, setEditablePlan] = useState(() => {
    const initialPlan = route.params?.planData || {};
    return {
      nombreProyecto: initialPlan.nombreProyecto || '',
      capataz: initialPlan.capataz?._id || '',
      supervisor: initialPlan.supervisor?._id || '',
      jefeArea: initialPlan.jefeArea?._id || '',
      firmaSupervisor: initialPlan.firmaSupervisor || 'Firma pendiente',
      firmaJefeArea: initialPlan.firmaJefeArea || 'Firma pendiente',
      aparejos: initialPlan.aparejos?.map(ap => ({
        descripcion: ap.descripcion || '',
        cantidad: ap.cantidad || 0,
        pesoUnitario: ap.pesoUnitario || 0,
        pesoTotal: ap.pesoTotal || 0,
        largo: ap.largo || 0,
        grillete: ap.grillete || '',
        pesoGrillete: ap.pesoGrillete || 0,
        tension: ap.tension || '',
        altura: ap.altura || '',
      })) || [],
      grua: initialPlan.grua?._id || '', // Solo el ID de la grúa
      datos: {
        largoPluma: initialPlan.datos?.largoPluma || 0,
        contrapeso: initialPlan.datos?.contrapeso || 0,
        gradoInclinacion: initialPlan.datos?.gradoInclinacion || ''
      },
      cargas: {
        pesoEquipo: initialPlan.cargas?.pesoEquipo || 0,
        pesoAparejos: initialPlan.cargas?.pesoAparejos || 0,
        pesoGancho: initialPlan.cargas?.pesoGancho || 0,
        pesoCable: initialPlan.cargas?.pesoCable || 0,
        pesoTotal: initialPlan.cargas?.pesoTotal || 0,
        radioTrabajoMax: initialPlan.cargas?.radioTrabajoMax || 0,
        anguloTrabajo: initialPlan.cargas?.anguloTrabajo || '',
        capacidadLevante: initialPlan.cargas?.capacidadLevante || 0,
        porcentajeUtilizacion: initialPlan.cargas?.porcentajeUtilizacion || 0
      },
      centroGravedad: {
        xAncho: initialPlan.centroGravedad?.xAncho || 0,
        yLargo: initialPlan.centroGravedad?.yLargo || 0,
        zAlto: initialPlan.centroGravedad?.zAlto || 0,
        xCG: initialPlan.centroGravedad?.xCG || 0,
        yCG: initialPlan.centroGravedad?.yCG || 0,
        zCG: initialPlan.centroGravedad?.zCG || 0,
        xPR: initialPlan.centroGravedad?.xPR || 0,
        yPR: initialPlan.centroGravedad?.yPR || 0,
        zPR: initialPlan.centroGravedad?.zPR || 0
      },
      version: initialPlan.version || 0,
      _id: initialPlan._id || null,
    };
  });

  const handleSaveAparejos = (updatedAparejos) => {
    setEditablePlan(prevPlan => ({
      ...prevPlan,
      aparejos: updatedAparejos
    }));
  };

  const handleSaveGruaAndDatos = (updatedGruaId, updatedDatos) => {
    setEditablePlan(prevPlan => ({
      ...prevPlan,
      grua: updatedGruaId,
      datos: updatedDatos
    }));
  };

  useEffect(() => {
    if (route.params?.updatedCargas) {
      setEditablePlan(prevPlan => ({
        ...prevPlan,
        cargas: route.params.updatedCargas
      }));
      navigation.setParams({ updatedCargas: undefined });
    }
    if (route.params?.updatedCG) {
      setEditablePlan(prevPlan => ({
        ...prevPlan,
        centroGravedad: route.params.updatedCG
      }));
      navigation.setParams({ updatedCG: undefined });
    }
  }, [route.params?.updatedCargas, route.params?.updatedCG]);

  const handleChange = (field, value, subField = null) => {
    setEditablePlan(prevPlan => {
      if (subField !== null) {
        return {
          ...prevPlan,
          [field]: {
            ...prevPlan[field],
            [subField]: value
          }
        };
      } else {
        return { ...prevPlan, [field]: value };
      }
    });
  };

  const goToEditCarga = () => {
    navigation.navigate('EditCarga', { planData: editablePlan });
  };

  const goToEditGrua = () => {
    navigation.navigate('EditGrua', {
      gruaId: editablePlan.grua, // Pasamos solo el ID de la grúa
      datos: editablePlan.datos, // Pasamos el objeto de datos de la grúa
      onSaveGruaAndDatos: handleSaveGruaAndDatos // Pasamos el callback
    });
  };

  const goToEditAparejos = () => {
    navigation.navigate('EditAparejos', {
      aparejos: editablePlan.aparejos,
      onSaveAparejos: handleSaveAparejos
    });
  };

  const handleSaveChanges = async () => {
    if (!editablePlan._id) {
      Alert.alert("Error", "No se puede guardar un plan sin ID.");
      return;
    }

    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      Alert.alert("Error de autenticación", "No autorizado. Por favor, inicie sesión nuevamente.");
      return;
    }

    const payload = {
      ...editablePlan,
      capataz: editablePlan.capataz,
      supervisor: editablePlan.supervisor,
      jefeArea: editablePlan.jefeArea,
      grua: editablePlan.grua,
      aparejos: editablePlan.aparejos.map(aparejo => {
        const { _id, ...rest } = aparejo;
        return rest;
      }),
    };

    const { _id, ...finalPayload } = payload;

    try {
      const response = await fetch(getApiUrl(`setupIzaje/${editablePlan._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Error al guardar los cambios: ${response.statusText}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
        } catch (e) {
        }
        Alert.alert("Error", errorMessage);
        return;
      }

      const result = await response.json();
      Alert.alert("Éxito", "Plan de izaje actualizado correctamente.");
      navigation.goBack();

    } catch (error) {
      console.error("Error al guardar cambios:", error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="keyboard-arrow-left" size={44} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Plan de Izaje</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Nombre del Proyecto:</Text>
        <TextInput
          style={styles.input}
          value={editablePlan.nombreProyecto}
          onChangeText={(text) => handleChange('nombreProyecto', text)}
          placeholder="Nombre del Proyecto"
        />

        <Components.Button
          label="Editar Grúa"
          onPress={goToEditGrua}
          style={styles.actionButton}
        />

        {/* Los datos de la grúa ahora se editan en EditGrua.js */}
        <Text style={styles.sectionTitle}>Cargas</Text>
        <Text style={styles.label}>Peso Equipo (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.pesoEquipo)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'pesoEquipo')}
          keyboardType="numeric"
          placeholder="Peso del Equipo"
        />
        <Text style={styles.label}>Peso Aparejos (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.pesoAparejos)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'pesoAparejos')}
          keyboardType="numeric"
          placeholder="Peso de Aparejos"
        />
        <Text style={styles.label}>Peso Gancho (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.pesoGancho)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'pesoGancho')}
          keyboardType="numeric"
          placeholder="Peso del Gancho"
        />
        <Text style={styles.label}>Peso Cable (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.pesoCable)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'pesoCable')}
          keyboardType="numeric"
          placeholder="Peso del Cable"
        />
        <Text style={styles.label}>Peso Total (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.pesoTotal)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'pesoTotal')}
          keyboardType="numeric"
          placeholder="Peso Total"
        />
        <Text style={styles.label}>Radio de Trabajo Máximo (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.radioTrabajoMax)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'radioTrabajoMax')}
          keyboardType="numeric"
          placeholder="Radio de Trabajo Máximo"
        />
        <Text style={styles.label}>Ángulo de Trabajo:</Text>
        <TextInput
          style={styles.input}
          value={editablePlan.cargas.anguloTrabajo}
          onChangeText={(text) => handleChange('cargas', text, 'anguloTrabajo')}
          placeholder="Ángulo de Trabajo"
        />
        <Text style={styles.label}>Capacidad de Levante (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.capacidadLevante)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'capacidadLevante')}
          keyboardType="numeric"
          placeholder="Capacidad de Levante"
        />
        <Text style={styles.label}>% Utilización:</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.cargas.porcentajeUtilizacion)}
          onChangeText={(text) => handleChange('cargas', parseFloat(text) || 0, 'porcentajeUtilizacion')}
          keyboardType="numeric"
          placeholder="% Utilización"
        />

        <Text style={styles.sectionTitle}>Centro de Gravedad</Text>
        <Text style={styles.label}>X Ancho (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.xAncho)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'xAncho')}
          keyboardType="numeric"
          placeholder="X Ancho"
        />
        <Text style={styles.label}>Y Largo (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.yLargo)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'yLargo')}
          keyboardType="numeric"
          placeholder="Y Largo"
        />
        <Text style={styles.label}>Z Alto (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.zAlto)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'zAlto')}
          keyboardType="numeric"
          placeholder="Z Alto"
        />
        <Text style={styles.label}>X CG (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.xCG)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'xCG')}
          keyboardType="numeric"
          placeholder="X CG"
        />
        <Text style={styles.label}>Y CG (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.yCG)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'yCG')}
          keyboardType="numeric"
          placeholder="Y CG"
        />
        <Text style={styles.label}>Z CG (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.zCG)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'zCG')}
          keyboardType="numeric"
          placeholder="Z CG"
        />
        <Text style={styles.label}>X PR (%):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.xPR)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'xPR')}
          keyboardType="numeric"
          placeholder="X PR"
        />
        <Text style={styles.label}>Y PR (%):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.yPR)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'yPR')}
          keyboardType="numeric"
          placeholder="Y PR"
        />
        <Text style={styles.label}>Z PR (%):</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.centroGravedad.zPR)}
          onChangeText={(text) => handleChange('centroGravedad', parseFloat(text) || 0, 'zPR')}
          keyboardType="numeric"
          placeholder="Z PR"
        />

        <Components.Button
          label="Editar Aparejos"
          onPress={goToEditAparejos}
          style={styles.actionButton}
        />

        <Text style={styles.sectionTitle}>Versión</Text>
        <TextInput
          style={styles.input}
          value={String(editablePlan.version)}
          onChangeText={(text) => handleChange('version', parseInt(text) || 0)}
          keyboardType="numeric"
          placeholder="Versión (0, 1, 2, 3)"
        />

        <Text style={styles.sectionTitle}>Firmas</Text>
        <Text style={styles.label}>Firma Supervisor:</Text>
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          value={editablePlan.firmaSupervisor || 'No firmada'}
          editable={false}
        />
        <Text style={styles.label}>Firma Jefe de Área:</Text>
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          value={editablePlan.firmaJefeArea || 'No firmada'}
          editable={false}
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Components.Button
          label="Volver"
          onPress={handleGoBack}
          isCancel={true}
          style={[styles.bottomButton, { backgroundColor: 'transparent' }]}
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
    marginBottom: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 32,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  readOnlyInput: {
    backgroundColor: '#e0e0e0',
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#990000',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  aparejoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fefefe',
  },
  aparejoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  actionButton: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#990000',
  },
  addAparejoButton: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#007bff',
    alignSelf: 'center',
    width: '80%',
  },
  removeAparejoButton: {
    marginTop: 15,
    backgroundColor: '#dc3545',
    alignSelf: 'center',
    width: '80%',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButton: {
    width: '48%',
  },
});

export default EditPlan;