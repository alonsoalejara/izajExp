import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import Modals from '../components/modals/Modal.index';

const SetupIzaje = () => {
  const navigation = useNavigation();

  const [isFormaModalVisible, setFormaModalVisible] = useState(false);
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);

  const [forma, setForma] = useState('');
  const [grua, setGrua] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadManiobra, setCantidadManiobra] = useState('');

  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');
  const [manipulaciones, setManipulaciones] = useState('');

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleNavigateToSetupRadio = () => {
    if (!grua || !cantidadGrilletes || !tipoGrillete || !eslingaOEstrobo || !cantidadManiobra) {
      setFormaModalVisible(true);
      return;
    }
  
    console.log("Datos enviados a SetupRadio:");
    console.log("Forma:", forma);
    console.log("Grua:", grua);
    console.log("Eslinga o Estrobo:", eslingaOEstrobo);
    console.log("Cantidad de Maniobras:", cantidadManiobra);
    console.log("Cantidad de Grilletes:", cantidadGrilletes);
    console.log("Tipo de Grillete:", tipoGrillete);
  
    navigation.navigate('SetupRadio', {
      forma: forma,
      grua: grua,
      eslingaOEstrobo: eslingaOEstrobo,
      cantidadManiobra: cantidadManiobra,
      cantidadGrilletes: cantidadGrilletes,
      tipoGrillete: tipoGrillete,
    });
  };
  
  return (
    <View style={{ flex: 1 }}>

      {/* Contenido principal */}
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

        {/* Modal para seleccionar grillete */}
        <Modals.ModalGrillete
          isVisible={isGrilleteModalVisible}
          onClose={() => setGrilleteModalVisible(false)}
          onSelectCantidad={(cantidad) => {
            setCantidadGrilletes(cantidad);
            console.log("Cantidad de grilletes seleccionada:", cantidad);
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
        <TouchableOpacity style={[styles.button, { marginTop: 160}]} onPress={handleNavigateToSetupRadio}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de alerta */}
      <Modals.ModalAlert
        isVisible={isFormaModalVisible}
        onClose={() => setFormaModalVisible(false)}
        message="Por favor, completa todos los campos de configuración: radio, grúa, grillete, maniobra."
      />
    </View>
  );
};

export default SetupIzaje;