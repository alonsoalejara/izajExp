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
  const [cantidad, setCantidad] = useState('');
  const [manipulaciones, setManipulaciones] = useState('');
  const [elemento, setElemento] = useState(''); // Nuevo estado para el campo "Elemento"

  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');

  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Campo Elemento */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>Identificación del Elemento</Text>
        <Text>Por favor, escribe el identificador o marca del elemento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: BC1, AKL001"
          value={elemento}
          onChangeText={setElemento}
        />
      </View>

      {/* Sección de Configurar Forma */}
      <TouchableOpacity onPress={() => setFormaModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Forma</Text>
      </TouchableOpacity>
      <Text>Forma seleccionada: {forma}</Text>
      <ModalForma
        isVisible={isFormaModalVisible}
        onClose={() => setFormaModalVisible(false)}
        onSelect={setForma}
      />

      {/* Sección de Configurar Grúa */}
      <TouchableOpacity onPress={() => setGruaModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Grúa</Text>
      </TouchableOpacity>
      <Text>Grúa seleccionada: {grua}</Text>
      <ModalGrua
        isVisible={isGruaModalVisible}
        onClose={() => setGruaModalVisible(false)}
        onSelect={setGrua}
      />

      {/* Sección de Configurar Maniobra */}
      <TouchableOpacity onPress={() => setManiobraModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Maniobra</Text>
      </TouchableOpacity>
      <Text>Maniobra seleccionada: {eslingaOEstrobo}</Text>
      <Text>Cantidad: {cantidad}</Text>
      <ModalManiobra
        isVisible={isManiobraModalVisible}
        onClose={() => setManiobraModalVisible(false)}
        onSelectEslinga={setEslingaOEstrobo}
        onSelectCantidad={setCantidad}
        onSelect={() => setManipulaciones(`${eslingaOEstrobo} x ${cantidad}`)}
      />

      {/* Sección de Configurar Grillete */}
      <TouchableOpacity onPress={() => setGrilleteModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Grillete</Text>
      </TouchableOpacity>
      <Text>Cantidad de grilletes: {cantidadGrilletes}</Text>
      <Text>Tipo de grillete: {tipoGrillete} pulg.</Text>
      <ModalGrillete
        isVisible={isGrilleteModalVisible}
        onClose={() => setGrilleteModalVisible(false)}
        onSelectCantidad={setCantidadGrilletes}
        onSelectTipo={setTipoGrillete}
      />

      {/* Formulario de Datos de Izaje */}
      <FormularioDatosIzaje
        radioIzaje={radioIzaje}
        radioMontaje={radioMontaje}
        setRadioIzaje={setRadioIzaje}
        setRadioMontaje={setRadioMontaje}
      />

      {/* Botón para navegar a PlanIzaje */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlanIzaje')}
      >
        <Text style={styles.buttonText}>Ir a Plan de Izaje</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SetupIzaje;
