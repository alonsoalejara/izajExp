import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import Components from '../components/Components.index';

const SetupRadio = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setupGruaData, setupCargaData } = route.params || {};

  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  const pesoCarga = setupCargaData?.peso || 'No disponible';

  const handleContinue = async () => {
    const setupRadioData = {
      radioIzaje,
      radioMontaje,
    };
    await AsyncStorage.setItem('setupRadioData', JSON.stringify(setupRadioData));
    navigation.navigate('NextScreen', { setupGruaData, setupCargaData, setupRadioData });
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

            {/* Tabla de carga */}
            <View>
              <Text style={[styles.labelText, { top: 220 }]}>Tabla de carga Terex RT555:</Text>
              <Image
                source={require('../../assets/rt555-load-chart.png')}
                style={{
                  borderRadius: 20,
                  borderWidth: 4,
                  borderColor: '#000',
                  width: 1000,
                  height: 670,
                  left: -340,
                  transform: [{ scale: 0.33 }],
                }}
              />
            </View>

            {/* Mostrar el peso de la carga y los radios ingresados */}
            <View style={{ top: -700 }}>
              <Text style={styles.labelText}>
                Peso de la carga: {pesoCarga} kg
              </Text>
              <Text style={styles.labelText}>
                Radio de izaje: {radioIzaje ? `${radioIzaje} m` : ''}
              </Text>
              <Text style={styles.labelText}>
                Radio de montaje: {radioMontaje ? `${radioMontaje} m` : ''}
              </Text>
            </View>

            <View style={[styles.buttonContainer, { top: -650, left: -50 }]}>
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
