import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View, Image, ImageBackground } from 'react-native';
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cálculo maniobras menores</Text>
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
          <Text style={styles.inputButtonText}>
            {grua ? `${grua}` : "Configurar Grúa"}
          </Text>
          <Icon name="caret-down" size={20} color="#555" style={styles.icon} />
        </View>
      </TouchableOpacity>

      <Modals.ModalGrua
        isVisible={isGruaModalVisible}
        onClose={() => setGruaModalVisible(false)}
        onSelect={(selectedGrua) => setGrua(selectedGrua.nombre)}
      />

      <View style={styles.inputWrapper}>
        <Text style={styles.labelText}>Seleccione la cantidad y los tipos de grilletes:</Text>
      </View>

      {/* Configurar Grillete */}
      <TouchableOpacity 
        onPress={() => openModal(setGrilleteModalVisible)} 
        style={styles.inputButton}
      >
        <View style={styles.inputButtonContent}>
          <Text style={styles.inputButtonText}>
            {cantidadGrilletes && tipoGrillete 
              ? `${cantidadGrilletes} Grillete(s) ${tipoGrillete}"` 
              : "Configurar Grillete"}
          </Text>
          <Icon name="caret-down" size={20} color="#555" style={styles.icon} />
        </View>
      </TouchableOpacity>

      <Modals.ModalGrillete
        isVisible={isGrilleteModalVisible}
        onClose={() => setGrilleteModalVisible(false)}
        onSelect={(cantidad, tipo) => {
          setCantidadGrilletes(cantidad);
          setTipoGrillete(tipo);
        }}
      />

      <View style={styles.inputWrapper}>
        <Text style={styles.labelText}>Configure la maniobra:</Text>
      </View>

      {/* Configurar Maniobra */}
      <TouchableOpacity 
        onPress={() => openModal(setManiobraModalVisible)} 
        style={styles.inputButton}
      >
        <View style={styles.inputButtonContent}>
          <Text style={styles.inputButtonText}>
            {cantidadManiobra && eslingaOEstrobo 
              ? `${cantidadManiobra} ${eslingaOEstrobo}` 
              : "Configurar Maniobra"}
          </Text>
          <Icon name="caret-down" size={20} color="#555" style={styles.icon} />
        </View>
      </TouchableOpacity>

      {/* Modal para Maniobra */}
      <Modals.ModalManiobra
        isVisible={isManiobraModalVisible}
        onClose={() => setManiobraModalVisible(false)}
        onSelect={({ tipo, cantidad }) => {
          setEslingaOEstrobo(tipo);
          setCantidadManiobra(cantidad);
          setManipulaciones(`${tipo} x ${cantidad}`);
        }}
      />

        {/* Botón para confirmar configuración */}
        <TouchableOpacity
          style={[styles.inputButton, { backgroundColor: '#0288D1', marginTop: 50 }]}
          onPress={handleNavigateToSetupRadio}
        >
          <Text style={styles.inputButtonText}>Confirmar Configuración</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SetupIzaje;
