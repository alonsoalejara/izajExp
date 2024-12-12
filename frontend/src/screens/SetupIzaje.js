import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import styles from '../styles/SetupIzajeStyles';
import ModalForma from '../components/ModalForma';
import ModalGrua from '../components/ModalGrua';
import ModalManiobra from '../components/ModalManiobra';
import ModalGrillete from '../components/ModalGrillete';
import FormularioDatosIzaje from '../components/FormularioDatosIzaje';
import { useNavigation } from '@react-navigation/native';

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
  const [manipulaciones, setManipulaciones] = useState('');
  const [elemento, setElemento] = useState('');

  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');

  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>

      {/* Contenido principal */}
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.formTitle}>
          <Text style={styles.formTitleNoContainer}>Cálculo Maniobras Menores</Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Identificación del Elemento</Text>
          <Text style={styles.label}>Por favor, escriba el identificador o marca del elemento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: BC1, AKL001"
            placeholderTextColor="#5a5a5a"
            value={elemento}
            onChangeText={setElemento}
          />
        </View>

        <Text style={styles.formTitle}>Configuraciones:</Text>

        {/* Configurar Forma */}
        <TouchableOpacity onPress={() => openModal(setFormaModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Forma</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Forma seleccionada: {forma}</Text>
        <ModalForma
          isVisible={isFormaModalVisible}
          onClose={() => setFormaModalVisible(false)}
          onSelect={setForma}
        />

        {/* Configurar Grúa */}
        <TouchableOpacity onPress={() => openModal(setGruaModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Grúa</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Grúa seleccionada: {grua}</Text>
        <ModalGrua
          isVisible={isGruaModalVisible}
          onClose={() => setGruaModalVisible(false)}
          onSelect={setGrua}
        />

        {/* Eliminar el contenedor envolvente de Configurar Grillete */}
        <TouchableOpacity onPress={() => openModal(setGrilleteModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Grillete</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cantidad de grilletes: {cantidadGrilletes}</Text>
        <Text style={styles.title}>Tipo de grillete: {tipoGrillete} pulg.</Text>
        <ModalGrillete
          isVisible={isGrilleteModalVisible}
          onClose={() => setGrilleteModalVisible(false)}
          onSelectCantidad={setCantidadGrilletes}
          onSelectTipo={setTipoGrillete}
        />

        {/* Eliminar el contenedor envolvente de Configurar Maniobra */}
        <TouchableOpacity onPress={() => openModal(setManiobraModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Maniobra</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Maniobra seleccionada: {eslingaOEstrobo}</Text>
        <Text style={styles.title}>Cantidad: {cantidadManiobra}</Text>
        <ModalManiobra
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tablas')}
        >
          <Text style={styles.buttonText}>Ir a Tablas</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SetupIzaje;
