import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    if (!grua || !cantidadGrilletes || !tipoGrillete || !eslingaOEstrobo || !cantidadManiobra) {
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
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        {/* Sección superior con imagen, degradado y logo */}
        <View style={styles.circleContainer}>
          <ImageBackground
            source={require('../../assets/grua-home.png')}
            style={styles.background}
            imageStyle={styles.image}
          >
            <Svg style={styles.gradient}>
              <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="80%" stopColor="white" stopOpacity="0.6" />
                <Stop offset="70%" stopColor="red" stopOpacity="0.8" />
              </LinearGradient>
              <Rect width="100%" height="100%" fill="url(#grad1)" />
            </Svg>
            <Image
              source={require('../../assets/EI-Montajes.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </ImageBackground>
        </View>

        {/* Contenido desplazable */}
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>
          </View>

          {/* Configurar Grúa */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Seleccione grúa:</Text>
          </View>

          <TouchableOpacity
            onPress={() => openModal(setGruaModalVisible)}
            style={styles.inputButton}
          >
            <View style={styles.inputButtonContent}>
              <Text style={[styles.inputButtonText, { color: grua ? 'black' : '#ccc' }]}>
                {grua ? `${grua}` : "Configurar Grúa"}
              </Text>
              <Icon name="caret-down" size={20} color="#ccc" style={styles.icon} />
            </View>
          </TouchableOpacity>

          <BS.BSGrua
            isVisible={isGruaModalVisible}
            onClose={() => setGruaModalVisible(false)}
            onSelect={handleGruaSelect}
          />

          {/* Formulario de radios: Radio Izaje y Radio Montaje */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Radio Izaje (metros)             Radio Montaje (metros)</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.littleInput, { width: 165 }]}
              placeholder="Izaje"
              keyboardType="numeric"
              value={radioIzaje}
              onChangeText={handleRadioIzajeChange}
            />
            <TextInput
              style={[styles.littleInput, { width: 174, marginLeft: -3 }]}
              placeholder="Montaje"
              keyboardType="numeric"
              value={radioMontaje}
              onChangeText={handleRadioMontajeChange}
            />
          </View>

          {/* Configurar Grillete */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Configure grillete(s) (cantidad y tipo):</Text>
          </View>

          <View style={[styles.inputContainer]}>
            <TextInput
              style={[styles.littleInput, { width: 120 }]}
              placeholder="Cantidad"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={cantidadGrilletes}
              onChangeText={handleCantidadGrilletesChange}
            />
            <TouchableOpacity
              onPress={() => openModal(setGrilleteModalVisible)}
              style={[styles.inputButton, { flex: 1, paddingVertical: 20, marginLeft: 5 }]}
            >
              <View style={[styles.inputButtonContent, { justifyContent: 'space-between' }]}>
                <Text
                  style={[styles.inputButtonText, { fontSize: 18, flexShrink: 1, color: tipoGrillete ? 'black' : '#ccc' }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {tipoGrillete ? `Grillete de ${tipoGrillete}"` : "Grillete"}
                </Text>
                <Icon name="caret-down" size={18} color="#ccc" style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>

          <BS.BSGrillete
            isVisible={isGrilleteModalVisible}
            onClose={() => setGrilleteModalVisible(false)}
            onSelect={handleTipoGrilleteSelect}
          />

          {/* Configurar Maniobra */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Configure maniobra(s) (cantidad y tipo):</Text>
          </View>

          <View style={[styles.inputContainer]}>
            <TouchableOpacity
              onPress={() => openModal(setCantidadModalVisible)}
              style={[styles.inputButton, { width: 120, paddingVertical: 20 }]}
            >
              <View style={[styles.inputButtonContent, { justifyContent: 'space-between' }]}>
                <Text
                  style={[styles.inputButtonText, { fontSize: 18, flexShrink: 1, color: cantidadManiobra ? 'black' : '#ccc' }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {cantidadManiobra ? `${cantidadManiobra}` : "Cantidad"}
                </Text>
                <Icon name="caret-down" size={18} color="#ccc" style={styles.icon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openModal(setManiobraModalVisible)}
              style={[styles.inputButton, { flex: 1, paddingVertical: 20, marginLeft: 5 }]}
            >
              <View style={[styles.inputButtonContent, { justifyContent: 'space-between' }]}>
                <Text
                  style={[styles.inputButtonText, { fontSize: 18, flexShrink: 1, color: eslingaOEstrobo ? 'black' : '#ccc' }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {eslingaOEstrobo ? `${eslingaOEstrobo}` : "Tipo"}
                </Text>
                <Icon name="caret-down" size={18} color="#ccc" style={styles.icon} />
              </View>
            </TouchableOpacity>
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

          {/* Botón para confirmar configuración */}
          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={handleNavigateToTablas}
          >
            <Text style={styles.buttonText}>Confirmar Configuración</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupIzaje;