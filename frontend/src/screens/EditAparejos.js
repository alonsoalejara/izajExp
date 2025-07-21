import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';

const EditAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Recibe la lista de aparejos y la función de callback
  const { aparejos: initialAparejos, onSaveAparejos } = route.params;
  const [editableAparejos, setEditableAparejos] = useState(initialAparejos || []);

  const handleChange = (value, field, index) => {
    setEditableAparejos(prevAparejos => {
      const newAparejos = [...prevAparejos];
      // Asegurarse de que el objeto aparejo exista antes de intentar actualizarlo
      if (!newAparejos[index]) {
        newAparejos[index] = {};
      }
      newAparejos[index] = { ...newAparejos[index], [field]: value };
      return newAparejos;
    });
  };

  const handleAddAparejo = () => {
    setEditableAparejos(prevAparejos => [
      ...prevAparejos,
      {
        descripcion: '',
        cantidad: 0,
        pesoUnitario: 0,
        pesoTotal: 0,
        largo: 0,
        grillete: '',
        pesoGrillete: 0,
        tension: '',
        altura: '',
      }
    ]);
  };

  const handleRemoveAparejo = (index) => {
    Alert.alert(
      "Eliminar Aparejo",
      "¿Estás seguro de que quieres eliminar este aparejo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            setEditableAparejos(prevAparejos => {
              const newAparejos = [...prevAparejos];
              newAparejos.splice(index, 1);
              return newAparejos;
            });
          }
        }
      ]
    );
  };

  const handleSaveChanges = () => {
    // Llama al callback pasado desde EditPlan.js con los aparejos actualizados
    if (onSaveAparejos) {
      onSaveAparejos(editableAparejos);
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
        <Text style={styles.headerTitle}>Editar Aparejos</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        {editableAparejos.map((aparejo, index) => (
          <View key={index} style={styles.aparejoContainer}>
            <Text style={styles.aparejoTitle}>Aparejo {index + 1}</Text>
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.input}
              value={aparejo.descripcion}
              onChangeText={(text) => handleChange(text, 'descripcion', index)}
              placeholder="Descripción"
            />
            <Text style={styles.label}>Cantidad:</Text>
            <TextInput
              style={styles.input}
              value={String(aparejo.cantidad)}
              onChangeText={(text) => handleChange(parseInt(text) || 0, 'cantidad', index)}
              keyboardType="numeric"
              placeholder="Cantidad"
            />
            <Text style={styles.label}>Peso Unitario:</Text>
            <TextInput
              style={styles.input}
              value={String(aparejo.pesoUnitario)}
              onChangeText={(text) => handleChange(parseFloat(text) || 0, 'pesoUnitario', index)}
              keyboardType="numeric"
              placeholder="Peso Unitario"
            />
            <Text style={styles.label}>Peso Total Aparejo:</Text>
            <TextInput
              style={styles.input}
              value={String(aparejo.pesoTotal)}
              onChangeText={(text) => handleChange(parseFloat(text) || 0, 'pesoTotal', index)}
              keyboardType="numeric"
              placeholder="Peso Total Aparejo"
            />
            <Text style={styles.label}>Largo:</Text>
            <TextInput
              style={styles.input}
              value={String(aparejo.largo)}
              onChangeText={(text) => handleChange(parseFloat(text) || 0, 'largo', index)}
              keyboardType="numeric"
              placeholder="Largo"
            />
            <Text style={styles.label}>Grillete:</Text>
            <TextInput
              style={styles.input}
              value={aparejo.grillete}
              onChangeText={(text) => handleChange(text, 'grillete', index)}
              placeholder="Grillete"
            />
            <Text style={styles.label}>Peso Grillete:</Text>
            <TextInput
              style={styles.input}
              value={String(aparejo.pesoGrillete)}
              onChangeText={(text) => handleChange(parseFloat(text) || 0, 'pesoGrillete', index)}
              keyboardType="numeric"
              placeholder="Peso Grillete"
            />
            <Text style={styles.label}>Tensión:</Text>
            <TextInput
              style={styles.input}
              value={aparejo.tension}
              onChangeText={(text) => handleChange(text, 'tension', index)}
              placeholder="Tensión"
            />
            <Text style={styles.label}>Altura:</Text>
            <TextInput
              style={styles.input}
              value={aparejo.altura}
              onChangeText={(text) => handleChange(text, 'altura', index)}
              placeholder="Altura"
            />
            <Components.Button
              label="Eliminar Aparejo"
              onPress={() => handleRemoveAparejo(index)}
              isCancel={true}
              style={styles.removeAparejoButton}
            />
          </View>
        ))}
        <Components.Button
          label="Añadir Aparejo"
          onPress={handleAddAparejo}
          style={styles.addAparejoButton}
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
          label="Guardar Aparejos"
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

export default EditAparejos;