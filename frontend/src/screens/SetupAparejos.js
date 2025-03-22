import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';

const SetupAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [setupGruaData, setSetupGruaData] = useState({});
  const [setupCargaData, setSetupCargaData] = useState({});
  const [setupRadioData, setSetupRadioData] = useState({});
  
  const [cantidadManiobra, setCantidadManiobra] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  // Ahora "tipoGrillete" es un objeto que contendrá las cantidades por cada tamaño
  const [tipoGrillete, setTipoGrillete] = useState({});

  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);

  console.log("Datos recibidos en SetupAparejos:");
  console.log("SetupGruaData:", setupGruaData);
  console.log("SetupCargaData:", setupCargaData);
  console.log("SetupRadioData:", setupRadioData);

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchSetupGruaData = async () => {
      try {
        const data = await AsyncStorage.getItem('setupGruaData');
        if (data) {
          setSetupGruaData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error al recuperar datos de SetupGrua:", error);
      }
    };
    fetchSetupGruaData();

    if (route.params?.setupCargaData) {
      setSetupCargaData(route.params.setupCargaData);
    }
    if (route.params?.setupGruaData) {
      setSetupGruaData(route.params.setupGruaData);
    }
    if (route.params?.setupRadioData) {
      setSetupRadioData(route.params.setupRadioData);
    }
  }, [route.params]);

  const handleNavigateToSetupRadio = () => {
    const setupAparejosData = {
      cantidadManiobra,
      eslingaOEstrobo,
      cantidadGrilletes,
      tipoGrillete
    };

    navigation.navigate('SetupRadio', {
      setupGruaData,
      setupCargaData,
      setupRadioData,
      setupAparejosData
    });
  };

  // Se genera un resumen del objeto "tipoGrillete"
  const grilleteSummary = tipoGrillete && typeof tipoGrillete === 'object'
    ? Object.entries(tipoGrillete)
        .filter(([pulgada, cantidad]) => cantidad > 0)
        .map(([pulgada, cantidad]) => `${cantidad}x${pulgada}"`)
        .join(', ')
    : "";

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 2, height: 1000 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configuración de aparejos</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Maniobra: (cantidad y tipo)</Text>
            </View>
            <View style={styles.inputContainer}>
              <Components.ConfigButton
                label="Cantidad"
                value={cantidadManiobra && cantidadManiobra !== '0' ? `${cantidadManiobra}` : ""}
                onPress={() => openModal(setCantidadModalVisible)}
                placeholder="Maniobras"
                width={150}
              />
              <Components.ConfigButton
                label="Tipo"
                value={eslingaOEstrobo && eslingaOEstrobo.type ? `${eslingaOEstrobo.type}` : ""}
                onPress={() => openModal(setManiobraModalVisible)}
                placeholder="Esl./Estr."
                width={150}
              />
            </View>

            {/* Visualización de eslinga/estrobo y sus cantidades */}
            {eslingaOEstrobo && eslingaOEstrobo.cantidades && Object.keys(eslingaOEstrobo.cantidades).length > 0 && (
              <View style={styles.selectedManiobraContainer}>
                {Object.entries(eslingaOEstrobo.cantidades).map(([diametro, cantidad]) => (
                  <Text key={diametro} style={styles.selectedManiobraText}>
                    {`${eslingaOEstrobo.type} de ${diametro} mm - Cantidad: ${cantidad}`}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Grillete: (cantidad y tipo)</Text>
            </View>
            <View style={styles.inputContainer}>
              <Components.NumericInput
                label="Cantidad"
                value={cantidadGrilletes}
                onChangeText={setCantidadGrilletes}
                placeholder="Cantidad"
              />
              <Components.ConfigButton
                label="Grillete"
                value={grilleteSummary}
                onPress={() => openModal(setGrilleteModalVisible)}
                placeholder="Tipo Grillete"
                width={150}
              />
            </View>

            {/* Visualización detallada de la selección de grilletes */}
            {tipoGrillete && typeof tipoGrillete === 'object' && Object.keys(tipoGrillete).length > 0 && (
              <View style={styles.selectedManiobraContainer}>
                {Object.entries(tipoGrillete).map(([pulgada, cantidad]) => (
                  <Text key={pulgada} style={styles.selectedManiobraText}>
                    {`${cantidad} grillete(s) de ${pulgada}"`}
                  </Text>
                ))}
              </View>
            )}

            <BS.BSGrillete
              isVisible={isGrilleteModalVisible}
              onClose={() => setGrilleteModalVisible(false)}
              onSelect={setTipoGrillete}
              maxGrilletes={parseInt(cantidadGrilletes, 10)}
            />
            <BS.BSCantidad
              isVisible={isCantidadModalVisible}
              onClose={() => setCantidadModalVisible(false)}
              onSelect={setCantidadManiobra}
            />
            <BS.BSManiobra
              isVisible={isManiobraModalVisible}
              onClose={() => setManiobraModalVisible(false)}
              onSelect={setEslingaOEstrobo}
              maxManiobra={parseInt(cantidadManiobra, 10)}
            />
            <View style={[styles.buttonContainer, { right: 40 }]}>
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
              />
              <Components.Button
                label="Continuar"
                onPress={handleNavigateToSetupRadio}
                style={[styles.button, { width: '50%', right: 45 }]}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;
