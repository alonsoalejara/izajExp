import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';

const SetupCarga = () => {
  const navigation = useNavigation();
  const [forma, setForma] = useState('');
  const [material, setMaterial] = useState('');

  const handleNavigateToTablas = () => {
    navigation.navigate('Tablas');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Configurar Carga</Text>
        </View>

        <View style={[styles.container, { flexGrow: 1 }]}>
          {/* Seleccionar Forma */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Seleccione forma:</Text>
          </View>

          <Components.ConfigButton
            label="Configurar Forma"
            value={forma}
          />

          {/* Seleccionar Material */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Seleccione material:</Text>
          </View>

          <Components.ConfigButton
            label="Configurar Material"
            value={material}
          />

          <Components.Button
            label="Continuar"
            onPress={handleNavigateToTablas}
            style={{ marginTop: 280, marginBottom: 20, width: 330, left: -60 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupCarga;
