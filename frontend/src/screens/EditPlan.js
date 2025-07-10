import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';

const EditPlan = () => {
  const navigation = useNavigation();
  const { planData } = useRoute().params;

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
