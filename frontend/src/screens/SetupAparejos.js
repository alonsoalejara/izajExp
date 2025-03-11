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
  const { usuarioId } = route.params || {};
  const [setupIzajeData, setSetupIzajeData] = useState(null);

  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);
  const [cantidadManiobra, setCantidadManiobra] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchSetupIzajeData = async () => {
      try {
        const data = await AsyncStorage.getItem('setupIzajeData');
        if (data) {
          setSetupIzajeData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error al recuperar datos de SetupIzaje:", error);
      }
    };
    fetchSetupIzajeData();
  }, []);

  const handleNavigateToSetupCarga = () => {
    const setupAparejosData = {
      cantidadManiobra,
      eslingaOEstrobo,
      cantidadGrilletes,
      tipoGrillete
    };
  
    navigation.navigate('SetupCarga', {
      setupIzajeData,
      setupAparejosData
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 2, heigh: 1000 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Configuración de aparejos</Text>
          </View>

          <View style={styles.container}>
            {/* Configurar Maniobra */}
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

            {/* Configurar Grillete */}
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
              {/* Botón Volver */}
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel={true}
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]} // Ajuste en el margen entre los botones
              />

              {/* Botón Continuar */}
              <Components.Button
                label="Continuar"
                onPress={handleNavigateToSetupCarga}
                style={[styles.button, { width: '50%', right: 45 }]} // Ajuste en el margen entre los botones
              />
            </View>

            {/* Mostrar la grúa seleccionada */}
            {setupIzajeData && setupIzajeData.grua && setupIzajeData.grua.nombre === "Terex RT555" ? (
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
