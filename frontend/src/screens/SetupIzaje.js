import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import Modals from '../components/modals/Modal.index';
import Icon from 'react-native-vector-icons/FontAwesome';
import getApiUrl from '../utils/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { grilleteOptions } from '../data/grilleteData';

const SetupIzaje = () => {
  const navigation = useNavigation();

  const [isFormaModalVisible, setFormaModalVisible] = useState(false);
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);

  const [grua, setGrua] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadManiobra, setCantidadManiobra] = useState('');

  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');
  const [manipulaciones, setManipulaciones] = useState('');

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleNavigateToSetupRadio = async () => {
    if (!grua || !cantidadGrilletes || !tipoGrillete || !eslingaOEstrobo || !cantidadManiobra) {
      setFormaModalVisible(true);
      return;
    }
  
    navigation.navigate('SetupRadio', {
      grua: grua,
      eslingaOEstrobo: eslingaOEstrobo,
      cantidadManiobra: cantidadManiobra,
      tipoGrillete: tipoGrillete,
      cantidadGrilletes: cantidadGrilletes,
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

        {/* Contenido sin ScrollView */}
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Seleccione grúa:</Text>
          </View>

          {/* Configurar Grúa */}
          <TouchableOpacity 
            onPress={() => openModal(setGruaModalVisible)} 
            style={styles.inputButton}
          >
            <View style={styles.inputButtonContent}>
              <Text
                style={[styles.inputButtonText, { color: grua ? 'black' : '#ccc' }]}
              >
                {grua ? `${grua}` : "Configurar Grúa"}
              </Text>
              <Icon name="caret-down" size={20} color="#ccc" style={styles.icon} />
            </View>
          </TouchableOpacity>

          <Modals.ModalGrua
            isVisible={isGruaModalVisible}
            onClose={() => setGruaModalVisible(false)}
            onSelect={(selectedGrua) => setGrua(selectedGrua.nombre)}
          />

          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Configure grillete(s) (cantidad y tipo):</Text>
          </View>

          {/* Configurar Grillete */}
          <View style={[styles.inputContainer]}>
            {/* Input para ingresar cantidad de grilletes */}
            <TextInput
              style={[styles.input, { width: 120 }]}
              placeholder="Cantidad"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={cantidadGrilletes}
              onChangeText={setCantidadGrilletes}
            />

            {/* Input para abrir el bottom sheet de tipo de grillete */}
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
                  {tipoGrillete ? `Tipo: ${tipoGrillete}` : "Grillete"}
                </Text>
                <Icon name="caret-down" size={18} color="#ccc" style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>

          <Modals.ModalGrillete
            isVisible={isGrilleteModalVisible}
            onClose={() => setGrilleteModalVisible(false)}
            onSelect={(cantidad, tipo) => {
              setCantidadGrilletes(cantidad);
              setTipoGrillete(tipo);
            }}
          />

          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Configure la maniobra (cantidad y tipo):</Text>
          </View>

          {/* Configurar Maniobra */}
          <View style={[styles.inputContainer]}>
            {/* Input para ingresar cantidad de maniobras */}
            <TextInput
              style={[styles.input, { width: 120 }]}
              placeholder="Cantidad"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={cantidadManiobra}
              onChangeText={setCantidadManiobra}
            />

            {/* Botón para abrir el bottom sheet de tipo de maniobra */}
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
                  {eslingaOEstrobo ? `Tipo: ${eslingaOEstrobo}` : "Tipo"}
                </Text>
                <Icon name="caret-down" size={18} color="#ccc" style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Modal para seleccionar configuración de maniobra */}
          <Modals.ModalManiobra
            isVisible={isManiobraModalVisible}
            onClose={() => setManiobraModalVisible(false)}
            onSelect={({ tipo, cantidad }) => {
              setEslingaOEstrobo(tipo);
              setCantidadManiobra(cantidad);
            }}
          />

          {/* Botón para confirmar configuración */}
          <TouchableOpacity
            style={[styles.button, { marginTop: 120 }]}
            onPress={handleNavigateToSetupRadio}
          >
            <Text style={styles.buttonText}>Confirmar Configuración</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupIzaje;