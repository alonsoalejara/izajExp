import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import Components from '../components/Components.index';
import { evaluateMovement } from '../data/loadCapacity';

const SetupRadio = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setupGruaData, setupCargaData } = route.params || {};

  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  // Se asume que el peso de la carga viene en toneladas, ej. 5 t.
  const pesoCarga = setupCargaData?.peso || 'No disponible';

  // Se asume que el largo de pluma viene en metros y es un valor exacto definido en las tablas.
  // Ejemplo: 10.6, 15.2, 19.8, 24.3, 28.9 o 33.5.
  const boomLength = setupGruaData?.largoPluma ? parseFloat(setupGruaData.largoPluma) : null;

  // Se evalúa el movimiento basado en el radio de montaje, el peso y el largo de pluma.
  let movementEvaluation = null;
  const parsedRadioMontaje = parseFloat(radioMontaje);
  const parsedPesoCarga = parseFloat(pesoCarga);
  if (!isNaN(parsedRadioMontaje) && !isNaN(parsedPesoCarga) && boomLength) {
    movementEvaluation = evaluateMovement(parsedRadioMontaje, parsedPesoCarga, boomLength);
  }

  const handleContinue = async () => {
    if (radioIzaje === '' || radioMontaje === '') {
      Alert.alert('Error', 'Debes ingresar ambos radios.');
      return;
    }
    const setupRadioData = {
      radioIzaje,
      radioMontaje,
    };

    await AsyncStorage.setItem('setupRadioData', JSON.stringify(setupRadioData));
    navigation.navigate('SetupAparejos', { 
      setupGruaData, 
      setupCargaData, 
      setupRadioData 
    });
  };

  console.log('Datos recibidos en SetupRadio:', route.params);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configurar Radios</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.labelText}>Radio de izaje (m):</Text>
                <Components.NumericInput
                  value={radioIzaje}
                  onChangeText={setRadioIzaje}
                  placeholder="Radio de izaje"
                  style={{ width: 150, top: 12, right: 2 }}
                  showControls={false}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Radio de montaje (m):</Text>
                <Components.NumericInput
                  value={radioMontaje}
                  onChangeText={setRadioMontaje}
                  placeholder="Radio de montaje"
                  style={{ width: 150, top: 12, right: 2 }}
                  showControls={false}
                />
              </View>
            </View>
            <View>
              <Text style={[styles.labelText, { top: 255, left: -8 }]}>Tabla de carga Terex RT555:</Text>
              <Image
                source={require('../../assets/rt555-load-chart.png')}
                style={{
                  borderRadius: 20,
                  borderWidth: 4,
                  borderColor: '#000',
                  top: 40,
                  width: 1000,
                  height: 670,
                  left: -340,
                  transform: [{ scale: 0.34 }],
                }}
              />
            </View>
            <View style={{ top: -700 }}>
              <Text style={styles.labelText}>
                Peso de la carga: {pesoCarga} t
              </Text>
              <Text style={styles.labelText}>
                Radio de izaje: {radioIzaje ? `${radioIzaje} m` : ''}
              </Text>
              <Text style={styles.labelText}>
                Radio de montaje: {radioMontaje ? `${radioMontaje} m` : ''}
              </Text>
              {movementEvaluation && (
                <Text style={styles.labelText}>
                  {movementEvaluation.message}
                </Text>
              )}
            </View>
            <View style={[styles.buttonContainer, { top: -650, left: -50, marginBottom: -300 }]}>
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
