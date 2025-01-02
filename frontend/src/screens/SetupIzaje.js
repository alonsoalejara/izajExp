import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import Modals from '../components/modals/Modal.index';  // Importar tu modal personalizado
import FormularioDatosIzaje from '../components/forms/FormularioDatosIzaje';

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
  const [elemento, setElemento] = useState('');

  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');
  const [manipulaciones, setManipulaciones] = useState('');

  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  // Effect to log the selected crane data when it changes
  useEffect(() => {
    if (grua) {
      console.log(`Grúa seleccionada: ${grua}`);
      // Example: You can fetch data for the selected crane (assuming data is available)
      // fetchGrúaData(grua); // You would use your own function to get data for the crane
    }
  }, [grua]);

  const handleNavigateToTablas = () => {
    if (!radioIzaje || !radioMontaje) {
      setFormaModalVisible(true); // Show modal instead of Alert
      return;
    }
  
    if (!grua || !cantidadGrilletes || !tipoGrillete || !eslingaOEstrobo || !cantidadManiobra) {
      setFormaModalVisible(true); // Show modal instead of Alert
      return;
    }
  
    navigation.navigate('Tablas', {
      forma: forma,
      grua: grua,
      eslingaOEstrobo: eslingaOEstrobo,
      cantidadManiobra: cantidadManiobra,
      cantidadGrilletes: cantidadGrilletes,
      tipoGrillete: tipoGrillete,
      radioIzaje: radioIzaje,
      radioMontaje: radioMontaje,
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

        <Text style={styles.cardDetail}>
          <Text style={styles.labelText}>Grúa seleccionada: {'\n'}</Text>{grua}
        </Text>
        <Modals.ModalGrua
          isVisible={isGruaModalVisible}
          onClose={() => setGruaModalVisible(false)}
          onSelect={setGrua}
        />

        {/* Configurar Grillete */}
        <TouchableOpacity onPress={() => openModal(setGrilleteModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Grillete</Text>
        </TouchableOpacity>
        <Text style={styles.cardDetail}>
          <Text style={styles.labelText}>Cantidad de grilletes: {'\n'}</Text>{cantidadGrilletes}{'\n'}
        </Text>
        <Text style={styles.cardDetail}>
          <Text style={styles.labelText}>Tipo de grillete: {'\n'}</Text>
          {tipoGrillete ? `Grillete ${tipoGrillete}"` : ''}
        </Text>

        <Modals.ModalGrillete
          isVisible={isGrilleteModalVisible}
          onClose={() => setGrilleteModalVisible(false)}
          onSelectCantidad={setCantidadGrilletes}
          onSelectTipo={setTipoGrillete}
        />

        {/* Configurar Maniobra */}
        <TouchableOpacity onPress={() => openModal(setManiobraModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Maniobra</Text>
        </TouchableOpacity>
        <Text style={styles.cardDetail}>
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
        {/* Formulario Datos Izaje */}
        <FormularioDatosIzaje
          radioIzaje={radioIzaje}
          radioMontaje={radioMontaje}
          setRadioIzaje={setRadioIzaje}
          setRadioMontaje={setRadioMontaje}
        />

        {/* Botón para navegar a Tablas */}
        <TouchableOpacity style={styles.button} onPress={handleNavigateToTablas}>
          <Text style={styles.buttonText}>Ir a Tablas</Text>
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