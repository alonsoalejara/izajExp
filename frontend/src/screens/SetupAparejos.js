import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';
import GruaIllustration from '../components/cranes/UI/GruaIllustration';

const SetupAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [setupGruaData, setSetupGruaData] = useState({});
  const [setupCargaData, setSetupCargaData] = useState({});
  const [setupRadioData, setSetupRadioData] = useState({});
  
  const [cantidadManiobra, setCantidadManiobra] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');
  
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

  const handleNavigateToTablas = () => {
    const setupAparejosData = {
      cantidadManiobra,
      eslingaOEstrobo,
      cantidadGrilletes,
      tipoGrillete
    };

    navigation.navigate('Tablas', {
      setupGruaData,
      setupCargaData,
      setupRadioData,
      setupAparejosData
    });
  };

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
                value={cantidadManiobra ? `${cantidadManiobra}` : ""}
                onPress={() => openModal(setCantidadModalVisible)}
                width={150}
              />
              <Components.ConfigButton
                label="Tipo"
                value={eslingaOEstrobo ? `${eslingaOEstrobo}` : ""}
                onPress={() => openModal(setManiobraModalVisible)}
                width={150}
              />
            </View>
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
                value={tipoGrillete ? `Grill. de ${tipoGrillete}"` : ""}
                onPress={() => openModal(setGrilleteModalVisible)}
                width={150}
              />
            </View>
            <BS.BSGrillete
              isVisible={isGrilleteModalVisible}
              onClose={() => setGrilleteModalVisible(false)}
              onSelect={setTipoGrillete}
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
                onPress={handleNavigateToTablas}
                style={[styles.button, { width: '50%', right: 45 }]}
              />
            </View>
            {setupGruaData && setupGruaData.grua && setupGruaData.grua.nombre === "Terex RT555" ? (
              <View style={{ alignItems: 'center', marginTop: 460, marginBottom: -50 }}>
                <GruaIllustration />
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;
