import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/SetupIzajeStyles';
import ModalFigura from '../components/ModalFigura';
import ModalGrua from '../components/ModalGrua';
import ModalManiobra from '../components/ModalManiobra';
import FormularioDatosIzaje from '../components/FormularioDatosIzaje';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const SetupIzaje = () => {
  const navigation = useNavigation(); // Inicializa el hook de navegación

  const [isFiguraModalVisible, setFiguraModalVisible] = useState(false);
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);

  const [figura, setFigura] = useState('');
  const [grua, setGrua] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [manipulaciones, setManipulaciones] = useState('');

  // Nuevas variables para los formularios adicionales
  const [diametroCable, setDiametroCable] = useState({ valor: '', unidad: 'Pulgadas' });
  const [diametroGrillete, setDiametroGrillete] = useState('');
  const [radioIzaje, setRadioIzaje] = useState('');
  const [radioMontaje, setRadioMontaje] = useState('');

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Sección de Configurar Figura */}
      <TouchableOpacity onPress={() => setFiguraModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Figura</Text>
      </TouchableOpacity>
      <Text>Figura seleccionada: {figura}</Text>
      
      <ModalFigura
        isVisible={isFiguraModalVisible}
        onClose={() => setFiguraModalVisible(false)}
        onSelect={setFigura}
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

      {/* Formulario de Datos de Izaje */}
      <FormularioDatosIzaje
        radioIzaje={radioIzaje}
        radioMontaje={radioMontaje}
        diametroCable={diametroCable}
        diametroGrillete={diametroGrillete}
        setRadioIzaje={setRadioIzaje}
        setRadioMontaje={setRadioMontaje}
        handleDiametroCableChange={(text, unidad) => setDiametroCable({ valor: text, unidad })}
        setDiametroGrillete={setDiametroGrillete}
      />

      {/* Botón para navegar a PlanIzaje */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlanIzaje')} // Navega a PlanIzaje
      >
        <Text style={styles.buttonText}>Ir a Plan de Izaje</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default SetupIzaje;