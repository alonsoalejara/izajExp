import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import Modals from '../components/modals/Modal.index';
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CÁLCULO MANIOBRAS MENORES</Text>
        </View>

        {/* Configurar Grúa */}
        <TouchableOpacity onPress={() => openModal(setGruaModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Grúa</Text>
        </TouchableOpacity>

        {/* Mostrar la grúa seleccionada */}
        <Text style={[styles.cardDetail, { marginBottom: 30 }]}>
          <Text style={styles.labelText}>Grúa seleccionada: {'\n'}</Text>{grua}
        </Text>
        <Modals.ModalGrua
          isVisible={isGruaModalVisible}
          onClose={() => setGruaModalVisible(false)}
          onSelect={(selectedGrua) => setGrua(selectedGrua.nombre)}
        />

        {/* Configurar Grillete */}
        <TouchableOpacity onPress={() => openModal(setGrilleteModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Grillete</Text>
        </TouchableOpacity>
        <Text style={[styles.cardDetail, { marginBottom: 10 }]}>
          <Text style={styles.labelText}>Cantidad de grilletes: {'\n'}</Text>{cantidadGrilletes}{'\n'}
        </Text>
        <Text style={styles.cardDetail}>
          <Text style={styles.labelText}>Tipo de grillete: {'\n'}</Text>
          {tipoGrillete ? `Grillete ${tipoGrillete}"` : ''}
        </Text>

        <Modals.ModalGrillete
          isVisible={isGrilleteModalVisible}
          onClose={() => setGrilleteModalVisible(false)}
          onSelectCantidad={(cantidad) => {
            setCantidadGrilletes(cantidad);
          }}
          onSelectTipo={(tipoObj) => {
            setTipoGrillete(tipoObj.tipo);
          }}
        />

        {/* Configurar Maniobra */}
        <TouchableOpacity onPress={() => openModal(setManiobraModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Maniobra</Text>
        </TouchableOpacity>
        <Text style={[styles.cardDetail, { marginBottom: 10 }]}>
          <Text style={styles.labelText}>Maniobra seleccionada: {'\n'}</Text>{eslingaOEstrobo}{'\n'}
        </Text>
        <Text style={styles.cardDetail}>
          <Text style={styles.labelText}>Cantidad: {'\n'}</Text>{cantidadManiobra}
        </Text>
        <Modals.ModalManiobra
          isVisible={isManiobraModalVisible}
          onClose={() => setManiobraModalVisible(false)}
          onSelect={({ tipo, cantidad }) => {
            setEslingaOEstrobo(tipo);
            setCantidadManiobra(cantidad);
            setManipulaciones(`${tipo} x ${cantidad}`);
          }}
        />
        
        {/* Botón para navegar a SetupRadio */}
        <TouchableOpacity style={[styles.button, { backgroundColor: '#0288D1', marginTop: 50 }]} onPress={handleNavigateToSetupRadio}>
          <Text style={styles.buttonText}>Confirmar Configuración</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SetupIzaje;
