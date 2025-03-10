import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';

const SetupIzaje = () => {
  const navigation = useNavigation();
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [grua, setGrua] = useState('');
  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUsuarioId = await AsyncStorage.getItem('usuarioId');
        if (storedUsuarioId) {
          setUsuarioId(storedUsuarioId);
        } else {
          console.warn("No se encontró el usuarioId en AsyncStorage");
        }
      } catch (error) {
        console.error("Error al obtener usuarioId:", error);
      }
    };
    fetchUserId();
  }, []);

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleNavigateToSetupAparejos = async () => {
    try {
      const data = {
        grua,
        radioIzaje,
        radioMontaje,
        usuarioId,
      };
      await AsyncStorage.setItem('setupIzajeData', JSON.stringify(data));
        navigation.navigate('SetupAparejos', {
        setupIzajeData: data,
      });
    } catch (error) {
      console.error("Error al guardar datos en AsyncStorage:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />

        <ScrollView contentContainerStyle={{ flexGrow: 2, height: 1000 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>
          </View>

          <View style={styles.container}>
            {/* Configurar Grúa */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione grúa:</Text>
            </View>

            <Components.ConfigButton
              label="Configurar Grúa"
              value={grua?.nombre || 'Seleccionar grúa'}
              onPress={() => openModal(setGruaModalVisible)}
            />

            <BS.BSGrua
              isVisible={isGruaModalVisible}
              onClose={() => setGruaModalVisible(false)}
              onSelect={setGrua}
            />

            {/* Formulario de radios */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>
                Radio Izaje (metros)           Radio Montaje (metros)
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Components.NumericInput
                label="Radio Izaje"
                value={radioIzaje}
                onChangeText={setRadioIzaje}
                placeholder="Izaje"
              />
              <Components.NumericInput
                label="Radio Montaje"
                value={radioMontaje}
                onChangeText={setRadioMontaje}
                placeholder="Montaje"
              />
            </View>

            <Components.Button
              label="Configurar Aparejos"
              onPress={handleNavigateToSetupAparejos}
              style={{ marginTop: 10, marginBottom: 10, width: 330, left: -60 }}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupIzaje;
