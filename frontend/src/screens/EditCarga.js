import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';

const EditCarga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Recibe los objetos de cargas y centro de gravedad, y el callback
  const { cargas: initialCargas, centroGravedad: initialCG, onSaveCargasAndCG } = route.params;

  const [editableCargas, setEditableCargas] = useState(initialCargas || {
    pesoEquipo: 0,
    pesoAparejos: 0,
    pesoGancho: 0,
    pesoCable: 0,
    pesoTotal: 0,
    radioTrabajoMax: 0,
    anguloTrabajo: '',
    capacidadLevante: 0,
    porcentajeUtilizacion: 0
  });

  const [editableCG, setEditableCG] = useState(initialCG || {
    xAncho: 0,
    yLargo: 0,
    zAlto: 0,
    xCG: 0,
    yCG: 0,
    zCG: 0,
    xPR: 0,
    yPR: 0,
    zPR: 0
  });

  const handleChangeCargas = (value, field) => {
    setEditableCargas(prevCargas => ({
      ...prevCargas,
      [field]: value
    }));
  };

  const handleChangeCG = (value, field) => {
    setEditableCG(prevCG => ({
      ...prevCG,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    // Llama al callback pasado desde EditPlan.js con los datos actualizados
    if (onSaveCargasAndCG) {
      onSaveCargasAndCG(editableCargas, editableCG);
    }
    // Vuelve a la pantalla anterior (EditPlan.js)
    navigation.goBack();
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
        <Text style={styles.headerTitle}>Editar Cargas y CG</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Cargas</Text>
        <Text style={styles.label}>Peso Equipo (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.pesoEquipo)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'pesoEquipo')}
          keyboardType="numeric"
          placeholder="Peso del Equipo"
        />
        <Text style={styles.label}>Peso Aparejos (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.pesoAparejos)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'pesoAparejos')}
          keyboardType="numeric"
          placeholder="Peso de Aparejos"
        />
        <Text style={styles.label}>Peso Gancho (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.pesoGancho)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'pesoGancho')}
          keyboardType="numeric"
          placeholder="Peso del Gancho"
        />
        <Text style={styles.label}>Peso Cable (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.pesoCable)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'pesoCable')}
          keyboardType="numeric"
          placeholder="Peso del Cable"
        />
        <Text style={styles.label}>Peso Total (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.pesoTotal)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'pesoTotal')}
          keyboardType="numeric"
          placeholder="Peso Total"
        />
        <Text style={styles.label}>Radio de Trabajo Máximo (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.radioTrabajoMax)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'radioTrabajoMax')}
          keyboardType="numeric"
          placeholder="Radio de Trabajo Máximo"
        />
        <Text style={styles.label}>Ángulo de Trabajo:</Text>
        <TextInput
          style={styles.input}
          value={editableCargas.anguloTrabajo}
          onChangeText={(text) => handleChangeCargas(text, 'anguloTrabajo')}
          placeholder="Ángulo de Trabajo"
        />
        <Text style={styles.label}>Capacidad de Levante (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.capacidadLevante)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'capacidadLevante')}
          keyboardType="numeric"
          placeholder="Capacidad de Levante"
        />
        <Text style={styles.label}>% Utilización:</Text>
        <TextInput
          style={styles.input}
          value={String(editableCargas.porcentajeUtilizacion)}
          onChangeText={(text) => handleChangeCargas(parseFloat(text) || 0, 'porcentajeUtilizacion')}
          keyboardType="numeric"
          placeholder="% Utilización"
        />

        <Text style={styles.sectionTitle}>Centro de Gravedad</Text>
        <Text style={styles.label}>X Ancho (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.xAncho)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'xAncho')}
          keyboardType="numeric"
          placeholder="X Ancho"
        />
        <Text style={styles.label}>Y Largo (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.yLargo)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'yLargo')}
          keyboardType="numeric"
          placeholder="Y Largo"
        />
        <Text style={styles.label}>Z Alto (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.zAlto)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'zAlto')}
          keyboardType="numeric"
          placeholder="Z Alto"
        />
        <Text style={styles.label}>X CG (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.xCG)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'xCG')}
          keyboardType="numeric"
          placeholder="X CG"
        />
        <Text style={styles.label}>Y CG (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.yCG)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'yCG')}
          keyboardType="numeric"
          placeholder="Y CG"
        />
        <Text style={styles.label}>Z CG (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.zCG)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'zCG')}
          keyboardType="numeric"
          placeholder="Z CG"
        />
        <Text style={styles.label}>X PR (%):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.xPR)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'xPR')}
          keyboardType="numeric"
          placeholder="X PR"
        />
        <Text style={styles.label}>Y PR (%):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.yPR)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'yPR')}
          keyboardType="numeric"
          placeholder="Y PR"
        />
        <Text style={styles.label}>Z PR (%):</Text>
        <TextInput
          style={styles.input}
          value={String(editableCG.zPR)}
          onChangeText={(text) => handleChangeCG(parseFloat(text) || 0, 'zPR')}
          keyboardType="numeric"
          placeholder="Z PR"
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
          label="Guardar Cargas y CG"
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

export default EditCarga;
