import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const SetupIzajes = ({ navigation }) => {
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

  const handleFiguraSelect = (figuraSeleccionada) => {
    setFigura(figuraSeleccionada);
    setFiguraModalVisible(false);
  };

  const handleGruaSelect = (gruaSeleccionada) => {
    setGrua(gruaSeleccionada);
    setGruaModalVisible(false);
  };

  const handleEslingaOEstroboSelect = (seleccion) => {
    setEslingaOEstrobo(seleccion);
  };

  const handleCantidadSelect = (cantidadSeleccionada) => {
    setCantidad(cantidadSeleccionada);
  };

  const handleManiobraSelect = () => {
    if (eslingaOEstrobo && cantidad) {
      const cantidadPlural = cantidad > 1 ? `${cantidad} ${eslingaOEstrobo}s` : `${cantidad} ${eslingaOEstrobo}`;
      setManipulaciones(cantidadPlural);
      setManiobraModalVisible(false);
    }
  };

  // Manejo de los cambios de los formularios adicionales
  const handleDiametroCableChange = (value, unidad) => {
    setDiametroCable({ valor: value, unidad });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Sección de Configurar Figura */}
      <TouchableOpacity onPress={() => setFiguraModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Figura</Text>
      </TouchableOpacity>
      <Text>Figura seleccionada: {figura}</Text>

      {/* Modal de Figura */}
      <Modal
        transparent={true}
        visible={isFiguraModalVisible}
        animationType="fade"
        onRequestClose={() => setFiguraModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Figura</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleFiguraSelect('Cuadrado')}
            >
              <Text style={styles.optionText}>Cuadrado</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleFiguraSelect('Rectángulo')}
            >
              <Text style={styles.optionText}>Rectángulo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleFiguraSelect('Círculo')}
            >
              <Text style={styles.optionText}>Círculo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFiguraModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sección de Configurar Grúa */}
      <TouchableOpacity onPress={() => setGruaModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Grúa</Text>
      </TouchableOpacity>
      <Text>Grúa seleccionada: {grua}</Text>

      {/* Modal de Grúa */}
      <Modal
        transparent={true}
        visible={isGruaModalVisible}
        animationType="fade"
        onRequestClose={() => setGruaModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Grúa</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleGruaSelect('Grúa 1')}
            >
              <Text style={styles.optionText}>Grúa 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleGruaSelect('Grúa 2')}
            >
              <Text style={styles.optionText}>Grúa 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleGruaSelect('Grúa 3')}
            >
              <Text style={styles.optionText}>Grúa 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGruaModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sección de Configurar Maniobras */}
      <TouchableOpacity onPress={() => setManiobraModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Configurar Maniobra</Text>
      </TouchableOpacity>
      <Text>Maniobra seleccionada: {manipulaciones}</Text>

      {/* Modal de Maniobras */}
      <Modal
        transparent={true}
        visible={isManiobraModalVisible}
        animationType="fade"
        onRequestClose={() => setManiobraModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Maniobra</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleEslingaOEstroboSelect('Eslinga')}
            >
              <Text style={styles.optionText}>Eslinga</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleEslingaOEstroboSelect('Estrobo')}
            >
              <Text style={styles.optionText}>Estrobo</Text>
            </TouchableOpacity>

            <Text>¿Cantidad de {eslingaOEstrobo}s?</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleCantidadSelect(1)}
            >
              <Text style={styles.optionText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleCantidadSelect(2)}
            >
              <Text style={styles.optionText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleCantidadSelect(4)}
            >
              <Text style={styles.optionText}>4</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleManiobraSelect}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Seleccionar Maniobra</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setManiobraModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Nueva Sección de Ingreso de Datos */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>Configurar Datos de Izaje</Text>

        {/* Radio de Izaje */}
        <Text>Radio de Izaje:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={radioIzaje}
            onChangeText={setRadioIzaje}
          />
          <Text style={styles.unitText}>m.</Text>
        </View>

        {/* Radio de Montaje */}
        <Text>Radio de Montaje:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={radioMontaje}
            onChangeText={setRadioMontaje}
          />
          <Text style={styles.unitText}>m.</Text>
        </View>

        {/* Diámetro de Cable Nominal */}
        <Text>Diámetro de Cable Nominal:</Text>
        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={diametroCable.valor}
          onChangeText={(text) => handleDiametroCableChange(text, diametroCable.unidad)}
        />
        <TouchableOpacity
          style={styles.unitButton}
          onPress={() =>
            handleDiametroCableChange(diametroCable.valor, diametroCable.unidad === 'Pulgadas' ? 'Milímetros' : 'Pulgadas')
          }
        >
          <Text style={styles.unitButtonText}>{diametroCable.unidad}</Text>
        </TouchableOpacity>

        {/* Diámetro de Grillete */}
        <Text>Diámetro de Grillete:</Text>
        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={diametroGrillete}
          onChangeText={setDiametroGrillete}
        />
        <Text>Unidad: Milímetros</Text>
      </View>

      {/* Botón de Finalizar Configuración */}
      <TouchableOpacity
        style={styles.finalizarButton}
        onPress={() => navigation.navigate('PlanIzaje')}
      >
        <Text style={styles.finalizarButtonText}>Finalizar Configuración</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SetupIzajes;
