import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';

const EditGrua = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Recibe el ID de la grúa y los datos de la grúa, además del callback
  const { gruaId, datos, onSaveGruaAndDatos } = route.params;
  const [editableDatos, setEditableDatos] = useState(datos || {
    largoPluma: 0,
    contrapeso: 0,
    gradoInclinacion: ''
  });

  const handleChange = (value, field) => {
    setEditableDatos(prevDatos => ({
      ...prevDatos,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    // Llama al callback pasado desde EditPlan.js con el ID de la grúa (sin cambios)
    // y los datos de la grúa actualizados
    if (onSaveGruaAndDatos) {
      onSaveGruaAndDatos(gruaId, editableDatos);
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
        <Text style={styles.headerTitle}>Editar Grúa</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        {/* El ID de la Grúa ha sido eliminado de la pantalla */}

        <Text style={styles.sectionTitle}>Datos de la Grúa</Text>
        <Text style={styles.label}>Largo de Pluma (m):</Text>
        <TextInput
          style={styles.input}
          value={String(editableDatos.largoPluma)}
          onChangeText={(text) => handleChange(parseFloat(text) || 0, 'largoPluma')}
          keyboardType="numeric"
          placeholder="Largo de Pluma"
        />
        <Text style={styles.label}>Contrapeso (ton):</Text>
        <TextInput
          style={styles.input}
          value={String(editableDatos.contrapeso)}
          onChangeText={(text) => handleChange(parseFloat(text) || 0, 'contrapeso')}
          keyboardType="numeric"
          placeholder="Contrapeso"
        />
        <Text style={styles.label}>Grado de Inclinación:</Text>
        <TextInput
          style={styles.input}
          value={editableDatos.gradoInclinacion}
          onChangeText={(text) => handleChange(text, 'gradoInclinacion')}
          placeholder="Grado de Inclinación"
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
          label="Guardar Grúa"
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
  readOnlyText: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
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

export default EditGrua;