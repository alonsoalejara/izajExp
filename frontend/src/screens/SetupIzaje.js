import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';

const SetupIzaje = () => {
  const navigation = useNavigation();
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);
  const [grua, setGrua] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadManiobra, setCantidadManiobra] = useState('');
  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');
  const [isFormaModalVisible, setFormaModalVisible] = useState(false);
  const [forma, setForma] = useState('');

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

  const handleNavigateToTablas = async () => {
    if (!grua || !cantidadGrilletes || !tipoGrillete || !eslingaOEstrobo || !cantidadManiobra || !usuarioId) {
      Alert.alert('Error', 'Por favor, complete todos los campos y asegúrese de estar autenticado');
      return;
    }
    navigation.navigate('Tablas', {
      grua,
      eslingaOEstrobo,
      cantidadManiobra,
      tipoGrillete,
      cantidadGrilletes,
      radioIzaje,
      radioMontaje,
      usuarioId,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        {/* Sección superior con imagen, degradado y logo */}
        <Components.Header />

        {/* Título fijo */}
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>
        </View>

        {/* Contenido con ScrollView */}
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ marginTop: 15 }} // margen inferior para separar del botón
        >
          <View style={styles.container}>
            {/* Configurar Grúa */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione grúa:</Text>
            </View>

            <Components.ConfigButton
              label="Configurar Grúa"
              value={grua}
              onPress={() => openModal(setGruaModalVisible)}
            />

            <BS.BSGrua
              isVisible={isGruaModalVisible}
              onClose={() => setGruaModalVisible(false)}
              onSelect={setGrua}
            />

            {/* Formulario de radios */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Radio Izaje (metros)           Radio Montaje (metros)</Text>
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

            {/* Seleccionar Forma */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione forma:</Text>
            </View>

            <Components.ConfigButton
              label="Configurar Forma"
              value={forma}
              onPress={() => openModal(setFormaModalVisible)}
            />

            {/* Botón final */}
            <Components.Button
              label="Confirmar Configuración"
              onPress={handleNavigateToTablas}
              style={{ marginTop: 30, marginBottom: 20, width: 330, left: -60 }}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupIzaje;
