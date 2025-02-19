import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
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

  const handleGruaSelect = (selectedGrua) => {
    setGrua(selectedGrua.nombre);
  };

  const handleRadioIzajeChange = (value) => {
    setRadioIzaje(value);
  };

  const handleRadioMontajeChange = (value) => {
    setRadioMontaje(value);
  };

  const handleCantidadGrilletesChange = (value) => {
    setCantidadGrilletes(value);
  };

  const handleTipoGrilleteSelect = (tipo) => {
    setTipoGrillete(tipo);
  };

  const handleCantidadManiobraSelect = (cantidad) => {
    setCantidadManiobra(cantidad);
  };

  const handleTipoManiobraSelect = (tipo) => {
    setEslingaOEstrobo(tipo);
  };

  const handleNavigateToTablas = async () => {
    if (!grua || !cantidadGrilletes || !tipoGrillete || !eslingaOEstrobo || !cantidadManiobra || !usuarioId) {
      Alert.alert('Error', 'Por favor, complete todos los campos y asegúrese de estar autenticado');
      return;
    }
    navigation.navigate('Tablas', {
      grua: grua,
      eslingaOEstrobo: eslingaOEstrobo,
      cantidadManiobra: cantidadManiobra,
      tipoGrillete: tipoGrillete,
      cantidadGrilletes: cantidadGrilletes,
      radioIzaje: radioIzaje,
      radioMontaje: radioMontaje,
      usuarioId: usuarioId,
    });
  };
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        {/* Sección superior con imagen, degradado y logo */}
        <Components.Header />

        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>

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
            onSelect={handleGruaSelect}
          />

          {/* Formulario de radios: Radio Izaje y Radio Montaje */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Radio Izaje (metros)           Radio Montaje (metros)</Text>
          </View>

          <View style={styles.inputContainer}>
            <Components.NumericInput
              label="Radio Izaje"
              value={radioIzaje}
              onChangeText={handleRadioIzajeChange}
              placeholder="Izaje"
            />
            <Components.NumericInput
              label="Radio Montaje"
              value={radioMontaje}
              onChangeText={handleRadioMontajeChange}
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
              onChangeText={handleCantidadGrilletesChange}
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
            onSelect={handleTipoGrilleteSelect}
          />

          {/* Configurar Maniobra */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Maniobra: (cantidad y tipo):</Text>
          </View>

          <View style={[styles.inputContainer]}>
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
            onSelect={handleCantidadManiobraSelect}
          />

          <BS.BSManiobra
            isVisible={isManiobraModalVisible}
            onClose={() => setManiobraModalVisible(false)}
            onSelect={handleTipoManiobraSelect}
          />

          <Components.Button
            label="Confirmar Configuración"
            onPress={handleNavigateToTablas}
            style={{ marginTop: 40, left: -60, width: 330 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupIzaje;