import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import Components from '../components/Components.index';

const SetupRadio = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Recibimos los datos que vinieron de SetupGrua (y SetupCarga si existen)
  const { setupGruaData, setupCargaData } = route.params || {};

  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  const handleContinue = async () => {
    const setupRadioData = {
      radioIzaje,
      radioMontaje,
    };
    await AsyncStorage.setItem('setupRadioData', JSON.stringify(setupRadioData));
    // Navega a la siguiente pantalla (ajusta 'NextScreen' según tu ruta)
    navigation.navigate('NextScreen', { setupGruaData, setupCargaData, setupRadioData });
  };
  console.log('Datos recibidos en SetupRadio:', route.params);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configurar Radios (metros)</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.labelText}>Ingrese el r. de izaje:</Text>
                <Components.NumericInput
                  value={radioIzaje}
                  onChangeText={setRadioIzaje}
                  placeholder="Radio de izaje"
                  style={{ width: 150, top: 12, right: 2 }}
                  showControls={false}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Ingrese el r. de montaje:</Text>
                <Components.NumericInput
                  value={radioMontaje}
                  onChangeText={setRadioMontaje}
                  placeholder="Radio de montaje"
                  style={{ width: 150, top: 12, right: 2 }}
                  showControls={false}
                />
              </View>
            </View>
            <View style={[styles.buttonContainer, { top: 430, left: -50}]}>
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -90 }]}
              />
              <Components.Button
                label="Continuar"
                onPress={handleContinue}
                style={[styles.button, { width: 170 }]}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupRadio;
